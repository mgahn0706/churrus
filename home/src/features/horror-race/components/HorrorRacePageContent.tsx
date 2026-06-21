import HomeButton from "@/components/HomeButton";
import {
  HORROR_RACE_MAX_PLAYERS,
  HORROR_RACE_MIN_PLAYERS,
} from "@/features/horror-race/constants";
import {
  HorrorRaceCoin,
  HorrorRaceCoinZoneValue,
  HorrorRaceGame,
  HorrorRacePlayer,
  HorrorRacePhase,
} from "@/features/horror-race/types";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckRounded,
  DragIndicatorRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const PHASES: {
  id: HorrorRacePhase;
  label: string;
}[] = [
  {
    id: "PLAYER_SETTING",
    label: "플레이어 설정",
  },
  {
    id: "SUPPORTER_SELECTION",
    label: "응원 캐릭터 선정",
  },
  {
    id: "RACE",
    label: "레이스",
  },
  {
    id: "RESULT",
    label: "결과 발표",
  },
];

const SUPPORTER_CHARACTERS = [
  {
    id: "vampire",
    label: "뱀파이어",
    imageSrc: "/image/horror-race/vampire-coin.png",
    pieceSrc: "/image/horror-race/vampire-piece.png",
  },
  {
    id: "kumiho",
    label: "구미호",
    imageSrc: "/image/horror-race/kumiho-coin.png",
    pieceSrc: "/image/horror-race/kumiho-piece.png",
  },
  {
    id: "jiangshi",
    label: "강시",
    imageSrc: "/image/horror-race/jiangshi-coin.png",
    pieceSrc: "/image/horror-race/jianshi-piece.png",
  },
  {
    id: "mummy",
    label: "미라",
    imageSrc: "/image/horror-race/mummy-coin.png",
    pieceSrc: "/image/horror-race/mummy-piece.png",
  },
  {
    id: "zombie",
    label: "좀비",
    imageSrc: "/image/horror-race/zombie-coin.png",
    pieceSrc: "/image/horror-race/zombie-piece.png",
  },
] as const;

const TRACK_CELLS = Array.from({ length: 14 }, (_, index) => index);
const RACE_STEP_VALUES: HorrorRaceCoinZoneValue[] = [1, 2, 4];
const START_POSITION = 0;
const GARNET_IMAGE_SRC = "/image/horror-race/garnet.png";

const getPhaseIndex = (phase: HorrorRacePhase) =>
  PHASES.findIndex((item) => item.id === phase);

const PhaseNavigation = ({ game }: { game: HorrorRaceGame }) => {
  const currentIndex = getPhaseIndex(game.phase);

  return (
    <Box sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: { xs: 0.75, md: 1 },
        }}
      >
        {PHASES.map((item, index) => {
          const active = item.id === game.phase;
          const completed = index < currentIndex;

          return (
            <Stack
              key={item.id}
              spacing={0.55}
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  color: active
                    ? "#facc15"
                    : completed
                    ? "rgba(187,247,208,0.86)"
                    : "rgba(248,250,252,0.42)",
                  fontSize: { xs: 12, md: 15 },
                  fontWeight: 900,
                  lineHeight: 1.15,
                  textAlign: "center",
                  whiteSpace: "normal",
                }}
              >
                {item.label}
              </Typography>
              <Box
                sx={{
                  height: { xs: 3, md: 4 },
                  borderRadius: 999,
                  bgcolor: active
                    ? "#facc15"
                    : completed
                    ? "rgba(34,197,94,0.72)"
                    : "rgba(255,255,255,0.12)",
                  boxShadow: active
                    ? "0 0 14px rgba(250,204,21,0.38)"
                    : "none",
                }}
              />
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};

const getSupporterCharacter = (characterId: string | null | undefined) =>
  SUPPORTER_CHARACTERS.find((character) => character.id === characterId) ??
  SUPPORTER_CHARACTERS[0];

const CoinImage = ({
  coin,
  size = 30,
}: {
  coin: HorrorRaceCoin;
  size?: number;
}) => {
  const character = getSupporterCharacter(coin.characterId);

  return (
    <Box
      component="img"
      src={character.imageSrc}
      alt=""
      sx={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.34))",
      }}
    />
  );
};

const GarnetIcon = ({ size = 20 }: { size?: number }) => (
  <Box
    component="img"
    src={GARNET_IMAGE_SRC}
    alt=""
    sx={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))",
      flexShrink: 0,
    }}
  />
);

