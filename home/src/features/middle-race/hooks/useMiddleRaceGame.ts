import { MIDDLE_RACE_CHARACTERS } from "@/features/middle-race/fixtures/characters";
import { useMiddleRaceAbilities } from "@/features/middle-race/hooks/useMiddleRaceAbilities";
import {
  clampPosition,
  createDefaultHand,
} from "@/features/middle-race/lib/utils";
import {
  Direction,
  Effect,
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
const UNDO_HISTORY_LIMIT = 30;
const DEFAULT_PLAYER_NAMES = [
  "안민규",
  "이연호",
  "김태연",
  "홍경아",
  "김민석",
  "김현준",
  "강재호",
  "최유섭",
  "송가현",
  "고재준",
  "김수인",
  "김진하",
  "우진백",
];

const isAbilityMoveEffect = (
  effect: Effect
): effect is Extract<Effect, { type: "abilityMove" }> =>
  effect.type === "abilityMove";

type AbilityMoveEffect = Extract<Effect, { type: "abilityMove" }>;

interface MiddleRaceGameSnapshot {
  phase: Phase;
  players: RacePlayerState[];
  currentPlayerDraftOrder: number;
  selectedPlayerName: string;
  selectedCard: number | null;
  pendingAbilityQueue: PendingAbility[];
  abilityUsedThisTurnDraftOrder: number | null;
  pendingMoveCardAction: {
    currentPlayerDraftOrder: number;
    card: number;
    useDefaultMove?: boolean;
  } | null;
  pendingResumeDraftOrder: number | null;
}

const getDefaultPlayerName = (draftOrder: number) =>
  DEFAULT_PLAYER_NAMES[draftOrder - 1] ?? `Player ${draftOrder}`;

const getAvailableDefaultPlayerName = (
  draftOrder: number,
  existingNames: Set<string>
) => {
  const baseName = getDefaultPlayerName(draftOrder);

  if (!existingNames.has(baseName)) {
    return baseName;
  }

  let suffix = 2;
  let nextName = `${baseName} ${suffix}`;

  while (existingNames.has(nextName)) {
    suffix += 1;
    nextName = `${baseName} ${suffix}`;
  }

  return nextName;
};

const createDefaultPlayer = (
  draftOrder: number,
  existingNames: Set<string> = new Set()
): RacePlayerState => ({
  name: getAvailableDefaultPlayerName(draftOrder, existingNames),
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

const areSameCards = (left: number[], right: number[]) =>
  left.length === right.length && left.every((card, index) => card === right[index]);

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
  deleteMovedPlayerNames,
  abilityMoves = [],
  getEffectiveAbilityId,
}: {
  racePlayers: RacePlayerState[];
  movedPlayerNames: string[];
  movedBackwardPlayerNames?: string[];
  includeMovedDelete?: boolean;
  deleteMovedPlayerNames?: string[];
  abilityMoves?: AbilityMoveEffect[];
  getEffectiveAbilityId: (player: RacePlayerState) => string | null;
}) => {
  const movedNameSet = new Set(movedPlayerNames);
  const movedBackwardNameSet = new Set(movedBackwardPlayerNames);
  const deleteMovedNameSet = new Set(
    deleteMovedPlayerNames ?? (includeMovedDelete ? movedPlayerNames : [])
  );
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
      !deleteMovedNameSet.has(source.name) ||
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
  const pushMirrorQueue = (move: AbilityMoveEffect) => {
    const source = racePlayers.find((player) => player.name === move.target);

    if (
      !source ||
      source.finishedRank ||
      move.source === move.target ||
      move.delta === 0 ||
      getEffectiveAbilityId(source) !== "mirror"
    ) {
      return;
    }

    const key = `mirror:${source.name}:${move.source}:${move.delta}`;
    if (queueKeys.has(key)) {
      return;
    }

    queueKeys.add(key);
    queue.push({ type: "mirror", source: source.name, delta: move.delta });
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

  racePlayers
    .filter((player) => {
      if (movedNameSet.has(player.name)) {
        return true;
      }

      return racePlayers.some(
        (movedPlayer) =>
          movedNameSet.has(movedPlayer.name) &&
          movedPlayer.position === player.position + 1
      );
    })
    .forEach((player) => {
      pushUnionQueueForSource(player);
    });
  abilityMoves.forEach(pushMirrorQueue);

  return sortPendingAbilityQueue(queue, racePlayers);
};

const sortPendingAbilityQueue = (
  queue: PendingAbility[],
  racePlayers: RacePlayerState[]
) =>
  [...queue].sort((left, right) => {
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

    const sourceDiff = left.source.localeCompare(right.source);

    if (sourceDiff !== 0) {
      return sourceDiff;
    }

    const typeOrder = ["offer", "copy"];
    return typeOrder.indexOf(left.type) - typeOrder.indexOf(right.type);
  });

const getResetPlayerNames = ({
  beforePlayers,
  afterPlayers,
}: {
  beforePlayers: RacePlayerState[];
  afterPlayers: RacePlayerState[];
}) =>
  afterPlayers
    .filter((afterPlayer) => {
      const beforePlayer = beforePlayers.find(
        (player) => player.name === afterPlayer.name
      );
      const defaultHand = createDefaultHand(afterPlayer.characterId);

      return Boolean(
        beforePlayer &&
          afterPlayer.discard.length === 0 &&
          areSameCards(afterPlayer.hand, defaultHand) &&
          (!areSameCards(beforePlayer.hand, afterPlayer.hand) ||
            beforePlayer.discard.length > 0)
      );
    })
    .map((player) => player.name);

const createOfferAbilityQueue = ({
  racePlayers,
  resetPlayerNames,
  getEffectiveAbilityId,
}: {
  racePlayers: RacePlayerState[];
  resetPlayerNames: string[];
  getEffectiveAbilityId: (player: RacePlayerState) => string | null;
}) => {
  const resetNameSet = new Set(resetPlayerNames);

  return sortPendingAbilityQueue(
    racePlayers
      .filter(
        (player) =>
          resetNameSet.has(player.name) &&
          !player.finishedRank &&
          player.hand.length > 0 &&
          getEffectiveAbilityId(player) === "offer" &&
          racePlayers.some(
            (target) =>
              target.name !== player.name &&
              !target.finishedRank &&
              player.lastAbilityTargetName !== target.name
          )
      )
      .map(
        (player): PendingAbility => ({
          type: "offer",
          source: player.name,
        })
      ),
    racePlayers
  );
};

const createCopyAbilityQueue = ({
  racePlayers,
  resetPlayerNames,
  getEffectiveAbilityId,
}: {
  racePlayers: RacePlayerState[];
  resetPlayerNames: string[];
  getEffectiveAbilityId: (player: RacePlayerState) => string | null;
}) => {
  const resetNameSet = new Set(resetPlayerNames);

  return sortPendingAbilityQueue(
    racePlayers
      .filter(
        (player) =>
          resetNameSet.has(player.name) &&
          player.characterId === "copy" &&
          !player.abilityDisabled &&
          !player.finishedRank &&
          racePlayers.some(
            (target) => {
              const targetAbilityId = getEffectiveAbilityId(target);

              return Boolean(
                target.name !== player.name &&
                  !target.finishedRank &&
                  !target.abilityDisabled &&
                  targetAbilityId &&
                  targetAbilityId !== "copy" &&
                  player.lastAbilityTargetName !== target.name
              );
            }
          )
      )
      .map(
        (player): PendingAbility => ({
          type: "copy",
          source: player.name,
        })
      ),
    racePlayers
  );
};

const clearExpiredCopiedAbilities = ({
  racePlayers,
  resetPlayerNames,
  preserveOfferSourceNames = [],
}: {
  racePlayers: RacePlayerState[];
  resetPlayerNames: string[];
  preserveOfferSourceNames?: string[];
}) => {
  const resetNameSet = new Set(resetPlayerNames);
  const preserveNameSet = new Set(preserveOfferSourceNames);

  return racePlayers.map((player) =>
    resetNameSet.has(player.name) &&
    player.characterId === "copy" &&
    !preserveNameSet.has(player.name)
      ? { ...player, copiedAbilityId: null }
      : player
  );
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
    const source = racePlayers.find((player) => player.name === ability.source);

    if (ability.type === "offer") {
      return source &&
        !source.finishedRank &&
        source.hand.length > 0 &&
        getEffectiveAbilityId(source) === "offer" &&
        racePlayers.some(
          (target) =>
            target.name !== source.name &&
            !target.finishedRank &&
            source.lastAbilityTargetName !== target.name
        )
        ? [ability]
        : [];
    }

    if (ability.type === "copy") {
      return source &&
        source.characterId === "copy" &&
        !source.abilityDisabled &&
        !source.finishedRank &&
        racePlayers.some(
          (target) => {
            const targetAbilityId = getEffectiveAbilityId(target);

            return Boolean(
              target.name !== source.name &&
                !target.finishedRank &&
                !target.abilityDisabled &&
                targetAbilityId &&
                targetAbilityId !== "copy" &&
                source.lastAbilityTargetName !== target.name
            );
          }
        )
        ? [ability]
        : [];
    }

    if (ability.type === "mirror") {
      return source &&
        !source.finishedRank &&
        getEffectiveAbilityId(source) === "mirror" &&
        ability.delta !== 0 &&
        racePlayers.some(
          (target) =>
            target.name !== source.name &&
            !target.finishedRank &&
            source.lastAbilityTargetName !== target.name
        )
        ? [ability]
        : [];
    }

    if (ability.type === "push") {
      const target = racePlayers.find((player) => player.name === ability.target);

      return source &&
        target &&
        !source.finishedRank &&
        !target.finishedRank &&
        source.position > 1 &&
        source.position === target.position &&
        getEffectiveAbilityId(source) === "push"
        ? [ability]
        : [];
    }

    if (ability.type === "one") {
      return source &&
        !source.finishedRank &&
        getEffectiveAbilityId(source) === "one"
        ? [ability]
        : [];
    }

    if (ability.type === "delete") {
      return source &&
        !source.finishedRank &&
        getEffectiveAbilityId(source) === "delete" &&
        racePlayers.some(
          (target) =>
            target.name !== source.name &&
            !target.finishedRank &&
            source.lastAbilityTargetName !== target.name &&
            target.hand.length > 0
        )
        ? [ability]
        : [];
    }

    if (ability.type === "reset") {
      return source &&
        !source.finishedRank &&
        getEffectiveAbilityId(source) === "reset" &&
        racePlayers.some(
          (target) =>
            target.name !== source.name &&
            !target.finishedRank &&
            source.lastAbilityTargetName !== target.name
        )
        ? [ability]
        : [];
    }

    if (ability.type !== "union") {
      return [ability];
    }

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
  const [undoStack, setUndoStack] = useState<MiddleRaceGameSnapshot[]>([]);

  const createUndoSnapshot = (): MiddleRaceGameSnapshot => ({
    phase,
    players: players.map((player) => ({
      ...player,
      hand: [...player.hand],
      discard: [...player.discard],
    })),
    currentPlayerDraftOrder,
    selectedPlayerName,
    selectedCard,
    pendingAbilityQueue: pendingAbilityQueue.map((ability) => ({
      ...ability,
      ...(ability.type === "union" ? { targets: [...ability.targets] } : {}),
    })),
    abilityUsedThisTurnDraftOrder,
    pendingMoveCardAction: pendingMoveCardAction
      ? { ...pendingMoveCardAction }
      : null,
    pendingResumeDraftOrder,
  });

  const pushUndoSnapshot = () => {
    const snapshot = createUndoSnapshot();
    setUndoStack((prev) => [...prev.slice(-UNDO_HISTORY_LIMIT + 1), snapshot]);
  };

  const restoreUndoSnapshot = (snapshot: MiddleRaceGameSnapshot) => {
    setPhase(snapshot.phase);
    setPlayers(
      snapshot.players.map((player) => ({
        ...player,
        hand: [...player.hand],
        discard: [...player.discard],
      }))
    );
    setCurrentPlayerDraftOrder(snapshot.currentPlayerDraftOrder);
    setSelectedPlayerName(snapshot.selectedPlayerName);
    setSelectedCard(snapshot.selectedCard);
    setPendingAbilityQueue(
      snapshot.pendingAbilityQueue.map((ability) => ({
        ...ability,
        ...(ability.type === "union" ? { targets: [...ability.targets] } : {}),
      }))
    );
    setAbilityUsedThisTurnDraftOrder(snapshot.abilityUsedThisTurnDraftOrder);
    setPendingMoveCardAction(
      snapshot.pendingMoveCardAction ? { ...snapshot.pendingMoveCardAction } : null
    );
    setPendingResumeDraftOrder(snapshot.pendingResumeDraftOrder);
  };

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
  const hasTurnAbilityTarget = Boolean(
    turnPlayer &&
      players.some((player) =>
        canTargetWithAbility({ source: turnPlayer, target: player })
      )
  );
  const mustUseSilenceBeforeMoveCard =
    turnPlayerEffectiveAbilityId === "silence" &&
    hasTurnAbilityTarget &&
    abilityUsedThisTurnDraftOrder !== turnPlayer?.draftOrder;
  const mustUseWithBeforeMoveCard =
    turnPlayerEffectiveAbilityId === "with" &&
    turnPlayer?.hand.length === 1 &&
    hasTurnAbilityTarget &&
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
      const resetPlayerNames = getResetPlayerNames({
        beforePlayers: nextPlayers,
        afterPlayers: rankedMovedPlayers,
      });
      const offerQueue = createOfferAbilityQueue({
        racePlayers: rankedMovedPlayers,
        resetPlayerNames,
        getEffectiveAbilityId,
      });
      const copyQueue = createCopyAbilityQueue({
        racePlayers: rankedMovedPlayers,
        resetPlayerNames,
        getEffectiveAbilityId,
      });
      const resolvedRankedMovedPlayers = clearExpiredCopiedAbilities({
        racePlayers: rankedMovedPlayers,
        resetPlayerNames,
        preserveOfferSourceNames: offerQueue.map((ability) => ability.source),
      });
      const nextPendingQueue = sortPendingAbilityQueue(
        [...offerQueue, ...copyQueue, ...postMoveQueue],
        resolvedRankedMovedPlayers
      );

      setPendingMoveCardAction(null);

      if (nextPendingQueue.length > 0) {
        const firstPending = nextPendingQueue[0];

        if (firstPending) {
          setPendingAbilityQueue(nextPendingQueue);
          setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
        }

        return resolvedRankedMovedPlayers;
      }

      return advanceToNextTurnOrQueueTriggeredAbilities({
        nextPlayers: resolvedRankedMovedPlayers,
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
    canUndoLastAction: undoStack.length > 0,
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

      pushUndoSnapshot();

      const prev = players;
      const oneQueue = createOneTriggerQueue({
        racePlayers: prev,
        actorName: turnPlayer.name,
        card: selectedCard,
        getEffectiveAbilityId,
      });

      if (oneQueue.length > 0) {
        const firstPending = oneQueue[0];

        if (!firstPending) {
          return;
        }

        setPendingMoveCardAction({
          currentPlayerDraftOrder: turnPlayer.draftOrder,
          card: selectedCard,
          useDefaultMove: options?.useDefaultMove,
        });
        setPendingAbilityQueue(oneQueue);
        setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
        setSelectedCard(null);

        return;
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
      const resetPlayerNames = getResetPlayerNames({
        beforePlayers: prev,
        afterPlayers: rankedPlayers,
      });
      const offerQueue = createOfferAbilityQueue({
        racePlayers: rankedPlayers,
        resetPlayerNames,
        getEffectiveAbilityId,
      });
      const copyQueue = createCopyAbilityQueue({
        racePlayers: rankedPlayers,
        resetPlayerNames,
        getEffectiveAbilityId,
      });
      const resolvedRankedPlayers = clearExpiredCopiedAbilities({
        racePlayers: rankedPlayers,
        resetPlayerNames,
        preserveOfferSourceNames: offerQueue.map((ability) => ability.source),
      });
      const pendingQueue = sortPendingAbilityQueue(
        [...offerQueue, ...copyQueue, ...nextQueue],
        resolvedRankedPlayers
      );

      if (pendingQueue.length > 0) {
        const firstPending = pendingQueue[0];

        if (!firstPending) {
          setPlayers(resolvedRankedPlayers);
          return;
        }

        setAbilityUsedThisTurnDraftOrder(null);
        setPendingAbilityQueue(pendingQueue);
        setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
        setSelectedCard(null);
        setPlayers(resolvedRankedPlayers);

        return;
      }

      setPlayers(
        advanceToNextTurnOrQueueTriggeredAbilities({
          nextPlayers: resolvedRankedPlayers,
          currentDraftOrder: turnPlayer.draftOrder,
        })
      );
    },
    useCurrentAbility: (options) => {
      if (!currentPlayer || !turnPlayer || !canUseCurrentAbility) {
        return;
      }

      const prev = players;

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
          return;
        }

        pushUndoSnapshot();

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
          return;
        }

        setPendingAbilityQueue(nextQueue);
        setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
        setSelectedCard(null);

        return;
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
        .filter(isAbilityMoveEffect)
        .map((effect) => effect.target);
      const movedForFinishRank =
        currentEffectiveAbilityId === "with"
          ? [turnPlayer.name, ...movedByAbilityNames].sort((leftName, rightName) => {
              const leftPlayer = prev.find((player) => player.name === leftName);
              const rightPlayer = prev.find((player) => player.name === rightName);
              const positionDiff =
                (rightPlayer?.position ?? 0) - (leftPlayer?.position ?? 0);

              if (positionDiff !== 0) {
                return positionDiff;
              }

              return (
                getCharacterPriority(leftPlayer?.characterId ?? null) -
                  getCharacterPriority(rightPlayer?.characterId ?? null) ||
                (leftPlayer?.draftOrder ?? 0) - (rightPlayer?.draftOrder ?? 0)
              );
            })
          : [turnPlayer.name, ...movedByAbilityNames];
      const rankedPlayers = turnConsumed
        ? applyFinishRanks({
            racePlayers: nextPlayers,
            movedPlayerNames: movedForFinishRank,
          })
        : nextPlayers;

      if (turnConsumed) {
        pushUndoSnapshot();

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
            .filter(isAbilityMoveEffect)
            .filter((effect) => effect.delta < 0)
            .map((effect) => effect.target),
        ];
        const nextQueue =
          movedPlayerNames.length > 0
            ? createTriggeredAbilityQueue({
                racePlayers: rankedPlayers,
                movedPlayerNames,
                movedBackwardPlayerNames,
                deleteMovedPlayerNames: movedByAbilityNames,
                abilityMoves: effects.filter(isAbilityMoveEffect),
                getEffectiveAbilityId,
              })
            : [];
        const resetPlayerNames = getResetPlayerNames({
          beforePlayers: prev,
          afterPlayers: rankedPlayers,
        });
        const offerQueue = createOfferAbilityQueue({
          racePlayers: rankedPlayers,
          resetPlayerNames,
          getEffectiveAbilityId,
        });
        const copyQueue = createCopyAbilityQueue({
          racePlayers: rankedPlayers,
          resetPlayerNames,
          getEffectiveAbilityId,
        });
        const resolvedRankedPlayers = clearExpiredCopiedAbilities({
          racePlayers: rankedPlayers,
          resetPlayerNames,
          preserveOfferSourceNames: offerQueue.map((ability) => ability.source),
        });
        const pendingQueue = sortPendingAbilityQueue(
          [...offerQueue, ...copyQueue, ...nextQueue],
          resolvedRankedPlayers
        );

        if (pendingQueue.length > 0) {
          const firstPending = pendingQueue[0];

          if (!firstPending) {
            setPlayers(resolvedRankedPlayers);
            return;
          }

          setAbilityUsedThisTurnDraftOrder(null);
          setPendingAbilityQueue(pendingQueue);
          setSelectedPlayerName(getPendingAbilityFocusName(firstPending));
          setSelectedCard(null);
          setPlayers(resolvedRankedPlayers);

          return;
        }

        setPlayers(
          advanceToNextTurnOrQueueTriggeredAbilities({
            nextPlayers: resolvedRankedPlayers,
            currentDraftOrder: turnPlayer.draftOrder,
          })
        );

        return;
      }

      if (rankedPlayers !== prev) {
        pushUndoSnapshot();

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

        setPlayers(rankedPlayers);
      }
    },
    resolvePendingAbility: (direction: Direction) => {
      if (!activePendingAbility || !turnPlayer) {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active) {
        return;
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
              deleteMovedPlayerNames:
                active.type === "push" && target ? [target.name] : [],
              abilityMoves:
                active.type === "push" && target
                  ? [
                      {
                        type: "abilityMove",
                        source: active.source,
                        target: target.name,
                        delta: direction,
                      },
                    ]
                  : [],
              getEffectiveAbilityId,
            })
          : [];

      if (!movedPlayerName) {
        return;
      }

      pushUndoSnapshot();

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers: rankedPlayers,
          triggeredQueue,
        })
      );
    },
    resolveDeletePendingAbility: (targetPlayerName, cardToKeep) => {
      if (!activePendingAbility || activePendingAbility.type !== "delete" || !turnPlayer) {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active || active.type !== "delete") {
        return;
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
        return;
      }

      pushUndoSnapshot();

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
      });

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers,
        })
      );
    },
    resolveResetPendingAbility: (targetPlayerName) => {
      if (!activePendingAbility || activePendingAbility.type !== "reset") {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active || active.type !== "reset") {
        return;
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
        return;
      }

      pushUndoSnapshot();

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

      const offerQueue = createOfferAbilityQueue({
        racePlayers: nextPlayers,
        resetPlayerNames: [targetPlayerName],
        getEffectiveAbilityId,
      });
      const copyQueue = createCopyAbilityQueue({
        racePlayers: nextPlayers,
        resetPlayerNames: [targetPlayerName],
        getEffectiveAbilityId,
      });
      const resolvedNextPlayers = clearExpiredCopiedAbilities({
        racePlayers: nextPlayers,
        resetPlayerNames: [targetPlayerName],
        preserveOfferSourceNames: offerQueue.map((ability) => ability.source),
      });

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers: resolvedNextPlayers,
          triggeredQueue: sortPendingAbilityQueue(
            [...offerQueue, ...copyQueue],
            resolvedNextPlayers
          ),
        })
      );
    },
    resolveOfferPendingAbility: (targetPlayerName, cardToGive) => {
      if (!activePendingAbility || activePendingAbility.type !== "offer") {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active || active.type !== "offer") {
        return;
      }

      const source = prev.find((player) => player.name === active.source);
      const target = prev.find((player) => player.name === targetPlayerName);
      const canResolveOffer = Boolean(
        source &&
          target &&
          !source.finishedRank &&
          !target.finishedRank &&
          source.name !== target.name &&
          source.lastAbilityTargetName !== target.name &&
          getEffectiveAbilityId(source) === "offer" &&
          source.hand.includes(cardToGive)
      );

      if (!canResolveOffer) {
        return;
      }

      pushUndoSnapshot();

      let offeredCardRemoved = false;
      const nextPlayers = prev.map((player) => {
        if (player.name === source?.name) {
          return {
            ...player,
            hand: player.hand.filter((card) => {
              if (!offeredCardRemoved && card === cardToGive) {
                offeredCardRemoved = true;
                return false;
              }

              return true;
            }),
            copiedAbilityId:
              player.characterId === "copy" ? null : player.copiedAbilityId,
            lastAbilityTargetName: targetPlayerName,
          };
        }

        if (player.name === targetPlayerName) {
          return {
            ...player,
            hand: [...player.hand, cardToGive],
          };
        }

        return player;
      });

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers,
        })
      );
    },
    resolveMirrorPendingAbility: (targetPlayerName) => {
      if (!activePendingAbility || activePendingAbility.type !== "mirror") {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active || active.type !== "mirror") {
        return;
      }

      const source = prev.find((player) => player.name === active.source);
      const target = prev.find((player) => player.name === targetPlayerName);
      const mirrorDelta = -active.delta;
      const canResolveMirror = Boolean(
        source &&
          target &&
          !source.finishedRank &&
          !target.finishedRank &&
          source.name !== target.name &&
          source.lastAbilityTargetName !== target.name &&
          getEffectiveAbilityId(source) === "mirror" &&
          mirrorDelta !== 0
      );

      if (!canResolveMirror || !target) {
        return;
      }

      pushUndoSnapshot();

      const nextPosition = clampPosition(target.position + mirrorDelta);
      const moved = nextPosition !== target.position;
      const nextPlayers = prev.map((player) => {
        if (player.name === source?.name) {
          return {
            ...player,
            lastAbilityTargetName: targetPlayerName,
          };
        }

        if (player.name === targetPlayerName) {
          return {
            ...player,
            position: nextPosition,
          };
        }

        return player;
      });
      const rankedPlayers = moved
        ? applyFinishRanks({
            racePlayers: nextPlayers,
            movedPlayerNames: [targetPlayerName],
          })
        : nextPlayers;
      const triggeredQueue = moved
        ? createTriggeredAbilityQueue({
            racePlayers: rankedPlayers,
            movedPlayerNames: [targetPlayerName],
            movedBackwardPlayerNames:
              mirrorDelta < 0 ? [targetPlayerName] : [],
            deleteMovedPlayerNames: [targetPlayerName],
            abilityMoves: [
              {
                type: "abilityMove",
                source: active.source,
                target: targetPlayerName,
                delta: mirrorDelta,
              },
            ],
            getEffectiveAbilityId,
          })
        : [];

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers: rankedPlayers,
          triggeredQueue,
        })
      );
    },
    resolveCopyPendingAbility: (targetPlayerName) => {
      if (!activePendingAbility || activePendingAbility.type !== "copy") {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active || active.type !== "copy") {
        return;
      }

      const source = prev.find((player) => player.name === active.source);
      const target = prev.find((player) => player.name === targetPlayerName);
      const copiedAbilityId = target ? getEffectiveAbilityId(target) : null;
      const canResolveCopy = Boolean(
        source &&
          target &&
          source.characterId === "copy" &&
          !source.abilityDisabled &&
          !source.finishedRank &&
          !target.finishedRank &&
          source.name !== target.name &&
          source.lastAbilityTargetName !== target.name &&
          copiedAbilityId &&
          copiedAbilityId !== "copy"
      );

      if (!canResolveCopy || !copiedAbilityId) {
        return;
      }

      pushUndoSnapshot();

      const nextPlayers = prev.map((player) =>
        player.name === active.source
          ? {
              ...player,
              copiedAbilityId,
              lastAbilityTargetName: targetPlayerName,
            }
          : player
      );

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers,
        })
      );
    },
    resolveUnionPendingAbility: (shouldPull) => {
      if (!activePendingAbility || activePendingAbility.type !== "union") {
        return;
      }

      const prev = players;
      const active = pendingAbilityQueue[0];
      if (!active || active.type !== "union") {
        return;
      }

      pushUndoSnapshot();

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
        shouldPull && source && targetNames.length > 0
          ? createTriggeredAbilityQueue({
              racePlayers: rankedPlayers,
              movedPlayerNames: targetNames,
              movedBackwardPlayerNames: targetNames,
              deleteMovedPlayerNames: targetNames,
              abilityMoves: orderedTargets.map((target) => ({
                type: "abilityMove",
                source: active.source,
                target: target.name,
                delta: source.position - target.position,
              })),
              getEffectiveAbilityId,
            }).filter(
              (ability) =>
                ability.type !== "union" || ability.source !== active.source
            )
          : [];
      const nextPendingQueue = pendingAbilityQueue
        .slice(1)
        .filter(
          (ability) =>
            ability.type !== "union" || ability.source !== active.source
        );
      const nextQueueOverride = [
        ...triggeredQueue,
        ...nextPendingQueue,
      ];

      setPlayers(
        continueAfterPendingAbility({
          nextPlayers: rankedPlayers,
          nextQueueOverride,
        })
      );
    },
    cyclePhase: () => {
      if (
        phase === "CHARACTER_DRAFT" &&
        !players.every((player) => player.characterId)
      ) {
        return;
      }

      pushUndoSnapshot();

      const currentIndex = PHASE_ORDER.indexOf(phase);
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

      setPhase(nextPhase);
    },
    moveToPreviousPhase: () => {
      if (PHASE_ORDER.indexOf(phase) <= 0) {
        return;
      }

      pushUndoSnapshot();

      setPendingAbilityQueue([]);
      setPendingMoveCardAction(null);
      setPendingResumeDraftOrder(null);
      setSelectedCard(null);
      setAbilityUsedThisTurnDraftOrder(null);
      setPhase(PHASE_ORDER[Math.max(PHASE_ORDER.indexOf(phase) - 1, 0)]);
    },
    updatePlayerName: (draftOrder, name) => {
      const nextName = name.trim() || getDefaultPlayerName(draftOrder);
      const previousName = players.find(
        (player) => player.draftOrder === draftOrder
      )?.name;

      if (
        !previousName ||
        previousName === nextName ||
        players.some(
          (player) =>
            player.draftOrder !== draftOrder && player.name === nextName
        )
      ) {
        return;
      }

      setPlayers((prev) =>
        prev.map((player) =>
          player.draftOrder === draftOrder
            ? {
                ...player,
                name: nextName,
                lastAbilityTargetName:
                  player.lastAbilityTargetName === previousName
                    ? nextName
                    : player.lastAbilityTargetName,
              }
            : {
                ...player,
                lastAbilityTargetName:
                  player.lastAbilityTargetName === previousName
                    ? nextName
                    : player.lastAbilityTargetName,
              }
        )
      );

      if (previousName && selectedPlayerName === previousName) {
        setSelectedPlayerName(nextName);
      }

      setPendingAbilityQueue((prev) =>
        prev.map((ability) => ({
          ...ability,
          source: ability.source === previousName ? nextName : ability.source,
          ...("target" in ability
            ? {
                target: ability.target === previousName ? nextName : ability.target,
              }
            : {}),
          ...(ability.type === "union"
            ? {
                targets: ability.targets.map((target) =>
                  target === previousName ? nextName : target
                ),
              }
            : {}),
        }))
      );
    },
    addPlayer: () => {
      if (players.length >= MAX_PLAYERS) {
        return;
      }

      pushUndoSnapshot();

      setPlayers((prev) => {
        if (prev.length >= MAX_PLAYERS) {
          return prev;
        }

        return [
          ...prev,
          createDefaultPlayer(
            prev.length + 1,
            new Set(prev.map((player) => player.name))
          ),
        ];
      });
    },
    removeLastPlayer: () => {
      if (players.length <= MIN_PLAYERS) {
        return;
      }

      pushUndoSnapshot();

      const removedPlayer = players[players.length - 1];
      const nextPlayers = players.slice(0, -1);

      if (removedPlayer?.draftOrder === currentPlayerDraftOrder) {
        setCurrentPlayerDraftOrder(nextPlayers[0]?.draftOrder ?? 1);
      }

      if (removedPlayer?.name === selectedPlayerName) {
        setSelectedPlayerName(nextPlayers[0]?.name ?? "");
      }

      setSelectedCard(null);
      setPlayers(nextPlayers);
    },
    assignCharacter: (draftOrder, characterId) => {
      pushUndoSnapshot();

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
      const targetPlayer = players.find(
        (player) => player.draftOrder === draftOrder
      );

      if (!targetPlayer?.characterId) {
        return;
      }

      pushUndoSnapshot();

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
      pushUndoSnapshot();

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
    undoLastAction: () => {
      const snapshot = undoStack[undoStack.length - 1];

      if (!snapshot) {
        return;
      }

      restoreUndoSnapshot(snapshot);
      setUndoStack((prev) => prev.slice(0, -1));
    },
  };
};
