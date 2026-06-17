import HomeButton from "@/components/HomeButton";
import {
  AccountBalanceRounded,
  PauseRounded,
  PlayArrowRounded,
  ReceiptLongRounded,
  RestartAltRounded,
  SettingsRounded,
  TimerRounded,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  MAX_HOLDING_PER_COMPANY,
  ROUND_GAME_MINUTES,
  TICK_MINUTES,
} from "../fixtures";
import {
  Company,
  CompanyId,
  TradeType,
} from "../types";
import {
  formatGameTime,
  formatMoney,
  getCompany,
  getCurrentPrices,
} from "../utils";
import type React from "react";
import { useStormStockMarketGame } from "../hooks/useStormStockMarketGame";

const VALID_PLAYER_COUNTS = [2, 3, 4, 6, 8, 12, 24];
const EXCHANGE_LIMIT_SECONDS = 40;

const phaseLabelMap = {
  SETUP: "설정",
  ROUND_READY: "정보 공개",
  RUNNING: "라운드 진행",
  ROUND_BREAK: "라운드 전환",
  ENDED: "최종 정산",
} as const;

const tradeTypeLabelMap = {
  BUY: "매수",
  SELL: "매도",
} as const;

const companyVisualMap: Record<
  CompanyId,
  { card: string; transparent: string }
> = {
  disconnectedTelecom: {
    card: "/image/storm-stock-market/telecom-card.png",
    transparent: "/image/storm-stock-market/telecom-transparent.png",
  },
  deathLife: {
    card: "/image/storm-stock-market/insurance-card.png",
    transparent: "/image/storm-stock-market/insurance-transparent.png",
  },
  stoneAgeElectronics: {
    card: "/image/storm-stock-market/electronics-card.png",
    transparent: "/image/storm-stock-market/electronics-transparent.png",
  },
  earthquakeConstruction: {
    card: "/image/storm-stock-market/construction-card.png",
    transparent: "/image/storm-stock-market/construction-transparent.png",
  },
  bankruptBank: {
    card: "/image/storm-stock-market/bank-card.png",
    transparent: "/image/storm-stock-market/bank-transparent.png",
  },
};

const SEGMENT_MAP: Record<string, string[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "g", "c", "d"],
  "4": ["f", "g", "b", "c"],
  "5": ["a", "f", "g", "c", "d"],
  "6": ["a", "f", "g", "e", "c", "d"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
};

const formatDisplayPrice = (value: number) => value.toLocaleString("ko-KR");

const formatDisplayDiff = (value: number) =>
  `${value > 0 ? "+" : ""}${formatDisplayPrice(value)}`;

function SevenSegmentDigit({ value, color }: { value: string; color: string }) {
  const activeSegments = SEGMENT_MAP[value] ?? [];
  const segmentSx = {
    position: "absolute",
    bgcolor: color,
    borderRadius: "2px",
  };

  return (
    <Box
      component="span"
      sx={{
        position: "relative",
        display: "inline-block",
        width: "0.62em",
        height: "1em",
        mx: "0.035em",
        verticalAlign: "-0.08em",
      }}
    >
      <Box
        component="span"
        sx={{
          ...segmentSx,
          top: 0,
          left: "18%",
          width: "64%",
          height: "9%",
          opacity: activeSegments.includes("a") ? 1 : 0.14,
        }}
      />
      <Box
        component="span"
        sx={{
          ...segmentSx,
          top: "7%",
          right: 0,
          width: "12%",
          height: "38%",
          opacity: activeSegments.includes("b") ? 1 : 0.14,
        }}
      />
      <Box
        component="span"
        sx={{
          ...segmentSx,
          bottom: "7%",
          right: 0,
          width: "12%",
          height: "38%",
          opacity: activeSegments.includes("c") ? 1 : 0.14,
        }}
      />
      <Box
        component="span"
        sx={{
          ...segmentSx,
          bottom: 0,
          left: "18%",
          width: "64%",
          height: "9%",
          opacity: activeSegments.includes("d") ? 1 : 0.14,
        }}
      />
      <Box
        component="span"
        sx={{
          ...segmentSx,
          bottom: "7%",
          left: 0,
          width: "12%",
          height: "38%",
          opacity: activeSegments.includes("e") ? 1 : 0.14,
        }}
      />
      <Box
        component="span"
        sx={{
          ...segmentSx,
          top: "7%",
          left: 0,
          width: "12%",
          height: "38%",
          opacity: activeSegments.includes("f") ? 1 : 0.14,
        }}
      />
      <Box
        component="span"
        sx={{
          ...segmentSx,
          top: "45.5%",
          left: "18%",
          width: "64%",
          height: "9%",
          opacity: activeSegments.includes("g") ? 1 : 0.14,
        }}
      />
    </Box>
  );
}

