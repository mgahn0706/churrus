import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";

import { useState } from "react";
import TextGameHeader from "./TextGameHeader";
import { Search } from "@mui/icons-material";
import { ClueData } from "@/pages/api/getCluesWithKeyword";
import { FadeInSection } from "../FadeInSection";
import { ScenarioType } from "../../types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ProgressBar = ({
  checkedCount,
  totalCount,
}: {
  checkedCount: number;
  totalCount: number;
}) => {
  return (
    <Tooltip title={`조사 진행도 (${checkedCount} / ${totalCount})`}>
      <Box
        position="absolute"
        top="60px"
        right="20px"
        display="flex"
        alignItems="center"
        width="200px"
      >
        <Box width="100%" mr={1}>
          <LinearProgress
            color="primary"
            variant="determinate"
            value={Math.floor((checkedCount / totalCount) * 100)}
          />
        </Box>
        <Typography>
          {Math.floor((checkedCount / totalCount) * 100)}%
        </Typography>
      </Box>
    </Tooltip>
  );
};

const MAX_VISIBLE = 6;

interface InTextGameProps {
  scenario: ScenarioType;
}

export default function InTextGame({ scenario }: InTextGameProps) {
  const [prolougeStep, setProlougeStep] = useState(0);

  const [openAllHistory, setOpenAllHistory] = useState(false);

  const [currentStep, setCurrentStep] = useState<
    "PROLOGUE" | "INTERROGATE" | "INVESTIGATE"
  >("PROLOGUE");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchedClues, setSearchedClues] = useState<ClueData[] | null>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [recentlySearchedKeywords, setRecentlySearchedKeywords] = useState<
    string[]
  >([]);
  const [checkedClues, setCheckedClues] = useState<boolean[]>(
    new Array(scenario.clues?.length ?? 0).fill(false)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchKeyword) return;

    // remove spaces from search keyword
    const trimmedKeyword = searchKeyword.replace(/\s+/g, "");

    setIsLoading(true);
    setSearchedClues([]);
    const response = await fetch(
      `/api/getCluesWithKeyword?keyword=${trimmedKeyword}&scenarioId=${scenario.id}`
    );
    const clues = (await response.json()) as ClueData[] | null;
    setSearchedClues(clues);
    setRecentlySearchedKeywords(
      [...recentlySearchedKeywords, trimmedKeyword].slice(-5)
    );
    setIsLoading(false);
    if (clues) {
      if (!searchHistory.includes(trimmedKeyword)) {
        setSearchHistory([trimmedKeyword, ...searchHistory]);
      }
      setCheckedClues(
        checkedClues.map((isChecked, index) => {
          return clues.some((clue) => clue.id === index + 1) || isChecked;
        })
      );
    }
    setSearchKeyword("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {
        <Dialog open={openAllHistory} onClose={() => setOpenAllHistory(false)}>
          <DialogTitle>검색 기록 전체</DialogTitle>
          <DialogContent>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {searchHistory.map((keyword) => (
                <Chip
                  label={keyword}
                  key={keyword}
                  onClick={() => {
                    setSearchKeyword(keyword);
                    setOpenAllHistory(false);
                  }}
                />
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      }
      <Box bgcolor="black" minHeight="100vh" py="60px" px="10vw">
        <TextGameHeader scenarioId={scenario.id} />
        {currentStep === "PROLOGUE" && (
          <Box mt={6} color="white">
            <Typography mr={1} variant="h5" color="white">
              {scenario.prologue![prolougeStep]}
            </Typography>
            <Button
              variant="text"
              size="large"
              onClick={() => {
                if (prolougeStep === scenario.prologue!.length - 1) {
                  setCurrentStep("INVESTIGATE");
                  return;
                }
                setProlougeStep(prolougeStep + 1);
              }}
            >
              {"다음 >"}
            </Button>
          </Box>
        )}
        {currentStep === "INVESTIGATE" && (
          <Box
            color="white"
            lineHeight={"2rem"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <ProgressBar
              checkedCount={checkedClues.filter((c) => c).length}
              totalCount={scenario.clues?.length ?? 0}
            />

            <Box
              display="flex"
              flexDirection="column"
              width={400}
              mt={6}
              gap={1.5}
            >
              <Paper
                sx={{
                  p: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <InputBase
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                  placeholder="조사 키워드를 입력하세요."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Tooltip
                  title="'시체'를 검색해보세요."
                  open={searchHistory.length === 0}
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
              </Paper>

              <Box
                display="flex"
                width="100%"
                justifyContent="flex-start"
                gap={1}
              >
                {searchHistory.slice(0, MAX_VISIBLE).map((keyword) => (
                  <Chip
                    label={keyword}
                    clickable
                    key={keyword}
                    onClick={() => setSearchKeyword(keyword)}
                  />
                ))}

                {searchHistory.length > MAX_VISIBLE && (
                  <Chip
                    label={`+${searchHistory.length - MAX_VISIBLE} 더 보기`}
                    variant="outlined"
                    onClick={() => setOpenAllHistory(true)}
                  />
                )}
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              flexDirection="column"
              gap={2}
              mt={7}
            >
              {isLoading && <CircularProgress />}
              {searchedClues?.map((clue) => {
                return (
                  <FadeInSection key={clue.id}>
                    <Box minWidth="80vw">
                      <Typography variant="h6" color="#eeeeee">
                        {clue.from}
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        lineHeight="2rem"
                      >
                        "{clue.text}"
                      </Typography>
                    </Box>
                  </FadeInSection>
                );
              })}
              {!searchedClues && (
                <FadeInSection>
                  <Box minWidth="80vw">
                    <Typography variant="h5">
                      {
                        recentlySearchedKeywords[
                          recentlySearchedKeywords.length - 1
                        ]
                      }
                      에 대한 검색 결과가 없습니다.
                    </Typography>
                  </Box>
                </FadeInSection>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
