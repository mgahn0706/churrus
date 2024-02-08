import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import hangul from "hangul-js";
import { useState } from "react";

const RankStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",

    "& .QontoStepIcon-completedIcon": {
      color: "#FECD57",
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    "& .QontoStepIcon-circle": {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    "& .QontoStepIcon-active": {
      width: 32,
      height: 32,
      borderRadius: "50%",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "32px",
      backgroundColor: "#FECD57",
      color: "black",
    },
  })
);

type RankType =
  | "초보"
  | "좋은 시작"
  | "괜찮음"
  | "잘함"
  | "아주 좋음"
  | "훌륭함"
  | "대단함"
  | "놀라움"
  | "천재";

const RANK: Record<RankType, number> = {
  초보: 0,
  "좋은 시작": 2,
  괜찮음: 5,
  잘함: 8,
  "아주 좋음": 15,
  훌륭함: 20,
  대단함: 33,
  놀라움: 50,
  천재: 70,
};

export default function ScoreSection({
  fullScore,
  currentAnswers,
}: {
  fullScore: number;
  currentAnswers: string[];
}) {
  const currentScore = currentAnswers.reduce((acc, answer) => {
    return acc + hangul.disassemble(answer).length;
  }, 0);

  const currentRank =
    Object.entries(RANK).findLast(
      ([, value]) => (currentScore * 100) / fullScore >= value
    )?.[0] ?? "초보";

  function RankStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <RankStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <div className="QontoStepIcon-completedIcon" />
        ) : active ? (
          <div className="QontoStepIcon-active">{currentScore || 0}</div>
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </RankStepIconRoot>
    );
  }

  const [isRankModalOpen, setIsRankModalOpen] = useState(false);

  return (
    <>
      <Box display="flex" onClick={() => setIsRankModalOpen(true)} mt={2}>
        <Typography
          fontSize="1.1rem"
          fontWeight="bold"
          sx={{
            wordBreak: "keep-all",
          }}
        >
          {currentRank}
        </Typography>
        <Stepper
          sx={{
            ml: 1,
          }}
          activeStep={
            Object.keys(RANK).findIndex((rank) => rank === currentRank) ?? 0
          }
        >
          {Object.entries(RANK).map(([rank]) => (
            <Step key={rank}>
              <StepLabel StepIconComponent={RankStepIcon} />
            </Step>
          ))}
        </Stepper>
      </Box>
      <RankModal
        currentScore={currentScore}
        minimumScores={
          Object.entries(RANK)
            .map(([rank, value]) => [
              rank,
              Math.ceil((value * fullScore) / 100),
            ])
            .reverse() as [string, number][]
        }
        isOpen={isRankModalOpen}
        onClose={() => setIsRankModalOpen(false)}
      />
    </>
  );
}

interface RankModalProps {
  currentScore: number;
  minimumScores: [string, number][];
  isOpen: boolean;
  onClose: () => void;
}

const RankModal = ({
  currentScore,
  minimumScores,
  isOpen,
  onClose,
}: RankModalProps) => {
  const activeRank = minimumScores.find(
    ([, minimumScore]) => currentScore >= minimumScore
  )?.[0] as string;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>랭킹</DialogTitle>
      <DialogContent>
        <DialogContentText fontSize="0.8rem">
          랭킹은 가능한 모든 정답들 중, 글자 수와 사용빈도를 바탕으로 기준이
          정해집니다.
        </DialogContentText>
        <List>
          {minimumScores.map((minimumScore) =>
            activeRank === minimumScore[0] ? (
              <ListItem
                key={minimumScore[0]}
                sx={{
                  width: "100%",
                  backgroundColor: "#FECD57",
                  borderRadius: "15px",
                }}
              >
                <Box
                  width={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column" width={1}>
                    <Box fontWeight="bold">{minimumScore[0]}</Box>
                    <Typography fontSize="0.8rem" textAlign="left">
                      다음 랭킹까지{" "}
                      {minimumScores[
                        minimumScores.indexOf(minimumScore) - 1
                      ]?.[1] - currentScore}
                      점 , 천재까지 {minimumScores[0][1] - currentScore}점 남음.
                    </Typography>
                  </Box>
                  <Box fontWeight="bold">{minimumScore[1]}</Box>
                </Box>
              </ListItem>
            ) : (
              <ListItem
                key={minimumScore[0]}
                sx={{
                  width: "100%",
                }}
              >
                <Box width={1} display="flex" justifyContent="space-between">
                  <Box>{minimumScore[0]}</Box>

                  <Box> {minimumScore[1]}</Box>
                </Box>
              </ListItem>
            )
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};
