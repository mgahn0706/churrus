import {
  Box,
  Button,
  ButtonBase,
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
  ThemeProvider,
} from "@mui/material";

import { useState } from "react";
import TextGameHeader, { PhysicalClue } from "./TextGameHeader";
import { ContentPasteSearchOutlined, Close, Search } from "@mui/icons-material";
import { ClueData } from "@/pages/api/getCluesWithKeyword";
import { FadeInSection } from "../FadeInSection";
import { TextScenarioType } from "../../types";
import { createScenarioTheme } from "../createScenarioTheme";

const ProgressBar = ({
  checkedCount,
  totalCount,
}: {
  checkedCount: number;
  totalCount: number;
}) => {
  const progress =
    totalCount === 0 ? 0 : Math.floor((checkedCount / totalCount) * 100);

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
            value={progress}
          />
        </Box>
        <Typography>{progress}%</Typography>
      </Box>
    </Tooltip>
  );
};

const MAX_VISIBLE = 6;

interface InTextGameProps {
  scenario: TextScenarioType;
}

export default function InTextGame({ scenario }: InTextGameProps) {
  const scenarioTheme = createScenarioTheme(scenario.color, "dark");
  const [prolougeStep, setProlougeStep] = useState(0);
  const [selectedPhysicalClue, setSelectedPhysicalClue] = useState<{
    id: number;
    images: [string, ...string[]];
  } | null>(null);

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

  const acquiredPhysicalClues = scenario.clues.reduce<PhysicalClue[]>(
    (physicalClues, clue, index) => {
      if (checkedClues[index] && clue.physicalClueId !== undefined) {
        physicalClues.push({
          id: clue.physicalClueId,
          images: clue.images,
          text: clue.text,
        });
      }

      return physicalClues;
    },
    []
  );

  const handleSearch = async () => {
    if (!searchKeyword) return;

    // remove spaces from search keyword
    const trimmedKeyword = searchKeyword.replace(/\s+/g, "").toUpperCase();

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
    <ThemeProvider theme={scenarioTheme}>
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
      <Dialog
        open={selectedPhysicalClue !== null}
        onClose={() => setSelectedPhysicalClue(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPhysicalClue &&
            `${selectedPhysicalClue.id}번 실물단서`}
          <IconButton
            aria-label="닫기"
            onClick={() => setSelectedPhysicalClue(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedPhysicalClue && (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                md:
                  selectedPhysicalClue.images.length > 1
                    ? "repeat(2, minmax(0, 1fr))"
                    : "1fr",
              }}
              gap={2}
            >
              {selectedPhysicalClue.images.map((image, index) => (
                <Box
                  key={`${image}-${index}`}
                  component="img"
                  src={image}
                  alt={`${selectedPhysicalClue.id}번 실물단서 ${index + 1}`}
                  sx={{ display: "block", width: "100%", height: "auto" }}
                />
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <Box bgcolor="black" minHeight="100vh" py="60px" px="10vw">
        <TextGameHeader
          scenarioId={scenario.id}
          acquiredPhysicalClues={acquiredPhysicalClues}
        />
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
                  onChange={(e) => setSearchKeyword(e.target.value.toUpperCase())}
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
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <Typography variant="h6" color="#eeeeee">
                          {clue.from}
                        </Typography>
                        {clue.physicalClueId !== undefined && (
                          <ButtonBase
                            onClick={() =>
                              setSelectedPhysicalClue({
                                id: clue.physicalClueId,
                                images: clue.images,
                              })
                            }
                            sx={{
                              border: "1px solid rgba(246, 200, 95, 0.75)",
                              borderRadius: 1,
                              bgcolor: "rgba(246, 200, 95, 0.12)",
                              color: "white",
                              px: 1,
                              py: 0.5,
                              gap: 0.6,
                              boxShadow: "0 0 12px rgba(246, 200, 95, 0.18)",
                              "&:hover": {
                                bgcolor: "rgba(246, 200, 95, 0.22)",
                                borderColor: "#f6c85f",
                              },
                            }}
                          >
                            <ContentPasteSearchOutlined
                              fontSize="small"
                              sx={{ color: "#f6c85f" }}
                            />
                            <Typography component="span" fontWeight="bold">
                              {clue.physicalClueId}번 실물단서
                            </Typography>
                          </ButtonBase>
                        )}
                      </Box>
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
