import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ReactNode } from "react";
import { DetectiveNoteType } from "@/features/suspect/types";
import { ScenarioAdditionalAnswerItem } from "@/features/suspect/types/answerPage";

const answerTextSx = {
  wordSpacing: 3,
  lineHeight: 2.5,
  wordBreak: "keep-all",
} as const;

export function ScenarioAnswerText({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Typography variant="body1" color="white" sx={answerTextSx}>
      {children}
    </Typography>
  );
}

export function ScenarioSolutionText({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Typography variant="body1" mb={2} sx={answerTextSx}>
      {children}
    </Typography>
  );
}

export function ScenarioAdditionalAnswerList({
  items,
  submittedAnswer,
}: {
  items: ScenarioAdditionalAnswerItem[];
  submittedAnswer: DetectiveNoteType;
}) {
  return (
    <List>
      {items.map((item, index) => {
        const submittedAnswerIndex = item.submittedAnswerIndex ?? index;

        return (
          <ListItem key={index} sx={{ my: 3 }}>
            <ListItemText
              primary={
                <Typography variant="h6" mb={2}>
                  {item.question}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body1" color="white">
                    {item.answer}
                  </Typography>
                  {item.showSubmittedAnswer !== false && (
                    <Typography variant="body2" color="gray">
                      내 답변:{" "}
                      {submittedAnswer.additionalQuestionAnswers[
                        submittedAnswerIndex
                      ] ?? "입력되지 않음"}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
