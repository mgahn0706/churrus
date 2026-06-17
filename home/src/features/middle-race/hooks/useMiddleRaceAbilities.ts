import {
  calculateNextPosition,
  clampPosition,
  createDefaultHand,
} from "@/features/middle-race/lib/utils";
import type {
  Effect,
  PendingAbility,
  RacePlayerState,
} from "@/features/middle-race/types";
import { useCallback } from "react";

type PlayersStateByName = Record<string, RacePlayerState>;

interface CardPositionResolverInput {
  actor: RacePlayerState;
  card: number;
  playersState: PlayersStateByName;
}

interface MoveCardResolverInput {
  players: RacePlayerState[];
  currentPlayerDraftOrder: number;
  card: number;
  useDefaultMove?: boolean;
}

interface MoveCardResolverResult {
  players: RacePlayerState[];
  effects: Effect[];
  pendingAbility: PendingAbility | null;
  turnConsumed: boolean;
}

interface ReactiveAbilityInput {
  actor: RacePlayerState;
  card: number;
  players: RacePlayerState[];
}

interface AbilityActionInput {
  players: RacePlayerState[];
  currentPlayerDraftOrder: number;
  card: number | null;
  targetPlayerName: string;
}

interface MiddleRaceAbilityDefinition {
  id: string;
  canUseAsTurnAction?: boolean;
  requiresSelectedCard?: boolean;
  requiresTarget?: boolean;
  resolveCardPosition?: (input: CardPositionResolverInput) => number;
  resolveAbilityAction?: (input: AbilityActionInput) => MoveCardResolverResult;
  resolveBeforeCardMove?: (input: ReactiveAbilityInput) => Effect[];
}

const createPlayersState = (players: RacePlayerState[]) =>
  Object.fromEntries(
    players.map((player) => [player.name, player])
  ) as PlayersStateByName;

const resolveDefaultCardPosition = ({
  actor,
  card,
  playersState,
}: CardPositionResolverInput) =>
  calculateNextPosition({
    playerName: actor.name,
    delta: card,
    cause: "card",
    playersState,
  });

const resolveQuickCardPosition = ({
  actor,
  card,
  playersState,
}: CardPositionResolverInput) => {
  const movesForward = actor.abilityDisabled || actor.quickForwardUsed < 2;

  return calculateNextPosition({
    playerName: actor.name,
    delta: card * 2 * (movesForward ? 1 : -1),
    cause: "card",
    playersState,
  });
};

const shouldResetMoveCards = (player: RacePlayerState, nextHand: number[]) => {
  if (player.characterId === "jump") {
    return nextHand.length === 0 || nextHand.length === 2;
  }

  return nextHand.length === 0;
};

const getEffectiveAbilityId = (player: RacePlayerState) => {
  if (player.finishedRank || player.abilityDisabled) {
    return null;
  }

  if (player.characterId === "copy") {
    return player.copiedAbilityId ?? "copy";
  }

  return player.characterId;
};

const canTargetWithAbility = ({
  source,
  target,
}: {
  source: RacePlayerState;
  target: RacePlayerState;
}) =>
  !target.finishedRank &&
  source.name !== target.name &&
  source.lastAbilityTargetName !== target.name;

const emptyAbilityResult = (
  players: RacePlayerState[]
): MoveCardResolverResult => ({
  players,
  effects: [],
  pendingAbility: null,
  turnConsumed: false,
});

const consumeMoveCard = ({
  player,
  card,
  nextPosition = player.position,
  countQuickForward = false,
}: {
  player: RacePlayerState;
  card: number;
  nextPosition?: number;
  countQuickForward?: boolean;
}) => {
  const nextHand = player.hand.filter((handCard) => handCard !== card);
  const shouldResetHand = shouldResetMoveCards(player, nextHand);

  return {
    ...player,
    position: nextPosition,
    hand: shouldResetHand ? createDefaultHand(player.characterId) : nextHand,
    discard: shouldResetHand ? [] : [...player.discard, card],
    quickForwardUsed:
      player.characterId === "quick"
        ? shouldResetHand
          ? 0
          : player.quickForwardUsed + (countQuickForward ? 1 : 0)
        : player.quickForwardUsed,
  };
};

const findAbilityTarget = ({
  actor,
  players,
  targetPlayerName,
}: {
  actor: RacePlayerState;
  players: RacePlayerState[];
  targetPlayerName: string;
}) => {
  const target = players.find((player) => player.name === targetPlayerName);

  if (!target || !canTargetWithAbility({ source: actor, target })) {
    return null;
  }

  return target;
};

export const middleRaceAbilityDefinitions: Record<
  string,
  MiddleRaceAbilityDefinition
