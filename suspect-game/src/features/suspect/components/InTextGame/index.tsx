import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputBase,
  LinearProgress,
  ListItem,
  Paper,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";

import { useState } from "react";
import TextGameHeader from "./TextGameHeader";
import { History, Search } from "@mui/icons-material";
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
        top={5}
        right={4}
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

  const handleSearch = async () => {
    setSearchedClues([]);
    const response = await fetch(
      `/api/getCluesWithKeyword?keyword=${searchKeyword}`
    );
    const clues = (await response.json()) as ClueData[] | null;
    setSearchedClues(clues);
    setRecentlySearchedKeywords(
      [...recentlySearchedKeywords, searchKeyword].slice(-5)
    );
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
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor="black" height="100vh" py="60px" px="10vw">
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
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
              >
                <Search />
              </IconButton>
            </Paper>
            <Box
              display="flex"
              width={400}
              mt={2}
              justifyContent="flex-start"
              gap={1}
            >
              {searchHistory.map((keyword) => {
                return (
                  <Chip
                    label={keyword}
                    clickable
                    onClick={() => {
                      setSearchKeyword(keyword);
                      handleSearch();
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
