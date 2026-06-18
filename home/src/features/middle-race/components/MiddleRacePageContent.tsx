import HomeButton from "@/components/HomeButton";
import {
  getCharacterById,
  sortedCharacters,
} from "@/features/middle-race/lib/utils";
import {
  MiddleRaceGame,
  PendingAbility,
  Phase,
  RacePlayerState,
} from "@/features/middle-race/types";
import {
  AddRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  CloseRounded,
  NavigateBeforeRounded,
  NavigateNextRounded,
  RemoveRounded,
  ShuffleRounded,
  UndoRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";

const PHASES: { id: Phase; label: string }[] = [
  { id: "PLAYER_SETTING", label: "PLAYERS" },
  { id: "CHARACTER_DRAFT", label: "DRAFT" },
  { id: "RACE", label: "RACE" },
  { id: "RESULT", label: "RESULT" },
];

const feltBoardSx = {
  borderRadius: 1,
  border: "2px solid rgba(255, 255, 255, 0.9)",
  background:
    "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.22), transparent 34%), linear-gradient(135deg, #052e24 0%, #064e3b 48%, #042f2e 100%)",
  boxShadow:
    "inset 0 0 0 10px rgba(255,255,255,0.05), inset 0 0 90px rgba(0,0,0,0.46), 0 28px 80px rgba(0,0,0,0.42)",
};

const phasePanelSx = {
  borderRadius: 1,
  border: "1px solid rgba(255,255,255,0.16)",
  bgcolor: "rgba(15,23,42,0.78)",
  boxShadow: "0 24px 70px rgba(0,0,0,0.36)",
  backdropFilter: "blur(14px)",
};

const getPlayerColor = (player: RacePlayerState) =>
  getCharacterById(player.characterId)?.color ?? "#38bdf8";

const getPlayerTooltipTitle = (player: RacePlayerState) =>
  player.name.trim() || `Player ${player.draftOrder}`;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const PlayerPiece = ({
  player,
  size,
  selected = false,
  active = false,
}: {
  player: RacePlayerState;
  size: number | string | { xs: number; md?: number };
  selected?: boolean;
  active?: boolean;
}) => {
  const character = getCharacterById(player.characterId);
  const color = getPlayerColor(player);
  const silenced = player.abilityDisabled;
  const finished = Boolean(player.finishedRank);
  const copied = Boolean(player.copiedAbilityId);

  return (
    <Tooltip title={getPlayerTooltipTitle(player)} arrow placement="top">
      <Box
        aria-label={getPlayerTooltipTitle(player)}
        sx={{
          width: size,
          aspectRatio: "1 / 1",
          height: "auto",
          position: "relative",
          borderRadius: 0,
          flexShrink: 0,
          transform: active ? "scale(1.08)" : "none",
          opacity: finished ? 0.46 : 1,
          "@keyframes middleRaceNeonBorder": {
            "0%": { opacity: 0.28, backgroundPosition: "0% 50%" },
            "50%": { opacity: 0.58 },
            "100%": { opacity: 0.28, backgroundPosition: "200% 50%" },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            aspectRatio: "1 / 1",
            bgcolor: color,
            border: selected || active ? "2px solid rgba(255,255,255,0.9)" : 0,
            borderRadius: 0,
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
            boxSizing: "border-box",
            isolation: "isolate",
            filter: silenced ? "grayscale(0.82) saturate(0.35)" : "none",
            boxShadow: active
              ? `0 0 0 2px ${color}99, 0 0 16px ${color}66`
              : selected
              ? `0 0 14px ${color}99`
              : "none",
            "&::after": active
              ? {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  border: "3px solid transparent",
                  background: `linear-gradient(90deg, transparent 0%, ${color} 38%, transparent 76%) border-box`,
                  backgroundSize: "260% 100%",
                  WebkitMask:
                    "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                  animation: "middleRaceNeonBorder 3.6s ease-in-out infinite",
                  zIndex: 2,
                }
              : undefined,
          }}
        >
          {character?.imageSrc && (
            <Box
              component="img"
              src={character.imageSrc}
              alt={player.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          )}
          {silenced && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: active
                  ? "rgba(148,163,184,0.22)"
                  : "rgba(148,163,184,0.32)",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />
          )}
          {copied && !silenced && (
            <Box
              sx={{
                position: "absolute",
                right: "8%",
                top: "8%",
                width: "22%",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.78)",
                boxShadow: "0 0 8px rgba(255,255,255,0.42)",
                zIndex: 3,
              }}
            />
          )}
        </Box>
      </Box>
    </Tooltip>
  );
};

const PhaseDots = ({ phase }: { phase: Phase }) => (
  <Stack direction="row" spacing={0.75}>
    {PHASES.map((item) => (
      <Box
        key={item.id}
        sx={{
          width: item.id === phase ? 36 : 9,
          height: 9,
          borderRadius: 999,
          bgcolor: item.id === phase ? "#5eead4" : "rgba(255,255,255,0.22)",
          transition: "180ms ease",
        }}
      />
    ))}
  </Stack>
);

const PlayerSettingFrame = ({ game }: { game: MiddleRaceGame }) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: 980,
      mx: "auto",
      ...phasePanelSx,
      p: { xs: 1.5, md: 2 },
    }}
  >
    <Box
      sx={{
        ...feltBoardSx,
        p: { xs: 1.25, md: 2 },
      }}
    >
      <Stack direction="row" justifyContent="flex-end" spacing={0.75} mb={1}>
        <IconButton
          aria-label="remove player"
          onClick={game.removeLastPlayer}
          disabled={!game.canRemovePlayer}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            color: "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.18)",
            bgcolor: "rgba(2,6,23,0.46)",
            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.22)",
              borderColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <RemoveRounded />
        </IconButton>
        <IconButton
          aria-label="add player"
          onClick={game.addPlayer}
          disabled={!game.canAddPlayer}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            color: "#052e24",
            border: "1px solid rgba(94,234,212,0.58)",
            bgcolor: "#5eead4",
            "&:hover": { bgcolor: "#2dd4bf" },
            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.22)",
              bgcolor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <AddRounded />
        </IconButton>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: { xs: 1, md: 1.25 },
        }}
      >
      {game.players.map((player) => (
        <Box
          key={player.draftOrder}
          sx={{
            minHeight: { xs: 88, md: 108 },
            borderRadius: 1,
            border: "2px solid rgba(255,255,255,0.72)",
            bgcolor: "rgba(3, 22, 17, 0.42)",
            display: "grid",
            gridTemplateColumns: "44px minmax(0, 1fr)",
            alignItems: "center",
            gap: 1.25,
            px: { xs: 1.25, md: 1.75 },
            boxSizing: "border-box",
          }}
        >
          <Typography
            fontSize={{ xs: 24, md: 34 }}
            fontWeight={900}
            color="#5eead4"
            textAlign="center"
          >
            {player.draftOrder}
          </Typography>
          <TextField
            value={player.name}
            onChange={(event) => {
              game.updatePlayerName(player.draftOrder, event.target.value);
            }}
            fullWidth
            inputProps={{ "aria-label": `player-${player.draftOrder}` }}
            sx={{
              minWidth: 0,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                bgcolor: "rgba(2, 6, 23, 0.72)",
                color: "#f8fafc",
                fontSize: { xs: 20, md: 26 },
                fontWeight: 900,
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.16)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.42)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5eead4",
                },
              },
              "& input": {
                py: { xs: 1, md: 1.25 },
              },
            }}
          />
        </Box>
      ))}
      </Box>
    </Box>
  </Box>
);