> = {
  gravity: {
    id: "gravity",
    canUseAsTurnAction: true,
    requiresSelectedCard: true,
    requiresTarget: true,
    resolveAbilityAction: ({ players, currentPlayerDraftOrder, card, targetPlayerName }) => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (!actor || card === null || !actor.hand.includes(card)) {
        return emptyAbilityResult(players);
      }

      const target = findAbilityTarget({ actor, players, targetPlayerName });

      if (!target || target.position === actor.position) {
        return emptyAbilityResult(players);
      }

      const targetPosition =
        target.position > actor.position
          ? clampPosition(actor.position + 1)
          : clampPosition(actor.position - 1);

      return {
        players: players.map((player) => {
          if (player.name === actor.name) {
            return {
              ...consumeMoveCard({ player, card }),
              lastAbilityTargetName: target.name,
            };
          }

          if (player.name === target.name) {
            return {
              ...player,
              position: targetPosition,
            };
          }

          return player;
        }),
        effects: [
          {
            type: "abilityMove",
            source: actor.name,
            target: target.name,
            delta: targetPosition - target.position,
          },
        ],
        pendingAbility: null,
        turnConsumed: true,
      };
    },
  },
  reset: { id: "reset" },
  push: { id: "push" },
  delete: { id: "delete" },
  offer: { id: "offer" },
  with: {
    id: "with",
    canUseAsTurnAction: true,
    requiresSelectedCard: true,
    requiresTarget: true,
    resolveAbilityAction: ({ players, currentPlayerDraftOrder, card, targetPlayerName }) => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (
        !actor ||
        card === null ||
        actor.hand.length !== 1 ||
        actor.hand[0] !== card
      ) {
        return emptyAbilityResult(players);
      }

      const target = findAbilityTarget({ actor, players, targetPlayerName });

      if (!target) {
        return emptyAbilityResult(players);
      }

      const playersState = createPlayersState(players);
      const actorPosition = calculateNextPosition({
        playerName: actor.name,
        delta: card,
        cause: "card",
        playersState,
      });
      const targetPosition = calculateNextPosition({
        playerName: target.name,
        delta: card,
        cause: "ability",
        playersState,
      });

      return {
        players: players.map((player) => {
          if (player.name === actor.name) {
            return {
              ...consumeMoveCard({
                player,
                card,
                nextPosition: actorPosition,
              }),
              lastAbilityTargetName: target.name,
            };
          }

          if (player.name === target.name) {
            return {
              ...player,
              position: targetPosition,
            };
          }

          return player;
        }),
        effects: [
          {
            type: "abilityMove",
            source: actor.name,
            target: target.name,
            delta: card,
          },
        ],
        pendingAbility: null,
        turnConsumed: true,
      };
    },
  },
  union: {
    id: "union",
    canUseAsTurnAction: true,
    resolveAbilityAction: ({ players, currentPlayerDraftOrder }) => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (!actor || actor.position <= 1) {
        return emptyAbilityResult(players);
      }

      const targets = players.filter(
        (player) =>
          player.name !== actor.name &&
          !player.finishedRank &&
          player.position === actor.position + 1
      );

      if (targets.length === 0) {
        return emptyAbilityResult(players);
      }

      return {
        players: players.map((player) =>
          targets.some((target) => target.name === player.name)
            ? { ...player, position: actor.position }
            : player
        ),
        effects: targets.map((target) => ({
          type: "abilityMove",
          source: actor.name,
          target: target.name,
          delta: actor.position - target.position,
        })),
        pendingAbility: null,
        turnConsumed: true,
      };
    },
  },
  one: {
    id: "one",
    resolveBeforeCardMove: ({ actor, card, players }) => {
      if (card !== 1) {
        return [];
      }

      return players
        .filter(
          (player) =>
            player.name !== actor.name &&
            getEffectiveAbilityId(player) === "one"
        )
        .map((player) => ({
          type: "one",
          source: player.name,
          trigger: actor.name,
        }));
    },
  },
  mirror: { id: "mirror" },
  jump: {
    id: "jump",
    resolveCardPosition: resolveDefaultCardPosition,
  },
  copy: {
    id: "copy",
    canUseAsTurnAction: true,
    requiresTarget: true,
    resolveAbilityAction: ({ players, currentPlayerDraftOrder, targetPlayerName }) => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (!actor) {
        return emptyAbilityResult(players);
      }

      const target = findAbilityTarget({ actor, players, targetPlayerName });
      const copiedAbilityId = target ? getEffectiveAbilityId(target) : null;

      if (!target || !copiedAbilityId || copiedAbilityId === "copy") {
        return emptyAbilityResult(players);
      }

      return {
        players: players.map((player) =>
          player.name === actor.name
            ? {
                ...player,
                copiedAbilityId,
                lastAbilityTargetName: target.name,
              }
            : player
        ),
        effects: [],
        pendingAbility: null,
        turnConsumed: true,
      };
    },
  },
  quick: {
    id: "quick",
    resolveCardPosition: resolveQuickCardPosition,
  },
  silence: {
    id: "silence",
    canUseAsTurnAction: true,
    requiresTarget: true,
    resolveAbilityAction: ({ players, currentPlayerDraftOrder, targetPlayerName }) => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (!actor) {
        return emptyAbilityResult(players);
      }

      const target = findAbilityTarget({ actor, players, targetPlayerName });

      if (!target) {
        return emptyAbilityResult(players);
      }

      return {
        players: players.map((player) => {
          if (player.name === actor.name) {
            return {
              ...player,
              lastAbilityTargetName: target.name,
            };
          }

          const disabled = player.name === target.name;

          return {
            ...player,
            abilityDisabled: disabled,
            copiedAbilityId:
              disabled && player.characterId === "copy"
                ? null
                : player.copiedAbilityId,
          };
        }),
        effects: [],
        pendingAbility: null,
        turnConsumed: false,
      };
    },
  },
};