function SevenSegmentNumber({
  value,
  color,
  fontSize,
}: {
  value: string;
  color: string;
  fontSize: { xs: number; md: number } | number;
}) {
  return (
    <Box
      component="span"
      aria-label={value}
      sx={{
        display: "inline-flex",
        alignItems: "baseline",
        justifyContent: "flex-end",
        fontSize,
        lineHeight: 1,
        color,
        fontFamily: '"Roboto Mono", monospace',
        fontVariantNumeric: "tabular-nums",
        letterSpacing: 0,
        whiteSpace: "nowrap",
      }}
    >
      {value.split("").map((character, index) =>
        SEGMENT_MAP[character] ? (
          <SevenSegmentDigit
            key={`${character}-${index}`}
            value={character}
            color={color}
          />
        ) : (
          <Box
            component="span"
            key={`${character}-${index}`}
            sx={{
              display: "inline-block",
              minWidth:
                character === "," ? "0.22em" : character === "-" ? "0.42em" : "0.5em",
              mx: character === "," ? "0.025em" : "0.04em",
              color,
              fontWeight: 900,
              textAlign: "center",
            }}
          >
            {character}
          </Box>
        )
      )}
    </Box>
  );
}

function Panel({
  children,
  title,
  action,
}: {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #D7DCE3",
        borderRadius: 2,
        bgcolor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ px: 2, py: 1.5, borderBottom: "1px solid #E5E7EB" }}
      >
        <Typography fontSize={17} fontWeight={800} color="#111827">
          {title}
        </Typography>
        {action}
      </Stack>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
}

function ToolCard({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Paper
      component="button"
      elevation={0}
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 1.1,
        border: "1px solid rgba(250, 204, 21, 0.2)",
        borderRadius: 2,
        bgcolor: "rgba(24, 24, 27, 0.88)",
        color: "#F8FAFC",
        cursor: "pointer",
        font: "inherit",
        fontWeight: 900,
        "&:hover": {
          bgcolor: "rgba(39, 39, 42, 0.95)",
          borderColor: "rgba(250, 204, 21, 0.45)",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 30,
          height: 30,
          borderRadius: 1.5,
          bgcolor: "#FACC15",
          color: "#111827",
        }}
      >
        {icon}
      </Box>
      <Typography fontSize={14} fontWeight={900}>
        {label}
      </Typography>
    </Paper>
  );
}

