"use client";

import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import {
  findCombination,
  getCollectedEvidence,
  initialInterrogationProgress,
  isPhaseReady,
  readInterrogationProgress,
  type InterrogationProgress,
} from "@/features/interrogation/engine";
import usePreventUnload from "@/hooks/usePreventUnload";
import type {
  InterrogationDialogueLine,
  InterrogationQuestion,
  InterrogationScenarioType,
  InterrogationSource,
} from "@/types";
import DialogueBox from "./DialogueBox";
import ResearchMap from "./ResearchMap";

type GameView = "map" | "location" | "logic" | "interrogation";
type DialogueSequence = {
  lines: InterrogationDialogueLine[];
  index: number;
  grantEvidenceId?: string;
};

const theme = createScenarioTheme("#bd874e", "dark");
const addId = (ids: string[], id: string) =>
  ids.includes(id) ? ids : [...ids, id];
const asDialogue = (line: string | InterrogationDialogueLine) =>
  typeof line === "string" ? { text: line } : line;

const menuButtonSx = {
  color: "#f3dfbb",
  border: "1px solid rgba(231,201,148,.55)",
  bgcolor: "rgba(6,12,12,.78)",
  borderRadius: 0.5,
  fontWeight: 800,
  px: 2,
  "&:hover": { bgcolor: "rgba(167,112,55,.4)", borderColor: "#f1d19a" },
  "&.Mui-disabled": {
    color: "rgba(243,223,187,.35)",
    borderColor: "rgba(231,201,148,.16)",
  },
} as const;

