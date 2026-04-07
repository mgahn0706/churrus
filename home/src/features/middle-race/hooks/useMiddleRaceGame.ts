import { FormEvent, useEffect, useMemo, useState } from "react";
import { MIDDLE_RACE_CHARACTERS } from "@/features/middle-race/fixtures/characters";
import {
  calculateNextPosition,
  clampPosition,
  createDefaultHand,
  getCharacterById,
  getCharacterByName,
  sortedCharacters,
} from "@/features/middle-race/lib/utils";
import {
  Direction,
  Effect,
  PendingAbility,
  Phase,
  RacePlayerState,
} from "@/features/middle-race/types";

export function useMiddleRaceGame() {
  const [phase, setPhase] = useState<Phase>(1);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [openedAbilityByPlayer, setOpenedAbilityByPlayer] = useState<
    Record<string, boolean>
  >({});
  const [racePlayers, setRacePlayers] = useState<Record<string, RacePlayerState>>(
    {}
  );
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [pendingEffects, setPendingEffects] = useState<Effect[]>([]);
  const [silencedPlayerName, setSilencedPlayerName] = useState<string | null>(null);
  const [lastAbilityTargetByPlayer, setLastAbilityTargetByPlayer] = useState<
    Record<string, string>
  >({});
  const [selectedCardByPlayer, setSelectedCardByPlayer] = useState<
    Record<string, number | "">
  >({});
  const [effectTarget, setEffectTarget] = useState("");
  const [effectKeepCard, setEffectKeepCard] = useState<number | "">("");
  const [effectDirection, setEffectDirection] = useState<Direction>(1);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [pendingAbility, setPendingAbility] = useState<PendingAbility | null>(null);
  const [abilityModalOpen, setAbilityModalOpen] = useState(false);
  const [pendingAbilityTarget, setPendingAbilityTarget] = useState("");
  const [showPieceNames, setShowPieceNames] = useState(false);

  const turnOrder = useMemo(() => {
    return Object.values(racePlayers)
      .filter((player) => player.characterId)
      .sort((left, right) => {
        const leftPriority = getCharacterById(left.characterId)?.priority ?? 999;
        const rightPriority = getCharacterById(right.characterId)?.priority ?? 999;

        return leftPriority - rightPriority;
      })
      .map((player) => player.name);
  }, [racePlayers]);

  const currentPlayerName = turnOrder[currentTurnIndex] ?? null;
  const currentPlayer = currentPlayerName ? racePlayers[currentPlayerName] : null;
  const currentCharacter = currentPlayer
    ? getCharacterById(currentPlayer.characterId)
    : null;
  const pendingEffect = pendingEffects[0] ?? null;

  const getEffectiveAbilityId = (targetPlayerName: string) => {
    const player = racePlayers[targetPlayerName];
    if (!player || player.finishedRank != null) {
      return null;
    }

    if (silencedPlayerName === targetPlayerName) {
      return null;
    }

    return player.characterId;
  };

  const getCharacterPriority = (targetPlayerName: string) => {
    const player = racePlayers[targetPlayerName];
    return getCharacterById(player?.characterId ?? null)?.priority ?? 999;
  };

  const getEligibleTargets = (sourceName: string) =>
    Object.values(racePlayers)
      .filter((player) => {
        if (player.name === sourceName || player.finishedRank != null) {
          return false;
        }

        return lastAbilityTargetByPlayer[sourceName] !== player.name;
      })
      .sort((left, right) => getCharacterPriority(left.name) - getCharacterPriority(right.name));

  const rememberTarget = (sourceName: string, targetName: string) => {
    setLastAbilityTargetByPlayer((previous) => ({
      ...previous,
      [sourceName]: targetName,
    }));
  };

  const addPlayer = () => {
    const trimmedName = playerName.trim();

    if (!trimmedName || players.includes(trimmedName)) {
      return;
    }

    setPlayers((previous) => [...previous, trimmedName]);
    setPlayerName("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPlayer();
  };

  const removePlayer = (name: string) => {
    setPlayers((previous) => previous.filter((player) => player !== name));
  };

  const startCharacterPhase = () => {
    const nextAssignments = Object.fromEntries(players.map((player) => [player, ""]));
    setAssignments(nextAssignments);
    setPhase(2);
  };

  const assignCharacter = (targetPlayerName: string, characterName: string) => {
    setAssignments((previous) => {
      const next = { ...previous };

      Object.entries(next).forEach(([name, assigned]) => {
        if (name !== targetPlayerName && assigned === characterName) {
          next[name] = "";
        }
      });

      next[targetPlayerName] = characterName;
      return next;
    });
  };

  const startRacePhase = () => {
    const nextRacePlayers = Object.fromEntries(
      players.map((player, index) => {
        const character = getCharacterByName(assignments[player]);

        return [
          player,
          {
            name: player,
            draftOrder: index + 1,
            characterId: character?.id ?? null,
            position: 0,
            hand: createDefaultHand(character?.id ?? null),
            discard: [],
            finishedRank: null,
            quickForwardUsed: 0,
          } satisfies RacePlayerState,
        ];
      })
    );

    setRacePlayers(nextRacePlayers);
    setCurrentTurnIndex(0);
    setPendingEffects([]);
    setSilencedPlayerName(null);
    setLastAbilityTargetByPlayer({});
    setPendingAbility(null);
    setPendingAbilityTarget("");
    setAbilityModalOpen(false);
    setPhase(3);
  };

  const startRandomAssign = () => {
    const shuffled = [...sortedCharacters]
      .sort(() => Math.random() - 0.5)
      .slice(0, players.length);

    const nextAssignments = Object.fromEntries(
      players.map((player, index) => [player, shuffled[index]?.name ?? ""])
    );

    setAssignments(nextAssignments);
  };

  const resetHandForPlayer = (targetPlayerName: string) => {
    setRacePlayers((previous) => {
      const target = previous[targetPlayerName];
      if (!target) {
        return previous;
      }

      return {
        ...previous,
        [targetPlayerName]: {
          ...target,
          hand: createDefaultHand(target.characterId),
          discard: [],
          quickForwardUsed: 0,
        },
      };
    });
  };

  const movePiece = (
    targetPlayerName: string,
    delta: number,
    cause: "card" | "ability",
    sourcePlayerName?: string,
    effectInsertion: "append" | "after-current" = "append"
  ) => {
    let finalDelta = delta;
    let landedPosition = 0;
    let didFinish = false;
    const generatedEffects: Effect[] = [];
    let sharedPlayers: string[] = [];

    setRacePlayers((previous) => {
      const actor = previous[targetPlayerName];
      if (!actor || actor.finishedRank != null) {
        return previous;
      }

      const abilityId = getEffectiveAbilityId(targetPlayerName);
      let nextPosition = actor.position;

      if (cause === "card" && abilityId === "jump" && delta !== 0) {
        const stepDirection = delta > 0 ? 1 : -1;
        let remaining = Math.abs(delta);
        let pointer = actor.position;

        while (remaining > 0) {
          pointer += stepDirection;
          const occupied = Object.values(previous).some(
            (player) => player.name !== targetPlayerName && player.position === pointer
          );
          if (occupied) {
            continue;
          }
          remaining -= 1;
        }

        nextPosition = clampPosition(pointer);
        finalDelta = nextPosition - actor.position;
      } else {
        nextPosition = clampPosition(actor.position + delta);
      }

      const next = {
        ...previous,
        [targetPlayerName]: {
          ...actor,
          position: nextPosition,
        },
      };
      landedPosition = nextPosition;
      sharedPlayers = Object.values(next)
        .filter(
          (player) =>
            player.name !== targetPlayerName &&
            player.finishedRank == null &&
            player.position === nextPosition
        )
        .sort((left, right) => getCharacterPriority(left.name) - getCharacterPriority(right.name))
        .map((player) => player.name);

      if (nextPosition >= 30 && actor.finishedRank == null) {
        const finishRank =
          Object.values(previous).filter((player) => player.finishedRank != null).length + 1;
        next[targetPlayerName] = {
          ...next[targetPlayerName],
          position: 30,
          finishedRank: finishRank,
        };
        didFinish = true;
      }

      return next;
    });

    const effectiveAbilityId = getEffectiveAbilityId(targetPlayerName);
    if (finalDelta < 0 && effectiveAbilityId === "reset") {
      generatedEffects.push({ type: "reset", source: targetPlayerName });
    }

    if (cause === "ability" && effectiveAbilityId === "delete") {
      generatedEffects.push({ type: "delete", source: targetPlayerName });
    }

    if (cause === "ability" && effectiveAbilityId === "mirror") {
      generatedEffects.push({ type: "mirror", source: targetPlayerName, delta: finalDelta });
    }

    if (didFinish) {
      if (generatedEffects.length > 0) {
        setPendingEffects((previous) =>
          effectInsertion === "after-current"
            ? [previous[0], ...generatedEffects, ...previous.slice(1)]
            : [...previous, ...generatedEffects]
        );
      }
      return;
    }

    if (landedPosition > 0) {
      if (effectiveAbilityId === "push" && sharedPlayers.length > 0) {
        sharedPlayers.forEach((sharedPlayerName) => {
          movePiece(sharedPlayerName, 1, "ability", targetPlayerName, effectInsertion);
        });
      }

      sharedPlayers.forEach((sharedPlayerName) => {
        if (getEffectiveAbilityId(sharedPlayerName) !== "push") {
          return;
        }

        movePiece(targetPlayerName, 1, "ability", sharedPlayerName, effectInsertion);
      });
    }

    if (generatedEffects.length > 0) {
      setPendingEffects((previous) =>
        effectInsertion === "after-current"
          ? [previous[0], ...generatedEffects, ...previous.slice(1)]
          : [...previous, ...generatedEffects]
      );
    }
  };

  const consumeCard = (targetPlayerName: string, card: number) => {
    setRacePlayers((previous) => {
      const target = previous[targetPlayerName];
      if (!target) {
        return previous;
      }

      return {
        ...previous,
        [targetPlayerName]: {
          ...target,
          hand: target.hand.filter((value, index) => {
            const targetIndex = target.hand.indexOf(card);
            return index !== targetIndex;
          }),
          discard: [...target.discard, card],
        },
      };
    });
  };

  const advanceTurn = () => {
    if (turnOrder.length === 0) {
      return;
    }

    setCurrentTurnIndex((previous) => {
      let nextIndex = previous;
      for (let count = 0; count < turnOrder.length; count += 1) {
        nextIndex = (nextIndex + 1) % turnOrder.length;
        const player = racePlayers[turnOrder[nextIndex]];
        if (player && player.finishedRank == null) {
          return nextIndex;
        }
      }
      return previous;
    });
  };

  const completeTurnAfterMove = ({
    playerName: targetPlayerName,
    isLastCard,
  }: {
    playerName: string;
    isLastCard: boolean;
  }) => {
    if (isLastCard) {
      resetHandForPlayer(targetPlayerName);
    }

    setSelectedCardByPlayer((previous) => ({
      ...previous,
      [targetPlayerName]: "",
    }));
    advanceTurn();
  };

  const finishCardMove = ({
    playerName: targetPlayerName,
    delta,
    targetName,
    isLastCard,
  }: {
    playerName: string;
    delta: number;
    targetName: string;
    isLastCard: boolean;
  }) => {
    const actor = racePlayers[targetPlayerName];
    const abilityId = getEffectiveAbilityId(targetPlayerName);

    if (!actor) {
      return;
    }

    const actorNextPosition = calculateNextPosition({
      playerName: targetPlayerName,
      delta,
      cause: "card",
      playersState: racePlayers,
    });

    if (abilityId === "with" && isLastCard && targetName) {
      const target = racePlayers[targetName];
      if (target && target.finishedRank == null) {
        rememberTarget(targetPlayerName, targetName);

        const sourceFinishDistance = 30 - actor.position;
        const targetFinishDistance = 30 - target.position;
        const sourceCrosses = actor.position + delta >= 30;
        const targetCrosses = target.position + delta >= 30;

        if (sourceCrosses && targetCrosses) {
          const sourcePriority = getCharacterPriority(targetPlayerName);
          const targetPriority = getCharacterPriority(targetName);
          const sourceFirst =
            sourceFinishDistance < targetFinishDistance ||
            (sourceFinishDistance === targetFinishDistance &&
              sourcePriority < targetPriority);

          if (sourceFirst) {
            movePiece(targetPlayerName, delta, "card");
            movePiece(targetName, delta, "ability", targetPlayerName);
          } else {
            movePiece(targetName, delta, "ability", targetPlayerName);
            movePiece(targetPlayerName, delta, "card");
          }
        } else {
          movePiece(targetPlayerName, delta, "card");
          movePiece(targetName, delta, "ability", targetPlayerName);
        }
      } else {
        movePiece(targetPlayerName, delta, "card");
      }
    } else {
      movePiece(targetPlayerName, delta, "card");
    }

    if (abilityId === "union" && actorNextPosition > 0) {
      const unionTargets = Object.values(racePlayers)
        .filter(
          (player) =>
            player.name !== targetPlayerName &&
            player.finishedRank == null &&
            player.position === actorNextPosition + 1
        )
        .sort((left, right) => getCharacterPriority(left.name) - getCharacterPriority(right.name))
        .map((player) => player.name);

      if (unionTargets.length > 0) {
        setPendingAbility({
          type: "union",
          source: targetPlayerName,
          isLastCard,
          targets: unionTargets,
        });
        setAbilityModalOpen(true);
        return;
      }
    }

    completeTurnAfterMove({ playerName: targetPlayerName, isLastCard });
  };

  const queueCardMove = ({
    playerName: targetPlayerName,
    delta,
    targetName,
    isLastCard,
    triggeringCard,
  }: {
    playerName: string;
    delta: number;
    targetName: string;
    isLastCard: boolean;
    triggeringCard: number;
  }) => {
    if (triggeringCard === 1) {
      const oneEffects = Object.values(racePlayers)
        .filter(
          (player) =>
            player.name !== targetPlayerName &&
            player.finishedRank == null &&
            getEffectiveAbilityId(player.name) === "one"
        )
        .sort((left, right) => getCharacterPriority(left.name) - getCharacterPriority(right.name))
        .map((player) => ({ type: "one" as const, source: player.name }));

      if (oneEffects.length > 0) {
        setPendingEffects((previous) => [
          ...previous,
          ...oneEffects,
          {
            type: "delayedMove",
            source: targetPlayerName,
            delta,
            target: targetName,
            isLastCard,
          },
        ]);
        return;
      }
    }

    finishCardMove({
      playerName: targetPlayerName,
      delta,
      targetName,
      isLastCard,
    });
  };

  const submitTurn = () => {
    if (!currentPlayerName || !currentPlayer || !currentCharacter) {
      return;
    }

    const selectedCard = selectedCardByPlayer[currentPlayerName];
    const effectiveAbilityId = getEffectiveAbilityId(currentPlayerName);

    if (selectedCard === "" || selectedCard == null) {
      return;
    }

    const isLastCard = currentPlayer.hand.length === 1;

    consumeCard(currentPlayerName, selectedCard);

    setRacePlayers((previous) => {
      const target = previous[currentPlayerName];
      if (!target) {
        return previous;
      }

      return {
        ...previous,
        [currentPlayerName]: {
          ...target,
          quickForwardUsed:
            currentCharacter.id === "quick"
              ? target.quickForwardUsed + 1
              : target.quickForwardUsed,
        },
      };
    });

    const movementMultiplier = effectiveAbilityId === "quick" ? 2 : 1;
    const delta = selectedCard * movementMultiplier;

    if (effectiveAbilityId === "gravity" && getEligibleTargets(currentPlayerName).length > 0) {
      setPendingAbility({
        type: "gravity",
        source: currentPlayerName,
        card: selectedCard,
        delta,
        isLastCard,
      });
      setPendingAbilityTarget("");
      setAbilityModalOpen(true);
      setSubmitModalOpen(false);
      return;
    }

    if (effectiveAbilityId === "silence" && getEligibleTargets(currentPlayerName).length > 0) {
      setPendingAbility({
        type: "silence",
        source: currentPlayerName,
        card: selectedCard,
        delta,
        isLastCard,
      });
      setPendingAbilityTarget("");
      setAbilityModalOpen(true);
      setSubmitModalOpen(false);
      return;
    }

    if (
      effectiveAbilityId === "with" &&
      isLastCard &&
      getEligibleTargets(currentPlayerName).length > 0
    ) {
      setPendingAbility({
        type: "with",
        source: currentPlayerName,
        card: selectedCard,
        delta,
        isLastCard,
      });
      setPendingAbilityTarget("");
      setAbilityModalOpen(true);
      setSubmitModalOpen(false);
      return;
    }

    queueCardMove({
      playerName: currentPlayerName,
      delta,
      targetName: "",
      isLastCard,
      triggeringCard: selectedCard,
    });
  };

  const resolvePendingAbility = (useAbility: boolean) => {
    if (!pendingAbility) {
      return;
    }

    const sourcePlayer = racePlayers[pendingAbility.source];
    if (!sourcePlayer) {
      setPendingAbility(null);
      setPendingAbilityTarget("");
      setAbilityModalOpen(false);
      return;
    }

    const targetName = pendingAbilityTarget;
    const target = targetName ? racePlayers[targetName] : null;

    if (useAbility && pendingAbility.type !== "union") {
      if (
        !targetName ||
        !target ||
        target.finishedRank != null ||
        lastAbilityTargetByPlayer[pendingAbility.source] === targetName
      ) {
        return;
      }

      rememberTarget(pendingAbility.source, targetName);
    }

    if (pendingAbility.type === "gravity") {
      if (useAbility && target) {
        const delta = target.position > sourcePlayer.position ? -1 : 1;
        movePiece(targetName, delta, "ability", "gravity-skill");

        if (pendingAbility.isLastCard) {
          resetHandForPlayer(pendingAbility.source);
        }

        setSelectedCardByPlayer((previous) => ({
          ...previous,
          [pendingAbility.source]: "",
        }));
        advanceTurn();
      } else {
        queueCardMove({
          playerName: pendingAbility.source,
          delta: pendingAbility.delta,
          targetName: "",
          isLastCard: pendingAbility.isLastCard,
          triggeringCard: pendingAbility.card,
        });
      }
    }

    if (pendingAbility.type === "silence") {
      if (useAbility && targetName) {
        setSilencedPlayerName(targetName);
      }

      queueCardMove({
        playerName: pendingAbility.source,
        delta: pendingAbility.delta,
        targetName: "",
        isLastCard: pendingAbility.isLastCard,
        triggeringCard: pendingAbility.card,
      });
    }

    if (pendingAbility.type === "with") {
      queueCardMove({
        playerName: pendingAbility.source,
        delta: pendingAbility.delta,
        targetName: useAbility ? targetName : "",
        isLastCard: pendingAbility.isLastCard,
        triggeringCard: pendingAbility.card,
      });
    }

    if (pendingAbility.type === "union") {
      if (useAbility && pendingAbility.targets.length > 0) {
        const unionMoves = pendingAbility.targets.map((targetPlayerName) => ({
          type: "abilityMove" as const,
          source: pendingAbility.source,
          target: targetPlayerName,
          delta: -1,
        }));

        setPendingEffects((previous) => [...unionMoves, ...previous]);
      }

      completeTurnAfterMove({
        playerName: pendingAbility.source,
        isLastCard: pendingAbility.isLastCard,
      });
    }

    setPendingAbility(null);
    setPendingAbilityTarget("");
    setAbilityModalOpen(false);
  };

  const canManualReset =
    currentPlayer &&
    getEffectiveAbilityId(currentPlayer.name) === "jump" &&
    currentPlayer.hand.length === 2;

  const resolveEffect = () => {
    if (!pendingEffect) {
      return;
    }

    if (pendingEffect.type === "reset") {
      if (
        !effectTarget ||
        lastAbilityTargetByPlayer[pendingEffect.source] === effectTarget
      ) {
        return;
      }
      rememberTarget(pendingEffect.source, effectTarget);
      resetHandForPlayer(effectTarget);
    }

    if (pendingEffect.type === "delete") {
      if (
        !effectTarget ||
        effectKeepCard === "" ||
        lastAbilityTargetByPlayer[pendingEffect.source] === effectTarget
      ) {
        return;
      }
      rememberTarget(pendingEffect.source, effectTarget);
      setRacePlayers((previous) => {
        const target = previous[effectTarget];
        if (!target) {
          return previous;
        }
        return {
          ...previous,
          [effectTarget]: {
            ...target,
            hand: [effectKeepCard],
          },
        };
      });
    }

    if (pendingEffect.type === "mirror") {
      if (
        !effectTarget ||
        lastAbilityTargetByPlayer[pendingEffect.source] === effectTarget
      ) {
        return;
      }
      rememberTarget(pendingEffect.source, effectTarget);
      movePiece(effectTarget, -pendingEffect.delta, "ability", pendingEffect.source);
    }

    if (pendingEffect.type === "one") {
      movePiece(pendingEffect.source, effectDirection, "ability", pendingEffect.source);
    }

    if (pendingEffect.type === "abilityMove") {
      movePiece(
        pendingEffect.target,
        pendingEffect.delta,
        "ability",
        pendingEffect.source,
        "after-current"
      );
    }

    if (pendingEffect.type === "delayedMove") {
      finishCardMove({
        playerName: pendingEffect.source,
        delta: pendingEffect.delta,
        targetName: pendingEffect.target,
        isLastCard: pendingEffect.isLastCard,
      });
    }

    setPendingEffects((previous) => previous.slice(1));
    setEffectTarget("");
    setEffectKeepCard("");
    setEffectDirection(1);
  };

  const resultPlayers = useMemo(() => {
    if (Object.values(racePlayers).length === 0) {
      return [];
    }
    return Object.values(racePlayers).sort(
      (left, right) => (left.finishedRank ?? 999) - (right.finishedRank ?? 999)
    );
  }, [racePlayers]);

  useEffect(() => {
    if (phase !== 3) {
      setSubmitModalOpen(false);
      return;
    }

    if (
      pendingEffect ||
      pendingAbility ||
      !currentPlayer ||
      resultPlayers.length === players.length
    ) {
      setSubmitModalOpen(false);
      return;
    }

    setSubmitModalOpen(true);
  }, [currentPlayerName, pendingEffect, pendingAbility, phase, players.length, resultPlayers.length, currentPlayer]);

  useEffect(() => {
    if (pendingEffect?.type !== "abilityMove") {
      return;
    }

    resolveEffect();
  }, [pendingEffect]);

  return {
    phase,
    setPhase,
    playerName,
    setPlayerName,
    players,
    assignments,
    openedAbilityByPlayer,
    setOpenedAbilityByPlayer,
    racePlayers,
    silencedPlayerName,
    currentPlayer,
    currentCharacter,
    pendingEffect,
    effectTarget,
    setEffectTarget,
    effectKeepCard,
    setEffectKeepCard,
    effectDirection,
    setEffectDirection,
    lastAbilityTargetByPlayer,
    resultPlayers,
    turnOrder,
    submitModalOpen,
    setSubmitModalOpen,
    selectedCardByPlayer,
    setSelectedCardByPlayer,
    pendingAbility,
    abilityModalOpen,
    setAbilityModalOpen,
    pendingAbilityTarget,
    setPendingAbilityTarget,
    showPieceNames,
    setShowPieceNames,
    canManualReset: Boolean(canManualReset),
    handleSubmit,
    removePlayer,
    startCharacterPhase,
    assignCharacter,
    startRacePhase,
    startRandomAssign,
    resetHandForPlayer,
    submitTurn,
    resolvePendingAbility,
    getEligibleTargets,
    resolveEffect,
    sortedCharacters,
    characters: MIDDLE_RACE_CHARACTERS,
  };
}
