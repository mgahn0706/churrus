import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
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
import { ClueData, schoolClues } from "@/pages/api/getCluesWithKeyword";
import { FadeInSection } from "../FadeInSection";
import { schoolPrologue } from "../../fixtures/school/prologue";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const TOTAL_CLUE_COUNT = schoolClues.length;

const ProgressBar = ({ checkedCount }: { checkedCount: number }) => {
  return (
    <Tooltip title="조사 진행도">
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
            value={Math.floor((checkedCount / TOTAL_CLUE_COUNT) * 100)}
          />
        </Box>
        <Typography>
          {Math.floor((checkedCount / TOTAL_CLUE_COUNT) * 100)}%
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default function InTextGame() {
  const [prolougeStep, setProlougeStep] = useState(0);

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
    new Array(TOTAL_CLUE_COUNT).fill(false)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchKeyword) return;
    setIsLoading(true);
    setSearchedClues([]);
    const response = await fetch(
      `/api/getCluesWithKeyword?keyword=${searchKeyword}`
    );
    const clues = (await response.json()) as ClueData[] | null;
    setSearchedClues(clues);
    setRecentlySearchedKeywords(
      [...recentlySearchedKeywords, searchKeyword].slice(-5)
    );
    setIsLoading(false);
    if (clues) {
      if (!searchHistory.includes(searchKeyword)) {
        setSearchHistory([searchKeyword, ...searchHistory].slice(0, 10));
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
      <Box bgcolor="black" minHeight="100vh" py="60px" px="10vw">
        <TextGameHeader />
        {currentStep === "PROLOGUE" && (
          <Box mt={6} color="white">
            <Typography mr={1} variant="h5" color="white">
              {schoolPrologue[prolougeStep]}
            </Typography>
            <Button
              variant="text"
              size="large"
              onClick={() => {
                if (prolougeStep === schoolPrologue.length - 1) {
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
            <ProgressBar checkedCount={checkedClues.filter((c) => c).length} />
            <Paper
              sx={{
                p: "6px 12px",
                display: "flex",
                alignItems: "center",
                width: "350px",
                mt: "60px",
              }}
            >
              <InputBase
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                sx={{ ml: 1, flex: 1, fontSize: "1.5rem", fontWeight: "bold" }}
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
              width={400}
              mt={2}
              justifyContent="flex-start"
              gap={1}
            >
              {searchHistory
                .slice(0, searchHistory.length > 6 ? 6 : searchHistory.length)
                .map((keyword) => {
                  return (
                    <Chip
                      label={keyword}
                      clickable
                      key={keyword}
                      onClick={() => {
                        setSearchKeyword(keyword);
                      }}
                    />
                  );
                })}
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
                  <FadeInSection>
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