const CharacterDraftFrame = ({ game }: { game: MiddleRaceGame }) => {
  const draftPlayers = [...game.players].sort(
    (left, right) => left.draftOrder - right.draftOrder
  );
  const selectedDraftPlayer =
    draftPlayers.find((player) => player.name === game.selectedPlayerName) ??
    draftPlayers.find((player) => !player.characterId) ??
    draftPlayers[0];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "300px minmax(0, 1fr)" },
        gap: { xs: 1.25, md: 2 },
        width: "100%",
        minWidth: 0,
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          ...phasePanelSx,
          p: 1.25,
          minWidth: 0,
          maxHeight: { xs: "none", lg: "calc(100dvh - 180px)" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography fontSize={16} fontWeight={900} color="#f8fafc" noWrap>
            {selectedDraftPlayer?.name ?? "선택"}
          </Typography>
          <IconButton
            aria-label="randomize characters"
            onClick={game.randomizeCharacters}
            sx={{
              width: 40,
              height: 40,
              color: "#5eead4",
              border: "1px solid rgba(94,234,212,0.36)",
              bgcolor: "rgba(94,234,212,0.08)",
            }}
          >
            <ShuffleRounded />
          </IconButton>
        </Stack>

        <Stack
          spacing={0.85}
          sx={{
            minHeight: 0,
            overflowY: { xs: "visible", lg: "auto" },
            pr: { xs: 0, lg: 0.5 },
          }}
        >
          {draftPlayers.map((player) => {
            const character = getCharacterById(player.characterId);
            const selected = player.draftOrder === selectedDraftPlayer?.draftOrder;

            return (
              <Box
                key={player.draftOrder}
                onClick={() => {
                  game.selectPlayer(player.name);
                }}
                sx={{
                  width: "100%",
                  minHeight: 68,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: selected ? "#5eead4" : "rgba(255,255,255,0.14)",
                  bgcolor: selected
                    ? "rgba(94,234,212,0.1)"
                    : "rgba(2,6,23,0.48)",
                  color: "#f8fafc",
                  cursor: "pointer",
                  p: 0.85,
                  textAlign: "left",
                  boxSizing: "border-box",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} minWidth={0}>
                  <Typography
                    width={24}
                    flexShrink={0}
                    fontSize={20}
                    fontWeight={900}
                    color="#5eead4"
                  >
                    {player.draftOrder}
                  </Typography>
                  <PlayerPiece player={player} size={42} selected={selected} />
                  <Box minWidth={0} flex={1}>
                    <Typography fontSize={16} fontWeight={900} noWrap>
                      {player.name}
                    </Typography>
                    <Typography fontSize={12} color="rgba(255,255,255,0.56)" noWrap>
                      {character?.label ?? "비어 있음"}
                    </Typography>
                  </Box>
                  {player.characterId && (
                    <IconButton
                      aria-label={`clear ${player.name}`}
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        game.clearCharacter(player.draftOrder);
                      }}
                      sx={{
                        color: "rgba(255,255,255,0.72)",
                        flexShrink: 0,
                      }}
                    >
                      <CloseRounded fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Box
        sx={{
          ...phasePanelSx,
          p: { xs: 1, md: 1.25 },
          minWidth: 0,
          maxHeight: { xs: "none", lg: "calc(100dvh - 180px)" },
          overflowY: { xs: "visible", lg: "auto" },
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
            xl: "repeat(5, minmax(0, 1fr))",
          },
          gap: { xs: 0.85, md: 1 },
        }}
      >
        {sortedCharacters.map((character) => {
          const selectedPlayer = game.players.find(
            (player) => player.characterId === character.id
          );
          const assignedToSelected =
            selectedPlayer?.draftOrder === selectedDraftPlayer?.draftOrder;
          const disabled = Boolean(selectedPlayer && !assignedToSelected);

          return (
            <Box
              key={character.id}
              component="button"
              type="button"
              disabled={disabled}
              onClick={() => {
                if (selectedDraftPlayer) {
                  game.assignCharacter(selectedDraftPlayer.draftOrder, character.id);
                }
              }}
              sx={{
                appearance: "none",
                minWidth: 0,
                height: { xs: 128, md: 152 },
                borderRadius: 1,
                border: "1px solid",
                borderColor: assignedToSelected
                  ? "#5eead4"
                  : disabled
                  ? character.color
                  : "rgba(255,255,255,0.16)",
                bgcolor: assignedToSelected
                  ? "rgba(94,234,212,0.12)"
                  : disabled
                  ? `${character.color}24`
                  : "rgba(15,23,42,0.72)",
                color: "#f8fafc",
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.56 : 1,
                p: 1,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <Avatar
                src={character.imageSrc}
                alt={character.label}
                sx={{
                  width: { xs: 54, md: 66 },
                  height: { xs: 54, md: 66 },
                  bgcolor: character.color,
                  mx: "auto",
                  flexShrink: 0,
                  boxShadow: disabled ? "none" : `0 0 24px ${character.color}66`,
                }}
              />
              <Typography mt={1} fontSize={{ xs: 13, md: 15 }} fontWeight={900} noWrap>
                {character.label}
              </Typography>
              {selectedPlayer && (
                <Typography fontSize={12} color="rgba(255,255,255,0.58)" noWrap>
                  {selectedPlayer.name}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const TrackBoard = ({ game }: { game: MiddleRaceGame }) => {
  const pieceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const previousPieceRectsRef = useRef<
    Record<string, { left: number; top: number }>
  >({});
  const [pieceAnimations, setPieceAnimations] = useState<
    Record<string, { x: number; y: number; tick: number }>
  >({});

  useIsomorphicLayoutEffect(() => {
    const previousRects = previousPieceRectsRef.current;
    const nextRects: Record<string, { left: number; top: number }> = {};
    const nextAnimations: Record<string, { x: number; y: number; tick: number }> =
      {};
    const tick = Date.now();

    game.players.forEach((player) => {
      const node = pieceRefs.current[player.name];

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const previousRect = previousRects[player.name];

      nextRects[player.name] = {
        left: rect.left,
        top: rect.top,
      };

      if (!previousRect) {
        return;
      }

      const x = previousRect.left - rect.left;
      const y = previousRect.top - rect.top;

      if (Math.abs(x) > 0.5 || Math.abs(y) > 0.5) {
        nextAnimations[player.name] = { x, y, tick };
      }
    });

    previousPieceRectsRef.current = nextRects;

    if (Object.keys(nextAnimations).length === 0) {
      return;
    }

    setPieceAnimations(nextAnimations);

    const timeoutId = window.setTimeout(() => {
      setPieceAnimations({});
    }, 620);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [game.players]);

  return (
    <Box
      sx={{
        ...feltBoardSx,
        p: { xs: 1, md: 1.25 },
        width: "100%",
        minWidth: 0,
        overflowX: "hidden",
        overflowY: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(30, minmax(0, 1fr))",
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          borderTop: "2px solid rgba(255,255,255,0.82)",
          borderLeft: "2px solid rgba(255,255,255,0.82)",
          "@keyframes middleRacePieceFlip": {
            "0%": {
              transform:
                "translate3d(var(--move-from-x), var(--move-from-y), 0) scale(1.04)",
            },
            "76%": {
              transform: "translate3d(0, 0, 0) scale(1.015)",
            },
            "100%": {
              transform: "translate3d(0, 0, 0) scale(1)",
            },
          },
        }}
      >
        {Array.from({ length: game.finishLine }, (_, index) => {
          const position = index + 1;
          const playersAtPosition = game.players.filter(
            (player) => player.position === position
          );
          const isFinish = position === game.finishLine;

          return (
            <Box
              key={position}
              sx={{
                height: { xs: 460, md: 660, xl: 740 },
                borderRight: "2px solid rgba(255,255,255,0.82)",
                borderBottom: "2px solid rgba(255,255,255,0.82)",
                bgcolor: isFinish ? "rgba(94, 234, 212, 0.14)" : "transparent",
                px: { xs: 0.12, md: 0.18 },
                py: 0.45,
                minWidth: 0,
                overflow: "visible",
                position: "relative",
              }}
            >
              <Typography
                fontSize={{ xs: 9, md: 10 }}
                fontWeight={900}
                color={isFinish ? "#99f6e4" : "rgba(255,255,255,0.74)"}
                noWrap
              >
                {isFinish ? "FINISH" : position}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 0.75, md: 1.05 },
                  mt: 0.45,
                  height: "calc(100% - 18px)",
                  overflow: "visible",
                }}
              >
                {playersAtPosition.map((player) => {
                  const pieceAnimation = pieceAnimations[player.name];

                  return (
                    <Box
                      key={player.name}
                      ref={(node: HTMLDivElement | null) => {
                        pieceRefs.current[player.name] = node;
                      }}
                      sx={{
                        "--move-from-x": `${pieceAnimation?.x ?? 0}px`,
                        "--move-from-y": `${pieceAnimation?.y ?? 0}px`,
                        width: "118%",
                        aspectRatio: "1 / 1",
                        borderRadius: 0,
                        position: "relative",
                        zIndex: pieceAnimation ? 8 : 2,
                        flexShrink: 0,
                        animation: pieceAnimation
                          ? "middleRacePieceFlip 560ms cubic-bezier(0.16, 0.84, 0.26, 1)"
                          : "none",
                        willChange: pieceAnimation ? "transform" : "auto",
                      }}
                    >
                      <PlayerPiece
                        player={player}
                        size="100%"
                        active={player.name === game.currentPlayerName}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const CardFace = ({
  card,
  compact = false,
}: {
  card: number;
  compact?: boolean;
}) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
    }}
  >
    <Typography
      fontSize={compact ? { xs: 44, md: 50 } : { xs: 58, md: 72 }}
      fontWeight={900}
      color="#111111"
      lineHeight={1}
    >
      {card}
    </Typography>
  </Box>
);

const TargetHandPreview = ({ player }: { player: RacePlayerState }) => (
  <Box
    sx={{
      position: "absolute",
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 20,
      borderRadius: 1,
      border: "1px solid rgba(94,234,212,0.32)",
      bgcolor: "rgba(8,13,24,0.98)",
      boxShadow: "0 16px 42px rgba(0,0,0,0.48)",
      p: 0.55,
      pointerEvents: "none",
      minWidth: 118,
    }}
  >
    <Stack direction="row" spacing={0.35}>
      {player.hand.length === 0 ? (
        <Typography fontSize={11} fontWeight={900} color="rgba(248,250,252,0.54)">
          EMPTY
        </Typography>
      ) : (
        player.hand.map((card, index) => (
          <Box
            key={`${player.name}-hover-card-${card}-${index}`}
            sx={{
              position: "relative",
              width: 28,
              height: 38,
              borderRadius: 0.8,
              border: "1px solid rgba(255,255,255,0.72)",
              bgcolor: "#ffffff",
              color: "#111111",
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography
              fontSize={20}
              fontWeight={900}
              color="#111111"
              lineHeight={1}
            >
              {card}
            </Typography>
          </Box>
        ))
      )}
    </Stack>
  </Box>
);

const MoveCard = ({
  card,
  onPointerDown,
}: {
  card: number;
  onPointerDown: (card: number, event: PointerEvent<HTMLButtonElement>) => void;
}) => (
  <Box
    component="button"
    type="button"
    onPointerDown={(event) => {
      onPointerDown(card, event);
    }}
    sx={{
      appearance: "none",
      width: { xs: 58, md: 68 },
      height: { xs: 84, md: 98 },
      borderRadius: 1,
      border: "1px solid rgba(255,255,255,0.34)",
      bgcolor: "#ffffff",
      color: "#111111",
      cursor: "grab",
      boxShadow: "0 12px 24px rgba(0,0,0,0.32)",
      transform: "translateY(0)",
      transition: "transform 180ms ease, box-shadow 180ms ease",
      position: "relative",
      touchAction: "none",
      "&:hover": {
        transform: "translateY(-16px) rotate(-1deg)",
      },
    }}
  >
    <CardFace card={card} />
  </Box>
);

const PendingAbilityFlow = ({
  source,
  icon,
  targets,
}: {
  source: string;
  icon: ReactNode;
  targets: string[];
}) => (
  <Stack direction="row" spacing={0.45} alignItems="center" minWidth={0}>
    <Typography fontSize={11} fontWeight={800} color="rgba(248,250,252,0.76)" noWrap>
      {source}
    </Typography>
    <Box
      sx={{
        width: 16,
        height: 16,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        color: "#5eead4",
      }}
    >
      {icon}
    </Box>
    <Typography fontSize={11} fontWeight={800} color="rgba(248,250,252,0.76)" noWrap>
      {targets.join(", ")}
    </Typography>
  </Stack>
);

const PendingAbilityMeta = ({ ability }: { ability: PendingAbility }) => {
  if (ability.type === "one") {
    return (
      <PendingAbilityFlow
        source={ability.source}
        icon={<ArrowBackRounded sx={{ fontSize: 15 }} />}
        targets={[ability.trigger]}
      />
    );
  }

  if (ability.type === "push") {
    return (
      <PendingAbilityFlow
        source={ability.source}
        icon={<ArrowForwardRounded sx={{ fontSize: 15 }} />}
        targets={[ability.target]}
      />
    );
  }

  if (ability.type === "union") {
    return (
      <PendingAbilityFlow
        source={ability.source}
        icon={<ArrowBackRounded sx={{ fontSize: 15 }} />}
        targets={ability.targets}
      />
    );
  }

  return (
    <Typography fontSize={11} fontWeight={800} color="rgba(248,250,252,0.76)" noWrap>
      {ability.source}
    </Typography>
  );
};

const getPendingAbilityKey = (ability: PendingAbility, index: number) =>
  `${ability.type}-${ability.source}-${
    "target" in ability ? ability.target : index
  }-${index}`;

const MoveCardDock = ({ game }: { game: MiddleRaceGame }) => {
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [placementKey, setPlacementKey] = useState(0);
  const [abilityAnchorEl, setAbilityAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [abilityCard, setAbilityCard] = useState<number | null>(null);
  const [abilityTargetName, setAbilityTargetName] = useState("");
  const [deleteTargetName, setDeleteTargetName] = useState("");
  const [deleteCardToKeep, setDeleteCardToKeep] = useState<number | null>(null);
  const [resetTargetName, setResetTargetName] = useState("");
  const [offerTargetName, setOfferTargetName] = useState("");
  const [offerCard, setOfferCard] = useState<number | null>(null);
  const [mirrorTargetName, setMirrorTargetName] = useState("");
  const [copyTargetName, setCopyTargetName] = useState("");
  const [hoveredTargetName, setHoveredTargetName] = useState<string | null>(null);
  const [dragState, setDragState] = useState<{
    card: number;
    pointerX: number;
    pointerY: number;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  } | null>(null);
  const currentPlayer =
    game.players.find((player) => player.name === game.currentPlayerName) ??
    game.players[0];
  const currentCharacter = getCharacterById(currentPlayer?.characterId ?? null);
  const activePendingAbility = game.activePendingAbility;
  const hoveredTargetPlayer =
    game.players.find((player) => player.name === hoveredTargetName) ?? null;
  const deleteTargetPlayers =
    activePendingAbility?.type === "delete" && currentPlayer
      ? game.players.filter(
          (player) =>
            player.name !== currentPlayer.name &&
            !player.finishedRank &&
            currentPlayer.lastAbilityTargetName !== player.name
        )
      : [];
  const selectedDeleteTarget =
    deleteTargetPlayers.find((player) => player.name === deleteTargetName) ??
    null;
  const resetSourcePlayer =
    activePendingAbility?.type === "reset"
      ? game.players.find((player) => player.name === activePendingAbility.source) ??
        null
      : null;
  const resetTargetPlayers =
    activePendingAbility?.type === "reset" && resetSourcePlayer
      ? game.players.filter(
          (player) =>
            player.name !== resetSourcePlayer.name &&
            !player.finishedRank &&
            resetSourcePlayer.lastAbilityTargetName !== player.name
        )
      : [];
  const selectedResetTarget =
    resetTargetPlayers.find((player) => player.name === resetTargetName) ?? null;
  const offerSourcePlayer =
    activePendingAbility?.type === "offer"
      ? game.players.find((player) => player.name === activePendingAbility.source) ??
        null
      : null;
  const offerTargetPlayers =
    activePendingAbility?.type === "offer" && offerSourcePlayer
      ? game.players.filter(
          (player) =>
            player.name !== offerSourcePlayer.name &&
            !player.finishedRank &&
            offerSourcePlayer.lastAbilityTargetName !== player.name
        )
      : [];
  const selectedOfferTarget =
    offerTargetPlayers.find((player) => player.name === offerTargetName) ?? null;
  const mirrorSourcePlayer =
    activePendingAbility?.type === "mirror"
      ? game.players.find((player) => player.name === activePendingAbility.source) ??
        null
      : null;
  const mirrorTargetPlayers =
    activePendingAbility?.type === "mirror" && mirrorSourcePlayer
      ? game.players.filter(
          (player) =>
            player.name !== mirrorSourcePlayer.name &&
            !player.finishedRank &&
            mirrorSourcePlayer.lastAbilityTargetName !== player.name
        )
      : [];
  const selectedMirrorTarget =
    mirrorTargetPlayers.find((player) => player.name === mirrorTargetName) ?? null;
  const copySourcePlayer =
    activePendingAbility?.type === "copy"
      ? game.players.find((player) => player.name === activePendingAbility.source) ??
        null
      : null;
  const pendingUnionTargets =
    activePendingAbility?.type === "union"
      ? activePendingAbility.targets
          .map((playerName) =>
            game.players.find((player) => player.name === playerName)
          )
          .filter((player): player is RacePlayerState => Boolean(player))
      : [];
  const pendingUnionSource =
    activePendingAbility?.type === "union"
      ? game.players.find((player) => player.name === activePendingAbility.source) ??
        null
      : null;
  const canPullPendingUnionTargets = Boolean(
    pendingUnionTargets.length > 0 &&
      pendingUnionSource &&
      !pendingUnionSource.finishedRank &&
      pendingUnionSource.position > 1 &&
      pendingUnionTargets.every(
        (player) =>
          !player.finishedRank &&
          player.position === pendingUnionSource.position + 1
      )
  );
  const pendingMoveTarget =
    activePendingAbility?.type === "one"
      ? game.players.find((player) => player.name === activePendingAbility.source) ??
        null
      : activePendingAbility?.type === "push"
      ? game.players.find((player) => player.name === activePendingAbility.target) ??
        null
      : null;
  const canResolvePendingForward = Boolean(
    pendingMoveTarget && pendingMoveTarget.position < game.finishLine
  );
  const canResolvePendingBackward = Boolean(
    pendingMoveTarget && pendingMoveTarget.position > 1
  );
  const canResolveDelete =
    activePendingAbility?.type === "delete" &&
    selectedDeleteTarget &&
    deleteCardToKeep !== null &&
    selectedDeleteTarget.hand.includes(deleteCardToKeep);
  const canResolveReset =
    activePendingAbility?.type === "reset" && Boolean(selectedResetTarget);
  const canResolveOffer = Boolean(
    activePendingAbility?.type === "offer" &&
      offerSourcePlayer &&
      selectedOfferTarget &&
      offerCard !== null &&
      offerSourcePlayer.hand.includes(offerCard)
  );
  const canResolveMirror = Boolean(
    activePendingAbility?.type === "mirror" &&
      mirrorSourcePlayer &&
      selectedMirrorTarget
  );
  const abilityTargetPlayers = game.currentAbilityTargetNames
    .map((playerName) => game.players.find((player) => player.name === playerName))
    .filter((player): player is RacePlayerState => Boolean(player));
  const isCopyableTarget = (player: RacePlayerState) => {
    if (player.abilityDisabled || !player.characterId) {
      return false;
    }

    if (player.characterId !== "copy") {
      return true;
    }

    return Boolean(player.copiedAbilityId && player.copiedAbilityId !== "copy");
  };
  const copyableTargetPlayers = abilityTargetPlayers.filter(isCopyableTarget);
  const pendingCopyTargetPlayers =
    activePendingAbility?.type === "copy" && copySourcePlayer
      ? game.players.filter(
          (player) =>
            player.name !== copySourcePlayer.name &&
            !player.finishedRank &&
            copySourcePlayer.lastAbilityTargetName !== player.name &&
            isCopyableTarget(player)
        )
      : [];
  const selectedCopyTarget =
    pendingCopyTargetPlayers.find((player) => player.name === copyTargetName) ??
    null;
  const canResolveCopy = Boolean(
    activePendingAbility?.type === "copy" && copySourcePlayer && selectedCopyTarget
  );
  const abilitySelectedTarget = abilityTargetPlayers.find(
    (player) => player.name === abilityTargetName
  );
  const abilityNeedsCard =
    game.currentAbilityId === "gravity" || game.currentAbilityId === "with";
  const abilityNeedsTarget =
    game.currentAbilityId === "gravity" ||
    game.currentAbilityId === "with" ||
    game.currentAbilityId === "copy" ||
    game.currentAbilityId === "silence";
  const isQuickMoveAction = game.currentAbilityId === "quick";
  const unionTargets =
    game.currentAbilityId === "union" && currentPlayer
      ? game.players.filter(
          (player) =>
            player.name !== currentPlayer.name &&
            !player.finishedRank &&
            player.position === currentPlayer.position + 1
        )
      : [];
  const canConfirmAbility =
    game.currentAbilityId === "gravity"
      ? Boolean(
          abilityCard !== null &&
            abilitySelectedTarget &&
            currentPlayer &&
            currentPlayer.position !== abilitySelectedTarget.position
        )
      : game.currentAbilityId === "with"
      ? Boolean(
          abilityCard !== null &&
            currentPlayer?.hand.length === 1 &&
            currentPlayer.hand[0] === abilityCard &&
            abilitySelectedTarget
        )
      : game.currentAbilityId === "copy"
      ? Boolean(abilitySelectedTarget && isCopyableTarget(abilitySelectedTarget))
      : abilityNeedsTarget
      ? Boolean(abilitySelectedTarget)
      : game.currentAbilityId === "union"
      ? currentPlayer?.position !== 1 && unionTargets.length > 0
      : false;
  const abilityOpenDisabledReason = !game.canUseCurrentAbility
    ? game.currentAbilityId
      ? "이번 턴에는 더 이상 능력을 사용할 수 없습니다."
      : "사용 가능한 턴 능력이 없습니다."
    : game.currentAbilityId === "gravity"
    ? currentPlayer?.hand.length === 0
      ? "버릴 이동카드가 없습니다."
      : !abilityTargetPlayers.some(
          (player) => player.position !== currentPlayer?.position
        )
      ? "당겨올 수 있는 대상이 없습니다."
      : ""
    : game.currentAbilityId === "with"
    ? currentPlayer?.hand.length !== 1
      ? "위드는 남은 이동카드가 1장일 때만 사용할 수 있습니다."
      : abilityTargetPlayers.length === 0
      ? "함께 이동할 대상이 없습니다."
      : ""
    : game.currentAbilityId === "copy"
    ? copyableTargetPlayers.length === 0
      ? "복사할 수 있는 대상이 없습니다."
      : ""
    : game.currentAbilityId === "silence"
    ? abilityTargetPlayers.length === 0
      ? "무력화할 수 있는 대상이 없습니다."
      : ""
    : game.currentAbilityId === "union"
    ? currentPlayer?.position === 1
      ? "유니온은 스타트 라인에서 발동하지 않습니다."
      : unionTargets.length === 0
      ? "바로 앞 칸에 끌어올 대상이 없습니다."
      : ""
    : "사용 가능한 턴 능력이 없습니다.";
  const canOpenAbilityPopover = !abilityOpenDisabledReason;
  const confirmDisabledReason =
    canConfirmAbility
      ? ""
      : game.currentAbilityId === "gravity"
      ? abilityCard === null
        ? "버릴 이동카드를 선택해야 합니다."
        : !abilitySelectedTarget
        ? "당겨올 대상을 선택해야 합니다."
        : currentPlayer?.position === abilitySelectedTarget.position
        ? "그래비티는 같은 칸의 대상을 당길 수 없습니다."
        : ""
      : game.currentAbilityId === "with"
      ? abilityCard === null
        ? "사용할 이동카드를 선택해야 합니다."
        : currentPlayer?.hand.length !== 1
        ? "위드는 남은 이동카드가 1장일 때만 사용할 수 있습니다."
        : currentPlayer.hand[0] !== abilityCard
        ? "남은 마지막 이동카드를 선택해야 합니다."
        : !abilitySelectedTarget
        ? "함께 이동할 대상을 선택해야 합니다."
        : ""
      : game.currentAbilityId === "union"
      ? currentPlayer?.position === 1
        ? "유니온은 스타트 라인에서 발동하지 않습니다."
        : unionTargets.length === 0
        ? "바로 앞 칸에 끌어올 대상이 없습니다."
        : ""
      : game.currentAbilityId === "copy"
      ? !abilitySelectedTarget
        ? "복사할 대상을 선택해야 합니다."
        : !isCopyableTarget(abilitySelectedTarget)
        ? "복사할 수 없는 대상입니다."
        : ""
      : abilityNeedsTarget && !abilitySelectedTarget
      ? "대상을 선택해야 합니다."
      : "현재 조건에서 사용할 수 없습니다.";
  const visibleHand =
    currentPlayer?.hand.filter(
      (card) => card !== game.selectedCard && card !== dragState?.card
    ) ?? [];

  const setMoveCard = (card: number) => {
    game.selectCard(card);
    setPlacementKey((prev) => prev + 1);
  };

  const dragPreview =
    dragState && typeof document !== "undefined"
      ? createPortal(
          <Box
            sx={{
              position: "fixed",
              left: dragState.pointerX - dragState.offsetX,
              top: dragState.pointerY - dragState.offsetY,
              width: dragState.width,
              height: dragState.height,
              borderRadius: 1,
              border: "2px solid #5eead4",
              bgcolor: "#ffffff",
              color: "#111111",
              pointerEvents: "none",
              transform: "none",
              boxShadow:
                "0 0 28px rgba(94,234,212,0.42), 0 20px 40px rgba(0,0,0,0.44)",
              zIndex: 2147483647,
            }}
          >
            <CardFace card={dragState.card} />
          </Box>,
          document.body
        )
      : null;

  useEffect(() => {
    if (!dragState) {
      return;
    }

    const checkIsOverDropZone = (x: number, y: number) => {
      const rect = dropZoneRef.current?.getBoundingClientRect();
      return Boolean(
        rect &&
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
      );
    };

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      setDragState((prev) =>
        prev
          ? { ...prev, pointerX: event.clientX, pointerY: event.clientY }
          : prev
      );
      setIsDragOver(checkIsOverDropZone(event.clientX, event.clientY));
    };

    const handlePointerUp = (event: globalThis.PointerEvent) => {
      if (checkIsOverDropZone(event.clientX, event.clientY)) {
        setMoveCard(dragState.card);
      }
      setDragState(null);
      setIsDragOver(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.65,
          alignItems: "stretch",
          width: "100%",
          ...phasePanelSx,
          boxSizing: "border-box",
          overflowY: "visible",
          overflowX: "hidden",
          px: { xs: 0.85, md: 1 },
          py: { xs: 0.85, md: 1 },
        }}
      >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          borderRadius: 1,
          border: "1px solid rgba(94,234,212,0.36)",
          bgcolor: "rgba(94,234,212,0.1)",
          px: 1,
          py: 0.65,
          minWidth: 0,
        }}
      >
        {currentPlayer && <PlayerPiece player={currentPlayer} size={44} active />}
        <Box minWidth={0}>
          <Typography fontSize={11} fontWeight={900} color="#5eead4">
            TURN
          </Typography>
          <Typography fontSize={{ xs: 16, md: 18 }} fontWeight={900} color="#f8fafc" noWrap>
            {currentPlayer?.name}
          </Typography>
        </Box>
      </Stack>

      {game.isResolvingAbility && activePendingAbility && (
        <Box
          sx={{
            borderRadius: 1,
            border: "1px solid rgba(94,234,212,0.42)",
            bgcolor: "rgba(94,234,212,0.1)",
            p: 0.75,
            minWidth: 0,
          }}
        >
          <Typography fontSize={11} fontWeight={900} color="#5eead4">
            현재 능력 처리 중입니다
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 0.35,
              mt: 0.65,
            }}
          >
            {game.pendingAbilityQueue.map((ability, index) => (
              <Box
                key={getPendingAbilityKey(ability, index)}
                sx={{
                  borderRadius: 1,
                  border:
                    index === 0
                      ? "1px solid rgba(94,234,212,0.72)"
                      : "1px solid rgba(255,255,255,0.12)",
                  bgcolor:
                    index === 0
                      ? "rgba(94,234,212,0.12)"
                      : "rgba(15,23,42,0.52)",
                  px: 0.55,
                  py: 0.45,
                  minWidth: 0,
                }}
              >
                <Typography
                  fontSize={10}
                  fontWeight={900}
                  color={index === 0 ? "#f8fafc" : "rgba(248,250,252,0.54)"}
                  noWrap
                >
                  {index + 1}. {ability.type.toUpperCase()}
                </Typography>
                <PendingAbilityMeta ability={ability} />
              </Box>
            ))}
          </Box>

          {(activePendingAbility.type === "push" ||
            activePendingAbility.type === "one") && (
            <Stack spacing={0.5} mt={0.75}>
              <Button
                variant="contained"
                disabled={!canResolvePendingForward}
                onClick={() => {
                  game.resolvePendingAbility(1);
                }}
                sx={{
                  height: 38,
                  bgcolor: "#5eead4",
                  color: "#052e24",
                  fontWeight: 900,
                  "&:hover": { bgcolor: "#2dd4bf" },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.38)",
                  },
                }}
              >
                {activePendingAbility.type === "one" ? "앞으로 이동" : "앞으로 밀기"}
              </Button>
              <Button
                variant="outlined"
                disabled={!canResolvePendingBackward}
                onClick={() => {
                  game.resolvePendingAbility(-1);
                }}
                sx={{
                  height: 38,
                  borderColor: "rgba(94,234,212,0.56)",
                  color: "#5eead4",
                  fontWeight: 900,
                  "&:hover": {
                    borderColor: "#5eead4",
                    bgcolor: "rgba(94,234,212,0.1)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {activePendingAbility.type === "one" ? "뒤로 이동" : "뒤로 밀기"}
              </Button>
            </Stack>
          )}
          {activePendingAbility.type === "union" && (
            <Stack spacing={0.65} mt={0.75}>
              <Box
                sx={{
                  borderRadius: 1,
                  border: "1px solid rgba(255,255,255,0.12)",
                  bgcolor: "rgba(15,23,42,0.52)",
                  p: 0.6,
                  minWidth: 0,
                }}
              >
                <Typography
                  fontSize={10}
                  fontWeight={900}
                  color="rgba(248,250,252,0.48)"
                >
                  TARGETS
                </Typography>
                <Stack spacing={0.4} mt={0.5}>
                  {pendingUnionTargets.length === 0 ? (
                    <Typography
                      fontSize={11}
                      fontWeight={800}
                      color="rgba(248,250,252,0.54)"
                    >
                      대상 없음
                    </Typography>
                  ) : (
                    pendingUnionTargets.map((player) => (
                      <Stack
                        key={player.name}
                        direction="row"
                        spacing={0.55}
                        alignItems="center"
                        minWidth={0}
                      >
                        <Box width={22} height={22} flexShrink={0}>
                          <PlayerPiece player={player} size={22} />
                        </Box>
                        <Typography fontSize={11} fontWeight={900} noWrap>
                          {player.name}
                        </Typography>
                      </Stack>
                    ))
                  )}
                </Stack>
              </Box>
              <Button
                variant="contained"
                disabled={!canPullPendingUnionTargets}
                onClick={() => {
                  game.resolveUnionPendingAbility(true);
                }}
                sx={{
                  height: 38,
                  bgcolor: "#5eead4",
                  color: "#052e24",
                  fontWeight: 900,
                  "&:hover": { bgcolor: "#2dd4bf" },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.38)",
                  },
                }}
              >
                모두 끌어오기
              </Button>
              <Button
                variant="outlined"
                disabled={pendingUnionTargets.length === 0}
                onClick={() => {
                  game.resolveUnionPendingAbility(false);
                }}
                sx={{
                  height: 36,
                  borderColor: "rgba(255,255,255,0.16)",
                  color: "rgba(248,250,252,0.72)",
                  fontWeight: 900,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.32)",
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                모두 안 끌기
              </Button>
            </Stack>
          )}
          {activePendingAbility.type === "delete" && (
            <Stack spacing={0.65} mt={0.75}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 0.4,
                }}
              >
                {deleteTargetPlayers.map((player) => {
                  const selected = player.name === deleteTargetName;
                  const character = getCharacterById(player.characterId);

                  return (
                    <Button
                      key={player.name}
                      onMouseEnter={() => {
                        setHoveredTargetName(player.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredTargetName((prev) =>
                          prev === player.name ? null : prev
                        );
                      }}
                      onClick={() => {
                        setDeleteTargetName(player.name);
                        setDeleteCardToKeep(player.hand[0] ?? null);
                      }}
                      sx={{
                        position: "relative",
                        justifyContent: "flex-start",
                        minWidth: 0,
                        minHeight: 34,
                        borderRadius: 1,
                        border: selected
                          ? `1px solid ${character?.color ?? "#5eead4"}`
                          : "1px solid rgba(255,255,255,0.1)",
                        bgcolor: selected
                          ? "rgba(94,234,212,0.12)"
                          : "rgba(15,23,42,0.52)",
                        color: "#f8fafc",
                        px: 0.55,
                        py: 0.35,
                        overflow: "visible",
                      }}
                    >
                      <Box mr={0.55} width={22} height={22} flexShrink={0}>
                        <PlayerPiece player={player} size={22} selected={selected} />
                      </Box>
                      <Typography fontSize={11} fontWeight={900} noWrap>
                        {player.name}
                      </Typography>
                      {hoveredTargetPlayer?.name === player.name && (
                        <TargetHandPreview player={hoveredTargetPlayer} />
                      )}
                    </Button>
                  );
                })}
              </Box>

              {selectedDeleteTarget && (
                <Stack direction="row" spacing={0.45} flexWrap="wrap" useFlexGap>
                  {selectedDeleteTarget.hand.map((card, index) => {
                    const kept = deleteCardToKeep === card;

                    return (
                      <Button
                        key={`${selectedDeleteTarget.name}-keep-${card}-${index}`}
                        onClick={() => {
                          setDeleteCardToKeep(card);
                        }}
                        sx={{
                          minWidth: 34,
                          width: 34,
                          height: 46,
                          borderRadius: 1,
                          border: kept
                            ? "2px solid #5eead4"
                            : "1px solid rgba(255,255,255,0.18)",
                          bgcolor: "#ffffff",
                          color: "#111111",
                          fontWeight: 900,
                          p: 0,
                          opacity: kept ? 1 : 0.32,
                          filter: kept ? "none" : "grayscale(1)",
                          boxShadow: kept ? "0 0 14px rgba(94,234,212,0.42)" : "none",
                          "&:hover": {
                            opacity: kept ? 1 : 0.64,
                            bgcolor: "#ffffff",
                          },
                        }}
                      >
                        {card}
                      </Button>
                    );
                  })}
                </Stack>
              )}

              <Tooltip
                title={
                  canResolveDelete
                    ? ""
                    : !selectedDeleteTarget
                    ? "카드를 삭제할 대상을 선택해야 합니다."
                    : "남길 이동카드 1장을 선택해야 합니다."
                }
                disableHoverListener={Boolean(canResolveDelete)}
              >
                <Box component="span" sx={{ display: "block" }}>
                  <Button
                    variant="contained"
                    disabled={!canResolveDelete}
                    onClick={() => {
                      if (!selectedDeleteTarget || deleteCardToKeep === null) {
                        return;
                      }

                      game.resolveDeletePendingAbility(
                        selectedDeleteTarget.name,
                        deleteCardToKeep
                      );
                      setDeleteTargetName("");
                      setDeleteCardToKeep(null);
                    }}
                    sx={{
                      width: "100%",
                      height: 38,
                      bgcolor: "#5eead4",
                      color: "#052e24",
                      fontWeight: 900,
                      "&:hover": { bgcolor: "#2dd4bf" },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.38)",
                      },
                    }}
                  >
                    {deleteCardToKeep === null
                      ? "삭제 확정"
                      : `${deleteCardToKeep}만 남기고 삭제`}
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          )}
          {activePendingAbility.type === "reset" && (
            <Stack spacing={0.65} mt={0.75}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 0.4,
                }}
              >
                {resetTargetPlayers.map((player) => {
                  const selected = player.name === resetTargetName;
                  const character = getCharacterById(player.characterId);

                  return (
                    <Button
                      key={player.name}
                      onMouseEnter={() => {
                        setHoveredTargetName(player.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredTargetName((prev) =>
                          prev === player.name ? null : prev
                        );
                      }}
                      onClick={() => {
                        setResetTargetName(player.name);
                      }}
                      sx={{
                        position: "relative",
                        justifyContent: "flex-start",
                        minWidth: 0,
                        minHeight: 34,
                        borderRadius: 1,
                        border: selected
                          ? `1px solid ${character?.color ?? "#5eead4"}`
                          : "1px solid rgba(255,255,255,0.1)",
                        bgcolor: selected
                          ? "rgba(94,234,212,0.12)"
                          : "rgba(15,23,42,0.52)",
                        color: "#f8fafc",
                        px: 0.55,
                        py: 0.35,
                        overflow: "visible",
                      }}
                    >
                      <Box mr={0.55} width={22} height={22} flexShrink={0}>
                        <PlayerPiece player={player} size={22} selected={selected} />
                      </Box>
                      <Typography fontSize={11} fontWeight={900} noWrap>
                        {player.name}
                      </Typography>
                      {hoveredTargetPlayer?.name === player.name && (
                        <TargetHandPreview player={hoveredTargetPlayer} />
                      )}
                    </Button>
                  );
                })}
              </Box>

              <Tooltip
                title={canResolveReset ? "" : "이동카드를 리셋할 대상을 선택해야 합니다."}
                disableHoverListener={canResolveReset}
              >
                <Box component="span" sx={{ display: "block" }}>
                  <Button
                    variant="contained"
                    disabled={!canResolveReset}
                    onClick={() => {
                      if (!selectedResetTarget) {
                        return;
                      }

                      game.resolveResetPendingAbility(selectedResetTarget.name);
                      setResetTargetName("");
                    }}
                    sx={{
                      width: "100%",
                      height: 38,
                      bgcolor: "#5eead4",
                      color: "#052e24",
                      fontWeight: 900,
                      "&:hover": { bgcolor: "#2dd4bf" },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.38)",
                      },
                    }}
                  >
                    리셋 확정
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          )}
          {activePendingAbility.type === "offer" && offerSourcePlayer && (
            <Stack spacing={0.65} mt={0.75}>
              <Stack direction="row" spacing={0.45} flexWrap="wrap" useFlexGap>
                {offerSourcePlayer.hand.map((card, index) => {
                  const selected = offerCard === card;

                  return (
                    <Button
                      key={`${offerSourcePlayer.name}-offer-${card}-${index}`}
                      onClick={() => {
                        setOfferCard(card);
                      }}
                      sx={{
                        minWidth: 34,
                        width: 34,
                        height: 46,
                        borderRadius: 1,
                        border: selected
                          ? "2px solid #5eead4"
                          : "1px solid rgba(255,255,255,0.18)",
                        bgcolor: "#ffffff",
                        color: "#111111",
                        fontWeight: 900,
                        p: 0,
                        opacity: selected || offerCard === null ? 1 : 0.42,
                        boxShadow: selected
                          ? "0 0 14px rgba(94,234,212,0.42)"
                          : "none",
                        "&:hover": {
                          opacity: 1,
                          bgcolor: "#ffffff",
                        },
                      }}
                    >
                      {card}
                    </Button>
                  );
                })}
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 0.4,
                }}
              >
                {offerTargetPlayers.map((player) => {
                  const selected = player.name === offerTargetName;
                  const character = getCharacterById(player.characterId);

                  return (
                    <Button
                      key={player.name}
                      onMouseEnter={() => {
                        setHoveredTargetName(player.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredTargetName((prev) =>
                          prev === player.name ? null : prev
                        );
                      }}
                      onClick={() => {
                        setOfferTargetName(player.name);
                      }}
                      sx={{
                        position: "relative",
                        justifyContent: "flex-start",
                        minWidth: 0,
                        minHeight: 34,
                        borderRadius: 1,
                        border: selected
                          ? `1px solid ${character?.color ?? "#5eead4"}`
                          : "1px solid rgba(255,255,255,0.1)",
                        bgcolor: selected
                          ? "rgba(94,234,212,0.12)"
                          : "rgba(15,23,42,0.52)",
                        color: "#f8fafc",
                        px: 0.55,
                        py: 0.35,
                        overflow: "visible",
                      }}
                    >
                      <Box mr={0.55} width={22} height={22} flexShrink={0}>
                        <PlayerPiece player={player} size={22} selected={selected} />
                      </Box>
                      <Typography fontSize={11} fontWeight={900} noWrap>
                        {player.name}
                      </Typography>
                      {hoveredTargetPlayer?.name === player.name && (
                        <TargetHandPreview player={hoveredTargetPlayer} />
                      )}
                    </Button>
                  );
                })}
              </Box>

              <Tooltip
                title={
                  canResolveOffer
                    ? ""
                    : offerCard === null
                    ? "줄 이동카드 1장을 선택해야 합니다."
                    : "이동카드를 받을 대상을 선택해야 합니다."
                }
                disableHoverListener={Boolean(canResolveOffer)}
              >
                <Box component="span" sx={{ display: "block" }}>
                  <Button
                    variant="contained"
                    disabled={!canResolveOffer}
                    onClick={() => {
                      if (!selectedOfferTarget || offerCard === null) {
                        return;
                      }

                      game.resolveOfferPendingAbility(
                        selectedOfferTarget.name,
                        offerCard
                      );
                      setOfferTargetName("");
                      setOfferCard(null);
                    }}
                    sx={{
                      width: "100%",
                      height: 38,
                      bgcolor: "#5eead4",
                      color: "#052e24",
                      fontWeight: 900,
                      "&:hover": { bgcolor: "#2dd4bf" },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.38)",
                      },
                    }}
                  >
                    {offerCard === null ? "오퍼 확정" : `${offerCard} 주기`}
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          )}
          {activePendingAbility.type === "mirror" && mirrorSourcePlayer && (
            <Stack spacing={0.65} mt={0.75}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 0.4,
                }}
              >
                {mirrorTargetPlayers.map((player) => {
                  const selected = player.name === mirrorTargetName;
                  const character = getCharacterById(player.characterId);

                  return (
                    <Button
                      key={player.name}
                      onMouseEnter={() => {
                        setHoveredTargetName(player.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredTargetName((prev) =>
                          prev === player.name ? null : prev
                        );
                      }}
                      onClick={() => {
                        setMirrorTargetName(player.name);
                      }}
                      sx={{
                        position: "relative",
                        justifyContent: "flex-start",
                        minWidth: 0,
                        minHeight: 34,
                        borderRadius: 1,
                        border: selected
                          ? `1px solid ${character?.color ?? "#5eead4"}`
                          : "1px solid rgba(255,255,255,0.1)",
                        bgcolor: selected
                          ? "rgba(94,234,212,0.12)"
                          : "rgba(15,23,42,0.52)",
                        color: "#f8fafc",
                        px: 0.55,
                        py: 0.35,
                        overflow: "visible",
                      }}
                    >
                      <Box mr={0.55} width={22} height={22} flexShrink={0}>
                        <PlayerPiece player={player} size={22} selected={selected} />
                      </Box>
                      <Typography fontSize={11} fontWeight={900} noWrap>
                        {player.name}
                      </Typography>
                      {hoveredTargetPlayer?.name === player.name && (
                        <TargetHandPreview player={hoveredTargetPlayer} />
                      )}
                    </Button>
                  );
                })}
              </Box>

              <Tooltip
                title={canResolveMirror ? "" : "반대 방향으로 이동시킬 대상을 선택해야 합니다."}
                disableHoverListener={Boolean(canResolveMirror)}
              >
                <Box component="span" sx={{ display: "block" }}>
                  <Button
                    variant="contained"
                    disabled={!canResolveMirror}
                    onClick={() => {
                      if (!selectedMirrorTarget) {
                        return;
                      }

                      game.resolveMirrorPendingAbility(selectedMirrorTarget.name);
                      setMirrorTargetName("");
                    }}
                    sx={{
                      width: "100%",
                      height: 38,
                      bgcolor: "#5eead4",
                      color: "#052e24",
                      fontWeight: 900,
                      "&:hover": { bgcolor: "#2dd4bf" },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.38)",
                      },
                    }}
                  >
                    반대로 이동
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          )}
          {activePendingAbility.type === "copy" && copySourcePlayer && (
            <Stack spacing={0.65} mt={0.75}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 0.4,
                }}
              >
                {pendingCopyTargetPlayers.map((player) => {
                  const selected = player.name === copyTargetName;
                  const character = getCharacterById(player.characterId);

                  return (
                    <Button
                      key={player.name}
                      onMouseEnter={() => {
                        setHoveredTargetName(player.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredTargetName((prev) =>
                          prev === player.name ? null : prev
                        );
                      }}
                      onClick={() => {
                        setCopyTargetName(player.name);
                      }}
                      sx={{
                        position: "relative",
                        justifyContent: "flex-start",
                        minWidth: 0,
                        minHeight: 34,
                        borderRadius: 1,
                        border: selected
                          ? `1px solid ${character?.color ?? "#5eead4"}`
                          : "1px solid rgba(255,255,255,0.1)",
                        bgcolor: selected
                          ? "rgba(94,234,212,0.12)"
                          : "rgba(15,23,42,0.52)",
                        color: "#f8fafc",
                        px: 0.55,
                        py: 0.35,
                        overflow: "visible",
                      }}
                    >
                      <Box mr={0.55} width={22} height={22} flexShrink={0}>
                        <PlayerPiece player={player} size={22} selected={selected} />
                      </Box>
                      <Typography fontSize={11} fontWeight={900} noWrap>
                        {player.name}
                      </Typography>
                      {hoveredTargetPlayer?.name === player.name && (
                        <TargetHandPreview player={hoveredTargetPlayer} />
                      )}
                    </Button>
                  );
                })}
              </Box>

              <Tooltip
                title={canResolveCopy ? "" : "복사할 능력의 대상을 선택해야 합니다."}
                disableHoverListener={Boolean(canResolveCopy)}
              >
                <Box component="span" sx={{ display: "block" }}>
                  <Button
                    variant="contained"
                    disabled={!canResolveCopy}
                    onClick={() => {
                      if (!selectedCopyTarget) {
                        return;
                      }

                      game.resolveCopyPendingAbility(selectedCopyTarget.name);
                      setCopyTargetName("");
                    }}
                    sx={{
                      width: "100%",
                      height: 38,
                      bgcolor: "#5eead4",
                      color: "#052e24",
                      fontWeight: 900,
                      "&:hover": { bgcolor: "#2dd4bf" },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.38)",
                      },
                    }}
                  >
                    능력 복사
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          )}
        </Box>
      )}

      {!game.isResolvingAbility && (
        <>
      <Box
        ref={dropZoneRef}
        sx={{
          minHeight: { xs: 118, md: 132 },
          borderRadius: 1,
          border: "2px dashed",
          borderColor: isDragOver ? "#5eead4" : "rgba(255,255,255,0.34)",
          bgcolor: isDragOver ? "rgba(94,234,212,0.12)" : "rgba(15,23,42,0.72)",
          display: "grid",
          placeItems: "center",
          overflow: "visible",
          "@keyframes setMoveCard": {
            "0%": {
              opacity: 0,
              transform: "translateY(44px) scale(0.72) rotate(8deg)",
            },
            "70%": {
              opacity: 1,
              transform: "translateY(-4px) scale(1.04) rotate(-2deg)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0) scale(1) rotate(0deg)",
            },
          },
        }}
      >
        {game.selectedCard === null ? (
          <Typography fontSize={12} fontWeight={900} color="rgba(255,255,255,0.46)">
            DROP CARD
          </Typography>
        ) : (
          <Box
            key={`${game.selectedCard}-${placementKey}`}
            sx={{
              width: { xs: 72, md: 82 },
              height: { xs: 100, md: 108 },
              borderRadius: 1,
              border: "2px solid #5eead4",
              bgcolor: "#ffffff",
              color: "#111111",
              position: "relative",
              boxShadow:
                "0 0 24px rgba(94,234,212,0.38), 0 14px 28px rgba(0,0,0,0.38)",
              animation: "setMoveCard 260ms ease-out",
            }}
          >
            <CardFace card={game.selectedCard} compact />
          </Box>
        )}
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="end"
        spacing={{ xs: -3.5, md: -4.25 }}
        minHeight={{ xs: 94, md: 112 }}
        sx={{ overflow: "visible" }}
      >
        {visibleHand.map((card) => (
          <MoveCard
            key={`${currentPlayer.name}-${card}`}
            card={card}
            onPointerDown={(nextDraggingCard, event) => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              const rect = event.currentTarget.getBoundingClientRect();

              setDragState({
                card: nextDraggingCard,
                pointerX: event.clientX,
                pointerY: event.clientY,
                offsetX: event.clientX - rect.left,
                offsetY: event.clientY - rect.top,
                width: rect.width,
                height: rect.height,
              });
            }}
          />
        ))}
      </Stack>

      <Stack spacing={0.55}>
        <Tooltip
          title={game.selectedMoveCardDisabledReason}
          disableHoverListener={game.canUseSelectedMoveCard}
        >
          <Box component="span" sx={{ display: "block" }}>
            <Button
              variant="contained"
              disabled={!game.canUseSelectedMoveCard}
              onClick={() => {
                game.useSelectedMoveCard(
                  isQuickMoveAction ? { useDefaultMove: true } : undefined
                );
              }}
              sx={{
                width: "100%",
                height: 40,
                bgcolor: "#5eead4",
                color: "#052e24",
                fontWeight: 900,
                "&:hover": { bgcolor: "#2dd4bf" },
                "&.Mui-disabled": {
                  bgcolor: "rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.38)",
                },
              }}
            >
              카드 사용
            </Button>
          </Box>
        </Tooltip>
        {isQuickMoveAction && (
          <Tooltip
            title={game.selectedMoveCardDisabledReason}
            disableHoverListener={game.canUseSelectedMoveCard}
          >
            <Box component="span" sx={{ display: "block" }}>
              <Button
                variant="outlined"
                disabled={!game.canUseSelectedMoveCard}
                onClick={() => {
                  game.useSelectedMoveCard();
                }}
                sx={{
                  width: "100%",
                  height: 40,
                  borderColor: "rgba(94,234,212,0.56)",
                  color: "#5eead4",
                  fontWeight: 900,
                  "&:hover": {
                    borderColor: "#5eead4",
                    bgcolor: "rgba(94,234,212,0.1)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                2배수로 카드 사용
              </Button>
            </Box>
          </Tooltip>
        )}
        {!isQuickMoveAction && (
          <Tooltip
            title={abilityOpenDisabledReason}
            disableHoverListener={canOpenAbilityPopover}
          >
            <Box component="span" sx={{ display: "block" }}>
              <Button
                variant="outlined"
                disabled={!canOpenAbilityPopover}
                onClick={(event) => {
                  const defaultTarget =
                    game.currentAbilityId === "gravity"
                      ? abilityTargetPlayers.find(
                          (player) => player.position !== currentPlayer?.position
                        ) ?? abilityTargetPlayers[0]
                      : game.currentAbilityId === "copy"
                      ? copyableTargetPlayers[0]
                      : abilityTargetPlayers[0];

                  setAbilityAnchorEl(event.currentTarget);
                  setAbilityCard(currentPlayer?.hand[0] ?? null);
                  setAbilityTargetName(defaultTarget?.name ?? "");
                }}
                sx={{
                  width: "100%",
                  height: 40,
                  borderColor: "rgba(94,234,212,0.56)",
                  color: "#5eead4",
                  fontWeight: 900,
                  "&:hover": {
                    borderColor: "#5eead4",
                    bgcolor: "rgba(94,234,212,0.1)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                능력 사용
              </Button>
            </Box>
          </Tooltip>
        )}
      </Stack>

      <Popover
        open={Boolean(abilityAnchorEl)}
        anchorEl={abilityAnchorEl}
        onClose={() => {
          setAbilityAnchorEl(null);
          setHoveredTargetName(null);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            width: abilityAnchorEl?.getBoundingClientRect().width ?? 190,
            mt: 0.5,
            borderRadius: 1,
            border: "1px solid rgba(94,234,212,0.28)",
            bgcolor: "rgba(8,13,24,0.98)",
            color: "#f8fafc",
            boxShadow: "0 18px 50px rgba(0,0,0,0.52)",
            p: 0.75,
            overflow: "visible",
          },
        }}
      >
        <Stack spacing={0.75}>
          <Typography fontSize={11} fontWeight={900} color="#5eead4" noWrap>
            {currentCharacter?.label ?? "능력"}
          </Typography>

          {abilityNeedsCard && (
            <Stack direction="row" spacing={0.45} flexWrap="wrap" useFlexGap>
              {currentPlayer?.hand.map((card) => (
                <Button
                  key={`ability-card-${card}`}
                  onClick={() => {
                    setAbilityCard(card);
                  }}
                  sx={{
                    minWidth: 34,
                    width: 34,
                    height: 46,
                    borderRadius: 1,
                    border:
                      abilityCard === card
                        ? "2px solid #5eead4"
                        : "1px solid rgba(255,255,255,0.18)",
                    bgcolor: "#ffffff",
                    color: "#111111",
                    fontWeight: 900,
                    p: 0,
                  }}
                >
                  {card}
                </Button>
              ))}
            </Stack>
          )}

          {abilityNeedsTarget && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 0.4,
              }}
            >
              {abilityTargetPlayers.map((player) => {
                const selected = player.name === abilityTargetName;
                const character = getCharacterById(player.characterId);

                return (
                  <Button
                    key={player.name}
                    onMouseEnter={() => {
                      setHoveredTargetName(player.name);
                    }}
                    onMouseLeave={() => {
                      setHoveredTargetName((prev) =>
                        prev === player.name ? null : prev
                      );
                    }}
                    onClick={() => {
                      setAbilityTargetName(player.name);
                    }}
                    sx={{
                      position: "relative",
                      justifyContent: "flex-start",
                      minWidth: 0,
                      minHeight: 34,
                      borderRadius: 1,
                      border: selected
                        ? `1px solid ${character?.color ?? "#5eead4"}`
                        : "1px solid rgba(255,255,255,0.1)",
                      bgcolor: selected
                        ? "rgba(94,234,212,0.12)"
                        : "rgba(15,23,42,0.52)",
                      color: "#f8fafc",
                      px: 0.55,
                      py: 0.35,
                      overflow: "visible",
                    }}
                  >
                    <Box mr={0.55} width={22} height={22} flexShrink={0}>
                      <PlayerPiece player={player} size={22} selected={selected} />
                    </Box>
                    <Typography fontSize={11} fontWeight={900} noWrap>
                      {player.name}
                    </Typography>
                    {hoveredTargetPlayer?.name === player.name && (
                      <TargetHandPreview player={hoveredTargetPlayer} />
                    )}
                  </Button>
                );
              })}
            </Box>
          )}

          {game.currentAbilityId === "union" && (
            <Box
              sx={{
                borderRadius: 1,
                border: "1px solid rgba(255,255,255,0.12)",
                bgcolor: "rgba(15,23,42,0.52)",
                p: 0.6,
                minWidth: 0,
              }}
            >
              <Typography
                fontSize={10}
                fontWeight={900}
                color="rgba(248,250,252,0.48)"
              >
                FRONT CELL
              </Typography>
              <Stack spacing={0.4} mt={0.5}>
                {unionTargets.length === 0 ? (
                  <Typography
                    fontSize={11}
                    fontWeight={800}
                    color="rgba(248,250,252,0.54)"
                  >
                    대상 없음
                  </Typography>
                ) : (
                  unionTargets.map((player) => (
                    <Stack
                      key={player.name}
                      direction="row"
                      spacing={0.55}
                      alignItems="center"
                      minWidth={0}
                    >
                      <Box width={22} height={22} flexShrink={0}>
                        <PlayerPiece player={player} size={22} />
                      </Box>
                      <Typography fontSize={11} fontWeight={900} noWrap>
                        {player.name}
                      </Typography>
                    </Stack>
                  ))
                )}
              </Stack>
            </Box>
          )}

          <Tooltip title={confirmDisabledReason} disableHoverListener={canConfirmAbility}>
            <Box component="span" sx={{ display: "block" }}>
              <Button
                variant="contained"
                disabled={!canConfirmAbility}
                onClick={() => {
                  game.useCurrentAbility({
                    card: abilityNeedsCard ? abilityCard : null,
                    targetPlayerName: abilityTargetName,
                  });
                  setAbilityAnchorEl(null);
                  setHoveredTargetName(null);
                }}
                sx={{
                  width: "100%",
                  height: 38,
                  bgcolor: "#5eead4",
                  color: "#052e24",
                  fontWeight: 900,
                  "&:hover": { bgcolor: "#2dd4bf" },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.38)",
                  },
                }}
              >
                {game.currentAbilityId === "union" ? "끌어오기" : "확정"}
              </Button>
            </Box>
          </Tooltip>
          {game.currentAbilityId === "union" && (
            <Button
              variant="outlined"
              onClick={() => {
                setAbilityAnchorEl(null);
                setHoveredTargetName(null);
              }}
              sx={{
                height: 36,
                borderColor: "rgba(255,255,255,0.16)",
                color: "rgba(248,250,252,0.72)",
                fontWeight: 900,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.32)",
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              사용 안 함
            </Button>
          )}
        </Stack>
      </Popover>
        </>
      )}

      {currentCharacter && (
        <Box
          sx={{
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.12)",
            bgcolor: "rgba(2,6,23,0.44)",
            px: 0.85,
            py: 0.75,
            minWidth: 0,
          }}
        >
          <Typography
            fontSize={11}
            fontWeight={900}
            color={currentCharacter.color}
            noWrap
          >
            {currentCharacter.label}
          </Typography>
          <Typography
            mt={0.35}
            fontSize={11}
            lineHeight={1.45}
            color="rgba(248,250,252,0.68)"
          >
            {currentCharacter.ability}
          </Typography>
        </Box>
      )}
      </Box>
      {dragPreview}
    </>
  );
};

const RaceFrame = ({ game }: { game: MiddleRaceGame }) => {
  const orderedPlayers = [...game.players].sort((left, right) => {
    if (left.finishedRank && right.finishedRank) {
      return left.finishedRank - right.finishedRank;
    }

    if (left.finishedRank) return 1;
    if (right.finishedRank) return -1;

    const priorityDiff =
      (getCharacterById(left.characterId)?.priority ?? Number.MAX_SAFE_INTEGER) -
      (getCharacterById(right.characterId)?.priority ?? Number.MAX_SAFE_INTEGER);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return left.draftOrder - right.draftOrder;
  });

  return (
  <Stack spacing={1} width="100%" minWidth={0}>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      sx={{
        ...phasePanelSx,
        px: 1,
        py: 0.75,
      }}
    >
      <Typography fontSize={{ xs: 16, md: 22 }} fontWeight={900} color="#5eead4" noWrap>
        {game.currentPlayerName}
      </Typography>
      <Stack direction="row" justifyContent="flex-end" spacing={0.5} flexWrap="wrap" useFlexGap>
      {orderedPlayers.map((player) => {
        const current = player.name === game.currentPlayerName;
        const selectedTarget = player.name === game.selectedPlayerName;

        return (
          <Button
            key={player.name}
            onClick={() => {
              game.selectPlayer(player.name);
            }}
            sx={{
              minWidth: 0,
              borderRadius: 999,
              border: current
                ? "2px solid #5eead4"
                : selectedTarget
                ? "1px solid rgba(226,232,240,0.72)"
                : "1px solid rgba(255,255,255,0.2)",
              bgcolor:
                selectedTarget && !current
                  ? "rgba(226,232,240,0.08)"
                  : "transparent",
              color: "#f8fafc",
              px: 0.75,
              py: 0.35,
              fontSize: 12,
              overflow: "hidden",
            }}
          >
            <Box mr={0.75} width={20} height={20} flexShrink={0}>
              <PlayerPiece player={player} size={20} />
            </Box>
            {player.name}
          </Button>
        );
      })}
      </Stack>
    </Stack>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "150px minmax(0, 1fr)", md: "190px minmax(0, 1fr)" },
        gap: { xs: 0.75, md: 1 },
        minWidth: 0,
        width: "100%",
        overflow: "visible",
        boxSizing: "border-box",
        alignItems: "start",
      }}
    >
      <Box minWidth={0} overflow="visible">
        <MoveCardDock game={game} />
      </Box>
      <Box minWidth={0} overflow="hidden">
        <TrackBoard game={game} />
      </Box>
    </Box>
  </Stack>
  );
};