function MarketPriceBoard({
  companies,
  currentPrices,
  previousPrices,
}: {
  companies: Company[];
  currentPrices: Record<CompanyId, number>;
  previousPrices: Record<CompanyId, number>;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#050505",
        border: "1px solid #2A2A2A",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(250, 204, 21, 0.16)",
      }}
    >
      <Box
        sx={{
          px: { xs: 1.5, md: 2 },
          py: { xs: 1.25, md: 1.75 },
          borderBottom: "1px solid rgba(250, 204, 21, 0.24)",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: {
              xs: "74px minmax(0, 1fr) minmax(108px, auto)",
              md: "104px minmax(230px, 0.85fr) minmax(260px, 0.85fr) minmax(170px, 0.55fr) minmax(150px, 0.45fr)",
            },
            gap: { xs: 0.75, md: 1.5 },
            alignItems: "center",
          }}
        >
          <Typography
            display={{ xs: "none", md: "block" }}
            fontSize={18}
            fontWeight={900}
            color="#FACC15"
          >
            카드
          </Typography>
          <Typography fontSize={{ xs: 13, md: 18 }} fontWeight={900} color="#FACC15">
            종목
          </Typography>
          <Typography
            fontSize={{ xs: 13, md: 18 }}
            fontWeight={900}
            color="#FACC15"
            textAlign={{ xs: "right", md: "left" }}
            sx={{ order: { xs: 3, md: 3 } }}
          >
            현재가
          </Typography>
          <Typography
            display={{ xs: "none", md: "block" }}
            fontSize={18}
            fontWeight={900}
            color="#FACC15"
            sx={{ order: 4 }}
          >
            5분 전
          </Typography>
          <Typography
            display={{ xs: "none", md: "block" }}
            fontSize={18}
            fontWeight={900}
            color="#FACC15"
            textAlign="right"
            sx={{ order: 5 }}
          >
            변동
          </Typography>
        </Box>
      </Box>

      {companies.map((company) => {
        const currentPrice = currentPrices[company.id];
        const previousPrice = previousPrices[company.id];
        const priceDiff = currentPrice - previousPrice;
        const diffText = formatDisplayDiff(priceDiff);
        const diffColor =
          priceDiff > 0 ? "#EF4444" : priceDiff < 0 ? "#22C55E" : "#FACC15";
        const companyVisual = companyVisualMap[company.id];

        return (
          <Box
            key={company.id}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "74px minmax(0, 1fr) minmax(108px, auto)",
                md: "104px minmax(230px, 0.85fr) minmax(260px, 0.85fr) minmax(170px, 0.55fr) minmax(150px, 0.45fr)",
              },
              gap: { xs: 0.75, md: 1.5 },
              alignItems: "center",
              px: { xs: 1.5, md: 2 },
              py: { xs: 1.1, md: 1.35 },
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              bgcolor: "rgba(12, 12, 13, 0.96)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 64, md: 90 },
                height: { xs: 64, md: 90 },
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#111113",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Box
                component="img"
                src={companyVisual.card}
                alt=""
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.2,
                }}
              />
              <Box
                component="img"
                src={companyVisual.transparent}
                alt={company.name}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  p: { xs: 0.7, md: 1 },
                }}
              />
            </Box>
            <Box minWidth={0}>
              <Stack direction="row" alignItems="center" spacing={1} minWidth={0}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: company.color,
                    flex: "0 0 auto",
                  }}
                />
                <Typography
                  fontSize={{ xs: 22, md: 34 }}
                  fontWeight={900}
                  color="#F8FAFC"
                  noWrap
                >
                  {company.name}
                </Typography>
              </Stack>
              <Typography
                display={{ xs: "block", md: "none" }}
                mt={0.5}
                fontSize={14}
                color="#9CA3AF"
              >
                5분 전{" "}
                <SevenSegmentNumber
                  value={formatDisplayPrice(previousPrice)}
                  color="#9CA3AF"
                  fontSize={16}
                />{" "}
                · 변동{" "}
                <SevenSegmentNumber
                  value={diffText}
                  color={diffColor}
                  fontSize={16}
                />
              </Typography>
            </Box>

            <Box
              textAlign={{ xs: "right", md: "left" }}
              sx={{ order: { xs: 3, md: 3 } }}
            >
              <SevenSegmentNumber
                value={formatDisplayPrice(currentPrice)}
                color="#FACC15"
                fontSize={{ xs: 34, md: 58 }}
              />
            </Box>
            <Box display={{ xs: "none", md: "block" }} sx={{ order: 4 }}>
              <SevenSegmentNumber
                value={formatDisplayPrice(previousPrice)}
                color="#E5E7EB"
                fontSize={30}
              />
            </Box>
            <Box
              display={{ xs: "none", md: "block" }}
              textAlign="right"
              sx={{ order: 5 }}
            >
              <SevenSegmentNumber value={diffText} color={diffColor} fontSize={34} />
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}

