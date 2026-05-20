import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CheckCircleRounded, RadioButtonUncheckedRounded } from "@mui/icons-material";
import { QuizType } from "@/features/quiz/types";
import { getMeetingById, getQuizCreatorsLabel } from "@/features/quiz/domain";
import QuizTagList from "./QuizTagList";

interface QuizListRowProps {
  quiz: QuizType;
  isSolved: boolean;
  showTags: boolean;
}

export default function QuizListRow({
  quiz,
  isSolved,
  showTags,
}: QuizListRowProps) {
  const router = useRouter();
  const meeting = getMeetingById(quiz.meetingId);

  return (
    <Box
      onClick={() => {
        router.push(`/quiz/${quiz.id}`);
      }}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "28px minmax(0, 1fr)",
          md: showTags
            ? "28px minmax(0, 1fr) 180px 180px 220px"
            : "28px minmax(0, 1fr) 180px 180px",
        },
        alignItems: "center",
        gap: 1.5,
        px: [1.5, 2, 2.5],
        py: 1.5,
        borderBottom: "1px solid #E9EDF3",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        "&:hover": {
          bgcolor: "#F8FAFC",
        },
      }}
    >
      <Box display="flex" justifyContent="center">
        {isSolved ? (
          <CheckCircleRounded sx={{ color: "#2F80ED", fontSize: 18 }} />
        ) : (
          <RadioButtonUncheckedRounded sx={{ color: "#C7CFDB", fontSize: 18 }} />
        )}
      </Box>
      <Box minWidth={0}>
        <Typography
          color="#1F2937"
          fontSize={15}
          fontWeight={500}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {quiz.title}
        </Typography>
        {showTags && (
          <Box display={["block", "block", "none"]}>
            <QuizTagList tags={quiz.tags} />
          </Box>
        )}
        <Typography
          display={["block", "block", "none"]}
          color="#8A94A6"
          fontSize={12}
          mt={showTags ? 0.75 : 0.25}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {meeting?.title}
        </Typography>
      </Box>
      <Typography
        display={["none", "none", "block"]}
        color="#606B80"
        fontSize={13}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {meeting?.title}
      </Typography>
      <Typography
        display={["none", "none", "block"]}
        color="#98A2B3"
        fontSize={13}
        textAlign="right"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {getQuizCreatorsLabel(quiz)}
      </Typography>
      {showTags && (
        <Box display={["none", "none", "block"]} minWidth={0}>
          <QuizTagList tags={quiz.tags} />
        </Box>
      )}
    </Box>
  );
}