const ResultFrame = ({ game }: { game: MiddleRaceGame }) => {
  const getMiddleScore = (rank: number) => {
    const playerCount = game.players.length;
    const center = (playerCount + 1) / 2;

    return Math.ceil(playerCount / 2) - Math.floor(Math.abs(rank - center));
  };
  const rankedPlayers = [...game.players].sort((left, right) => {
    const leftRank = left.finishedRank ?? game.players.length;
    const rightRank = right.finishedRank ?? game.players.length;
    const scoreDiff = getMiddleScore(rightRank) - getMiddleScore(leftRank);

    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return leftRank - rightRank;
  });

  return (
    <Box width="100%" maxWidth={720} mx="auto" mt={{ xs: 2, md: 7 }}>
      <Stack spacing={1.25}>
        {rankedPlayers.map((player, index) => {
          const finishRank = player.finishedRank ?? game.players.length;
          const score = getMiddleScore(finishRank);

          return (
            <Box
              key={player.name}
              sx={{
                display: "grid",
                gridTemplateColumns: "58px 52px minmax(0, 1fr) 64px",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 1,
                border: index === 0 ? "2px solid #5eead4" : "1px solid rgba(255,255,255,0.16)",
                bgcolor: index === 0 ? "rgba(94,234,212,0.12)" : "rgba(15,23,42,0.72)",
                p: 1.5,
              }}
            >
              <Typography fontSize={32} fontWeight={900} color={index === 0 ? "#5eead4" : "#94a3b8"}>
                {finishRank}
              </Typography>
              <PlayerPiece player={player} size={52} />
              <Typography fontSize={{ xs: 22, md: 30 }} fontWeight={900} color="#f8fafc" noWrap>
                {player.name}
              </Typography>
              <Typography fontSize={{ xs: 22, md: 30 }} fontWeight={900} color="#5eead4" textAlign="right">
                {score}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

const renderPhaseFrame = (game: MiddleRaceGame) => {
  if (game.phase === "PLAYER_SETTING") {
    return <PlayerSettingFrame game={game} />;
  }

  if (game.phase === "CHARACTER_DRAFT") {
    return <CharacterDraftFrame game={game} />;
  }

  if (game.phase === "RESULT") {
    return <ResultFrame game={game} />;
  }

  return <RaceFrame game={game} />;
};

export function MiddleRacePageContent({ game }: { game: MiddleRaceGame }) {
  const currentPhase = PHASES.find((phase) => phase.id === game.phase);
  const currentPhaseIndex = PHASES.findIndex((phase) => phase.id === game.phase);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at 50% 0%, rgba(22, 163, 74, 0.16), transparent 34%), linear-gradient(180deg, #050712 0%, #090f1d 100%)",
        px: { xs: 1.5, md: 3 },
        py: { xs: 1.5, md: 2.5 },
        overflowX: "hidden",
      }}
    >
      <HomeButton color="#e2e8f0" />

      <Stack spacing={{ xs: 2, md: 3 }} minHeight="calc(100dvh - 40px)">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
            alignItems: "center",
            gap: { xs: 1, md: 0 },
            pl: { xs: 5.5, md: 6 },
          }}
        >
          <Typography
            fontSize={{ xs: 18, md: 24 }}
            fontWeight={900}
            color="#f8fafc"
            noWrap
            minWidth={0}
          >
            중간 달리기
          </Typography>
          <Stack
            alignItems="center"
            spacing={0.75}
            sx={{
              gridColumn: { xs: "1 / -1", md: "auto" },
              gridRow: { xs: 2, md: "auto" },
              order: { xs: 3, md: 0 },
            }}
          >
            <PhaseDots phase={game.phase} />
            <Typography fontSize={11} fontWeight={900} color="rgba(255,255,255,0.54)">
              {currentPhase?.label}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.75}
            justifySelf="end"
            sx={{ gridColumn: { xs: 2, md: "auto" } }}
          >
            <Tooltip title="방금 행동 무르기">
              <span>
                <IconButton
                  aria-label="undo last action"
                  size="small"
                  onClick={game.undoLastAction}
                  disabled={!game.canUndoLastAction}
                  sx={{
                    color: "rgba(226,232,240,0.72)",
                    bgcolor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    "&:hover": {
                      color: "#e2e8f0",
                      bgcolor: "rgba(255,255,255,0.12)",
                    },
                    "&.Mui-disabled": {
                      color: "rgba(255,255,255,0.16)",
                      bgcolor: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <UndoRounded fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <IconButton
              aria-label="previous phase"
              onClick={game.moveToPreviousPhase}
              disabled={currentPhaseIndex <= 0}
              sx={{
                color: "#e2e8f0",
                bgcolor: "rgba(255,255,255,0.12)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                "&.Mui-disabled": {
                  color: "rgba(255,255,255,0.2)",
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              <NavigateBeforeRounded />
            </IconButton>
            <IconButton
              aria-label="next phase"
              onClick={game.cyclePhase}
              disabled={!game.canMoveToNextPhase}
              sx={{
                color: "#0f172a",
                bgcolor: "#5eead4",
                "&:hover": { bgcolor: "#2dd4bf" },
                "&.Mui-disabled": {
                  color: "rgba(255,255,255,0.28)",
                  bgcolor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <NavigateNextRounded />
            </IconButton>
          </Stack>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
          minWidth={0}
        >
          {renderPhaseFrame(game)}
        </Box>
      </Stack>
    </Box>
  );
}
