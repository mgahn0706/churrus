import { MIDDLE_RACE_CHARACTERS } from "@/features/middle-race/fixtures/characters";
import { useMiddleRaceAbilities } from "@/features/middle-race/hooks/useMiddleRaceAbilities";
import {
  clampPosition,
  createDefaultHand,
} from "@/features/middle-race/lib/utils";
import {
  Direction,
  MiddleRaceGame,
  PendingAbility,
  Phase,
  RacePlayerState,
} from "@/features/middle-race/types";
import { useState } from "react";

const PHASE_ORDER: Phase[] = [
  "PLAYER_SETTING",
  "CHARACTER_DRAFT",
  "RACE",
  "RESULT",
];

const MIN_PLAYERS = 1;
const MAX_PLAYERS = 13;
const FINISH_LINE = 30;

const createDefaultPlayer = (draftOrder: number): RacePlayerState => ({
  name: `Player ${draftOrder}`,
  draftOrder,
  characterId: null,
  position: 1,
  hand: createDefaultHand(null),
  discard: [],
  finishedRank: null,
  abilityDisabled: false,
  copiedAbilityId: null,
  lastAbilityTargetName: null,
  quickForwardUsed: 0,
});

const DUMMY_PLAYERS: RacePlayerState[] = Array.from({ length: 10 }, (_, index) =>
  createDefaultPlayer(index + 1)
);

const getCharacterPriority = (characterId: string | null) =>
  MIDDLE_RACE_CHARACTERS.find((character) => character.id === characterId)
    ?.priority ?? Number.MAX_SAFE_INTEGER;

const sortRacePlayersByCharacterPriority = (racePlayers: RacePlayerState[]) =>
  [...racePlayers].sort((left, right) => {
    const priorityDiff =
      getCharacterPriority(left.characterId) -
      getCharacterPriority(right.characterId);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return left.draftOrder - right.draftOrder;
  });

const getRaceTurnPlayers = (racePlayers: RacePlayerState[]) =>
  sortRacePlayersByCharacterPriority(
    racePlayers.filter((player) => player.characterId && !player.finishedRank)
  );

const getFirstRacePlayer = (racePlayers: RacePlayerState[]) =>
  getRaceTurnPlayers(racePlayers)[0] ??
  [...racePlayers].sort((left, right) => left.draftOrder - right.draftOrder)[0];

const getNextRacePlayer = (
  racePlayers: RacePlayerState[],
  currentDraftOrder: number
) => {
  const orderedPlayers = getRaceTurnPlayers(racePlayers);

  if (orderedPlayers.length === 0) {
    return racePlayers[0];
  }

  const currentIndex = orderedPlayers.findIndex(
    (player) => player.draftOrder === currentDraftOrder
  );

  return orderedPlayers[(currentIndex + 1) % orderedPlayers.length] ??
    orderedPlayers[0];
};

const applyFinishRanks = ({
  racePlayers,
  movedPlayerNames = [],
}: {
  racePlayers: RacePlayerState[];
  movedPlayerNames?: string[];
}) => {
  const nextRank =
    Math.max(0, ...racePlayers.map((player) => player.finishedRank ?? 0)) + 1;
  const movedNameOrder = new Map(
    movedPlayerNames.map((playerName, index) => [playerName, index])
  );
  const newlyFinishedNames = racePlayers
    .filter(
      (player) => !player.finishedRank && player.position >= FINISH_LINE
    )
    .sort((left, right) => {
      const leftOrder = movedNameOrder.get(left.name) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = movedNameOrder.get(right.name) ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return (
        getCharacterPriority(left.characterId) -
          getCharacterPriority(right.characterId) ||
        left.draftOrder - right.draftOrder
      );
    })
    .map((player) => player.name);

  if (newlyFinishedNames.length === 0) {
    return racePlayers;
  }

  const rankByName = new Map(
    newlyFinishedNames.map((playerName, index) => [playerName, nextRank + index])
  );

  return racePlayers.map((player) =>
    rankByName.has(player.name)
      ? {
          ...player,
          finishedRank: rankByName.get(player.name) ?? player.finishedRank,
        }
      : player
  );
};

const areAllRacePlayersFinished = (racePlayers: RacePlayerState[]) =>
  racePlayers.every((player) => !player.characterId || player.finishedRank);

