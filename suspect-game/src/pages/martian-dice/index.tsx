import GlobalHeader from "@/components/Navigation/GlobalHeader";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type DiceType = "ALIEN" | "TANK" | "HUMAN" | "CHICKEN" | "COW";

const DICE: DiceType[] = ["TANK", "ALIEN", "HUMAN", "CHICKEN", "COW"];

const COLOR: Record<DiceType, string> = {
  TANK: "#DE5E6B",
  ALIEN: "#89DB96",
  HUMAN: "#7788F7",
  CHICKEN: "#F6E26E",
  COW: "#ffffff",
};

const DICE_TEXT: Record<DiceType, string> = {
  TANK: "탱크",
  ALIEN: "외계인",
  HUMAN: "인간",
  CHICKEN: "닭",
  COW: "소",
};

const rollDice = (count: number) => {
  const randomInitDices = Array.from({ length: count }, () => {
    const randomDice = Math.floor(Math.random() * 6);
    switch (randomDice) {
      case 0:
        return "TANK";
      case 1:
        return "ALIEN";
      case 2:
        return "HUMAN";
      case 3:
        return "CHICKEN";
      case 4:
        return "COW";
      default:
        return "ALIEN";
    }
  });
  return randomInitDices;
};

export default function MarsDice() {
  const [activeDice, setActiveDice] = useState<DiceType[]>([]);
  const [fixedDice, setFixedDice] = useState<Record<DiceType, number>>({
    ALIEN: 0,
    TANK: 0,
    HUMAN: 0,
    CHICKEN: 0,
    COW: 0,
  });
  const [isDiceFixed, setIsDiceFixed] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>();

  const handleRollDice = () => {
    setIsDiceFixed(false);
    if (
      activeDice.length === 0 &&
      Object.values(fixedDice).reduce((acc, cur) => acc + cur, 0) === 0
    ) {
      const randomInitDices = rollDice(13);
      setActiveDice(randomInitDices);
      return;
    }
    const randomDices = rollDice(activeDice.length);
    setActiveDice(randomDices);
  };

  const activeDiceCount: Record<DiceType, number> = useMemo(() => {
    return activeDice.reduce((acc, cur) => {
      if (acc[cur] === undefined) {
        acc[cur] = 1;
        return acc;
      }
      acc[cur] += 1;
      return acc;
    }, {} as Record<DiceType, number>);
  }, [activeDice]);

  const currentScore = useMemo(() => {
    const kidnapScore = fixedDice.COW + fixedDice.CHICKEN + fixedDice.HUMAN;
    const setScore = Math.min(
      fixedDice.HUMAN,
      fixedDice.CHICKEN,
      fixedDice.COW
    );
    return kidnapScore + setScore;
  }, [fixedDice]);

  return (
    <>
      <GlobalHeader />
      <Box textAlign="center" pt={11} justifyContent="center" px={9}>
        <Typography variant="h3">마션 다이스</Typography>
        <Typography variant="body1">
          {round} 라운드동안 {score}점을 획득했어요.
        </Typography>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={6} justifyContent="center">
            <Box
              width="38vw"
              height="38vw"
              border="1px solid black"
              borderRadius={2}
              position="relative"
              p={2}
            >
              {activeDice.map((dice, index) => (
                <Box
                  key={index}
                  width="10%"
                  height="10%"
                  m={1}
                  border="1px solid white"
                  bgcolor="black"
                  color="white"
                  boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                  borderRadius={4}
                  display="inline-block"
                  sx={{
                    background: `url(/image/dice/${dice.toLocaleLowerCase()}.png)`,
                    backgroundSize: "cover",
                    transition: "rotate 1s",
                    transform: `rotate(${
                      Math.floor(Math.random() * 360) + 1
                    }deg)`,
                  }}
                />
              ))}
              <Box width="100%" display="flex" justifyContent="center" mt={20}>
                {!activeDice.includes("TANK") && isDiceFixed ? (
                  <Box display="flex" gap={2}>
                    <Button
                      onClick={handleRollDice}
                      disabled={
                        activeDice.includes("TANK") ||
                        !isDiceFixed ||
                        Object.values(fixedDice).reduce(
                          (acc, cur) => acc + cur,
                          0
                        ) === 13
                      }
                      variant="contained"
                    >
                      주사위 굴리기
                    </Button>
                    <Button
                      onClick={() => {
                        if (fixedDice.ALIEN <= fixedDice.TANK) {
                          if (
                            window.confirm(
                              "이대로 그만두면 납치에 실패하고 점수가 초기화됩니다. 그래도 그만두시겠습니까?"
                            )
                          ) {
                            setScore(0);
                            setRound(0);
                            setFixedDice({
                              ALIEN: 0,
                              TANK: 0,
                              HUMAN: 0,
                              CHICKEN: 0,
                              COW: 0,
                            });
                            setActiveDice([]);
                            return;
                          }
                          return;
                        }
                        setScore(currentScore + score);
                        setRound((prev) => (prev ? prev + 1 : 1));
                        setActiveDice([]);
                        setFixedDice({
                          ALIEN: 0,
                          TANK: 0,
                          HUMAN: 0,
                          CHICKEN: 0,
                          COW: 0,
                        });
                        setIsDiceFixed(true);
                      }}
                      color={
                        fixedDice.ALIEN > fixedDice.TANK ? "success" : "error"
                      }
                      variant="outlined"
                    >
                      그만하기
                    </Button>
                  </Box>
                ) : (
                  DICE.map((dice) => {
                    return (
                      <CardActionArea
                        sx={{
                          verticalAlign: "middle",
                          display: "flex",
                          height: "100%",
                        }}
                        key={dice}
                        disabled={
                          !activeDice.includes(dice) ||
                          (isDiceFixed && dice !== `TANK`)
                        }
                        onClick={() => {
                          if (!activeDice.includes(dice)) {
                            return;
                          }
                          if (dice !== `TANK`) {
                            setIsDiceFixed(true);
                          }
                          setFixedDice({
                            ...fixedDice,
                            [dice]: fixedDice[dice] + activeDiceCount[dice],
                          });
                          setActiveDice(activeDice.filter((d) => d !== dice));
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: "5%",
                            border: activeDice.includes(dice)
                              ? `1px solid ${COLOR[dice]}`
                              : "1px solid gray",
                            boxShadow: `0 0 10px ${
                              activeDice.includes(dice) ? COLOR[dice] : "gray"
                            }`,
                            display: "flex",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="50px"
                            width="50px"
                            sx={{
                              borderRadius: "5%",
                              filter: activeDice.includes(dice)
                                ? "none"
                                : "grayscale(100%)",
                            }}
                            image={`/image/dice/${dice.toLocaleLowerCase()}.png`}
                            alt={dice}
                          />
                          <CardContent
                            sx={{
                              height: "10px",
                              textAlign: "center",
                              backgroundColor: "black",
                              fontWeight: "bold",
                              color: !activeDice.includes(dice)
                                ? "gray"
                                : COLOR[dice],
                            }}
                          >
                            <Typography variant="h6">
                              {activeDice.filter((d) => d === dice).length}
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardActionArea>
                    );
                  })
                )}
              </Box>
              {activeDice.includes("TANK") && (
                <Typography
                  variant="h6"
                  color={COLOR.TANK}
                  sx={{
                    mt: 2,
                  }}
                >
                  탱크는 항상 고정시켜야 합니다.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={6} justifyContent="center">
            <Box display="flex" flexDirection="column">
              <Typography variant="h5">SCORE BOARD</Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={5}
                border="1px solid black"
                borderRadius={2}
                bgcolor="black"
                color="white"
              >
                {DICE.map((dice) => (
                  <Box
                    key={dice}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    width="100%"
                    gap={1}
                    p={2}
                  >
                    <Typography
                      fontWeight="bold"
                      color={COLOR[dice]}
                      fontSize="20px"
                      sx={{
                        width: "80px",
                      }}
                    >
                      {DICE_TEXT[dice]}
                    </Typography>
                    <Typography
                      sx={{
                        mr: 2,
                      }}
                      variant="h6"
                    >
                      {fixedDice[dice]}
                    </Typography>

                    {Array.from({ length: fixedDice[dice] }, (_, index) => (
                      <Box
                        key={index}
                        width="30px"
                        height="30px"
                        border="1px solid white"
                        borderRadius={2}
                        sx={{
                          background: `url(/image/dice/${dice.toLocaleLowerCase()}.png)`,
                          backgroundSize: "cover",
                        }}
                      />
                    ))}
                  </Box>
                ))}
                <Typography variant="h6">
                  납치
                  {fixedDice.ALIEN > fixedDice.TANK ? "성공" : "실패"}
                </Typography>
                <Typography variant="h6">현재 점수 : {currentScore}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
