import {
  ArrowForwardRounded,
  LockRounded,
  StopCircleRounded,
  VisibilityOffRounded,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import {
  formatFruitMarketMoney as money,
  FRUIT_META,
  PRICE_OPTIONS,
} from "@/features/fruit-market/constants";
import { FruitMarketRoundResult } from "@/features/fruit-market/types";
import { useEffect, useState } from "react";

interface FruitPriceRouletteProps {
  result: FruitMarketRoundResult;
  currentIndex: number;
  resultCount: number;
  round: number;
  onContinue: () => void;
}

const reelFlow = keyframes`
  from { transform: translate3d(0, -540px, 0); }
  to { transform: translate3d(0, -270px, 0); }
`;

const priceLand = keyframes`
  0% {
    transform: translateY(-90px) scale(.82);
    filter: blur(4px);
    opacity: 0;
  }
  70% {
    transform: translateY(7px) scale(1.06);
    filter: blur(0);
    opacity: 1;
  }
  100% { transform: translateY(0) scale(1); }
`;

const fruitResultPop = keyframes`
  0% { transform: scale(.82); }
  100% { transform: scale(1); }
`;

const detailFade = keyframes`
  from { transform: translateY(8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const formatPriceNumber = (price: number) => price.toLocaleString("ko-KR");

export default function FruitPriceRoulette({
  result,
  currentIndex,
  resultCount,
  round,
  onContinue,
}: FruitPriceRouletteProps) {
  const [isStopping, setIsStopping] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const meta = FRUIT_META[result.fruit];
  const isLastResult = currentIndex === resultCount - 1;

  useEffect(() => {
    if (!isStopping) return;

    const timeoutId = window.setTimeout(() => {
      setIsStopping(false);
      setIsRevealed(true);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [isStopping]);

  const stopRoulette = () => {
    setIsStopping(true);
  };

  return (
    <Box textAlign="center" py={{ xs: 1, sm: 3 }}>
      <Box
        sx={{
          width: { xs: 150, sm: 184 },
          height: { xs: 150, sm: 184 },
          mx: "auto",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          bgcolor: meta.soft,
          boxShadow: `0 18px 48px ${meta.color}2B`,
          animation: isRevealed
            ? `${fruitResultPop} .48s cubic-bezier(.2,1.6,.4,1)`
            : undefined,
        }}
      >
        <Typography
          component="span"
          fontSize={{ xs: 88, sm: 108 }}
          lineHeight={1}
          aria-label={result.fruit}
        >
          {meta.emoji}
        </Typography>
      </Box>

      <Typography variant="h4" fontWeight={950} color="#30241C" mt={2.5}>
        {result.fruit}의 판매가는?
      </Typography>

      <Box
        mt={3}
        mx="auto"
        width={{ xs: "100%", sm: 430 }}
        height={{ xs: 126, sm: 144 }}
        position="relative"
        overflow="hidden"
        border="4px solid #30241C"
        borderRadius={3}
        bgcolor="#201914"
        color="white"
        boxShadow={
          isRevealed
            ? `0 0 0 6px ${meta.soft}, 0 18px 40px ${meta.color}42`
            : "0 12px 30px rgba(48,36,28,.2)"
        }
        sx={{
          transition: "box-shadow .35s ease",
          "&::before, &::after": {
            content: '\"\"',
            position: "absolute",
            left: 0,
            right: 0,
            height: 38,
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            top: 0,
            background: "linear-gradient(#201914 15%, transparent)",
            borderBottom: "1px solid rgba(255,255,255,.12)",
          },
          "&::after": {
            bottom: 0,
            background: "linear-gradient(transparent, #201914 85%)",
            borderTop: "1px solid rgba(255,255,255,.12)",
          },
        }}
        aria-live={isRevealed ? "polite" : "off"}
      >
        {isRevealed ? (
          result.hidden ? (
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1.5}
              sx={{
                inset: 0,
                animation: `${priceLand} .65s cubic-bezier(.16,1,.3,1)`,
              }}
            >
              <VisibilityOffRounded sx={{ fontSize: 38 }} />
              <Typography fontSize={{ xs: 30, sm: 38 }} fontWeight={950}>
                비공개
              </Typography>
            </Box>
          ) : (
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                inset: 0,
              }}
            >
              <Typography
                fontSize={{ xs: 40, sm: 52 }}
                fontWeight={950}
                letterSpacing="-.04em"
                sx={{
                  animation: `${priceLand} .65s cubic-bezier(.16,1,.3,1)`,
                }}
              >
                {formatPriceNumber(result.price)}
              </Typography>
              <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={900} ml={1}>
                원
              </Typography>
            </Box>
          )
        ) : (
          <>
            <Box
              position="absolute"
              top="calc(50% - 27px)"
              left={0}
              right={0}
              sx={{
                animation: `${reelFlow} ${isStopping ? ".9s" : ".58s"} linear infinite`,
                transition: "filter .3s ease",
                filter: isStopping ? "blur(1.5px)" : "none",
                willChange: "transform",
              }}
            >
              {Array.from({ length: 3 }, (_, groupIndex) =>
                PRICE_OPTIONS.map((price) => (
                  <Typography
                    key={`${groupIndex}-${price}`}
                    height={54}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize={{ xs: 34, sm: 42 }}
                    fontWeight={950}
                    color="white"
                    letterSpacing="-.04em"
                    sx={{ transform: "translateX(-18px)" }}
                  >
                    {formatPriceNumber(price)}
                  </Typography>
                )),
              )}
            </Box>
            <Typography
              position="absolute"
              top="50%"
              left={{ xs: "calc(50% + 55px)", sm: "calc(50% + 67px)" }}
              fontSize={{ xs: 24, sm: 28 }}
              fontWeight={900}
              lineHeight={1}
              zIndex={3}
              sx={{ transform: "translateY(-50%)" }}
            >
              원
            </Typography>
          </>
        )}
      </Box>

      <Box minHeight={72} mt={2}>
        {isStopping && (
          <Typography color="text.secondary">
            판매가가 결정되고 있습니다…
          </Typography>
        )}
        {isRevealed &&
          (result.hidden ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <LockRounded color="action" fontSize="small" />
              <Typography color="text.secondary">
                판매가와 판매 수입이 공개되지 않습니다.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                animation: `${detailFade} .4s ease-out`,
              }}
            >
              <Typography color="text.secondary">
                이번 과일의 총 판매 수입
              </Typography>
              <Typography variant="h6" fontWeight={900} color={meta.color}>
                {money(result.revenue)}
              </Typography>
            </Box>
          ))}
      </Box>

      <Box display="flex" justifyContent="center" gap={0.75} mt={1}>
        {Array.from({ length: resultCount }, (_, index) => (
          <Box
            key={index}
            width={index === currentIndex ? 24 : 8}
            height={8}
            borderRadius={8}
            bgcolor={index === currentIndex ? meta.color : "#DED3C4"}
            sx={{ transition: "all .25s ease" }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        size="large"
        disabled={isStopping}
        onClick={isRevealed ? onContinue : stopRoulette}
        endIcon={isRevealed ? <ArrowForwardRounded /> : <StopCircleRounded />}
        sx={{
          mt: 3,
          minWidth: 210,
          bgcolor: "#30241C",
          "&:hover": { bgcolor: "#4B392C" },
        }}
      >
        {isStopping
          ? "멈추는 중…"
          : !isRevealed
            ? "룰렛 멈추기"
            : isLastResult
              ? round === 4
                ? "최종 결과 보기"
                : `${round + 1}라운드 시작`
              : "다음 과일 공개"}
      </Button>
    </Box>
  );
}