const createTriggeredAbilityQueue = ({
  racePlayers,
  movedPlayerNames,
  movedBackwardPlayerNames = [],
  includeMovedDelete = false,
  getEffectiveAbilityId,
}: {
  racePlayers: RacePlayerState[];
  movedPlayerNames: string[];
  movedBackwardPlayerNames?: string[];
  includeMovedDelete?: boolean;
  getEffectiveAbilityId: (player: RacePlayerState) => string | null;
}) => {
  const movedNameSet = new Set(movedPlayerNames);
  const movedBackwardNameSet = new Set(movedBackwardPlayerNames);
  const queue: PendingAbility[] = [];
  const queueKeys = new Set<string>();

  const pushQueue = (source: RacePlayerState, target: RacePlayerState) => {
    if (
      source.name === target.name ||
      source.finishedRank ||
      target.finishedRank ||
      source.position <= 1 ||
      source.position !== target.position ||
      getEffectiveAbilityId(source) !== "push"
    ) {
      return;
    }

    const key = `${source.name}:${target.name}`;
    if (queueKeys.has(key)) {
      return;
    }

    queueKeys.add(key);
    queue.push({ type: "push", source: source.name, target: target.name });
  };
  const pushDeleteQueue = (source: RacePlayerState) => {
    if (
      !includeMovedDelete ||
      source.finishedRank ||
      getEffectiveAbilityId(source) !== "delete"
    ) {
      return;
    }

    const key = `delete:${source.name}`;
    if (queueKeys.has(key)) {
      return;
    }

    queueKeys.add(key);
    queue.push({ type: "delete", source: source.name });
  };
  const pushResetQueue = (source: RacePlayerState) => {
    if (
      !movedBackwardNameSet.has(source.name) ||
      source.finishedRank ||
      getEffectiveAbilityId(source) !== "reset"
    ) {
      return;
    }

    const key = `reset:${source.name}`;
    if (queueKeys.has(key)) {
      return;
    }

    queueKeys.add(key);
    queue.push({ type: "reset", source: source.name });
  };
  const pushUnionQueueForSource = (source: RacePlayerState) => {
    if (
      source.finishedRank ||
      source.position <= 1 ||
      getEffectiveAbilityId(source) !== "union"
    ) {
      return;
    }

    const targets = sortRacePlayersByCharacterPriority(
      racePlayers.filter(
        (player) =>
          player.name !== source.name &&
          !player.finishedRank &&
          player.position === source.position + 1
      )
    )
      .map((player) => player.name);

    if (targets.length === 0) {
      return;
    }

    const key = `union:${source.name}`;
    if (queueKeys.has(key)) {
      return;
    }

    queueKeys.add(key);
    queue.push({
      type: "union",
      source: source.name,
      isLastCard: false,
      targets,
    });
  };
  racePlayers
    .filter((player) => movedNameSet.has(player.name))
    .forEach((movedPlayer) => {
      pushDeleteQueue(movedPlayer);
      pushResetQueue(movedPlayer);
      racePlayers
        .filter(
          (player) =>
            player.name !== movedPlayer.name &&
            player.position === movedPlayer.position
        )
        .forEach((sameCellPlayer) => {
          pushQueue(sameCellPlayer, movedPlayer);
          pushQueue(movedPlayer, sameCellPlayer);
        });
    });

  racePlayers.forEach((player) => {
    pushUnionQueueForSource(player);
  });

  return queue.sort((left, right) => {
    if (left.type === "push" && right.type === "union") {
      return -1;
    }

    if (left.type === "union" && right.type === "push") {
      return 1;
    }

    const leftSource = racePlayers.find((player) => player.name === left.source);
    const rightSource = racePlayers.find((player) => player.name === right.source);
    const priorityDiff =
      getCharacterPriority(leftSource?.characterId ?? null) -
      getCharacterPriority(rightSource?.characterId ?? null);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return left.source.localeCompare(right.source);
  });
};

const getPendingAbilityFocusName = (ability: PendingAbility) =>
  "target" in ability ? ability.target : ability.source;

const normalizePendingAbilityQueue = ({
  queue,
  racePlayers,
  getEffectiveAbilityId,
}: {
  queue: PendingAbility[];
  racePlayers: RacePlayerState[];
  getEffectiveAbilityId: (player: RacePlayerState) => string | null;
}) =>
  queue.flatMap((ability): PendingAbility[] => {
    if (ability.type !== "union") {
      return [ability];
    }

    const source = racePlayers.find((player) => player.name === ability.source);

    if (
      !source ||
      source.finishedRank ||
      source.position <= 1 ||
      getEffectiveAbilityId(source) !== "union"
    ) {
      return [];
    }

    const targets = sortRacePlayersByCharacterPriority(
      ability.targets
        .map((targetName) =>
          racePlayers.find((player) => player.name === targetName)
        )
        .filter((target): target is RacePlayerState =>
          Boolean(
            target &&
              target.name !== source.name &&
              !target.finishedRank &&
              target.position === source.position + 1
          )
        )
    ).map((target) => target.name);

    return targets.length > 0 ? [{ ...ability, targets }] : [];
  });

const createOneTriggerQueue = ({
  racePlayers,
  actorName,
  card,
  getEffectiveAbilityId,
}: {
  racePlayers: RacePlayerState[];
  actorName: string;
  card: number;
  getEffectiveAbilityId: (player: RacePlayerState) => string | null;
}) => {
  if (card !== 1) {
    return [];
  }

  return racePlayers
    .filter(
      (player) =>
        player.name !== actorName && getEffectiveAbilityId(player) === "one"
    )
    .sort(
      (left, right) =>
        getCharacterPriority(left.characterId) -
          getCharacterPriority(right.characterId) ||
        left.draftOrder - right.draftOrder
    )
    .map(
      (player): PendingAbility => ({
        type: "one",
        source: player.name,
        trigger: actorName,
      })
    );
};