export const useMiddleRaceAbilities = () => {
  const canUseAbility = useCallback((player: RacePlayerState | null) => {
    if (!player) {
      return false;
    }

    const effectiveAbilityId = getEffectiveAbilityId(player);
    const ability = effectiveAbilityId
      ? middleRaceAbilityDefinitions[effectiveAbilityId]
      : null;

    return Boolean(ability?.canUseAsTurnAction && ability.resolveAbilityAction);
  }, []);

  const resolveAbilityAction = useCallback(
    ({
      players,
      currentPlayerDraftOrder,
      card,
      targetPlayerName,
    }: AbilityActionInput): MoveCardResolverResult => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (!actor || !canUseAbility(actor)) {
        return {
          players,
          effects: [],
          pendingAbility: null,
          turnConsumed: false,
        };
      }

      const effectiveAbilityId = getEffectiveAbilityId(actor);
      const ability = effectiveAbilityId
        ? middleRaceAbilityDefinitions[effectiveAbilityId]
        : null;

      return (
        ability?.resolveAbilityAction?.({
          players,
          currentPlayerDraftOrder,
          card,
          targetPlayerName,
        }) ?? {
          players,
          effects: [],
          pendingAbility: null,
          turnConsumed: false,
        }
      );
    },
    [canUseAbility]
  );

  const resolveMoveCard = useCallback(
    ({
      players,
      currentPlayerDraftOrder,
      card,
      useDefaultMove = false,
    }: MoveCardResolverInput): MoveCardResolverResult => {
      const actor = players.find(
        (player) => player.draftOrder === currentPlayerDraftOrder
      );

      if (!actor || !actor.hand.includes(card)) {
        return {
          players,
          effects: [],
          pendingAbility: null,
          turnConsumed: false,
        };
      }

      const playersState = createPlayersState(players);
      const effectiveAbilityId = getEffectiveAbilityId(actor);
      const ability = effectiveAbilityId
        ? middleRaceAbilityDefinitions[effectiveAbilityId]
        : null;
      const cardPositionResolver =
        useDefaultMove
          ? resolveDefaultCardPosition
          : actor.characterId === "quick" && actor.abilityDisabled
          ? resolveQuickCardPosition
          : ability?.resolveCardPosition;
      const beforeMoveEffects = Object.values(middleRaceAbilityDefinitions)
        .flatMap(
          (abilityDefinition) =>
            abilityDefinition.resolveBeforeCardMove?.({
              actor,
              card,
              players,
            }) ?? []
        );
      const nextPosition =
        cardPositionResolver?.({ actor, card, playersState }) ??
        resolveDefaultCardPosition({ actor, card, playersState });
      const nextHand = actor.hand.filter((handCard) => handCard !== card);
      const shouldResetHand = shouldResetMoveCards(actor, nextHand);

      return {
        players: players.map((player) => {
          if (player.draftOrder !== actor.draftOrder) {
            return player;
          }

          return {
            ...player,
            position: nextPosition,
            hand: shouldResetHand
              ? createDefaultHand(player.characterId)
              : nextHand,
            discard: shouldResetHand ? [] : [...player.discard, card],
            quickForwardUsed:
              player.characterId === "quick"
                ? shouldResetHand
                  ? 0
                  : useDefaultMove
                  ? player.quickForwardUsed
                  : player.quickForwardUsed +
                    (player.abilityDisabled || player.quickForwardUsed < 2 ? 1 : 0)
                : player.quickForwardUsed,
          };
        }),
        effects: beforeMoveEffects,
        pendingAbility: null,
        turnConsumed: true,
      };
    },
    []
  );

  return {
    abilityDefinitions: middleRaceAbilityDefinitions,
    canTargetWithAbility,
    canUseAbility,
    getEffectiveAbilityId,
    resolveAbilityAction,
    resolveMoveCard,
  };
};
