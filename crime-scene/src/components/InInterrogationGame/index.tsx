"use client";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import {
  findCombination,
  findInterrogationQuestion,
  interrogationFallbackAnswers,
  MAX_INTERROGATION_CLUES,
  evidenceInstanceId,
  evidenceLogicalId,
  sourceEvidenceInstanceId,
  getCollectedEvidence,
  initialInterrogationProgress,
  interrogationStorageKey,
  readInterrogationProgress,
  type InterrogationProgress,
} from "@/features/interrogation/engine";
import { phasePeople } from "@/features/interrogation/phasePeople";
import usePreventUnload from "@/hooks/usePreventUnload";
import type {
  InterrogationConversationChoice,
  InterrogationDialogueLine,
  InterrogationScenarioType,
  InterrogationScript,
  InterrogationSource,
} from "@/types";
import DialogueBox from "./DialogueBox";
import { playSelectSound, primeDialogueAudio } from "./dialogueSound";
import EvidenceSelectionGrid from "./EvidenceSelectionGrid";
import EvidenceTab from "./EvidenceTab";
import ResearchMap from "./ResearchMap";

type GameView = "map" | "logic" | "interrogation" | "evidence";
type DialogueSequence = {
  lines: InterrogationDialogueLine[];
  index: number;
  grantEvidenceId?: string;
  choices?: InterrogationConversationChoice[];
  askedChoiceIds?: string[];
  showChoices?: boolean;
  choiceSpeaker?: string;
  choicePortrait?: string;
};

const theme = createScenarioTheme("#bd874e", "dark", "Galmuri11, sans-serif");
const addId = (ids: string[], id: string) =>
  ids.includes(id) ? ids : [...ids, id];
const asDialogue = (line: string | InterrogationDialogueLine) =>
  typeof line === "string" ? { text: line } : line;
