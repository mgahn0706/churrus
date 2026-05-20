import { LaunchRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { saveScenarioCertification } from "@/features/suspect/libs/certification";
import { DetectiveNoteType } from "@/features/suspect/types";
import { AnswerRevealSequence } from "./AnswerRevealSequence";
import TabPanel from "./Answer/TabPanel";

type ScenarioAnswerPageProps = {
  scenarioKey: string;
  missingDescription: ReactNode;
  reveal: (submittedAnswer: DetectiveNoteType) => React.ComponentProps<
    typeof AnswerRevealSequence
  >;
  renderAdditional?: (submittedAnswer: DetectiveNoteType) => ReactNode;
  renderConfess: (submittedAnswer: DetectiveNoteType) => ReactNode;
  renderSolution: (submittedAnswer: DetectiveNoteType) => ReactNode;
  culpritsHref: string;
  culpritsTabLabel?: string;
  culpritsButtonLabel?: string;
};

export function ScenarioAnswerPage({
  scenarioKey,
  missingDescription,
  reveal,
  renderAdditional,
  renderConfess,
  renderSolution,
  culpritsHref,
  culpritsTabLabel = "용의자 롤카드 PDF",
  culpritsButtonLabel = "용의자 롤카드 PDF 다운로드",
}: ScenarioAnswerPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuspectAccused, setIsSuspectAccused] = useState(false);
  const [tabValue, setTabValue] = useState("confess");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedValue = localStorage.getItem(scenarioKey);
    if (storedValue == null) {
      setIsSuspectAccused(false);
      return;
    }

    const parsedValue = JSON.parse(storedValue) as DetectiveNoteType;
    if (!parsedValue.accusedSuspect) {
      setIsSuspectAccused(false);
      return;
    }

    setIsSuspectAccused(true);
    saveScenarioCertification(scenarioKey, parsedValue.accusedSuspect);
  }, [scenarioKey]);

  if (!isSuspectAccused) {
    return (
      <Dialog open>
        <DialogTitle>
          <Typography variant="h6" component="h2">
            이용 안내
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>{missingDescription}</Typography>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                router.push(`/suspect/scenario/${scenarioKey}`);
              }}
            >
              확인
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }

  const submittedAnswer = JSON.parse(
    localStorage.getItem(scenarioKey) ?? ""
  ) as DetectiveNoteType;

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <AnswerRevealSequence {...reveal(submittedAnswer)} />

      <Box display="block" color="white" mx={15} mt={15}>
        <Tabs
          value={tabValue}
          onChange={(_event: SyntheticEvent, newValue: string) =>
            setTabValue(newValue)
          }
          textColor="inherit"
          indicatorColor="primary"
          aria-label="scenario answer tabs"
        >
          <Tab sx={{ fontSize: "20px" }} value="confess" label="범인의 고백" />
          {renderAdditional && (
            <Tab
              sx={{ fontSize: "20px" }}
              value="additional"
              label="추가 질문 해답"
            />
          )}
          <Tab sx={{ fontSize: "20px" }} value="solution" label="사건 풀이법" />
          <Tab sx={{ fontSize: "20px" }} value="culprits" label={culpritsTabLabel} />
        </Tabs>

        <TabPanel value={tabValue} index="confess">
          {renderConfess(submittedAnswer)}
        </TabPanel>

        {renderAdditional && (
          <TabPanel value={tabValue} index="additional">
            {renderAdditional(submittedAnswer)}
          </TabPanel>
        )}

        <TabPanel value={tabValue} index="solution">
          {renderSolution(submittedAnswer)}
        </TabPanel>

        <TabPanel value={tabValue} index="culprits">
          <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
            <Button
              variant="contained"
              color="info"
              href={culpritsHref}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mb: 10 }}
            >
              {culpritsButtonLabel}
              <LaunchRounded sx={{ ml: 1, fontSize: 20 }} />
            </Button>
          </Box>
        </TabPanel>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={10}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.removeItem(scenarioKey);
            router.push(`/suspect/certification?scenario=${scenarioKey}`);
          }}
          sx={{ mb: 20 }}
        >
          인증카드 보러가기
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            localStorage.removeItem(scenarioKey);
            router.push("/suspect");
          }}
          sx={{ mb: 20 }}
        >
          메인 화면으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
}