const DrawnCoinOrb = ({ coins }: { coins: HorrorRaceCoin[] }) => {
  const coinSlotByIdRef = useRef<Record<string, number>>({});
  const animatedCoinIdsRef = useRef<Set<string>>(new Set());
  const [orbAnimationDone, setOrbAnimationDone] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setOrbAnimationDone(true);
    }, 1900);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  const visibleCoins = coins.map((coin, index) => {
    if (coinSlotByIdRef.current[coin.id] === undefined) {
      coinSlotByIdRef.current[coin.id] = index;
    }

    const shouldAnimate = !animatedCoinIdsRef.current.has(coin.id);
    animatedCoinIdsRef.current.add(coin.id);

    return {
      coin,
      slot: coinSlotByIdRef.current[coin.id],
      shouldAnimate,
    };
  });

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        bottom: { xs: -42, md: -64 },
        width: { xs: 312, md: 470 },
        height: { xs: 142, md: 188 },
        transform: "translateX(-50%)",
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        zIndex: 8,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: { xs: 156, md: 214 },
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 33% 22%, rgba(255,255,255,0.5), rgba(255,255,255,0.12) 17%, transparent 28%), radial-gradient(circle at 52% 62%, rgba(15,23,42,0.98), #020617 72%)",
          border: "2px solid rgba(255,255,255,0.28)",
          boxShadow:
            "inset -34px -38px 58px rgba(0,0,0,0.86), inset 16px 14px 28px rgba(255,255,255,0.13), 0 26px 48px rgba(0,0,0,0.62)",
          animation: orbAnimationDone
            ? "none"
            : "orbDrawCycle 1900ms cubic-bezier(.2,.86,.24,1) both",
          transform: orbAnimationDone
            ? "translate(-50%, 130%) scale(0.9)"
            : undefined,
          opacity: orbAnimationDone ? 0 : undefined,
          "@keyframes orbDrawCycle": {
            "0%": {
              transform: "translate(-50%, 124%) scale(0.78)",
              opacity: 0,
            },
            "18%": {
              transform: "translate(-50%, 0) scale(1.04)",
              opacity: 1,
            },
            "58%": {
              transform: "translate(-50%, 0) scale(1)",
              opacity: 1,
            },
            "100%": {
              transform: "translate(-50%, 130%) scale(0.9)",
              opacity: 0,
            },
          },
        }}
      />
      {visibleCoins.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: { xs: 21, md: 27 },
            width: { xs: 270, md: 390 },
            height: { xs: 74, md: 94 },
            transform: "translateX(-50%)",
            borderRadius: 1,
            border: "1px solid rgba(187,247,208,0.26)",
            background:
              "linear-gradient(180deg, rgba(6,95,70,0.58), rgba(3,31,26,0.48))",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.06), 0 16px 30px rgba(0,0,0,0.26)",
            backdropFilter: "blur(5px)",
            pointerEvents: "none",
          }}
        />
      )}
      {visibleCoins.map(({ coin, slot, shouldAnimate }) => (
        <Box
          key={coin.id}
          draggable
          onDragStart={(event) => {
            setOrbAnimationDone(true);
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", coin.id);
          }}
          sx={{
            position: "absolute",
            left: {
              xs: `calc(50% + ${[-76, 0, 76][slot] ?? 0}px)`,
              md: `calc(50% + ${[-108, 0, 108][slot] ?? 0}px)`,
            },
            top: { xs: 28, md: 34 },
            cursor: "grab",
            pointerEvents: "auto",
            zIndex: 2,
            animation: shouldAnimate
              ? `coinDrawPop${slot} 980ms cubic-bezier(.13,.95,.25,1.18) both`
              : "none",
            animationDelay: shouldAnimate ? `${280 + slot * 120}ms` : "0ms",
            transform: shouldAnimate
              ? undefined
              : "translate(-50%, 0) scale(1) rotate(0deg)",
            opacity: shouldAnimate ? undefined : 1,
            "&:active": { cursor: "grabbing" },
            [`@keyframes coinDrawPop${slot}`]: {
              "0%": {
                transform:
                  "translate(-50%, 124px) scale(0.12) rotate(-120deg)",
                opacity: 0,
              },
              "38%": {
                transform: "translate(-50%, 80px) scale(0.3) rotate(-70deg)",
                opacity: 0,
              },
              "76%": {
                transform: `translate(-50%, ${slot === 1 ? -10 : -4}px) scale(1.14) rotate(${slot === 0 ? -18 : slot === 1 ? 8 : 18}deg)`,
                opacity: 1,
              },
              "100%": {
                transform: "translate(-50%, 0) scale(1) rotate(0deg)",
                opacity: 1,
              },
            },
          }}
        >
          <CoinImage coin={coin} size={62} />
        </Box>
      ))}
    </Box>
  );
};

const DraggableCoinImage = ({
  coin,
  size = 34,
}: {
  coin: HorrorRaceCoin;
  size?: number;
}) => (
  <Box
    draggable
    onDragStart={(event) => {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", coin.id);
    }}
    sx={{
      cursor: "grab",
      "&:active": { cursor: "grabbing" },
    }}
  >
    <CoinImage coin={coin} size={size} />
  </Box>
);

const getPieceOffset = (index: number) => 12 + (index % 5) * 19;

const getPieceLeft = (position: number) =>
  `${((position + 0.5) / TRACK_CELLS.length) * 100}%`;