const asDialogueSequence = (
  script: InterrogationScript,
  speaker: string,
  portrait?: string,
): InterrogationDialogueLine[] => {
  const lines = Array.isArray(script) ? script : [script];
  if (lines.length === 0) return [{ speaker, portrait, text: "지금은 할 말이 없습니다." }];
  return lines.map((line) => {
    if (typeof line === "string") return { speaker, portrait, text: line };
    return {
      ...line,
      speaker: line.speaker ?? speaker,
      portrait: line.portrait ?? (line.speaker && line.speaker !== speaker ? undefined : portrait),
    };
  });
};
const menuButtonSx = {
  color: "#f3dfbb",
  border: "1px solid rgba(231,201,148,.55)",
  bgcolor: "rgba(6,12,12,.78)",
  borderRadius: 0.5,
  fontWeight: 800,
  px: 2,
  "&:hover": { bgcolor: "rgba(167,112,55,.4)", borderColor: "#f1d19a" },
  "&:focus-visible": { outline: "2px solid #ffdc9a", outlineOffset: 2 },
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
  const storageKey = interrogationStorageKey(scenario.id);
  const [progress, setProgress] = useState<InterrogationProgress>(
    initialInterrogationProgress,
  );
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<GameView>("map");
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);
  const [selectedSuspectName, setSelectedSuspectName] = useState("");
  const [questionEvidenceIds, setQuestionEvidenceIds] = useState<string[]>([]);
  const [focusedMapEvidenceId, setFocusedMapEvidenceId] = useState("");
  const [lockedSourceId, setLockedSourceId] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dialogue, setDialogue] = useState<DialogueSequence | null>(null);
  const [phaseIntroIndex, setPhaseIntroIndex] = useState(0);
  const [energyWarning, setEnergyWarning] = useState(false);
  const [newEvidenceToast, setNewEvidenceToast] = useState<{ key: number; title: string } | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  usePreventUnload(true);

  useEffect(() => {
    setProgress(readInterrogationProgress(localStorage.getItem(storageKey)));
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [loaded, progress, storageKey]);

  useEffect(() => {
    primeDialogueAudio();
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest("button");
      if (!button || button.matches(':disabled, [aria-disabled="true"], [data-no-select-sfx]')) return;
      playSelectSound();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const phase = scenario.phases.find(
    (item) => !progress.completedPhaseIds.includes(item.id),
  );
  const phaseId = phase?.id;

  useEffect(() => {
    if (!loaded) return;
    setView(phase?.finalInterrogation ? "interrogation" : "map");
    setQuestionEvidenceIds([]);
    setSelectedSuspectName("");
    setSelectedEvidenceIds([]);
    setFocusedMapEvidenceId("");
    setLockedSourceId("");
    setPasswordInput("");
    setPasswordError("");
    setDialogue(null);
    setPhaseIntroIndex(0);
    setEnergyWarning(false);
  }, [phaseId, phase?.finalInterrogation, loaded]);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [view, phaseId]);

  const evidence = useMemo(
    () => getCollectedEvidence(scenario.phases, progress.collectedEvidenceIds),
    [scenario.phases, progress.collectedEvidenceIds],
  );
  const focusedMapEvidence = evidence.find((item) => item.instanceId === focusedMapEvidenceId);
  const lockedSource = phase?.sources.find((item) => item.id === lockedSourceId);
  const people = useMemo(() => {
    if (!phase) return [];
    const profiles = [...scenario.suspects, ...scenario.victims, ...(scenario.people ?? [])];
    return phasePeople(phase).map((position) => {
      const profile = profiles.find((item) => item.name === position.name);
      return {
        ...position,
        image: profile?.image,
        statement: profile && "statement" in profile && typeof profile.statement === "string" ? profile.statement : undefined,
      };
    });
  }, [scenario.suspects, scenario.victims, scenario.people, phase]);
  const interrogationPeople = people.filter((person) =>
    scenario.people?.find((profile) => profile.name === person.name)?.canInterrogate !== false);
  const canConnect = Boolean(phase?.combinations.length) && evidence.length >= 2;
  const energySpent = phase ? progress.energySpentByPhase[phase.id] ?? 0 : 0;
  const energyLimit = phase?.energyLimit ?? 4;
  const energyRemaining = Math.max(0, energyLimit - energySpent);
  const activeSuspectName = interrogationPeople.some((person) => person.name === selectedSuspectName)
    ? selectedSuspectName : interrogationPeople[0]?.name ?? "";
  const activeSuspect = people.find(
    (item) => item.name === activeSuspectName,
  );
  const phaseIntroPending = Boolean(
    phase?.intro && !progress.seenPhaseIds.includes(phase.id),
  );
  const phaseIntroLines = useMemo(
    () => phase ? asDialogueSequence(phase.intro, "나") : [],
    [phase],
  );
  const visiblePhaseIntroIndex = Math.min(phaseIntroIndex, phaseIntroLines.length - 1);

  const spendEnergy = (amount = 1) => {
    if (!phase) return;
    if (energySpent + amount >= energyLimit) setEnergyWarning(true);
    setProgress((previous) => ({
      ...previous,
      energySpentByPhase: {
        ...previous.energySpentByPhase,
        [phase.id]: (previous.energySpentByPhase[phase.id] ?? 0) + amount,
      },
    }));
  };

  const queueDialogue = (
    lines: InterrogationDialogueLine[],
    grantEvidenceId?: string,
  ) => {
    setDialogue({ lines, index: 0, grantEvidenceId });
  };

  const showEvidenceToast = (title: string) => {
    setNewEvidenceToast((previous) => ({ key: (previous?.key ?? 0) + 1, title }));
  };

  const advanceDialogue = () => {
    if (!dialogue) return;
    if (dialogue.index < dialogue.lines.length - 1) {
      setDialogue({ ...dialogue, index: dialogue.index + 1 });
      return;
    }
    if (dialogue.choices?.some((choice) => !dialogue.askedChoiceIds?.includes(choice.id))) {
      setDialogue({ ...dialogue, showChoices: true });
      return;
    }
    if (dialogue.grantEvidenceId) {
      const id = dialogue.grantEvidenceId;
      const isNew = !progress.collectedEvidenceIds.includes(id);
      const nextProgress = {
        ...progress,
        collectedEvidenceIds: addId(progress.collectedEvidenceIds, id),
      };
      localStorage.setItem(storageKey, JSON.stringify(nextProgress));
      setProgress(nextProgress);
      setFocusedMapEvidenceId(id);
      if (isNew) {
        showEvidenceToast(getCollectedEvidence(scenario.phases, [id])[0]?.title ?? "새 단서");
      }
    }
    setDialogue(null);
  };

  const chooseConversationQuestion = (choice: InterrogationConversationChoice) => {
    if (!dialogue?.choiceSpeaker) return;
    spendEnergy();
    setDialogue({
      ...dialogue,
      lines: [
        { speaker: "나", text: choice.question },
        ...asDialogueSequence(choice.answer, dialogue.choiceSpeaker, dialogue.choicePortrait),
      ],
      index: 0,
      showChoices: false,
      askedChoiceIds: addId(dialogue.askedChoiceIds ?? [], choice.id),
    });
  };

  const inspectSource = (source: InterrogationSource) => {
    if (!phase) return;
    const instanceId = sourceEvidenceInstanceId(phase.id, source);
    const isNew = !progress.collectedEvidenceIds.includes(instanceId);
    if (isNew && energySpent + 1 >= energyLimit) setEnergyWarning(true);
    const nextProgress = {
      ...progress,
      collectedEvidenceIds: addId(progress.collectedEvidenceIds, instanceId),
      energySpentByPhase: isNew
        ? { ...progress.energySpentByPhase, [phase.id]: energySpent + 1 }
        : progress.energySpentByPhase,
    };
    localStorage.setItem(storageKey, JSON.stringify(nextProgress));
    setProgress(nextProgress);
    setFocusedMapEvidenceId(instanceId);
    if (isNew) showEvidenceToast(source.evidence.title);
  };

  const selectSource = (source: InterrogationSource) => {
    if (!phase) return;
    const collected = progress.collectedEvidenceIds.includes(sourceEvidenceInstanceId(phase.id, source));
    if (!collected && source.password) {
      setLockedSourceId(source.id);
      setPasswordInput("");
      setPasswordError("");
      return;
    }
    inspectSource(source);
  };

  const trySourcePassword = () => {
    if (!lockedSource || !passwordInput.trim()) return;
    if (passwordInput.trim() === lockedSource.password?.trim()) {
      setLockedSourceId("");
      setPasswordInput("");
      setPasswordError("");
      inspectSource(lockedSource);
      return;
    }
    spendEnergy();
    setPasswordError("비밀번호가 틀렸습니다. 에너지 1을 사용했습니다.");
    setPasswordInput("");
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
        { speaker: "나", text: "두 단서 사이에서 연결점을 찾지 못했다." },
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
        { speaker: "나", text: combination.explanation },
        {
          speaker: "나",
          text: `${combination.result.title}: ${combination.result.description}`,
        },
      ],
      evidenceInstanceId(phase.id, combination.result.id),
    );
  };

  const askSelectedEvidence = (name: string) => {
    if (!phase || questionEvidenceIds.length === 0 || questionEvidenceIds.length > MAX_INTERROGATION_CLUES || new Set(questionEvidenceIds.map(evidenceLogicalId)).size !== questionEvidenceIds.length) return;
    if (scenario.people?.some((person) => person.name === name && person.canInterrogate === false)) return;
    const interrogation = phase.interrogations.find((item) => item.suspectName === name);
    if (!interrogation) return;
    primeDialogueAudio();
    const person = people.find((item) => item.name === name);
    const question = findInterrogationQuestion(interrogation, questionEvidenceIds, Boolean(phase.finalInterrogation));
    spendEnergy();
    if (question) {
      setProgress((previous) => ({
        ...previous,
        askedQuestionIds: addId(previous.askedQuestionIds, question.id),
        resolvedQuestionIds: addId(previous.resolvedQuestionIds, question.id),
      }));
    }
    setSelectedSuspectName(name);
    setView("interrogation");
    const fallbackAnswers = interrogationFallbackAnswers(phase, name, scenario.fallbackAnswers);
    const answer = question?.answer ?? fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)]
      ?? "그 단서에 대해서는 할 말이 없습니다.";
    queueDialogue(asDialogueSequence(
      answer,
      name,
      person?.image,
    ).map((line) => ({ ...line, speaker: name, portrait: person?.image })), question?.revealedEvidence
      ? evidenceInstanceId(phase.id, question.revealedEvidence.id)
      : undefined);
  };

  const toggleQuestionEvidence = useCallback((id: string) => {
    setQuestionEvidenceIds((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : previous.length < MAX_INTERROGATION_CLUES && !previous.some((item) => evidenceLogicalId(item) === evidenceLogicalId(id)) ? [...previous, id] : previous,
    );
  }, []);

  const talkToPerson = (name: string, stayOnMap = false) => {
    const interrogation = phase?.interrogations.find((item) => item.suspectName === name);
    if (!interrogation) return;
    primeDialogueAudio();
    const person = people.find((item) => item.name === name);
    setSelectedSuspectName(name);
    if (!stayOnMap) setView("interrogation");
    setDialogue({
      lines: asDialogueSequence(interrogation.conversation ?? [
        { speaker: "나", text: "지금 잠깐 이야기할 수 있나요?" },
        person?.statement ?? "지금은 할 말이 없습니다.",
      ], name, person?.image),
      index: 0,
      choices: interrogation.conversationChoices,
      askedChoiceIds: [],
      choiceSpeaker: name,
      choicePortrait: person?.image,
    });
  };

  const changeView = (nextView: GameView) => {
    if (nextView === "interrogation" && !phase?.finalInterrogation) return;
    setView(nextView);
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
          className="interrogation-game"
          sx={{
            position: "relative",
            minHeight: "100dvh",
            fontFamily: "Galmuri11, sans-serif",
            bgcolor: "#080d0c",
            overflow: "hidden",
            backgroundImage: `linear-gradient(180deg, rgba(4,7,8,.58), rgba(4,7,8,.15) 45%, rgba(4,7,8,.9)), url(${scenario.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <DialogueBox
            key={`story-${progress.storyIndex}`}
            line={line}
            hasNext={progress.storyIndex < scenario.prologue.length - 1}
            endLabel="조사 시작 →"
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
          className="interrogation-game"
          sx={{
            minHeight: "100dvh",
            fontFamily: "Galmuri11, sans-serif",
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="interrogation-game"
        sx={{
          position: "relative",
          height: "100dvh",
          fontFamily: "Galmuri11, sans-serif",
          bgcolor: "#080d0c",
          color: "#f8edda",
          overflow: "hidden",
        }}
      >
        <Box
          component="header"
          sx={{
            position: "absolute",
            top: { xs: 12, md: 20 },
            left: { xs: 12, md: 24 },
            right: { xs: 12, md: 24 },
            zIndex: 20,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            pointerEvents: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1, bgcolor: "rgba(4,8,8,.78)", backdropFilter: "blur(10px)", borderRadius: 1 }}>
            <Typography sx={{ fontSize: 12, whiteSpace: "nowrap" }}>{phase.timeLabel}</Typography>
            <Typography sx={{ color: "#d9b77d", fontSize: 12, whiteSpace: "nowrap" }}>⚡ {energyRemaining}/{energyLimit}</Typography>
          </Box>
          <Button
            sx={{ ...menuButtonSx, pointerEvents: "auto", bgcolor: "rgba(4,8,8,.86)", borderColor: "#d9b77d", fontSize: 12 }}
            onClick={() => {
              if (phase.finalInterrogation) {
                router.push(`/scenarios/scenario/${scenario.id}/submit`);
              } else {
                setProgress((previous) => ({
                  ...previous,
                  completedPhaseIds: addId(previous.completedPhaseIds, phase.id),
                }));
              }
            }}
          >
            {phase.finalInterrogation ? "답변 제출 →" : "다음 시간 →"}
          </Button>
        </Box>

        {energyWarning && (
          <Alert
            severity="warning"
            onClose={() => setEnergyWarning(false)}
            sx={{ position: "fixed", top: 108, right: 16, zIndex: 60, maxWidth: 380 }}
          >
            에너지 소진 · 계속 진행 가능
          </Alert>
        )}

        <Box
          component="main"
          ref={mainRef}
          sx={{
            position: "absolute",
            inset: 0,
            overflowX: "hidden",
            overflowY: view === "logic" ? "auto" : "hidden",
            overscrollBehavior: "contain",
          }}
        >
          {view === "map" && (
            <ResearchMap
              image={phase.mapImage}
              locations={phase.locations}
              sources={phase.sources}
              people={people}
              collectedEvidenceIds={progress.collectedEvidenceIds}
              phaseId={phase.id}
              onSelect={selectSource}
              onSelectPerson={(name) => talkToPerson(name, true)}
            />
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
                        (item) => item.instanceId === selectedEvidenceIds[slot],
                      )?.title || `단서 ${slot + 1}`}
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 4 }}>
                {evidence.map((item) => {
                  const selected = selectedEvidenceIds.includes(item.instanceId);
                  return (
                    <Button
                      key={item.instanceId}
                      onClick={() =>
                        setSelectedEvidenceIds((previous) =>
                          selected
                            ? previous.filter((id) => id !== item.instanceId)
                            : previous.length < 2
                              ? [...previous, item.instanceId]
                              : [previous[1], item.instanceId],
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
                position: "absolute",
                top: { xs: 62, md: 72 },
                bottom: { xs: "calc(82px + env(safe-area-inset-bottom))", md: 96 },
                left: 0,
                right: 0,
                width: "min(100%, 1200px)",
                mx: "auto",
                px: { xs: 1.5, md: 3 },
                display: "grid",
                gridTemplateRows: "auto minmax(0, 1fr)",
                gap: { xs: 1, md: 1.5 },
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${interrogationPeople.length}, minmax(0, 1fr))`, gap: .75 }}>
                {interrogationPeople.map((person) => (
                  <Button
                    key={person.name}
                    aria-pressed={activeSuspectName === person.name}
                    onClick={() => {
                      setSelectedSuspectName(person.name);
                    }}
                    sx={{
                      ...menuButtonSx,
                      minWidth: 0,
                      minHeight: { xs: 48, md: 64 },
                      p: .5,
                      display: "flex",
                      gap: { xs: .25, md: 1 },
                      flexDirection: { xs: "column", md: "row" },
                      bgcolor: activeSuspectName === person.name ? "#624022" : "rgba(6,12,12,.72)",
                    }}
                  >
                    {person.image && <Box component="img" src={person.image} alt="" sx={{ width: { xs: 24, md: 40 }, height: { xs: 24, md: 40 }, objectFit: "cover", borderRadius: "50%" }} />}
                    <Typography component="span" sx={{ fontSize: { xs: 10, md: 13 }, whiteSpace: "nowrap" }}>{person.name}</Typography>
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, .95fr) minmax(0, 1.05fr)", md: "minmax(0, 1fr) minmax(0, 1.15fr)" }, gap: { xs: .75, md: 1.5 }, minHeight: 0 }}>
                <Box sx={{ minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", border: "1px solid rgba(231,201,148,.24)", bgcolor: "rgba(6,12,12,.78)" }}>
                  <Typography sx={{ flexShrink: 0, px: 1.25, py: 1, fontSize: { xs: 11, md: 13 }, color: "#d9b77d", borderBottom: "1px solid rgba(231,201,148,.18)" }}>단서 {evidence.length} · 선택 {questionEvidenceIds.length}/{MAX_INTERROGATION_CLUES}</Typography>
                  <Box
                    role="region"
                    aria-label="신문할 단서 목록"
                    tabIndex={0}
                    sx={{
                      flex: "1 1 0",
                      minHeight: 0,
                      overflowY: "auto",
                      overscrollBehavior: "contain",
                      touchAction: "pan-y",
                      WebkitOverflowScrolling: "touch",
                      scrollbarGutter: "stable",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#8a704d transparent",
                      p: { xs: .75, md: 1 },
                      "&:focus-visible": { outline: "2px solid #ffdc9a", outlineOffset: -2 },
                      "&::-webkit-scrollbar": { width: 7 },
                      "&::-webkit-scrollbar-thumb": { bgcolor: "#8a704d", borderRadius: 4 },
                    }}
                  >
                    <EvidenceSelectionGrid evidence={evidence} selectedIds={questionEvidenceIds} onToggle={toggleQuestionEvidence} />
                  </Box>
                </Box>
                <Box sx={{ minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", border: "1px solid rgba(231,201,148,.24)", bgcolor: "rgba(6,12,12,.65)", overflow: "hidden" }}>
                  <Box sx={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
                    {activeSuspect?.image && <Box component="img" src={activeSuspect.image} alt={activeSuspectName} sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%" }} />}
                    <Typography sx={{ position: "absolute", left: 10, right: 10, bottom: 8, fontSize: { xs: 14, md: 22 }, fontWeight: 800, textShadow: "0 2px 12px #000" }}>{activeSuspectName}</Typography>
                  </Box>
                  <Button
                    sx={{ ...menuButtonSx, m: { xs: .75, md: 1 }, minHeight: { xs: 44, md: 52 }, bgcolor: "#815329" }}
                    disabled={questionEvidenceIds.length === 0}
                    onClick={() => askSelectedEvidence(activeSuspectName)}
                  >
                    신문 {questionEvidenceIds.length > 0 ? "⚡1" : ""}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {view === "evidence" && (
            <EvidenceTab scenario={scenario} evidence={evidence} />
          )}
        </Box>

        <Box
          component="nav"
          aria-label="게임 메뉴"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: { xs: "calc(12px + env(safe-area-inset-bottom))", md: 22 },
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            gap: .5,
            p: .6,
            bgcolor: "rgba(4,8,8,.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(231,201,148,.35)",
            borderRadius: 2,
            boxShadow: "0 8px 30px rgba(0,0,0,.45)",
          }}
        >
          {!phase.finalInterrogation && (
            <Button
              aria-pressed={view === "map"}
              onClick={() => changeView("map")}
              sx={{ color: "#d7c6a7", minWidth: 64, px: { xs: 1, md: 2 }, fontWeight: 700 }}
            >
              지도
            </Button>
          )}
          {phase.combinations.length > 0 && (
            <Button disabled={!canConnect} onClick={() => changeView("logic")} sx={{ color: "#d7c6a7", minWidth: 64, px: 1 }}>
              연결
            </Button>
          )}
          {phase.finalInterrogation && <Button
            aria-pressed={view === "interrogation"}
            onClick={() => changeView("interrogation")}
            sx={{ minWidth: { xs: 84, md: 110 }, px: { xs: 1.5, md: 2.5 }, py: 1.1, fontWeight: 800, color: "#fff4df", bgcolor: view === "interrogation" ? "#a36a35" : "rgba(163,106,53,.55)", "&:hover": { bgcolor: "#bd874e" } }}
          >
            신문
          </Button>}
          <Button
            aria-pressed={view === "evidence"}
            onClick={() => changeView("evidence")}
            sx={{ minWidth: { xs: 88, md: 120 }, px: { xs: 1.5, md: 2.5 }, py: 1.1, fontWeight: 800, color: "#fff4df", bgcolor: view === "evidence" ? "#a36a35" : "rgba(163,106,53,.55)", "&:hover": { bgcolor: "#bd874e" } }}
          >
            단서함
          </Button>
        </Box>

        <Dialog
          open={Boolean(lockedSource)}
          onClose={() => setLockedSourceId("")}
          fullWidth
          maxWidth="xs"
          aria-label="잠긴 단서 열기"
          slotProps={{ paper: { sx: { bgcolor: "#101816", color: "#f8edda", border: "1px solid rgba(231,201,148,.4)", borderRadius: 1 } } }}
        >
          <DialogTitle>{lockedSource?.title} · 잠긴 단서</DialogTitle>
          <DialogContent sx={{ display: "grid", gap: 2, pt: "12px !important" }}>
            {lockedSource?.description && <Typography sx={{ whiteSpace: "pre-wrap" }}>{lockedSource.description}</Typography>}
            <Box component="form" onSubmit={(event) => { event.preventDefault(); trySourcePassword(); }} sx={{ display: "grid", gap: 1.5 }}>
              <TextField autoFocus size="small" label="비밀번호" value={passwordInput} onChange={(event) => { setPasswordInput(event.target.value); setPasswordError(""); }} error={Boolean(passwordError)} helperText={passwordError || "틀리면 에너지 1을 사용합니다."} />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button onClick={() => setLockedSourceId("")}>취소</Button>
                <Button type="submit" variant="contained" disabled={!passwordInput.trim()}>열기</Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="interrogation-evidence-dialog"
          open={Boolean(focusedMapEvidence)}
          onClose={() => setFocusedMapEvidenceId("")}
          fullWidth
          maxWidth="md"
          aria-label="단서 보기"
          slotProps={{ paper: { sx: { bgcolor: "#101816", color: "#f8edda", border: "1px solid rgba(231,201,148,.4)", borderRadius: 1, maxHeight: "85dvh", m: 1.5 } } }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, px: 2, py: 1, borderBottom: "1px solid rgba(231,201,148,.18)" }}>
            <Typography component="span" sx={{ fontSize: 14, color: "#d9b77d" }}>단서</Typography>
            <Button sx={{ color: "#d9b77d" }} onClick={() => setFocusedMapEvidenceId("")}>닫기</Button>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
            {focusedMapEvidence && (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: focusedMapEvidence.image ? "minmax(0, 1.2fr) minmax(260px, .8fr)" : "1fr" }, gap: 2, alignItems: "start" }}>
                {focusedMapEvidence.image && <Box component="img" src={focusedMapEvidence.image} alt={focusedMapEvidence.title} sx={{ width: "100%", maxHeight: "60dvh", objectFit: "contain", bgcolor: "#070c0b" }} />}
                <Box>
                  <Typography sx={{ color: "#b99c75", fontSize: 12, mb: 1 }}>{phase.timeLabel}</Typography>
                  <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 800, mb: 2 }}>{focusedMapEvidence.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 15, md: 17 }, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{focusedMapEvidence.description}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        <Snackbar
          key={newEvidenceToast?.key ?? "empty"}
          className="interrogation-evidence-dialog"
          open={Boolean(newEvidenceToast)}
          autoHideDuration={2200}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setNewEvidenceToast(null)}
          sx={{ top: { xs: 64, md: 76 }, zIndex: 1500 }}
        >
          <Box role="status" sx={{ px: 2, py: 1, bgcolor: "#1b2923", color: "#f8edda", border: "1px solid #d9b77d", borderRadius: .5, boxShadow: "0 8px 28px rgba(0,0,0,.45)", fontSize: 13, fontWeight: 800 }}>
            단서 획득 · {newEvidenceToast?.title}
          </Box>
        </Snackbar>


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
              key={`phase-intro-${phase.id}-${visiblePhaseIntroIndex}`}
              line={phaseIntroLines[visiblePhaseIntroIndex]}
              hasNext={visiblePhaseIntroIndex < phaseIntroLines.length - 1}
              endLabel="계속 →"
              onAdvance={() => {
                if (visiblePhaseIntroIndex < phaseIntroLines.length - 1) {
                  setPhaseIntroIndex(visiblePhaseIntroIndex + 1);
                } else {
                  setProgress((previous) => ({
                    ...previous,
                    seenPhaseIds: addId(previous.seenPhaseIds, phase.id),
                  }));
                }
              }}
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
              hasNext={dialogue.index < dialogue.lines.length - 1}
              endLabel={dialogue.choices?.some((choice) => !dialogue.askedChoiceIds?.includes(choice.id)) ? "질문 선택 →" : "닫기"}
              choices={dialogue.showChoices ? dialogue.choices?.filter((choice) => !dialogue.askedChoiceIds?.includes(choice.id)) : undefined}
              onChoose={chooseConversationQuestion}
              choiceCostLabel="⚡1"
              onCloseChoices={() => setDialogue(null)}
              onAdvance={advanceDialogue}
            />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
