import HomeButton from "@/components/HomeButton";
import RuleVideoButton from "@/components/RuleVideoButton";
import useTimer from "@/features/mystery-sign/hooks/useTimer";
import Scoreboard from "@/features/same-number/components/Scoreboard";
import ShapePanel from "@/features/set/components/ShapePanel";
import usePictureSet from "@/features/set/hooks/usePictureSet";
import { PictureType } from "@/features/set/types";
import { Help, QuestionAnswer, Restore } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Set() {
  const [round, setRound] = useState(1);
  const [selectedPictures, setSelectedPictures] = useState<number[]>([]);
  const [acceptedSets, setAcceptedSets] = useState<number[][]>([]);
  const [score, setScore] = useState({
    player1: 0,
    player2: 0,
  });
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);

  const { pictures, availableSets } = usePictureSet({ round });

  const { remainingTime, resetTimer } = useTimer({
    initialRemainingTime: 10,
  });

  return (
    <Box textAlign="center" pt={3} width="100%" justifyContent="center">
      <HomeButton />
      <RuleVideoButton url="QUVbVeWz5cs" />
      <Box position="fixed" top={0} right="30px" m={1}>
        <Tooltip
          title={isShowingAnswer ? availableSets.join(" / ") : "정답 보기"}
          placement="left"
        >
          <IconButton
            onClick={() => {
              setIsShowingAnswer(!isShowingAnswer);
            }}
          >
            <QuestionAnswer />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h4" mb={1}>
        결! 합!
      </Typography>
      <Typography variant="h6">ROUND {round}</Typography>
      <Typography>
        Player {currentPlayer}의 차례가 {remainingTime}초 남았습니다.
        {remainingTime === 0 && (
          <IconButton
            onClick={() => {
              resetTimer();
              setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
              setSelectedPictures([]);
            }}
          >
            <Restore />
          </IconButton>
        )}
      </Typography>

      <Scoreboard
        onClick={() => {}}
        score={score}
        player1Name="Player 1"
        player2Name="Player 2"
        winner={
          round === 10
            ? score.player1 > score.player2
              ? "player1"
              : "player2"
            : false
        }
      />
      <Box display="flex" justifyContent="center" mt={3} gap={2}>
        {acceptedSets.map((set, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap={1}
            border="solid 1px black"
            px={2}
            py={1}
            fontSize="18px"
          >
            {set.join(" ﹒ ")}
          </Box>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={3}>
        <Grid container width="400px" spacing={3} mb={2}>
          {pictures.map((item, i) => (
            <Grid
              item
              xs={4}
              onClick={() => {
                if (selectedPictures.includes(i + 1)) {
                  setSelectedPictures(
                    selectedPictures.filter((n) => n !== i + 1)
                  );
                  return;
                }
                setSelectedPictures(
                  selectedPictures.length < 3
                    ? [...selectedPictures, i + 1]
                    : selectedPictures
                );
              }}
            >
              <Badge
                color={selectedPictures.includes(i + 1) ? "primary" : "error"}
                badgeContent={i + 1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <ShapePanel
                  picture={item}
                  key={i}
                  isSelected={selectedPictures.includes(i + 1)}
                />
              </Badge>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={2} gap={3}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            if (acceptedSets.length < availableSets.length) {
              setScore(
                currentPlayer === 1
                  ? {
                      ...score,
                      player1: score.player1 - 1,
                    }
                  : {
                      ...score,
                      player2: score.player2 - 1,
                    }
              );
              return;
            }
            setScore({
              ...score,
              player1: currentPlayer === 1 ? score.player1 + 3 : score.player1,
              player2: currentPlayer === 2 ? score.player2 + 3 : score.player2,
            });
            setSelectedPictures([]);
            setAcceptedSets([]);
            setRound(round + 1);
          }}
        >
          결!
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            selectedPictures.length < 3 ||
            acceptedSets.includes(selectedPictures.sort((a, b) => a - b))
          }
          onClick={() => {
            if (selectedPictures.length < 3) {
              return;
            }
            const sortedSelectedPictures = selectedPictures.sort(
              (a, b) => a - b
            );
            if (
              acceptedSets.find((set) => {
                return set.join() === sortedSelectedPictures.join();
              })
            ) {
              window.alert("이미 정답으로 제출한 합! 입니다.");
              setSelectedPictures([]);
              return;
            }

            if (
              availableSets.find((set) => {
                return set.join() === sortedSelectedPictures.join();
              })
            ) {
              setAcceptedSets([...acceptedSets, sortedSelectedPictures]);
              setScore({
                ...score,
                player1:
                  currentPlayer === 1 ? score.player1 + 1 : score.player1,
                player2:
                  currentPlayer === 2 ? score.player2 + 1 : score.player2,
              });
              setSelectedPictures([]);
              return;
            }
            setScore({
              ...score,
              player1: currentPlayer === 1 ? score.player1 - 1 : score.player1,
              player2: currentPlayer === 2 ? score.player2 - 1 : score.player2,
            });
            setSelectedPictures([]);
          }}
        >
          합!
        </Button>
      </Box>
    </Box>
  );
}