export default function InInterrogationGame({
  scenario,
}: {
  scenario: InterrogationScenarioType;
}) {
  const router = useRouter();
  const storageKey = `interrogation-${scenario.id}-v2`;
  const [progress, setProgress] = useState<InterrogationProgress>(
    initialInterrogationProgress,
  );
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<GameView>("map");
  const [locationId, setLocationId] = useState("");
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);
  const [selectedSuspectName, setSelectedSuspectName] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [presentedEvidenceId, setPresentedEvidenceId] = useState("");
  const [showInventory, setShowInventory] = useState(false);
  const [dialogue, setDialogue] = useState<DialogueSequence | null>(null);

  usePreventUnload(true);

  useEffect(() => {
    setProgress(readInterrogationProgress(localStorage.getItem(storageKey)));
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [loaded, progress, storageKey]);

  const phase = scenario.phases.find(
    (item) => !progress.completedPhaseIds.includes(item.id),
  );
  const phaseId = phase?.id;

  useEffect(() => {
    setView("map");
    setLocationId("");
    setSelectedEvidenceIds([]);
    setSelectedSuspectName("");
    setSelectedQuestionId("");
    setPresentedEvidenceId("");
    setDialogue(null);
  }, [phaseId]);

  const evidence = getCollectedEvidence(
    scenario.phases,
    progress.collectedEvidenceIds,
  );
  const phaseNumber = phase
    ? scenario.phases.findIndex((item) => item.id === phase.id) + 1
    : scenario.phases.length;
  const canConnect = evidence.length >= 2;
  const canInterrogate = Boolean(
    phase?.combinations.some((item) =>
      progress.solvedCombinationIds.includes(item.id),
    ),
  );
  const selectedLocation = phase?.locations.find(
    (item) => item.id === locationId,
  );
  const locationSources = phase?.sources.filter(
    (item) => item.locationId === locationId,
  );
  const activeSuspectName =
    selectedSuspectName || phase?.interrogations[0]?.suspectName || "";
  const activeSuspect = scenario.suspects.find(
    (item) => item.name === activeSuspectName,
  );
  const activeInterrogation = phase?.interrogations.find(
    (item) => item.suspectName === activeSuspectName,
  );
  const activeQuestion = activeInterrogation?.questions.find(
    (item) => item.id === selectedQuestionId,
  );
  const phaseIntroPending = Boolean(
    phase?.intro && !progress.seenPhaseIds.includes(phase.id),
  );

  const queueDialogue = (
    lines: InterrogationDialogueLine[],
    grantEvidenceId?: string,
  ) => {
    setDialogue({ lines, index: 0, grantEvidenceId });
  };

  const advanceDialogue = () => {
    if (!dialogue) return;
    if (dialogue.index < dialogue.lines.length - 1) {
      setDialogue({ ...dialogue, index: dialogue.index + 1 });
      return;
    }
    if (dialogue.grantEvidenceId) {
      const id = dialogue.grantEvidenceId;
      setProgress((previous) => ({
        ...previous,
        collectedEvidenceIds: addId(previous.collectedEvidenceIds, id),
      }));
    }
    setDialogue(null);
  };

  const inspectSource = (source: InterrogationSource) => {
    queueDialogue(
      [
        { speaker: source.title, text: source.description },
        { speaker: "단서 확보", text: source.evidence.description },
      ],
      source.evidence.id,
    );
  };

  const combineEvidence = () => {
    if (!phase || selectedEvidenceIds.length !== 2) return;
    const combination = findCombination(
      phase,
      selectedEvidenceIds[0],
      selectedEvidenceIds[1],
    );
    if (!combination) {
      queueDialogue([
        { speaker: "추리", text: "두 단서 사이에서 연결점을 찾지 못했다." },
      ]);
      return;
    }
    setProgress((previous) => ({
      ...previous,
      solvedCombinationIds: addId(
        previous.solvedCombinationIds,
        combination.id,
      ),
    }));
    setSelectedEvidenceIds([]);
    queueDialogue(
      [
        { speaker: "추리", text: combination.explanation },
        {
          speaker: combination.result.title,
          text: combination.result.description,
        },
      ],
      combination.result.id,
    );
  };

  const askQuestion = (question: InterrogationQuestion) => {
    setSelectedQuestionId(question.id);
    setPresentedEvidenceId("");
    setProgress((previous) => ({
      ...previous,
      askedQuestionIds: addId(previous.askedQuestionIds, question.id),
      resolvedQuestionIds: question.challenge
        ? previous.resolvedQuestionIds
        : addId(previous.resolvedQuestionIds, question.id),
    }));
    queueDialogue([
      {
        speaker: activeSuspectName,
        portrait: activeSuspect?.image,
        text: question.answer,
      },
    ]);
  };

  const presentEvidence = () => {
    if (!activeQuestion?.challenge || !presentedEvidenceId) return;
    if (presentedEvidenceId !== activeQuestion.challenge.evidenceId) {
      queueDialogue([
        {
          speaker: activeSuspectName,
          portrait: activeSuspect?.image,
          text: "그 단서로는 제 말을 뒤집을 수 없을 텐데요?",
        },
      ]);
      return;
    }
    setProgress((previous) => ({
      ...previous,
      resolvedQuestionIds: addId(
        previous.resolvedQuestionIds,
        activeQuestion.id,
      ),
    }));
    queueDialogue(
      [
        {
          speaker: activeSuspectName,
          portrait: activeSuspect?.image,
          text: activeQuestion.challenge.response,
        },
      ],
      activeQuestion.challenge.revealedEvidence?.id,
    );
  };

  const changeView = (nextView: GameView) => {
    setView(nextView);
    setShowInventory(false);
    setSelectedQuestionId("");
  };

  if (!loaded) {
    return <Box sx={{ minHeight: "100dvh", bgcolor: "#080d0c" }} />;
  }

  if (!progress.started) {
    const current = scenario.prologue[progress.storyIndex];
    const line = current ? asDialogue(current) : { text: "조사를 시작한다." };
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            position: "relative",
            minHeight: "100dvh",
            bgcolor: "#080d0c",
            overflow: "hidden",
            backgroundImage: `linear-gradient(180deg, rgba(4,7,8,.58), rgba(4,7,8,.15) 45%, rgba(4,7,8,.9)), url(${scenario.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: { xs: 24, md: 48 },
              left: { xs: 24, md: "7%" },
              color: "#f1dfbe",
              fontSize: { xs: 18, md: 28 },
              fontWeight: 800,
              textShadow: "0 3px 18px #000",
            }}
          >
            {scenario.title}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: { xs: 55, md: 88 },
              left: { xs: 24, md: "7%" },
              color: "#dcc49a",
              letterSpacing: ".18em",
              fontSize: 12,
            }}
          >
            PROLOGUE ·{" "}
            {Math.min(progress.storyIndex + 1, scenario.prologue.length)} /{" "}
            {scenario.prologue.length}
          </Typography>
          <DialogueBox
            key={`story-${progress.storyIndex}`}
            line={line}
            onAdvance={() => {
              if (progress.storyIndex < scenario.prologue.length - 1) {
                setProgress((previous) => ({
                  ...previous,
                  storyIndex: previous.storyIndex + 1,
                }));
              } else {
                setProgress((previous) => ({ ...previous, started: true }));
              }
            }}
          />
        </Box>
      </ThemeProvider>
    );
  }

  if (!phase) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "100dvh",
            bgcolor: "#080d0c",
            color: "#f1dfbe",
            display: "grid",
            placeContent: "center",
            textAlign: "center",
            gap: 3,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {scenario.phases.length ? "모든 심문을 마쳤습니다" : "조사 준비 중"}
          </Typography>
          {scenario.phases.length > 0 && (
            <Button
              variant="outlined"
              sx={menuButtonSx}
              onClick={() =>
                router.push(`/scenarios/scenario/${scenario.id}/submit`)
              }
            >
              최종 추리 제출
            </Button>
          )}
        </Box>
      </ThemeProvider>
    );
  }

  const sceneBackground = phase.mapImage
    ? `linear-gradient(180deg, rgba(4,8,8,.62), rgba(4,8,8,.92)), url(${phase.mapImage})`
    : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100dvh",
          bgcolor: "#080d0c",
          color: "#f8edda",
          overflow: "hidden",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, #1c2922, #080d0c 72%)",
        }}
      >
        <Box
          component="header"
          sx={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 2, md: 5 },
            py: 2,
            borderBottom: "1px solid rgba(225,200,158,.3)",
            bgcolor: "rgba(4,8,8,.82)",
          }}
        >
          <Box>
            <Typography
              sx={{ color: "#d9b77d", fontSize: 12, letterSpacing: ".16em" }}
            >
              PHASE {phaseNumber} / {scenario.phases.length}
            </Typography>
            <Typography sx={{ fontSize: { xs: 18, md: 23 }, fontWeight: 800 }}>
              {phase.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Button sx={menuButtonSx} onClick={() => changeView("map")}>
              지도
            </Button>
            <Button sx={menuButtonSx} onClick={() => setShowInventory(true)}>
              단서함 · {evidence.length}
            </Button>
            <Button
              sx={menuButtonSx}
              disabled={!canConnect}
              onClick={() => changeView("logic")}
            >
              단서 연결
            </Button>
            <Button
              sx={menuButtonSx}
              disabled={!canInterrogate}
              onClick={() => changeView("interrogation")}
            >
              심문
            </Button>
            {isPhaseReady(phase, progress) && (
              <Button
                sx={{ ...menuButtonSx, bgcolor: "#a36a35" }}
                onClick={() =>
                  setProgress((previous) => ({
                    ...previous,
                    completedPhaseIds: addId(
                      previous.completedPhaseIds,
                      phase.id,
                    ),
                  }))
                }
              >
                {phaseNumber === scenario.phases.length
                  ? "조사 마치기"
                  : "다음 페이즈"}
              </Button>
            )}
          </Box>
        </Box>

        <Box
          component="main"
          sx={{
            position: "relative",
            minHeight: "calc(100dvh - 90px)",
            px: { xs: 1.5, md: 4 },
            py: { xs: 2, md: 3 },
          }}
        >
          {view === "map" && (
            <ResearchMap
              image={phase.mapImage}
              locations={phase.locations}
              onSelect={(id) => {
                setLocationId(id);
                changeView("location");
              }}
            />
          )}

          {view === "location" && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                px: { xs: 3, md: "8%" },
                py: { xs: 4, md: 6 },
                backgroundImage: sceneBackground,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Button sx={menuButtonSx} onClick={() => changeView("map")}>
                ← 지도로
              </Button>
              <Typography
                variant="h3"
                sx={{
                  mt: 4,
                  mb: 4,
                  fontWeight: 900,
                  textShadow: "0 4px 18px #000",
                }}
              >
                {selectedLocation?.title}
              </Typography>
              {locationSources?.length ? (
                <Box sx={{ display: "grid", gap: 1.5, maxWidth: 600 }}>
                  {locationSources.map((source) => (
                    <Button
                      key={source.id}
                      onClick={() => inspectSource(source)}
                      sx={{
                        ...menuButtonSx,
                        py: 1.8,
                        justifyContent: "space-between",
                        textAlign: "left",
                        fontSize: 18,
                      }}
                    >
                      {source.title}
                      <span>
                        {progress.collectedEvidenceIds.includes(
                          source.evidence.id,
                        )
                          ? "확인됨"
                          : "조사하기 →"}
                      </span>
                    </Button>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ fontSize: 20, color: "#d3c3aa" }}>
                  아직 조사할 대상이 없습니다.
                </Typography>
              )}
            </Box>
          )}

          {view === "logic" && (
            <Box sx={{ maxWidth: 1060, mx: "auto", pt: { xs: 2, md: 5 } }}>
              <Typography
                sx={{ color: "#d9b77d", letterSpacing: ".2em", fontSize: 13 }}
              >
                LOGIC
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
                단서를 연결한다
              </Typography>
              <Typography sx={{ color: "#c5c6bd", mb: 4 }}>
                두 단서를 골라 새로운 사실을 찾아보세요.
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 4,
                }}
              >
                {[0, 1].map((slot) => (
                  <Box
                    key={slot}
                    sx={{
                      minHeight: 115,
                      border: "2px dashed rgba(232,205,156,.6)",
                      bgcolor: "rgba(16,29,26,.65)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: { xs: 16, md: 24 },
                      fontWeight: 800,
                      color: "#f7dfb4",
                      textAlign: "center",
                      p: 1,
                    }}
                  >
                    {evidence.find(
                      (item) => item.id === selectedEvidenceIds[slot],
                    )?.title || `단서 ${slot + 1}`}
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 4 }}>
                {evidence.map((item) => {
                  const selected = selectedEvidenceIds.includes(item.id);
                  return (
                    <Button
                      key={item.id}
                      onClick={() =>
                        setSelectedEvidenceIds((previous) =>
                          selected
                            ? previous.filter((id) => id !== item.id)
                            : previous.length < 2
                              ? [...previous, item.id]
                              : [previous[1], item.id],
                        )
                      }
                      sx={{
                        ...menuButtonSx,
                        minHeight: 62,
                        bgcolor: selected ? "#815329" : "rgba(10,18,17,.85)",
                      }}
                    >
                      {item.title}
                    </Button>
                  );
                })}
              </Box>
              <Button
                sx={{ ...menuButtonSx, px: 5, py: 1.5, fontSize: 18 }}
                disabled={selectedEvidenceIds.length !== 2}
                onClick={combineEvidence}
              >
                연결하기
              </Button>
            </Box>
          )}

          {view === "interrogation" && (
            <Box
              sx={{
                maxWidth: 1400,
                mx: "auto",
                minHeight: "calc(100dvh - 150px)",
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {phase.interrogations.map((item) => (
                  <Button
                    key={item.suspectName}
                    sx={{
                      ...menuButtonSx,
                      bgcolor:
                        activeSuspectName === item.suspectName
                          ? "#815329"
                          : "rgba(10,18,17,.85)",
                    }}
                    onClick={() => {
                      setSelectedSuspectName(item.suspectName);
                      setSelectedQuestionId("");
                      setPresentedEvidenceId("");
                    }}
                  >
                    {item.suspectName}
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "minmax(260px, 1fr) minmax(340px, 1fr)",
                  },
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    minHeight: { xs: 280, md: 570 },
                    overflow: "hidden",
                  }}
                >
                  {activeSuspect?.image && (
                    <Box
                      component="img"
                      src={activeSuspect.image}
                      alt={activeSuspect.name}
                      sx={{
                        width: "100%",
                        height: { xs: 280, md: 570 },
                        objectFit: "contain",
                        objectPosition: "bottom",
                        filter: "drop-shadow(0 12px 26px #000)",
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      left: 20,
                      fontSize: 28,
                      fontWeight: 900,
                      textShadow: "0 3px 12px #000",
                    }}
                  >
                    {activeSuspectName}
                  </Typography>
                </Box>
                <Box sx={{ pt: { xs: 0, md: 5 } }}>
                  <Typography
                    sx={{ color: "#d9b77d", letterSpacing: ".2em", mb: 2 }}
                  >
                    INTERROGATION
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
                    무엇을 물을까?
                  </Typography>
                  {activeInterrogation?.questions.length ? (
                    <Box sx={{ display: "grid", gap: 1.5 }}>
                      {activeInterrogation.questions.map((question) => (
                        <Button
                          key={question.id}
                          sx={{
                            ...menuButtonSx,
                            justifyContent: "space-between",
                            textAlign: "left",
                            py: 1.5,
                            fontSize: 17,
                          }}
                          onClick={() => askQuestion(question)}
                        >
                          {question.prompt}
                          {progress.resolvedQuestionIds.includes(question.id) &&
                            " ✓"}
                        </Button>
                      ))}
                    </Box>
                  ) : (
                    <Typography sx={{ color: "#c8bda8" }}>
                      아직 준비된 질문이 없습니다.
                    </Typography>
                  )}
                  {activeQuestion?.challenge &&
                    progress.askedQuestionIds.includes(activeQuestion.id) && (
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{ mb: 1.5, fontWeight: 700, color: "#efd9ac" }}
                        >
                          이 진술에 제시할 단서
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            maxHeight: 170,
                            overflowY: "auto",
                          }}
                        >
                          {evidence.map((item) => (
                            <Button
                              key={item.id}
                              sx={{
                                ...menuButtonSx,
                                bgcolor:
                                  presentedEvidenceId === item.id
                                    ? "#815329"
                                    : "rgba(10,18,17,.85)",
                              }}
                              onClick={() => setPresentedEvidenceId(item.id)}
                            >
                              {item.title}
                            </Button>
                          ))}
                        </Box>
                        <Button
                          sx={{ ...menuButtonSx, mt: 2, px: 4 }}
                          disabled={!presentedEvidenceId}
                          onClick={presentEvidence}
                        >
                          이 단서를 제시한다
                        </Button>
                      </Box>
                    )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {showInventory && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              bgcolor: "rgba(2,5,5,.92)",
              px: { xs: 3, md: "10%" },
              py: 5,
              overflowY: "auto",
            }}
          >
            <Button sx={menuButtonSx} onClick={() => setShowInventory(false)}>
              ← 돌아가기
            </Button>
            <Typography variant="h3" sx={{ mt: 5, mb: 4, fontWeight: 900 }}>
              단서함
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {evidence.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{ borderTop: "1px solid rgba(232,205,156,.6)", py: 2 }}
                >
                  <Typography sx={{ color: "#c9a36e", fontSize: 13 }}>
                    EVIDENCE {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, my: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#c9c7bd", lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>
            {evidence.length === 0 && (
              <Typography sx={{ color: "#c9c7bd" }}>
                아직 확보한 단서가 없습니다.
              </Typography>
            )}
          </Box>
        )}

        {phaseIntroPending && !dialogue && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 35,
              bgcolor: "rgba(0,0,0,.35)",
            }}
          >
            <DialogueBox
              key={`phase-intro-${phase.id}`}
              line={{ speaker: phase.title, text: phase.intro }}
              onAdvance={() =>
                setProgress((previous) => ({
                  ...previous,
                  seenPhaseIds: addId(previous.seenPhaseIds, phase.id),
                }))
              }
            />
          </Box>
        )}
        {dialogue && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 40,
              bgcolor: "rgba(0,0,0,.35)",
            }}
          >
            <DialogueBox
              key={`${dialogue.lines[dialogue.index].speaker}-${dialogue.index}-${dialogue.lines[dialogue.index].text}`}
              line={dialogue.lines[dialogue.index]}
              onAdvance={advanceDialogue}
            />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
