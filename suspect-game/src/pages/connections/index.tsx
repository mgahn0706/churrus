import HomeButton from "@/components/HomeButton";
import RuleVideoButton from "@/components/RuleVideoButton";
import {
  CONNECTIONS_COLOR,
  KoreanConnections,
} from "@/features/connections/fixtures";
import {
  AllInclusive,
  Favorite,
  FavoriteBorder,
  HelpOutline,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import {
  Box,
  Tooltip,
  IconButton,
  Typography,
  Divider,
  Grid,
  Button,
  Rating,
  Select,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Connections() {
  const [lives, setLives] = useState(4);
  const [isInfiniteMode, setIsInfiniteMode] = useState(true);
  const [connectionsId, setConnectionsId] = useState(1);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [panels, setPanels] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<number[]>([]);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  const connectionsAnswers = KoreanConnections[connectionsId - 1].quiz.map(
    (quiz) => {
      return quiz.words;
    }
  );

  useEffect(() => {
    setSolvedGroups([]);
    setLives(4);
    const panels = KoreanConnections[connectionsId - 1].quiz.flatMap(
      (quiz) => quiz.words
    );
    const shuffledPanel = panels.sort(() => Math.random() - 0.5);
    setPanels(shuffledPanel);
  }, [connectionsId]);

  const ConnectionStepper = () => {
    return (
      <Box display="flex" mt={2} alignItems="center" ml="5vw">
        <IconButton
          disabled={connectionsId === 1}
          color="primary"
          onClick={() => {
            setConnectionsId(connectionsId - 1);
          }}
        >
          <NavigateBefore />
        </IconButton>
        <Select
          sx={{
            width: "70px",
            fontSize: "1.2rem",
          }}
          value={connectionsId}
          onChange={(e) => {
            setConnectionsId(Number(e.target.value));
          }}
        >
          {KoreanConnections.map((connection, idx) => (
            <MenuItem value={idx + 1}>{idx + 1}</MenuItem>
          ))}
        </Select>
        <Typography variant="h6" ml={2}>
          / {KoreanConnections.length}
        </Typography>
        <IconButton
          color="primary"
          onClick={() => {
            setConnectionsId(connectionsId + 1);
          }}
          disabled={connectionsId === KoreanConnections.length}
        >
          <NavigateNext />
        </IconButton>
      </Box>
    );
  };

  const RuleModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>게임 방법</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ whiteSpace: "pre-line" }}
            color="black"
            fontWeight="bold"
          >
            공통된 주제를 가진 단어 4개를 묶어 그룹 4개를 만드세요.
          </DialogContentText>
          <DialogContentText mb={2}>
            4개의 단어를 고르고, 제출 버튼을 누르면 정답인지 확인할 수 있습니다.
          </DialogContentText>
          <DialogContentText mb={2}>
            예시: 버스, 지하철, 택시, 자전거 → 교통수단 <br /> 사랑, 슬픔, 기쁨,
            분노 → 감정
          </DialogContentText>
          <DialogContentText mb={2}>
            각 커넥션 퍼즐은 유일한 정답만이 존재합니다. 여러 그룹에 속해보이는
            단어에 주의하세요!
          </DialogContentText>
          <DialogContentText mb={2}>
            각 그룹을 맞추면 그룹의 난이도에 맞는 색깔이 나타납니다. <br />
            🟨 쉬움 <br />
            🟩 <br />
            🟦 <br />
            🟪 어려움
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Box
      textAlign="center"
      pt={3}
      alignItems="center"
      width="100%"
      justifyContent="center"
    >
      <HomeButton />
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: 0,
          p: 2,
        }}
      >
        <IconButton
          onClick={() => {
            setIsRuleModalOpen(true);
          }}
        >
          <HelpOutline />
        </IconButton>
      </Box>
      <RuleModal
        isOpen={isRuleModalOpen}
        onClose={() => {
          setIsRuleModalOpen(false);
        }}
      />

      <Typography variant="h4" mb={1} fontWeight="bold" mt={4}>
        추러스 커넥션
      </Typography>
      <Typography variant="body1" mb={3}>
        같은 맥락의 단어 4개를 묶어 총 4그룹으로 나눠주세요.
      </Typography>
      <Divider />
      <ConnectionStepper />
      <Box display="flex" justifyContent="center" px={5} py={5}>
        <Grid container justifyContent="center" maxWidth="420px" spacing={1}>
          {solvedGroups.map((solvedGroupIdx) => {
            const solvedGroup = KoreanConnections[connectionsId - 1].quiz;
            return (
              <Grid item xs={12}>
                <Box
                  height="100px"
                  bgcolor={CONNECTIONS_COLOR[solvedGroupIdx]}
                  borderRadius="10px"
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Typography variant="h6" fontWeight="bold">
                    {solvedGroup[solvedGroupIdx].description}
                  </Typography>
                  <Typography variant="h6">
                    {solvedGroup[solvedGroupIdx].words.join(", ")}
                  </Typography>
                </Box>
              </Grid>
            );
          })}

          {panels.map((panel) => (
            <Grid item xs={3}>
              <Box
                bgcolor={selectedWords.includes(panel) ? "#555555" : "#eeeeee"}
                color={selectedWords.includes(panel) ? "white" : "black"}
                sx={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  maxWidth: "100px",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: selectedWords.includes(panel)
                      ? "#666666"
                      : "#dddddd",
                    cursor:
                      !selectedWords.includes(panel) &&
                      selectedWords.length === 4
                        ? "not-allowed"
                        : "pointer",
                  },
                }}
                onClick={() => {
                  if (selectedWords.includes(panel)) {
                    setSelectedWords(
                      selectedWords.filter((word) => word !== panel)
                    );
                    return;
                  }
                  if (selectedWords.length === 4) {
                    return;
                  }
                  setSelectedWords([...selectedWords, panel]);
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {panel}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box width="100vw" display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="400px"
        >
          <Button
            variant="outlined"
            sx={{
              height: "50px",
              width: "100px",
              borderRadius: "50px",
              fontSize: "1.2rem",
            }}
            onClick={() => {
              setSelectedWords([]);
              const shuffledPanel = panels.sort(() => Math.random() - 0.5);
              setPanels(shuffledPanel);
            }}
          >
            섞기
          </Button>
          <Button
            variant="outlined"
            sx={{
              height: "50px",
              width: "100px",
              borderRadius: "50px",
              fontSize: "1.2rem",
            }}
            disabled={selectedWords.length !== 4}
            onClick={() => {
              if (
                connectionsAnswers.some((answer) => {
                  return answer.every((word) => selectedWords.includes(word));
                })
              ) {
                const answerIdx = connectionsAnswers.findIndex((answer) => {
                  return answer.every((word) => selectedWords.includes(word));
                });
                const removedPanel = panels.filter(
                  (panel) => !selectedWords.includes(panel)
                );
                setPanels(removedPanel);
                setSolvedGroups(
                  solvedGroups.includes(answerIdx)
                    ? solvedGroups
                    : [...solvedGroups, answerIdx]
                );
                setSelectedWords([]);
                return;
              }

              if (!isInfiniteMode) {
                setLives(lives - 1);
                if (lives === 1) {
                  setSolvedGroups([0, 1, 2, 3]);
                  setPanels([]);
                  setLives(4);
                  return;
                }
              }
              setSelectedWords([]);
            }}
          >
            제출
          </Button>
        </Box>
      </Box>

      <Box>
        <Switch
          checked={isInfiniteMode}
          onChange={() => {
            setIsInfiniteMode(!isInfiniteMode);
          }}
        />
      </Box>
      {isInfiniteMode ? (
        <Tooltip title="라이프 무한 모드">
          <AllInclusive
            sx={{
              mt: 2,
              fontWeight: "bold",
              fontSize: "2rem",
              color: "#df2525",
            }}
          />
        </Tooltip>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={3}
          mb={3}
        >
          <Rating
            readOnly
            size="small"
            max={4}
            sx={{
              color: "#df2525",
            }}
            precision={1}
            value={lives}
            icon={<Favorite fontSize="inherit" />}
            emptyIcon={<FavoriteBorder fontSize="inherit" />}
          />
        </Box>
      )}
    </Box>
  );
}
