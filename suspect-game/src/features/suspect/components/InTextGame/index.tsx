import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
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
import { SchoolPrologue } from "../../fixtures/school/prologue";
import { History, Search } from "@mui/icons-material";
import { ClueData, schoolClues } from "@/pages/api/getCluesWithKeyword";
import { FadeInSection } from "../FadeInSection";

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
        bottom={5}
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
  const [currentStep, setCurrentStep] = useState<
    "PROLOGUE" | "INTERROGATE" | "INVESTIGATE"
  >("PROLOGUE");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchedClues, setSearchedClues] = useState<ClueData[] | null>([]);
  const [recentlySearchedKeywords, setRecentlySearchedKeywords] = useState<
    string[]
  >([]);
  const [checkedClues, setCheckedClues] = useState<boolean[]>(
    new Array(TOTAL_CLUE_COUNT).fill(false)
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box width="80vw" height="100vh" bgcolor="black" py="60px" px="10vw">
        <TextGameHeader />
        {currentStep === "PROLOGUE" && (
          <Box color="white" lineHeight={"2rem"}>
            <SchoolPrologue />
            <Button
              variant="contained"
              onClick={() => setCurrentStep("INVESTIGATE")}
            >
              조사하기
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
                width: 400,
                mt: "60px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "1.5rem", fontWeight: "bold" }}
                placeholder="조사 키워드를 입력하세요."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={async () => {
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
                    setCheckedClues(
                      checkedClues.map((isChecked, index) => {
                        return (
                          clues.some((clue) => clue.id === index + 1) ||
                          isChecked
                        );
                      })
                    );
                  }
                }}
              >
                <Search />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton sx={{ p: "10px" }} aria-label="directions">
                <History />
              </IconButton>
            </Paper>
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
