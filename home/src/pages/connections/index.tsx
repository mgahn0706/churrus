import HomeButton from "@/components/HomeButton";
import {
  CONNECTIONS_COLOR,
  KOREAN_CONNECTIONS,
} from "@/features/connections/fixtures";
import {
  AllInclusive,
  Favorite,
  FavoriteBorder,
  HelpOutline,
  NavigateBefore,
  NavigateNext,
  Share,
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
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useEffect, useState } from "react";

const SHARE_GRUOP_IMOJI = ["🟨", "🟩", "🟦", "🟪"];

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

dayjs.extend(weekOfYear);

const today = dayjs();

export default function Connections() {
  const [lives, setLives] = useState(4);
  const [isInfiniteMode, setIsInfiniteMode] = useState(true);

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [panels, setPanels] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<number[]>([]);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [triedCount, setTriedCount] = useState([0, 0, 0, 0]);
  const [connectionDate, setConnectionDate] = useState({
    year: today.get("year"),
    week: today.week(),
  });

  const resetConnection = () => {
    setSelectedWords([]);
    setSolvedGroups([]);
    setLives(4);
  };

  const selectedConnection =
    KOREAN_CONNECTIONS[connectionDate.year][
      Math.min(
        connectionDate.week - 1,
        KOREAN_CONNECTIONS[connectionDate.year].length - 1
      )
    ];

  useEffect(() => {
    setSolvedGroups([]);
    setLives(4);
    const panels = selectedConnection.quiz.flatMap((quiz) => quiz.words);
    const shuffledPanel = panels.sort(() => Math.random() - 0.5);
    setPanels(shuffledPanel);
  }, [connectionDate]);

  if (!selectedConnection) {
    return null;
  }

  const connectionAnswers = selectedConnection.quiz.map((quiz) => quiz.words);

  const ConnectionStepper = () => {
    return (
      <Box
        display="flex"
        ml={[0, null, 5]}
        gap={2}
        mt={[1, null, 3]}
        justifyContent={["center", null, "flex-start"]}
        alignContent="center"
      >
        <IconButton
          disabled={
            selectedConnection.week === 1 && connectionDate.year === 2022
          }
          color="primary"
          onClick={() => {
            setConnectionDate(
              selectedConnection.week === 1
                ? {
                    year: connectionDate.year - 1,
                    week: KOREAN_CONNECTIONS[connectionDate.year - 1].length,
                  }
                : {
                    year: connectionDate.year,
                    week: connectionDate.week - 1,
                  }
            );
            resetConnection();
          }}
        >
          <NavigateBefore />
        </IconButton>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
        >
          <FormControl variant="standard" sx={{ minWidth: 80 }} size="small">
            <Box display="flex" justifyContent="center" width="100%">
              <Select
                onChange={(e) => {
                  setConnectionDate({
                    year: Number(e.target.value),
                    week: 1,
                  });
                  resetConnection();
                }}
                disableUnderline
                inputProps={{
                  IconComponent: () => null,
                  sx: { padding: "0 !important", border: "0 !important" },
                }}
                value={connectionDate.year}
                sx={{
                  fontSize: "1rem",
                }}
              >
                {Object.keys(KOREAN_CONNECTIONS).map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
          <FormControl variant="standard" sx={{ mt: "2px" }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Select
                inputProps={{
                  IconComponent: () => null,
                  sx: { padding: "0 !important", border: "0 !important" },
                }}
                disableUnderline
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                value={connectionDate.week}
                onChange={(e) => {
                  setConnectionDate({
                    year: connectionDate.year,
                    week: Number(e.target.value),
                  });
                  resetConnection();
                }}
              >
                {KOREAN_CONNECTIONS[connectionDate.year]
                  .slice(today.week())
                  .map((week) => (
                    <MenuItem value={week.week}>Week {week.week}</MenuItem>
                  ))}
              </Select>
            </Box>
          </FormControl>
        </Box>
        <IconButton
          color="primary"
          onClick={() => {
            setConnectionDate(
              selectedConnection.week ===
                KOREAN_CONNECTIONS[connectionDate.year].length
                ? { year: connectionDate.year + 1, week: 1 }
                : {
                    year: connectionDate.year,
                    week: connectionDate.week + 1,
                  }
            );
            resetConnection();
          }}
          disabled={
            connectionDate.year === today.get("year") &&
            connectionDate.week === today.week()
          }
        >
          <NavigateNext />
        </IconButton>
      </Box>
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
      <Typography variant="body1" mb={3} px={5}>
        같은 맥락의 단어 4개를 묶어 총 4그룹으로 나눠주세요.
      </Typography>
      <Divider />
      <ConnectionStepper />
      <Box display="flex" justifyContent="center" px={5} pb={5} pt={1}>
        <Grid container justifyContent="center" maxWidth="420px" spacing={1}>
          {solvedGroups.map((solvedGroupIdx) => {
            const solvedGroup = selectedConnection.quiz;
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

      {solvedGroups.length < 4 && (
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
              variant="contained"
              sx={{
                height: "50px",
                width: "100px",
                borderRadius: "50px",
                fontSize: "1.2rem",
              }}
              disabled={selectedWords.length !== 4}
              onClick={() => {
                setTriedCount(
                  triedCount.map((count, idx) => {
                    return idx === solvedGroups.length ? count + 1 : count;
                  })
                );
                if (
                  connectionAnswers.some((answer) => {
                    return answer.every((word) => selectedWords.includes(word));
                  })
                ) {
                  const answerIdx = connectionAnswers.findIndex((answer) => {
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
      )}
      {solvedGroups.length === 4 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
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
              if (navigator.share) {
                navigator.share({
                  title: `추러스 커넥션 ${connectionDate.year}년 Week ${connectionDate.week},`,
                  text: `${solvedGroups
                    .map((group, index) => {
                      return `${SHARE_GRUOP_IMOJI[group]}: ${triedCount[index]}`;
                    })
                    .join(" ")}`,
                  url: "https://churrus.vercel.app/connections",
                });
                return;
              }
              if (navigator.clipboard) {
                navigator.clipboard
                  .writeText(
                    `추러스 커넥션 ${connectionDate.year}년 Week ${
                      connectionDate.week
                    }, ${solvedGroups
                      .map((group, index) => {
                        return `${SHARE_GRUOP_IMOJI[group]}: ${triedCount[index]}`;
                      })
                      .join(" ")}
               : https://churrus.vercel.app/connections
                    `
                  )
                  .then(() => {
                    alert("클립보드에 복사되었습니다.");
                  });
              }
            }}
          >
            공유
            <Share
              sx={{
                ml: 1,
              }}
            />
          </Button>
          <Typography variant="h6" fontWeight="bold" my={2}>
            🎉 축하합니다! 🎉
          </Typography>
        </Box>
      )}

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