const TrackBoard = ({
  characterPositions,
}: {
  characterPositions: Record<string, number>;
}) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      height: { xs: 230, sm: 260, md: 310 },
      flex: "0 0 auto",
      borderRadius: 1,
      border: "2px solid rgba(255,255,255,0.88)",
      overflow: "hidden",
      bgcolor: "#064e3b",
      background:
        "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 14px), repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 16px), linear-gradient(135deg, #052e24 0%, #065f46 48%, #033b2f 100%)",
      boxShadow:
        "inset 0 0 0 10px rgba(255,255,255,0.05), inset 0 0 90px rgba(0,0,0,0.42), 0 28px 70px rgba(0,0,0,0.4)",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        left: { xs: 10, md: 28 },
        right: { xs: 10, md: 28 },
        top: { xs: 14, md: 24 },
        bottom: { xs: 14, md: 24 },
        display: "grid",
        gridTemplateColumns: "repeat(14, minmax(0, 1fr))",
        gap: 0,
        alignItems: "stretch",
      }}
    >
      {TRACK_CELLS.map((cell) => {
        const marker =
          cell === 0 ? "START" : cell === TRACK_CELLS.length - 1 ? "GOAL" : "";

        return (
          <Box
            key={cell}
            sx={{
              position: "relative",
              height: "100%",
              minWidth: 0,
              border: "4px solid #ffffff",
              borderLeftWidth: cell === 0 ? "4px" : 0,
              bgcolor: "transparent",
              boxShadow: "0 12px 26px rgba(0,0,0,0.24)",
              overflow: "visible",
            }}
          >
            {marker && (
              <Typography
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: { xs: 17, sm: 22, md: 30 },
                  fontWeight: 900,
                  letterSpacing: 0,
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  pointerEvents: "none",
                }}
              >
                {marker}
              </Typography>
            )}
          </Box>
        );
      })}
      {SUPPORTER_CHARACTERS.map((character, index) => (
        <Box
          key={character.id}
          sx={{
            position: "absolute",
            left: getPieceLeft(
              characterPositions[character.id] ?? START_POSITION
            ),
            top: `${getPieceOffset(index)}%`,
            transform: "translate(-50%, -50%)",
            width: { xs: 34, md: 47 },
            aspectRatio: "1 / 1",
            display: "grid",
            placeItems: "center",
            borderRadius: 0,
            border: "1.5px solid rgba(255,255,255,0.88)",
            bgcolor: "rgba(3,31,26,0.72)",
            boxShadow:
              "inset 0 0 0 1px rgba(15,23,42,0.62), 0 7px 14px rgba(0,0,0,0.42)",
            pointerEvents: "none",
            zIndex: 3,
            transition: "left 620ms cubic-bezier(.2,.9,.25,1)",
          }}
        >
          <Box
            component="img"
            src={character.pieceSrc}
            alt=""
            sx={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
            }}
          />
        </Box>
      ))}
    </Box>
  </Box>
);

const RacePlayerOrderBar = ({
  players,
  currentPlayerId,
  coinGiveUpPlayerId,
}: {
  players: HorrorRacePlayer[];
  currentPlayerId: number | null;
  coinGiveUpPlayerId: number | null;
}) => (
  <Box
    sx={{
      width: "100%",
      minWidth: 0,
      overflowX: "auto",
      whiteSpace: "nowrap",
      borderTop: "1px solid rgba(250,204,21,0.42)",
      borderBottom: "1px solid rgba(250,204,21,0.42)",
      bgcolor: "rgba(3,31,26,0.36)",
      px: { xs: 0.35, md: 0.5 },
      py: { xs: 0.65, md: 0.8 },
      boxSizing: "border-box",
    }}
  >
    {players.map((player) => {
      const active = player.id === currentPlayerId;
      const gaveUp = player.id === coinGiveUpPlayerId;

      return (
        <Box
          component="span"
          key={player.id}
          sx={{
            display: "inline-flex",
            alignItems: "baseline",
            color: gaveUp
              ? "#fca5a5"
              : active
              ? "#facc15"
              : "rgba(255,255,255,0.7)",
            fontSize: active ? { xs: 24, md: 32 } : { xs: 14, md: 16 },
            fontWeight: active || gaveUp ? 900 : 800,
            lineHeight: 1.1,
            mr: { xs: 1.25, md: 1.8 },
            textShadow: active ? "0 8px 18px rgba(0,0,0,0.42)" : "none",
          }}
        >
          {player.name.trim() || "이름 없음"}
          {gaveUp && (
            <Box
              component="span"
              sx={{
                color: "#ef4444",
                fontSize: { xs: 12, md: 13 },
                fontWeight: 900,
                ml: 0.35,
              }}
            >
              (코인포기)
            </Box>
          )}
        </Box>
      );
    })}
  </Box>
);

interface ZoneCoinGroup {
  characterId: string;
  confirmedCoins: HorrorRaceCoin[];
  pendingCoins: HorrorRaceCoin[];
  count: number;
}

const getZoneCoinGroups = (
  confirmedCoins: HorrorRaceCoin[],
  pendingCoins: HorrorRaceCoin[]
): ZoneCoinGroup[] => {
  const characterOrder = SUPPORTER_CHARACTERS.map((character) => character.id);
  const groups = characterOrder.map((characterId) => {
    const groupConfirmedCoins = confirmedCoins.filter(
      (coin) => coin.characterId === characterId
    );
    const groupPendingCoins = pendingCoins.filter(
      (coin) => coin.characterId === characterId
    );

    return {
      characterId,
      confirmedCoins: groupConfirmedCoins,
      pendingCoins: groupPendingCoins,
      count: groupConfirmedCoins.length + groupPendingCoins.length,
    };
  });
  const visibleGroups = groups.filter((group) => group.count > 0);
  return visibleGroups
    .sort(
      (left, right) => right.count - left.count
    );
};