export const useMiddleRaceGame = (): MiddleRaceGame => {
  const {
    abilityDefinitions,
    canTargetWithAbility,
    canUseAbility,
    getEffectiveAbilityId,
    resolveAbilityAction,
    resolveMoveCard,
  } = useMiddleRaceAbilities();
  const [phase, setPhase] = useState<Phase>("PLAYER_SETTING");
  const [players, setPlayers] = useState<RacePlayerState[]>(DUMMY_PLAYERS);
  const [currentPlayerDraftOrder, setCurrentPlayerDraftOrder] = useState(
    DUMMY_PLAYERS[0]?.draftOrder ?? 1
  );
  const [selectedPlayerName, setSelectedPlayerName] = useState(
    DUMMY_PLAYERS[0]?.name ?? ""
  );
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [pendingAbilityQueue, setPendingAbilityQueue] = useState<
    PendingAbility[]
  >([]);
  const [abilityUsedThisTurnDraftOrder, setAbilityUsedThisTurnDraftOrder] =
    useState<number | null>(null);
  const [pendingMoveCardAction, setPendingMoveCardAction] = useState<{
    currentPlayerDraftOrder: number;
    card: number;
    useDefaultMove?: boolean;
  } | null>(null);
  const [pendingResumeDraftOrder, setPendingResumeDraftOrder] = useState<
    number | null
  >(null);

  const selectedPlayer =
    players.find((player) => player.name === selectedPlayerName) ?? players[0];
  const turnPlayer =
    players.find((player) => player.draftOrder === currentPlayerDraftOrder) ??
    players[0];
  const activePendingAbility = pendingAbilityQueue[0] ?? null;
  const pendingAbilitySource = activePendingAbility
    ? players.find((player) => player.name === activePendingAbility.source) ??
      null
    : null;
  const currentPlayer = pendingAbilitySource ?? turnPlayer;
  const isResolvingAbility = Boolean(activePendingAbility);
  const allCharactersAssigned = players.every((player) => player.characterId);
  const canMoveToNextPhase =
    phase !== "CHARACTER_DRAFT" || allCharactersAssigned;
  const canAddPlayer = players.length < MAX_PLAYERS;
  const canRemovePlayer = players.length > MIN_PLAYERS;
  const currentEffectiveAbilityId = currentPlayer
    ? getEffectiveAbilityId(currentPlayer)
    : null;
  const currentAbilityDefinition = currentEffectiveAbilityId
    ? abilityDefinitions[currentEffectiveAbilityId]
    : null;
  const turnPlayerEffectiveAbilityId = turnPlayer
    ? getEffectiveAbilityId(turnPlayer)
    : null;
  const mustUseSilenceBeforeMoveCard =
    turnPlayerEffectiveAbilityId === "silence" &&
    abilityUsedThisTurnDraftOrder !== turnPlayer?.draftOrder;
  const mustUseWithBeforeMoveCard =
    turnPlayerEffectiveAbilityId === "with" &&
    turnPlayer?.hand.length === 1 &&
    abilityUsedThisTurnDraftOrder !== turnPlayer?.draftOrder;
  const canUseSelectedMoveCard =
    selectedCard !== null &&
    !isResolvingAbility &&
    Boolean(turnPlayer?.hand.includes(selectedCard)) &&
    !mustUseSilenceBeforeMoveCard &&
    !mustUseWithBeforeMoveCard;
  const selectedMoveCardDisabledReason =
    selectedCard === null
      ? "제출할 이동카드를 선택해야 합니다."
      : isResolvingAbility
      ? "현재 발동 중인 능력을 먼저 처리해야 합니다."
      : mustUseSilenceBeforeMoveCard
      ? "사일런스는 능력을 먼저 사용해야 이동카드를 제출할 수 있습니다."
      : mustUseWithBeforeMoveCard
      ? "위드는 남은 이동카드가 1장일 때 능력을 사용해야 합니다."
      : !turnPlayer?.hand.includes(selectedCard)
      ? "현재 손패에 없는 이동카드입니다."
      : "";
  const canUseCurrentAbility =
    !isResolvingAbility &&
    abilityUsedThisTurnDraftOrder !== turnPlayer?.draftOrder &&
    canUseAbility(currentPlayer ?? null);
  const currentAbilityTargetNames =
    !isResolvingAbility && currentPlayer && currentAbilityDefinition?.requiresTarget
      ? players
          .filter((player) =>
            canTargetWithAbility({ source: currentPlayer, target: player })
          )
          .map((player) => player.name)
      : [];
  const continueAfterPendingAbility = ({
    nextPlayers,
    triggeredQueue = [],
    nextQueueOverride,
  }: {
    nextPlayers: RacePlayerState[];
    triggeredQueue?: PendingAbility[];
    nextQueueOverride?: PendingAbility[];
  }) => {
    if (areAllRacePlayersFinished(nextPlayers)) {
      setPendingAbilityQueue([]);
      setPendingResumeDraftOrder(null);
      setPendingMoveCardAction(null);
      setSelectedCard(null);
      setAbilityUsedThisTurnDraftOrder(null);
      setPhase("RESULT");
      return nextPlayers;
    }

    const rawNextQueue =
      nextQueueOverride ?? [...triggeredQueue, ...pendingAbilityQueue.slice(1)];
    const nextQueue = normalizePendingAbilityQueue({
      queue: rawNextQueue,
      racePlayers: nextPlayers,
      getEffectiveAbilityId,
    });
    const nextPending = nextQueue[0];

    if (nextPending) {
      setPendingAbilityQueue(nextQueue);
      setSelectedPlayerName(getPendingAbilityFocusName(nextPending));
      return nextPlayers;
    }

    if (pendingMoveCardAction) {
      const actor = nextPlayers.find(
        (player) =>
          player.draftOrder === pendingMoveCardAction.currentPlayerDraftOrder
      );
      const { players: movedPlayers } = resolveMoveCard({
        players: nextPlayers,
        currentPlayerDraftOrder: pendingMoveCardAction.currentPlayerDraftOrder,
        card: pendingMoveCardAction.card,
        useDefaultMove: pendingMoveCardAction.useDefaultMove,
      });
      const rankedMovedPlayers = applyFinishRanks({
        racePlayers: movedPlayers,
        movedPlayerNames: actor ? [actor.name] : [],
      });

      if (areAllRacePlayersFinished(rankedMovedPlayers)) {
        setPendingMoveCardAction(null);
        setPendingAbilityQueue([]);
        setPendingResumeDraftOrder(null);
        setSelectedCard(null);
        setAbilityUsedThisTurnDraftOrder(null);
        setPhase("RESULT");
        return rankedMovedPlayers;
      }

      const movedActor = actor
        ? rankedMovedPlayers.find((player) => player.name === actor.name)
        : null;
      const postMoveQueue = actor
        ? createTriggeredAbilityQueue({
            racePlayers: rankedMovedPlayers,
            movedPlayerNames: [actor.name],
            movedBackwardPlayerNames:
              movedActor && movedActor.position < actor.position
                ? [actor.name]
                : [],
            getEffectiveAbilityId,
          })
        : [];

      setPendingMoveCardAction(null);

      if (postMoveQueue.length > 0) {
        const firstPending = postMoveQueue[0];

        if (firstPending) {
          setPendingAbilityQueue(postMoveQueue);
          setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
        }

        return rankedMovedPlayers;
      }

      return advanceToNextTurnOrQueueTriggeredAbilities({
        nextPlayers: rankedMovedPlayers,
        currentDraftOrder: pendingMoveCardAction.currentPlayerDraftOrder,
      });
    }

    if (pendingResumeDraftOrder !== null) {
      const resumePlayer =
        nextPlayers.find(
          (player) => player.draftOrder === pendingResumeDraftOrder
        ) ?? nextPlayers[0];

      setPendingResumeDraftOrder(null);
      setPendingAbilityQueue([]);
      setCurrentPlayerDraftOrder(resumePlayer?.draftOrder ?? 1);
      setSelectedPlayerName(resumePlayer?.name ?? "");
      setSelectedCard(null);

      return nextPlayers;
    }

    return advanceToNextTurnOrQueueTriggeredAbilities({
      nextPlayers,
      currentDraftOrder: turnPlayer.draftOrder,
    });
  };

  function advanceToNextTurnOrQueueTriggeredAbilities({
    nextPlayers,
    currentDraftOrder,
  }: {
    nextPlayers: RacePlayerState[];
    currentDraftOrder: number;
  }) {
    if (areAllRacePlayersFinished(nextPlayers)) {
      setPendingAbilityQueue([]);
      setPendingResumeDraftOrder(null);
      setPendingMoveCardAction(null);
      setSelectedCard(null);
      setAbilityUsedThisTurnDraftOrder(null);
      setPhase("RESULT");
      return nextPlayers;
    }

    const nextPlayer = getNextRacePlayer(nextPlayers, currentDraftOrder);
    const shouldReleaseSilence =
      nextPlayer?.characterId === "silence" &&
      nextPlayers.some((player) => player.abilityDisabled);
    const releasedPlayerNames = shouldReleaseSilence
      ? nextPlayers
          .filter((player) => player.abilityDisabled)
          .map((player) => player.name)
      : [];
    const turnStartPlayers = shouldReleaseSilence
      ? nextPlayers.map((player) =>
          player.abilityDisabled
            ? {
                ...player,
                abilityDisabled: false,
              }
            : player
        )
      : nextPlayers;
    const releaseQueue =
      releasedPlayerNames.length > 0
        ? createTriggeredAbilityQueue({
            racePlayers: turnStartPlayers,
            movedPlayerNames: releasedPlayerNames,
            getEffectiveAbilityId,
          })
        : [];

    if (releaseQueue.length > 0) {
      const firstPending = releaseQueue[0];

      if (firstPending) {
        setPendingResumeDraftOrder(nextPlayer?.draftOrder ?? 1);
        setPendingAbilityQueue(releaseQueue);
        setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
      }

      setSelectedCard(null);
      setAbilityUsedThisTurnDraftOrder(null);
      return turnStartPlayers;
    }

    setPendingAbilityQueue([]);
    setPendingResumeDraftOrder(null);
    setCurrentPlayerDraftOrder(nextPlayer?.draftOrder ?? 1);
    setSelectedPlayerName(nextPlayer?.name ?? "");
    setSelectedCard(null);
    setAbilityUsedThisTurnDraftOrder(null);

    return turnStartPlayers;
  }

  return {
    phase,
    lap: 3,
    finishLine: FINISH_LINE,
    currentPlayerName: currentPlayer?.name ?? "",
    selectedPlayerName: selectedPlayer?.name ?? "",
    selectedCard,
    silencedPlayerName: null,
    players,
    canMoveToNextPhase,
    canUseSelectedMoveCard,
    selectedMoveCardDisabledReason,
    canUseCurrentAbility,
    isResolvingAbility,
    activePendingAbility,
    pendingAbilityQueue,
    currentAbilityId: activePendingAbility?.type ?? currentEffectiveAbilityId,
    currentAbilityRequiresSelectedCard: Boolean(
      !isResolvingAbility && currentAbilityDefinition?.requiresSelectedCard
    ),
    currentAbilityRequiresTarget: Boolean(
      !isResolvingAbility && currentAbilityDefinition?.requiresTarget
    ),
    currentAbilityTargetNames,
    canAddPlayer,
    canRemovePlayer,
    selectPlayer: (playerName) => {
      const nextPlayer =
        players.find((player) => player.name === playerName) ?? players[0];
      setSelectedPlayerName(nextPlayer?.name ?? "");
      if (phase !== "RACE") {
        setSelectedCard(null);
      }
    },
    selectCard: (card) => {
      setSelectedCard(card);
    },
    clearSelectedCard: () => {
      setSelectedCard(null);
    },
    useSelectedMoveCard: (options) => {
      if (!canUseSelectedMoveCard || selectedCard === null || !turnPlayer) {
        return;
      }

      if (!turnPlayer.hand.includes(selectedCard)) {
        return;
      }

      setPlayers((prev) => {
        const oneQueue = createOneTriggerQueue({
          racePlayers: prev,
          actorName: turnPlayer.name,
          card: selectedCard,
          getEffectiveAbilityId,
        });

        if (oneQueue.length > 0) {
          const firstPending = oneQueue[0];

          if (!firstPending) {
            return prev;
          }

          setPendingMoveCardAction({
            currentPlayerDraftOrder: turnPlayer.draftOrder,
            card: selectedCard,
            useDefaultMove: options?.useDefaultMove,
          });
          setPendingAbilityQueue(oneQueue);
          setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
          setSelectedCard(null);

          return prev;
        }

        const actorBeforeMove = prev.find(
          (player) => player.draftOrder === turnPlayer.draftOrder
        );
        const { players: nextPlayers } = resolveMoveCard({
          players: prev,
          currentPlayerDraftOrder: turnPlayer.draftOrder,
          card: selectedCard,
          useDefaultMove: options?.useDefaultMove,
        });
        const rankedPlayers = applyFinishRanks({
          racePlayers: nextPlayers,
          movedPlayerNames: [turnPlayer.name],
        });
        const actorAfterMove = actorBeforeMove
          ? rankedPlayers.find((player) => player.name === actorBeforeMove.name)
          : null;
        const nextQueue = createTriggeredAbilityQueue({
          racePlayers: rankedPlayers,
          movedPlayerNames: [turnPlayer.name],
          movedBackwardPlayerNames:
            actorBeforeMove &&
            actorAfterMove &&
            actorAfterMove.position < actorBeforeMove.position
              ? [actorBeforeMove.name]
              : [],
          getEffectiveAbilityId,
        });

        if (nextQueue.length > 0) {
          const firstPending = nextQueue[0];

          if (!firstPending) {
            return rankedPlayers;
          }

          setAbilityUsedThisTurnDraftOrder(null);
          setPendingAbilityQueue(nextQueue);
          setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
          setSelectedCard(null);

          return rankedPlayers;
        }

        return advanceToNextTurnOrQueueTriggeredAbilities({
          nextPlayers: rankedPlayers,
          currentDraftOrder: turnPlayer.draftOrder,
        });
      });
    },
    useCurrentAbility: (options) => {
      if (!currentPlayer || !turnPlayer || !canUseCurrentAbility) {
        return;
      }

      setPlayers((prev) => {
        if (currentEffectiveAbilityId === "union") {
          const source = prev.find(
            (player) => player.draftOrder === turnPlayer.draftOrder
          );
          const targets =
            source && source.position > 1
              ? sortRacePlayersByCharacterPriority(
                  prev.filter(
                    (player) =>
                      player.name !== source.name &&
                      !player.finishedRank &&
                      player.position === source.position + 1
                  )
                ).map((player) => player.name)
              : [];

          if (!source || targets.length === 0) {
            return prev;
          }

          const nextQueue: PendingAbility[] = [
            {
              type: "union",
              source: source.name,
              isLastCard: false,
              targets,
            },
          ];
          const firstPending = nextQueue[0];

          if (!firstPending) {
            return prev;
          }

          setPendingAbilityQueue(nextQueue);
          setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
          setSelectedCard(null);

          return prev;
        }

        const abilityCard =
          options?.card === undefined ? selectedCard : options.card;
        const abilityTargetPlayerName =
          options?.targetPlayerName ?? selectedPlayerName;
        const {
          players: nextPlayers,
          effects,
          turnConsumed,
        } = resolveAbilityAction({
          players: prev,
          currentPlayerDraftOrder: turnPlayer.draftOrder,
          card: abilityCard,
          targetPlayerName: abilityTargetPlayerName,
        });
        const movedByAbilityNames = effects
          .filter((effect) => effect.type === "abilityMove")
          .map((effect) => effect.target);
        const rankedPlayers = turnConsumed
          ? applyFinishRanks({
              racePlayers: nextPlayers,
              movedPlayerNames: [turnPlayer.name, ...movedByAbilityNames],
            })
          : nextPlayers;

        if (turnConsumed) {
          const actorBeforeAbility = prev.find(
            (player) => player.draftOrder === turnPlayer.draftOrder
          );
          const actorAfterAbility = actorBeforeAbility
            ? rankedPlayers.find((player) => player.name === actorBeforeAbility.name)
            : null;
          const actorMoved = Boolean(
            actorBeforeAbility &&
              actorAfterAbility &&
              actorAfterAbility.position !== actorBeforeAbility.position
          );
          const movedPlayerNames = [
            ...(actorMoved ? [turnPlayer.name] : []),
            ...movedByAbilityNames,
          ];
          const movedBackwardPlayerNames = [
            ...(actorMoved &&
            actorBeforeAbility &&
            actorAfterAbility &&
            actorAfterAbility.position < actorBeforeAbility.position
              ? [actorBeforeAbility.name]
              : []),
            ...effects
              .filter(
                (effect) => effect.type === "abilityMove" && effect.delta < 0
              )
              .map((effect) => effect.target),
          ];
          const nextQueue =
            movedPlayerNames.length > 0
              ? createTriggeredAbilityQueue({
                  racePlayers: rankedPlayers,
                  movedPlayerNames,
                  movedBackwardPlayerNames,
                  includeMovedDelete: true,
                  getEffectiveAbilityId,
                })
              : [];

          if (nextQueue.length > 0) {
            const firstPending = nextQueue[0];

            if (!firstPending) {
              return rankedPlayers;
            }

            setAbilityUsedThisTurnDraftOrder(null);
            setPendingAbilityQueue(nextQueue);
            setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
            setSelectedCard(null);

            return rankedPlayers;
          }

          return advanceToNextTurnOrQueueTriggeredAbilities({
            nextPlayers: rankedPlayers,
            currentDraftOrder: turnPlayer.draftOrder,
          });
        } else if (rankedPlayers !== prev) {
          const releasedPlayerNames = prev
            .filter((player) => {
              const nextPlayerState = rankedPlayers.find(
                (nextPlayer) => nextPlayer.name === player.name
              );

              return player.abilityDisabled && !nextPlayerState?.abilityDisabled;
            })
            .map((player) => player.name);
          const releaseQueue =
            releasedPlayerNames.length > 0
              ? createTriggeredAbilityQueue({
                  racePlayers: rankedPlayers,
                  movedPlayerNames: releasedPlayerNames,
                  getEffectiveAbilityId,
                })
              : [];

          setAbilityUsedThisTurnDraftOrder(turnPlayer.draftOrder);

          if (releaseQueue.length > 0) {
            const firstPending = releaseQueue[0];

            if (firstPending) {
              setPendingResumeDraftOrder(turnPlayer.draftOrder);
              setPendingAbilityQueue(releaseQueue);
              setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
              setSelectedCard(null);
            }
          }
        }

        return rankedPlayers;
      });
    },
    resolvePendingAbility: (direction: Direction) => {
      if (!activePendingAbility || !turnPlayer) {
        return;
      }

      setPlayers((prev) => {
        const active = pendingAbilityQueue[0];
        if (!active) {
          return prev;
        }

        const source = prev.find((player) => player.name === active.source);
        const target =
          active.type === "push"
            ? prev.find((player) => player.name === active.target)
            : null;
        const canResolvePush = Boolean(
          active.type === "push" &&
            source &&
            target &&
            !source.finishedRank &&
            !target.finishedRank &&
            source.position > 1 &&
            source.position === target.position &&
            getEffectiveAbilityId(source) === "push"
        );
        const canResolveOne = Boolean(
          active.type === "one" &&
            source &&
            !source.finishedRank &&
            getEffectiveAbilityId(source) === "one"
        );
        const pushNextPosition =
          canResolvePush && target
            ? clampPosition(target.position + direction)
            : null;
        const oneNextPosition =
          canResolveOne && source
            ? clampPosition(source.position + direction)
            : null;
        const canMovePush =
          canResolvePush && target && pushNextPosition !== target.position;
        const canMoveOne =
          canResolveOne && source && oneNextPosition !== source.position;
        const movedPlayerName =
          active.type === "push" && canMovePush && target
            ? target.name
            : active.type === "one" && canMoveOne && source
            ? source.name
            : null;
        const nextPlayers = canMovePush
          ? prev.map((player) =>
              active.type === "push" && player.name === active.target
                ? {
                    ...player,
                    position: pushNextPosition ?? player.position,
                  }
                : player
            )
          : canMoveOne
          ? prev.map((player) =>
              player.name === active.source
                ? {
                    ...player,
                    position: oneNextPosition ?? player.position,
                  }
                : player
            )
          : prev;
        const rankedPlayers = movedPlayerName
          ? applyFinishRanks({
              racePlayers: nextPlayers,
              movedPlayerNames: [movedPlayerName],
            })
          : nextPlayers;
        const triggeredQueue =
          movedPlayerName
            ? createTriggeredAbilityQueue({
                racePlayers: rankedPlayers,
                movedPlayerNames: [movedPlayerName],
                movedBackwardPlayerNames:
                  direction < 0 ? [movedPlayerName] : [],
                includeMovedDelete: true,
                getEffectiveAbilityId,
              })
            : [];

        if (!movedPlayerName) {
          return prev;
        }

        return continueAfterPendingAbility({
          nextPlayers: rankedPlayers,
          triggeredQueue,
        });
      });
    },
    resolveDeletePendingAbility: (targetPlayerName, cardToKeep) => {
      if (!activePendingAbility || activePendingAbility.type !== "delete" || !turnPlayer) {
        return;
      }

      setPlayers((prev) => {
        const active = pendingAbilityQueue[0];
        if (!active || active.type !== "delete") {
          return prev;
        }

        const source = prev.find((player) => player.name === active.source);
        const target = prev.find((player) => player.name === targetPlayerName);
        const canResolveDelete = Boolean(
          source &&
            target &&
            !source.finishedRank &&
            !target.finishedRank &&
            source.name !== target.name &&
            source.lastAbilityTargetName !== target.name &&
            getEffectiveAbilityId(source) === "delete" &&
            target.hand.includes(cardToKeep)
        );

        if (!canResolveDelete) {
          return prev;
        }

        const nextPlayers = canResolveDelete
          ? prev.map((player) => {
              if (player.name === source?.name) {
                return {
                  ...player,
                  lastAbilityTargetName: targetPlayerName,
                };
              }

              if (player.name !== targetPlayerName) {
                return player;
              }

              let keptCard = false;
              const removedCards = player.hand.filter((card) => {
                if (!keptCard && card === cardToKeep) {
                  keptCard = true;
                  return false;
                }

                return true;
              });

              return {
                ...player,
                hand: [cardToKeep],
                discard: [...player.discard, ...removedCards],
              };
            })
          : prev;

        return continueAfterPendingAbility({
          nextPlayers,
        });
      });
    },
    resolveResetPendingAbility: (targetPlayerName) => {
      if (!activePendingAbility || activePendingAbility.type !== "reset") {
        return;
      }

      setPlayers((prev) => {
        const active = pendingAbilityQueue[0];
        if (!active || active.type !== "reset") {
          return prev;
        }

        const source = prev.find((player) => player.name === active.source);
        const target = prev.find((player) => player.name === targetPlayerName);
        const canResolveReset = Boolean(
          source &&
            target &&
            source.name !== target.name &&
            !source.finishedRank &&
            !target.finishedRank &&
            source.lastAbilityTargetName !== target.name &&
            getEffectiveAbilityId(source) === "reset"
        );

        if (!canResolveReset) {
          return prev;
        }

        const nextPlayers = prev.map((player) => {
          if (player.name === source?.name) {
            return {
              ...player,
              lastAbilityTargetName: targetPlayerName,
            };
          }

          if (player.name !== targetPlayerName) {
            return player;
          }

          return {
            ...player,
            hand: createDefaultHand(player.characterId),
            discard: [],
            quickForwardUsed: 0,
          };
        });

        return continueAfterPendingAbility({
          nextPlayers,
        });
      });
    },
    resolveUnionPendingAbility: (shouldPull) => {
      if (!activePendingAbility || activePendingAbility.type !== "union") {
        return;
      }

      setPlayers((prev) => {
        const active = pendingAbilityQueue[0];
        if (!active || active.type !== "union") {
          return prev;
        }

        const source = prev.find((player) => player.name === active.source);
        const orderedTargets =
          shouldPull && source && getEffectiveAbilityId(source) === "union"
            ? sortRacePlayersByCharacterPriority(
                active.targets
                  .map((targetName) =>
                    prev.find((player) => player.name === targetName)
                  )
                  .filter((target): target is RacePlayerState =>
                    Boolean(
                      target &&
                        source.name !== target.name &&
                        !source.finishedRank &&
                        !target.finishedRank &&
                        source.position > 1 &&
                        target.position === source.position + 1
                    )
                  )
              )
            : [];
        const targetNames = orderedTargets.map((target) => target.name);
        const nextPlayers =
          shouldPull && source && targetNames.length > 0
            ? prev.map((player) =>
                targetNames.includes(player.name)
                  ? { ...player, position: source.position }
                  : player
              )
            : prev;
        const rankedPlayers =
          shouldPull && targetNames.length > 0
            ? applyFinishRanks({
                racePlayers: nextPlayers,
                movedPlayerNames: targetNames,
              })
            : nextPlayers;
        const triggeredQueue =
          shouldPull && targetNames.length > 0
            ? createTriggeredAbilityQueue({
                racePlayers: rankedPlayers,
                movedPlayerNames: targetNames,
                movedBackwardPlayerNames: targetNames,
                includeMovedDelete: true,
                getEffectiveAbilityId,
              }).filter(
                (ability) =>
                  ability.type !== "union" || ability.source !== active.source
              )
            : [];
        const nextQueueOverride = [
          ...triggeredQueue,
          ...pendingAbilityQueue.slice(1),
        ];

        return continueAfterPendingAbility({
          nextPlayers: rankedPlayers,
          nextQueueOverride,
        });
      });
    },
    cyclePhase: () => {
      setPhase((prev) => {
        if (
          prev === "CHARACTER_DRAFT" &&
          !players.every((player) => player.characterId)
        ) {
          return prev;
        }

        const currentIndex = PHASE_ORDER.indexOf(prev);
        const nextPhase = PHASE_ORDER[(currentIndex + 1) % PHASE_ORDER.length];

        if (nextPhase === "RACE") {
          const firstRacePlayer = getFirstRacePlayer(players);
          setCurrentPlayerDraftOrder(firstRacePlayer?.draftOrder ?? 1);
          setSelectedPlayerName(firstRacePlayer?.name ?? "");
          setSelectedCard(null);
          setPendingAbilityQueue([]);
          setPendingMoveCardAction(null);
          setPendingResumeDraftOrder(null);
          setAbilityUsedThisTurnDraftOrder(null);
        }

        return nextPhase;
      });
    },
    moveToPreviousPhase: () => {
      setPendingAbilityQueue([]);
      setPendingMoveCardAction(null);
      setPendingResumeDraftOrder(null);
      setSelectedCard(null);
      setAbilityUsedThisTurnDraftOrder(null);
      setPhase((prev) => {
        const currentIndex = PHASE_ORDER.indexOf(prev);
        return PHASE_ORDER[Math.max(currentIndex - 1, 0)];
      });
    },
    updatePlayerName: (draftOrder, name) => {
      const previousName = players.find(
        (player) => player.draftOrder === draftOrder
      )?.name;

      setPlayers((prev) =>
        prev.map((player) =>
          player.draftOrder === draftOrder
            ? {
                ...player,
                name,
              }
            : player
        )
      );

      if (previousName && selectedPlayerName === previousName) {
        setSelectedPlayerName(name);
      }
    },
    addPlayer: () => {
      setPlayers((prev) => {
        if (prev.length >= MAX_PLAYERS) {
          return prev;
        }

        return [...prev, createDefaultPlayer(prev.length + 1)];
      });
    },
    removeLastPlayer: () => {
      setPlayers((prev) => {
        if (prev.length <= MIN_PLAYERS) {
          return prev;
        }

        const removedPlayer = prev[prev.length - 1];
        const nextPlayers = prev.slice(0, -1);

        if (removedPlayer?.draftOrder === currentPlayerDraftOrder) {
          setCurrentPlayerDraftOrder(nextPlayers[0]?.draftOrder ?? 1);
        }

        if (removedPlayer?.name === selectedPlayerName) {
          setSelectedPlayerName(nextPlayers[0]?.name ?? "");
        }

        setSelectedCard(null);

        return nextPlayers;
      });
    },
    assignCharacter: (draftOrder, characterId) => {
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.draftOrder === draftOrder) {
            return {
              ...player,
              characterId,
              hand: createDefaultHand(characterId),
              discard: [],
              finishedRank: null,
              abilityDisabled: false,
              copiedAbilityId: null,
              lastAbilityTargetName: null,
              quickForwardUsed: 0,
            };
          }

          if (player.characterId === characterId) {
            return {
              ...player,
              characterId: null,
              hand: createDefaultHand(null),
              discard: [],
              finishedRank: null,
              abilityDisabled: false,
              copiedAbilityId: null,
              lastAbilityTargetName: null,
              quickForwardUsed: 0,
            };
          }

          return player;
        })
      );

      setSelectedPlayerName(
        players.find((player) => player.draftOrder === draftOrder)?.name ?? ""
      );
    },
    clearCharacter: (draftOrder) => {
      setPlayers((prev) =>
        prev.map((player) =>
          player.draftOrder === draftOrder
            ? {
                ...player,
                characterId: null,
                hand: createDefaultHand(null),
                discard: [],
                finishedRank: null,
                abilityDisabled: false,
                copiedAbilityId: null,
                lastAbilityTargetName: null,
                quickForwardUsed: 0,
              }
            : player
        )
      );
    },
    randomizeCharacters: () => {
      setPlayers((prev) => {
        const shuffledCharacters = [...MIDDLE_RACE_CHARACTERS].sort(
          () => Math.random() - 0.5
        );

        return prev.map((player, index) => {
          const characterId = shuffledCharacters[index]?.id ?? null;

          return {
            ...player,
            characterId,
            hand: createDefaultHand(characterId),
            discard: [],
            finishedRank: null,
            abilityDisabled: false,
            copiedAbilityId: null,
            lastAbilityTargetName: null,
            quickForwardUsed: 0,
          };
        });
      });
    },
  };
};
