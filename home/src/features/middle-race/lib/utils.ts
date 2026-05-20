import { MIDDLE_RACE_CHARACTERS } from "@/features/middle-race/fixtures/characters";
import { RacePlayerState } from "@/features/middle-race/types";

export const sortedCharacters = [...MIDDLE_RACE_CHARACTERS].sort(
  (left, right) => left.priority - right.priority
);

export const getCharacterById = (id: string | null) =>
  sortedCharacters.find((character) => character.id === id) ?? null;

export const getCharacterByName = (name: string | null) =>
  sortedCharacters.find((character) => character.name === name) ?? null;

export const createDefaultHand = (characterId: string | null) =>
  characterId === "jump" ? [0, 1, 2, 3, 4] : [1, 2, 3, 4];

export const clampPosition = (value: number) => Math.max(0, Math.min(30, value));

export const getPlayerTargetMeta = (
  racePlayers: Record<string, RacePlayerState>,
  playerName: string
) => {
  const characterId = racePlayers[playerName]?.characterId ?? null;
  const character = getCharacterById(characterId);

  return {
    name: playerName,
    characterLabel: character?.label ?? character?.name ?? "",
  };
};

export const calculateNextPosition = ({
  playerName,
  delta,
  cause,
  playersState,
}: {
  playerName: string;
  delta: number;
  cause: "card" | "ability";
  playersState: Record<string, RacePlayerState>;
}) => {
  const actor = playersState[playerName];
  if (!actor) {
    return 0;
  }

  if (cause === "card" && actor.characterId === "jump" && delta !== 0) {
    const stepDirection = delta > 0 ? 1 : -1;
    let remaining = Math.abs(delta);
    let pointer = actor.position;

    while (remaining > 0) {
      pointer += stepDirection;
      const occupied = Object.values(playersState).some(
        (player) => player.name !== playerName && player.position === pointer
      );
      if (occupied) {
        continue;
      }
      remaining -= 1;
    }

    return clampPosition(pointer);
  }

  return clampPosition(actor.position + delta);
};