const ZoneCoinStack = ({
  confirmedCoins,
  pendingCoins,
}: {
  confirmedCoins: HorrorRaceCoin[];
  pendingCoins: HorrorRaceCoin[];
}) => {
  const coinGroups = getZoneCoinGroups(confirmedCoins, pendingCoins);

  return (
    <Stack
      spacing={0.15}
      sx={{
        zIndex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        pt: { xs: 0.55, md: 0.75 },
        pl: { xs: 4.6, md: 6.4 },
        pr: { xs: 0.65, md: 0.9 },
        pb: { xs: 0.25, md: 0.4 },
        boxSizing: "border-box",
      }}
    >
      {coinGroups.map((group) => {
        const visibleCoins = [
          ...group.confirmedCoins.map((coin) => ({ coin, draggable: false })),
          ...group.pendingCoins.map((coin) => ({ coin, draggable: true })),
        ];

        return (
          <Stack
            key={group.characterId}
            direction="row"
            alignItems="center"
            spacing={0.4}
            sx={{
              position: "relative",
              height: { xs: 24, md: 34 },
              px: 0.35,
              borderRadius: 0.5,
              minWidth: 0,
            }}
          >
            <Stack
              direction="row"
              sx={{
                position: "relative",
                zIndex: 1,
                flex: 1,
                minWidth: 0,
                overflowX: "hidden",
                overflowY: "visible",
                alignItems: "center",
                height: "100%",
                pl: 0.15,
              }}
            >
              {visibleCoins.map(({ coin, draggable }, index) => (
                <Box
                  key={coin.id}
                  sx={{
                    ml: index === 0 ? 0 : { xs: -0.25, md: -0.28 },
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                    borderRadius: 0.5,
                    p: draggable ? 0.2 : 0,
                    bgcolor: draggable ? "rgba(6,95,70,0.46)" : "transparent",
                    border: draggable
                      ? "1px solid rgba(187,247,208,0.22)"
                      : "none",
                    opacity: draggable ? 0.82 : 1,
                    boxShadow: draggable
                      ? "inset 0 0 0 1px rgba(255,255,255,0.08)"
                      : "none",
                    filter: "none",
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    {draggable ? (
                      <DraggableCoinImage coin={coin} size={31} />
                    ) : (
                      <CoinImage coin={coin} size={31} />
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

const panelSx = {
  width: "100%",
  maxWidth: "100%",
  borderRadius: 1,
  border: "1px solid rgba(255,255,255,0.2)",
  bgcolor: "rgba(3, 31, 26, 0.44)",
  boxSizing: "border-box",
  p: { xs: 1.25, md: 1.75 },
};

const PlayerSettingFrame = ({ game }: { game: HorrorRaceGame }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  return (
    <Stack spacing={1} sx={panelSx}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ minWidth: 0 }}
      >
        <Typography fontSize={{ xs: 18, md: 22 }} fontWeight={900}>
          플레이어 설정
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          <Button
            variant="outlined"
            onClick={game.randomizePlayerOrder}
            sx={{
              height: { xs: 34, md: 38 },
              minWidth: { xs: 78, md: 92 },
              borderRadius: 1,
              borderColor: "rgba(250,204,21,0.42)",
              color: "#facc15",
              fontSize: { xs: 13, md: 15 },
              fontWeight: 900,
              px: { xs: 0.75, md: 1.25 },
            }}
          >
            랜덤
          </Button>
          <Button
            variant="outlined"
            onClick={game.addPlayer}
            disabled={game.players.length >= HORROR_RACE_MAX_PLAYERS}
            sx={{
              height: { xs: 34, md: 38 },
              minWidth: { xs: 48, md: 58 },
              borderRadius: 1,
              borderColor: "rgba(255,255,255,0.32)",
              color: "#f8fafc",
              fontSize: { xs: 13, md: 15 },
              fontWeight: 900,
              px: { xs: 0.75, md: 1.25 },
              "&.Mui-disabled": {
                borderColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.32)",
              },
            }}
          >
            추가
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 0.75,
        }}
      >
        {game.players.map((player, index) => {
          const isDragging = draggedIndex === index;
          const isDragTarget = dragOverIndex === index && draggedIndex !== index;

          return (
            <Stack
              key={player.id}
              direction="row"
              spacing={0.65}
              alignItems="center"
              onDragOver={(event) => {
                event.preventDefault();
                setDragOverIndex(index);
              }}
              onDrop={(event) => {
                event.preventDefault();

                if (draggedIndex !== null) {
                  game.movePlayer(draggedIndex, index);
                }

                setDraggedIndex(null);
                setDragOverIndex(null);
              }}
              sx={{
                border: isDragTarget
                  ? "1px solid rgba(250,204,21,0.9)"
                  : "1px solid rgba(255,255,255,0.12)",
                borderRadius: 1,
                p: 0.65,
                bgcolor: isDragging
                  ? "rgba(250,204,21,0.12)"
                  : "rgba(255,255,255,0.03)",
                opacity: isDragging ? 0.55 : 1,
              }}
            >
              <Box
                draggable
                onDragStart={(event) => {
                  setDraggedIndex(index);
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", String(player.id));
                }}
                onDragEnd={() => {
                  setDraggedIndex(null);
                  setDragOverIndex(null);
                }}
                sx={{
                  width: 28,
                  height: { xs: 38, md: 42 },
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.58)",
                  cursor: "grab",
                  touchAction: "none",
                  "&:active": { cursor: "grabbing" },
                }}
              >
                <DragIndicatorRounded sx={{ fontSize: 23 }} />
              </Box>
              <Typography
                width={30}
                fontSize={{ xs: 16, md: 18 }}
                fontWeight={900}
                textAlign="center"
                color="#facc15"
              >
                {index + 1}
              </Typography>
              <TextField
                value={player.name}
                onChange={(event) => {
                  game.updatePlayerName(player.id, event.target.value);
                }}
                size="small"
                inputProps={{ "aria-label": `player-${player.id}` }}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  "& .MuiOutlinedInput-root": {
                    height: { xs: 38, md: 42 },
                    borderRadius: 1,
                    bgcolor: "rgba(255,255,255,0.94)",
                    fontWeight: 800,
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: { xs: 16, md: 17 },
                    fontWeight: 800,
                  },
                }}
              />
              <Button
                variant="text"
                onClick={() => {
                  game.removePlayer(player.id);
                }}
                disabled={game.players.length <= HORROR_RACE_MIN_PLAYERS}
                sx={{
                  minWidth: { xs: 48, md: 54 },
                  height: { xs: 38, md: 42 },
                  color: "rgba(255,255,255,0.82)",
                  fontSize: { xs: 14, md: 15 },
                  fontWeight: 900,
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.28)",
                  },
                }}
              >
                삭제
              </Button>
            </Stack>
          );
        })}
      </Box>
    </Stack>
  );
};

const SupporterSelectionFrame = ({ game }: { game: HorrorRaceGame }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const selectedPlayer =
    game.players.find((player) => player.id === selectedPlayerId) ?? null;
  const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCharacterIds(selectedPlayer?.supporterCharacterIds ?? []);
  }, [selectedPlayer]);

  const closeDialog = () => {
    setSelectedPlayerId(null);
  };

  return (
    <>
      <Stack spacing={1.25} sx={panelSx}>
        <Typography fontSize={{ xs: 18, md: 22 }} fontWeight={900}>
          응원 캐릭터 선정
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 0.85, md: 1 },
          }}
        >
          {game.players.map((player) => {
            const confirmed = player.supporterCharacterIds.length === 2;

            return (
              <Button
                key={player.id}
                onClick={() => {
                  setSelectedPlayerId(player.id);
                }}
                sx={{
                  position: "relative",
                  minHeight: { xs: 92, md: 108 },
                  borderRadius: 1,
                  border: confirmed
                    ? "2px solid rgba(250,204,21,0.95)"
                    : "1px solid rgba(255,255,255,0.18)",
                  background: confirmed
                    ? "linear-gradient(135deg, rgba(21,128,61,0.92), rgba(5,46,36,0.92))"
                    : "linear-gradient(135deg, rgba(6,95,70,0.82), rgba(3,31,26,0.9))",
                  color: "#f8fafc",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 1, md: 1.25 },
                  textAlign: "center",
                  textTransform: "none",
                  overflow: "hidden",
                  boxShadow: confirmed
                    ? "inset 0 0 0 1px rgba(255,255,255,0.16), 0 14px 28px rgba(0,0,0,0.25)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.04), 0 10px 22px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background: confirmed
                      ? "linear-gradient(135deg, rgba(22,163,74,0.94), rgba(5,46,36,0.96))"
                      : "linear-gradient(135deg, rgba(6,95,70,0.94), rgba(3,31,26,0.96))",
                  },
                }}
              >
                {confirmed && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: { xs: 7, md: 9 },
                      top: { xs: 7, md: 9 },
                      width: { xs: 24, md: 28 },
                      aspectRatio: "1 / 1",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#facc15",
                      color: "#052e24",
                      boxShadow: "0 5px 14px rgba(0,0,0,0.28)",
                    }}
                  >
                    <CheckRounded sx={{ fontSize: { xs: 18, md: 21 } }} />
                  </Box>
                )}
                <Typography
                  fontSize={{ xs: 20, md: 25 }}
                  fontWeight={900}
                  lineHeight={1.08}
                  noWrap
                  sx={{
                    width: "100%",
                    textShadow: "0 3px 10px rgba(0,0,0,0.35)",
                  }}
                >
                  {player.name.trim() || "이름 없음"}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </Stack>

      <Dialog
        open={Boolean(selectedPlayer)}
        onClose={closeDialog}
        PaperProps={{
          sx: {
            width: "min(460px, calc(100vw - 32px))",
            borderRadius: 1,
            bgcolor: "#052e24",
            color: "#f8fafc",
            border: "1px solid rgba(250,204,21,0.26)",
            boxShadow: "0 28px 70px rgba(0,0,0,0.48)",
          },
        }}
      >
        <DialogContent>
          <Stack spacing={2}>
            <Typography fontSize={{ xs: 20, md: 22 }} fontWeight={900}>
              응원할 캐릭터 2개를 선택하세요
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: { xs: 0.75, md: 1 },
              }}
            >
              {SUPPORTER_CHARACTERS.map((character) => {
                const selected = selectedCharacterIds.includes(character.id);

                return (
                  <Button
                    key={character.id}
                    onClick={() => {
                      setSelectedCharacterIds((prev) => {
                        if (prev.includes(character.id)) {
                          return prev.filter((id) => id !== character.id);
                        }

                        if (prev.length >= 2) {
                          return prev;
                        }

                        return [...prev, character.id];
                      });
                    }}
                    aria-label={character.label}
                    sx={{
                      minWidth: 0,
                      height: { xs: 62, md: 74 },
                      borderRadius: 1,
                      border: selected
                        ? "3px solid #ffffff"
                        : "1px solid rgba(255,255,255,0.24)",
                      bgcolor: selected
                        ? "rgba(250,204,21,0.2)"
                        : "rgba(255,255,255,0.06)",
                      opacity:
                        selected || selectedCharacterIds.length < 2 ? 1 : 0.42,
                      boxShadow: selected
                        ? "0 0 0 2px rgba(250,204,21,0.7)"
                        : "none",
                      p: 0.35,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={character.imageSrc}
                      alt=""
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: selected
                          ? "drop-shadow(0 8px 12px rgba(0,0,0,0.38))"
                          : "drop-shadow(0 6px 10px rgba(0,0,0,0.28))",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                );
              })}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} sx={{ color: "rgba(248,250,252,0.72)" }}>
            취소
          </Button>
          <Button
            variant="contained"
            disabled={!selectedPlayer || selectedCharacterIds.length !== 2}
            onClick={() => {
              if (!selectedPlayer || selectedCharacterIds.length !== 2) {
                return;
              }

              game.setSupporterCharacters(
                selectedPlayer.id,
                selectedCharacterIds
              );
              closeDialog();
            }}
            sx={{
              bgcolor: "#facc15",
              color: "#16352b",
              fontWeight: 900,
              "&:hover": { bgcolor: "#eab308" },
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const RaceFrame = ({ game }: { game: HorrorRaceGame }) => (
  <Stack
    spacing={0.75}
    justifyContent="center"
    sx={{ width: "100%", minWidth: 0, flex: 1, minHeight: 0 }}
  >
    <Typography
      sx={{
        color: "rgba(255,255,255,0.78)",
        fontSize: { xs: 15, md: 18 },
        fontWeight: 900,
        lineHeight: 1,
        textAlign: "center",
      }}
    >
      ROUND {game.currentRound}
    </Typography>
    <RacePlayerOrderBar
      players={game.roundOrderPlayerIds
        .map((playerId) =>
          game.players.find((player) => player.id === playerId)
        )
        .filter((player): player is HorrorRacePlayer => Boolean(player))}
      currentPlayerId={game.currentPlayerId}
      coinGiveUpPlayerId={game.coinGiveUpPlayerId}
    />
    <TrackBoard characterPositions={game.characterPositions} />
    <Stack spacing={0.9} sx={{ width: "100%", minWidth: 0 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: { xs: 0.75, md: 1.25 },
        }}
      >
        {RACE_STEP_VALUES.map((value) => {
          const resolving = game.activeResolutionZone === value;

          return (
            <Box
              key={value}
              onClick={() => {
                game.resolveRoundZone(value);
              }}
              onDragOver={(event) => {
                if (game.currentTurnDrawCount === 0) {
                  return;
                }

                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={(event) => {
                event.preventDefault();
                const coinId = event.dataTransfer.getData("text/plain");

                if (coinId) {
                  game.placeDrawnCoin(value, coinId);
                }
              }}
              sx={{
                height: { xs: 112, md: 152 },
                borderRadius: 1,
                border: resolving
                  ? "3px solid rgba(250,204,21,0.98)"
                  : "3px solid rgba(255,255,255,0.88)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                bgcolor: "rgba(3,31,26,0.66)",
                background:
                  "linear-gradient(135deg, rgba(6,95,70,0.9), rgba(3,31,26,0.92))",
                boxShadow: resolving
                  ? "0 0 0 1px rgba(250,204,21,0.26), 0 0 24px rgba(250,204,21,0.2), inset 0 0 0 1px rgba(250,204,21,0.28)"
                  : "inset 0 0 0 1px rgba(250,204,21,0.18), 0 14px 28px rgba(0,0,0,0.28)",
                cursor: resolving ? "pointer" : "default",
                "&::before": resolving
                  ? {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at 50% 42%, rgba(250,204,21,0.18), transparent 62%), linear-gradient(180deg, rgba(250,204,21,0.08), transparent 58%)",
                      animation: "zoneResolvePulse 1400ms ease-in-out infinite",
                      pointerEvents: "none",
                    }
                  : undefined,
                "@keyframes zoneResolvePulse": {
                  "0%, 100%": { opacity: 0.45 },
                  "50%": { opacity: 0.95 },
                },
                "&::after": resolving
                  ? {
                      content: '""',
                      position: "absolute",
                      inset: 4,
                      borderRadius: 0.5,
                      border: "1px solid rgba(250,204,21,0.28)",
                      boxShadow: "inset 0 0 18px rgba(250,204,21,0.1)",
                      pointerEvents: "none",
                    }
                  : undefined,
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  left: { xs: 10, md: 14 },
                  top: { xs: 8, md: 10 },
                  color: "#ffffff",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: { xs: 34, md: 48 },
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: 0,
                  opacity: 0.5,
                  textShadow:
                    "0 3px 0 rgba(3,31,26,0.9), 0 12px 22px rgba(0,0,0,0.45)",
                }}
              >
                {value}
              </Typography>
              <ZoneCoinStack
                confirmedCoins={game.coinZones[value]}
                pendingCoins={game.pendingCoinZones[value]}
              />
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 82, md: 102 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 0.75, md: 1 },
          px: { xs: 0, md: 12 },
          overflow: "visible",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            if (game.currentTurnDrawCount > 0) {
              game.confirmCoinPlacement();
              return;
            }

            game.drawCoin();
          }}
          disabled={
            game.currentTurnDrawCount > 0
              ? !game.canConfirmCoinPlacement
              : !game.canDrawCoin
          }
          sx={{
            position: "relative",
            zIndex: 2,
            width: { xs: "min(64%, 300px)", md: 340 },
            height: { xs: 60, md: 70 },
            borderRadius: 1,
            border: "4px solid rgba(255,255,255,0.94)",
            color: "#173a25",
            background:
              "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.54), transparent 30%), linear-gradient(180deg, #fde047 0%, #facc15 48%, #ca8a04 100%)",
            boxShadow:
              "inset 0 0 0 3px rgba(22,163,74,0.42), inset 0 -10px 20px rgba(113,63,18,0.28), 0 14px 30px rgba(0,0,0,0.34)",
            textTransform: "none",
            fontSize: { xs: 21, md: 27 },
            fontWeight: 900,
            letterSpacing: 0,
            textShadow: "0 2px 0 rgba(255,255,255,0.42)",
            "&:hover": {
              background:
                "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.6), transparent 30%), linear-gradient(180deg, #fef08a 0%, #facc15 48%, #a16207 100%)",
              boxShadow:
                "inset 0 0 0 3px rgba(22,163,74,0.5), inset 0 -10px 20px rgba(113,63,18,0.24), 0 16px 34px rgba(0,0,0,0.38)",
            },
            "&.Mui-disabled": {
              border: "4px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.26)",
              background: "rgba(255,255,255,0.08)",
              boxShadow: "none",
            },
          }}
        >
          {game.currentTurnDrawCount > 0 ? "확정" : "코인 뽑기"}
        </Button>
        <Button
          variant="outlined"
          onClick={game.giveUpCoin}
          disabled={!game.canGiveUpCoin}
          sx={{
            position: "relative",
            zIndex: 2,
            width: { xs: "min(36%, 170px)", md: 190 },
            height: { xs: 60, md: 70 },
            borderRadius: 1,
            color: "#fecaca",
            border: "2px solid rgba(248,113,113,0.72)",
            bgcolor: "rgba(127,29,29,0.3)",
            fontSize: { xs: 15, md: 19 },
            fontWeight: 900,
            textTransform: "none",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 22px rgba(0,0,0,0.24)",
            "&:hover": {
              border: "2px solid rgba(252,165,165,0.86)",
              bgcolor: "rgba(153,27,27,0.42)",
              color: "#fee2e2",
            },
            "&.Mui-disabled": {
              border: "2px solid rgba(255,255,255,0.12)",
              bgcolor: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.24)",
            },
          }}
        >
          코인 포기
        </Button>
        {game.currentDrawnCoins.length > 0 && (
          <DrawnCoinOrb coins={game.currentDrawnCoins} />
        )}
      </Box>
    </Stack>
  </Stack>
);

const ResultFrame = ({ game }: { game: HorrorRaceGame }) => {
  const resultByPlayerId = new Map(
    game.playerResults.map((result) => [result.playerId, result])
  );
  const rankedPlayers = [...game.players].sort((left, right) => {
    const leftResult = resultByPlayerId.get(left.id);
    const rightResult = resultByPlayerId.get(right.id);

    return (
      (rightResult?.totalGarnets ?? right.garnets) -
      (leftResult?.totalGarnets ?? left.garnets)
    );
  });
  const rankedCharacters = [...game.characterRanks].sort(
    (left, right) => left.rank - right.rank || right.position - left.position
  );

  return (
    <Stack spacing={1.15} sx={panelSx}>
      <Typography fontSize={{ xs: 20, md: 24 }} fontWeight={900}>
        결과 발표
      </Typography>
      {rankedCharacters.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: { xs: 0.7, md: 1 },
          }}
        >
          {rankedCharacters.map((rank) => {
            const character = getSupporterCharacter(rank.characterId);

            return (
              <Stack
                key={`${rank.characterId}-${rank.rank}`}
                direction="row"
                alignItems="center"
                spacing={0.8}
                sx={{
                  minHeight: { xs: 58, md: 70 },
                  borderRadius: 1,
                  border:
                    rank.rank === 1
                      ? "2px solid rgba(250,204,21,0.95)"
                      : "1px solid rgba(255,255,255,0.18)",
                  bgcolor:
                    rank.rank === 1
                      ? "rgba(250,204,21,0.18)"
                      : "rgba(255,255,255,0.05)",
                  px: { xs: 0.75, md: 1 },
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    width: { xs: 28, md: 34 },
                    color: rank.rank === 1 ? "#facc15" : "#ffffff",
                    fontSize: { xs: 22, md: 28 },
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {rank.rank}
                </Typography>
                <Box
                  component="img"
                  src={character.imageSrc}
                  alt=""
                  sx={{
                    width: { xs: 34, md: 42 },
                    aspectRatio: "1 / 1",
                    objectFit: "contain",
                    filter: "drop-shadow(0 7px 10px rgba(0,0,0,0.38))",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  fontSize={{ xs: 14, md: 18 }}
                  fontWeight={900}
                  noWrap
                  sx={{ minWidth: 0 }}
                >
                  {character.label}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: 0.75,
        }}
      >
        {rankedPlayers.map((player) => {
          const result = resultByPlayerId.get(player.id);
          const winner = game.winnerPlayerIds.includes(player.id);
          const eliminationCandidate =
            game.eliminationCandidatePlayerIds.includes(player.id);

          return (
            <Stack
              key={player.id}
              direction="row"
              alignItems="center"
              spacing={0.9}
              sx={{
                minHeight: { xs: 54, md: 62 },
                border: winner
                  ? "2px solid rgba(250,204,21,0.92)"
                  : eliminationCandidate
                  ? "2px solid rgba(248,113,113,0.78)"
                  : "1px solid rgba(255,255,255,0.16)",
                borderRadius: 1,
                bgcolor: winner
                  ? "rgba(250,204,21,0.14)"
                  : eliminationCandidate
                  ? "rgba(127,29,29,0.22)"
                  : "rgba(255,255,255,0.04)",
                px: { xs: 0.85, md: 1 },
                minWidth: 0,
              }}
            >
              <Stack direction="row" spacing={0.3} sx={{ flexShrink: 0 }}>
                {player.supporterCharacterIds.map((characterId) => {
                  const supporterCharacter = getSupporterCharacter(characterId);

                  return (
                    <Box
                      component="img"
                      src={supporterCharacter.imageSrc}
                      alt=""
                      key={characterId}
                      sx={{
                        width: { xs: 24, md: 28 },
                        aspectRatio: "1 / 1",
                        objectFit: "contain",
                        filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.35))",
                      }}
                    />
                  );
                })}
              </Stack>
              <Typography
                fontSize={{ xs: 17, md: 20 }}
                fontWeight={900}
                noWrap
                sx={{ flex: 1, minWidth: 0 }}
              >
                {player.name.trim() || "이름 없음"}
              </Typography>
              <Typography
                sx={{
                  color: winner
                    ? "#facc15"
                    : eliminationCandidate
                    ? "#fca5a5"
                    : "rgba(255,255,255,0.72)",
                  fontSize: { xs: 13, md: 14 },
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                {winner ? "우승" : eliminationCandidate ? "탈락후보" : ""}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.35}
                sx={{
                  width: { xs: 48, md: 58 },
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: 17, md: 20 },
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {result?.gainedGarnets ?? 0}
                </Typography>
                <GarnetIcon size={18} />
              </Stack>
            </Stack>
          );
        })}
      </Box>
    </Stack>
  );
};

const renderPhaseFrame = (game: HorrorRaceGame) => {
  if (game.phase === "PLAYER_SETTING") {
    return <PlayerSettingFrame game={game} />;
  }

  if (game.phase === "SUPPORTER_SELECTION") {
    return <SupporterSelectionFrame game={game} />;
  }

  if (game.phase === "RESULT") {
    return <ResultFrame game={game} />;
  }

  return <RaceFrame game={game} />;
};

export function HorrorRacePageContent({ game }: { game: HorrorRaceGame }) {
  const isRacePhase = game.phase === "RACE";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh",
        bgcolor: "#052e24",
        color: "#f8fafc",
        px: { xs: 1.25, md: 2.5 },
        py: { xs: 1.25, md: 2 },
        boxSizing: "border-box",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #031f1a 0%, #052e24 46%, #0f2f26 100%)",
      }}
    >
      <HomeButton color="#f8fafc" />
      <Stack
        spacing={isRacePhase ? 0.45 : 1}
        width="100%"
        maxWidth={isRacePhase ? 1180 : 760}
        height="100%"
        mx="auto"
        sx={{ minHeight: 0 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%", minWidth: 0 }}
        >
          <Typography fontSize={{ xs: 20, md: 24 }} fontWeight={900} noWrap>
            호러 레이스
          </Typography>
          <Stack direction="row" spacing={0.75}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackRounded />}
              disabled={!game.canMoveToPreviousPhase}
              onClick={game.moveToPreviousPhase}
              sx={{
                borderRadius: 1,
                borderColor: "rgba(255,255,255,0.22)",
                color: "#f8fafc",
                minWidth: { xs: 42, md: 72 },
                height: { xs: 34, md: 36 },
                fontWeight: 900,
                fontSize: { xs: 0, md: 13 },
                px: { xs: 0.75, md: 1.25 },
                "&.Mui-disabled": {
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                },
              }}
            >
              이전
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              disabled={!game.canMoveToNextPhase}
              onClick={game.moveToNextPhase}
              sx={{
                borderRadius: 1,
                bgcolor: "#facc15",
                color: "#16352b",
                minWidth: { xs: 42, md: 72 },
                height: { xs: 34, md: 36 },
                fontWeight: 900,
                fontSize: { xs: 0, md: 13 },
                px: { xs: 0.75, md: 1.25 },
                "&:hover": { bgcolor: "#eab308" },
                "&.Mui-disabled": {
                  bgcolor: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.35)",
                },
              }}
            >
              다음
            </Button>
          </Stack>
        </Stack>

        <PhaseNavigation game={game} />
        {renderPhaseFrame(game)}
      </Stack>
    </Box>
  );
}