export default function StormStockMarketPageContent() {
  const game = useStormStockMarketGame();
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
  const [selectedCompanyId, setSelectedCompanyId] = useState<CompanyId>(
    "disconnectedTelecom"
  );
  const [tradeType, setTradeType] = useState<TradeType>("BUY");
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [exchangeElapsedSeconds, setExchangeElapsedSeconds] = useState(0);
  const [activeDialog, setActiveDialog] = useState<
    "control" | "exchange" | "records" | null
  >(null);

  useEffect(() => {
    if (game.exchangeStartedAt === null) {
      setExchangeElapsedSeconds(0);
      return;
    }

    const interval = window.setInterval(() => {
      setExchangeElapsedSeconds(
        Math.floor((Date.now() - game.exchangeStartedAt!) / 1000)
      );
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, [game.exchangeStartedAt]);

  useEffect(() => {
    if (!game.players.some((player) => player.id === selectedPlayerId)) {
      setSelectedPlayerId(game.players[0]?.id ?? 1);
    }
  }, [game.players, selectedPlayerId]);

  const selectedPlayer =
    game.players.find((player) => player.id === selectedPlayerId) ??
    game.players[0];
  const exchangeProgress = Math.min(
    100,
    (exchangeElapsedSeconds / EXCHANGE_LIMIT_SECONDS) * 100
  );
  const fiveMinutesAgo = Math.max(0, game.currentMinute - TICK_MINUTES);
  const previousPrices = useMemo(
    () => getCurrentPrices(game.events, game.currentRound, fiveMinutesAgo),
    [fiveMinutesAgo, game.currentRound, game.events]
  );

  const topScore = game.standings[0]?.totalCash ?? 0;
  const bottomScore = game.standings[game.standings.length - 1]?.totalCash ?? 0;
  const winners = game.standings.filter(
    (standing) => standing.totalCash === topScore
  );
  const eliminationCandidates = game.standings.filter(
    (standing) => standing.totalCash === bottomScore
  );

  const handleSubmitTrade = () => {
    const success = game.submitTrade({
      playerId: selectedPlayer?.id ?? 1,
      companyId: selectedCompanyId,
      type: tradeType,
      quantity: tradeQuantity,
    });

    if (success) {
      setTradeQuantity(1);
    }
  };
  const screenPhaseLabel =
    game.phase === "SETUP"
      ? "Player setting"
      : game.phase === "ENDED"
        ? "Result"
        : "Game";
  const isGamePhase = game.phase !== "SETUP" && game.phase !== "ENDED";

  if (isGamePhase) {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          bgcolor: "#020202",
          color: "#FFFFFF",
          pb: 5,
        }}
      >
        <HomeButton />
        <Box
          sx={{
            maxWidth: 1680,
            mx: "auto",
            px: { xs: 1.5, md: 3 },
            pt: { xs: 7, md: 3 },
          }}
        >
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", md: "center" }}
              spacing={1.5}
            >
              <Box>
                <Typography
                  fontSize={{ xs: 26, md: 42 }}
                  fontWeight={900}
                  color="#F8FAFC"
                >
                  폭풍의 증권시장
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1}>
                  <Chip
                    label={`${game.currentRound}라운드`}
                    sx={{ bgcolor: "#FACC15", color: "#111827", fontWeight: 900 }}
                  />
                  <Chip
                    label={formatGameTime(game.currentRound, game.currentMinute)}
                    sx={{ bgcolor: "#18181B", color: "#F8FAFC", fontWeight: 800 }}
                  />
                  <Chip
                    label={phaseLabelMap[game.phase]}
                    sx={{ bgcolor: "#18181B", color: "#F8FAFC", fontWeight: 800 }}
                  />
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <ToolCard
                  icon={<SettingsRounded fontSize="small" />}
                  label="진행"
                  onClick={() => setActiveDialog("control")}
                />
                <ToolCard
                  icon={<AccountBalanceRounded fontSize="small" />}
                  label="거래소"
                  onClick={() => setActiveDialog("exchange")}
                />
                <ToolCard
                  icon={<ReceiptLongRounded fontSize="small" />}
                  label="기록"
                  onClick={() => setActiveDialog("records")}
                />
              </Stack>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={(game.currentMinute / ROUND_GAME_MINUTES) * 100}
              sx={{
                height: 12,
                borderRadius: 999,
                bgcolor: "#18181B",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#FACC15",
                },
              }}
            />

            <MarketPriceBoard
              companies={game.companies}
              currentPrices={game.currentPrices}
              previousPrices={previousPrices}
            />
          </Stack>
        </Box>

        <Dialog
          open={activeDialog === "control"}
          onClose={() => setActiveDialog(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>진행 제어</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <LinearProgress
                variant="determinate"
                value={(game.currentMinute / ROUND_GAME_MINUTES) * 100}
                sx={{ height: 10, borderRadius: 999 }}
              />
              <Typography fontSize={14} color="#4B5563">
                다음 변동: {game.nextTickMinute}분 · 한 tick {TICK_MINUTES}분
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {(game.phase === "ROUND_READY" ||
                  game.phase === "ROUND_BREAK") && (
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowRounded />}
                    onClick={game.startRound}
                  >
                    라운드 시작
                  </Button>
                )}
                {game.phase === "RUNNING" && (
                  <Button
                    variant="outlined"
                    startIcon={<PauseRounded />}
                    onClick={game.pauseRound}
                  >
                    일시정지
                  </Button>
                )}
                {game.phase === "ROUND_BREAK" && game.currentRound === 1 && (
                  <Button variant="outlined" onClick={game.proceedToRoundTwo}>
                    2라운드 정보 공개
                  </Button>
                )}
                <Button
                  color="inherit"
                  startIcon={<RestartAltRounded />}
                  onClick={game.resetGame}
                >
                  초기화
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActiveDialog(null)}>닫기</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={activeDialog === "exchange"}
          onClose={() => setActiveDialog(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>거래소</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Chip
                icon={<TimerRounded />}
                label={
                  game.exchangeStartedAt === null
                    ? "미입장"
                    : `${exchangeElapsedSeconds}s / ${EXCHANGE_LIMIT_SECONDS}s`
                }
                color={
                  exchangeElapsedSeconds > EXCHANGE_LIMIT_SECONDS
                    ? "warning"
                    : "default"
                }
                sx={{ alignSelf: "flex-start" }}
              />
              <LinearProgress
                variant="determinate"
                value={exchangeProgress}
                color={
                  exchangeElapsedSeconds > EXCHANGE_LIMIT_SECONDS
                    ? "warning"
                    : "primary"
                }
                sx={{ height: 8, borderRadius: 999 }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button
                  variant="outlined"
                  onClick={game.startExchangeSession}
                  startIcon={<AccountBalanceRounded />}
                >
                  입장 타이머 시작
                </Button>
                <Button color="inherit" onClick={game.clearExchangeSession}>
                  타이머 해제
                </Button>
              </Stack>
              {exchangeElapsedSeconds > EXCHANGE_LIMIT_SECONDS && (
                <Alert severity="warning">
                  40초를 초과했습니다. 진행 판단으로 계속 거래를 기록할 수
                  있습니다.
                </Alert>
              )}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <FormControl fullWidth size="small">
                  <InputLabel id="dialog-trade-player-label">플레이어</InputLabel>
                  <Select
                    labelId="dialog-trade-player-label"
                    label="플레이어"
                    value={selectedPlayer?.id ?? 1}
                    onChange={(event) => {
                      setSelectedPlayerId(Number(event.target.value));
                    }}
                  >
                    {game.players.map((player) => (
                      <MenuItem key={player.id} value={player.id}>
                        {player.id}. {player.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel id="dialog-trade-company-label">회사</InputLabel>
                  <Select
                    labelId="dialog-trade-company-label"
                    label="회사"
                    value={selectedCompanyId}
                    onChange={(event) => {
                      setSelectedCompanyId(event.target.value as CompanyId);
                    }}
                  >
                    {game.companies.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <FormControl fullWidth size="small">
                  <InputLabel id="dialog-trade-type-label">구분</InputLabel>
                  <Select
                    labelId="dialog-trade-type-label"
                    label="구분"
                    value={tradeType}
                    onChange={(event) => {
                      setTradeType(event.target.value as TradeType);
                    }}
                  >
                    <MenuItem value="BUY">매수</MenuItem>
                    <MenuItem value="SELL">매도</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="수량"
                  type="number"
                  size="small"
                  value={tradeQuantity}
                  onChange={(event) => {
                    setTradeQuantity(Number(event.target.value));
                  }}
                  inputProps={{ min: 1, max: MAX_HOLDING_PER_COMPANY }}
                  fullWidth
                />
              </Stack>
              <Button variant="contained" onClick={handleSubmitTrade}>
                {formatMoney(game.currentPrices[selectedCompanyId])} 기준 거래 기록
              </Button>
              {game.tradeError && <Alert severity="error">{game.tradeError}</Alert>}
              {game.lastTradeId && (
                <Alert severity="success">거래가 기록되었습니다.</Alert>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActiveDialog(null)}>닫기</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={activeDialog === "records"}
          onClose={() => setActiveDialog(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>거래 기록</DialogTitle>
          <DialogContent>
            {game.trades.length === 0 ? (
              <Typography color="#6B7280">아직 거래가 없습니다.</Typography>
            ) : (
              <Stack spacing={1}>
                {game.trades.map((trade) => {
                  const player = game.players.find(
                    (item) => item.id === trade.playerId
                  );
                  return (
                    <Box
                      key={trade.id}
                      sx={{
                        border: "1px solid #E5E7EB",
                        borderRadius: 2,
                        p: 1.25,
                      }}
                    >
                      <Typography fontWeight={800}>
                        {player?.name ?? `${trade.playerId}번`} ·{" "}
                        {getCompany(trade.companyId).name}{" "}
                        {tradeTypeLabelMap[trade.type]} {trade.quantity}주
                      </Typography>
                      <Typography fontSize={13} color="#6B7280">
                        {trade.round}R {formatGameTime(trade.round, trade.minute)} ·{" "}
                        {formatMoney(trade.price)} · 총 {formatMoney(trade.total)}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActiveDialog(null)}>닫기</Button>
          </DialogActions>
        </Dialog>

      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#F3F5F8",
        color: "#111827",
        pb: 8,
      }}
    >
      <HomeButton />
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, md: 3 },
          pt: { xs: 7, md: 4 },
        }}
      >
        <Stack spacing={2.5}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #D7DCE3",
            }}
          >
            <Box
              sx={{
                bgcolor: "#111827",
                color: "#FFFFFF",
                px: { xs: 2, md: 3 },
                py: { xs: 2.5, md: 3 },
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Typography fontSize={{ xs: 28, md: 40 }} fontWeight={900}>
                    폭풍의 증권시장
                  </Typography>
                  <Typography mt={1} color="rgba(255,255,255,0.72)">
                    시장 가격과 빠른 거래로 운영하는 지니어스 스타일 주식 게임
                    진행 화면
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    label={screenPhaseLabel}
                    sx={{ bgcolor: "#FFFFFF", color: "#111827", fontWeight: 800 }}
                  />
                  <Chip
                    label={phaseLabelMap[game.phase]}
                    sx={{ bgcolor: "rgba(255,255,255,0.14)", color: "#FFFFFF" }}
                  />
                  {game.phase !== "SETUP" && (
                    <>
                      <Chip
                        label={`${game.currentRound}라운드`}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.14)",
                          color: "#FFFFFF",
                        }}
                      />
                      <Chip
                        label={formatGameTime(game.currentRound, game.currentMinute)}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.14)",
                          color: "#FFFFFF",
                        }}
                      />
                    </>
                  )}
                </Stack>
              </Stack>
            </Box>
            <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
              {game.phase === "SETUP" ? (
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "stretch", sm: "center" }}
                  spacing={1.5}
                >
                  <Typography fontSize={14} color="#4B5563">
                    플레이어 수와 이름을 정한 뒤 게임 화면으로 이동합니다.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowRounded />}
                    onClick={game.prepareGame}
                  >
                    게임 시작 준비
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={1.25}>
                  <LinearProgress
                    variant="determinate"
                    value={(game.currentMinute / ROUND_GAME_MINUTES) * 100}
                    sx={{ height: 10, borderRadius: 999 }}
                  />
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography fontSize={14} color="#4B5563">
                      다음 변동: {game.nextTickMinute}분 · 한 tick {TICK_MINUTES}분
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {(game.phase === "ROUND_READY" ||
                        game.phase === "ROUND_BREAK") && (
                        <Button
                          variant="contained"
                          startIcon={<PlayArrowRounded />}
                          onClick={game.startRound}
                        >
                          라운드 시작
                        </Button>
                      )}
                      {game.phase === "RUNNING" && (
                        <Button
                          variant="outlined"
                          startIcon={<PauseRounded />}
                          onClick={game.pauseRound}
                        >
                          일시정지
                        </Button>
                      )}
                      {game.phase === "ROUND_BREAK" && game.currentRound === 1 && (
                        <Button variant="outlined" onClick={game.proceedToRoundTwo}>
                          2라운드 정보 공개
                        </Button>
                      )}
                      <Button
                        color="inherit"
                        startIcon={<RestartAltRounded />}
                        onClick={game.resetGame}
                      >
                        초기화
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Box>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                game.phase === "SETUP" || game.phase === "ENDED"
                  ? { xs: "1fr", md: "minmax(0, 720px)" }
                  : { xs: "1fr", lg: "340px minmax(0, 1fr)" },
              justifyContent: "center",
              gap: 2.5,
            }}
          >
            <Stack spacing={2.5}>
              {game.phase === "SETUP" && (
                <Panel title="Player setting">
                  <Stack spacing={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="player-count-label">플레이어 수</InputLabel>
                      <Select
                        labelId="player-count-label"
                        label="플레이어 수"
                        value={game.players.length}
                        onChange={(event) => {
                          game.updatePlayerCount(Number(event.target.value));
                        }}
                      >
                        {VALID_PLAYER_COUNTS.map((count) => (
                          <MenuItem key={count} value={count}>
                            {count}명
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="라운드 실제 시간(초)"
                      type="number"
                      size="small"
                      value={game.roundRealSeconds}
                      onChange={(event) => {
                        game.updateRoundRealSeconds(Number(event.target.value));
                      }}
                      helperText="각 60분 게임시각을 몇 초 동안 진행할지 입력합니다."
                    />
                    <Stack spacing={1}>
                      {game.players.map((player) => (
                        <TextField
                          key={player.id}
                          label={`${player.id}번`}
                          size="small"
                          value={player.name}
                          onChange={(event) => {
                            game.updatePlayerName(player.id, event.target.value);
                          }}
                        />
                      ))}
                    </Stack>
                    {game.tradeError && game.phase === "SETUP" && (
                      <Alert severity="warning">{game.tradeError}</Alert>
                    )}
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowRounded />}
                      onClick={game.prepareGame}
                    >
                      게임 화면으로 이동
                    </Button>
                  </Stack>
                </Panel>
              )}

              {game.phase === "ENDED" && (
                <Panel title="Result">
                  <Stack spacing={1.5}>
                    <Alert severity="success">
                      우승자: {winners.map((item) => item.player.name).join(", ")}
                      {winners.length === 1
                        ? " · 생명의 징표 2개, 가넷 8개"
                        : " · 생명의 징표 1개, 가넷 8개"}
                    </Alert>
                    <Alert severity="warning">
                      탈락후보:{" "}
                      {eliminationCandidates
                        .map((item) => item.player.name)
                        .join(", ")}
                    </Alert>
                    {game.standings.map((standing, index) => (
                      <Stack
                        key={standing.player.id}
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{
                          borderBottom: "1px solid #F3F4F6",
                          py: 0.75,
                        }}
                      >
                        <Box minWidth={0}>
                          <Typography fontWeight={800} noWrap>
                            {index + 1}. {standing.player.name}
                          </Typography>
                          <Typography fontSize={13} color="#6B7280">
                            현금 {formatMoney(standing.player.cash)} · 주식{" "}
                            {formatMoney(standing.stockValue)}
                          </Typography>
                        </Box>
                        <Typography fontWeight={900}>
                          {formatMoney(standing.totalCash)}
                        </Typography>
                      </Stack>
                    ))}
                    <Button
                      color="inherit"
                      startIcon={<RestartAltRounded />}
                      onClick={game.resetGame}
                    >
                      새 게임 설정
                    </Button>
                  </Stack>
                </Panel>
              )}
            </Stack>

          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
