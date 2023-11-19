import GlobalHeader from "@/components/Navigation/GlobalHeader";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type DiceType = "ALIEN" | "TANK" | "HUMAN" | "CHICKEN" | "COW";

const DICE: DiceType[] = ["TANK", "ALIEN", "HUMAN", "CHICKEN", "COW"];

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
              <Box position="absolute" bottom={2}>
                {!activeDice.includes("TANK") && isDiceFixed ? (
                  <Button
                    onClick={handleRollDice}
                    disabled={activeDice.includes("TANK") || !isDiceFixed}
                    variant="contained"
                  >
                    주사위 굴리기
                  </Button>
                ) : (
                  DICE.map((dice) => {
                    return (
                      <CardActionArea
                        key={dice}
                        onClick={() => {
                          if (activeDiceCount[dice] === 0) return;
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
                        <CardMedia
                          component="img"
                          height="100"
                          image={`/image/dice/${dice.toLocaleLowerCase()}.png`}
                          alt={dice}
                        />
                      </CardActionArea>
                    );
                  })
                )}
              </Box>
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
              >
                {DICE.map((dice) => (
                  <Box
                    key={dice}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    width="100%"
                    gap={2}
                    p={2}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        width: "80px",
                      }}
                    >
                      {dice}
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

                    <Typography variant="h6">{fixedDice[dice]}</Typography>
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
