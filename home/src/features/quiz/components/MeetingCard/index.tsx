import { Box, Typography } from "@mui/material";
import { QuizData } from "../../fixtures/quizzes";
import Image from "next/image";
import { MEETINGS } from "../../fixtures/meetings";

export default function MeetingCard({ meetingId }: { meetingId: string }) {
  const meeting = MEETINGS[meetingId];

  const creators = Array.from(
    new Set(
      QuizData[meeting.id]
        .filter((quiz) => !!quiz.creator)
        .map((quiz) => quiz.creator)
    )
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      height={80}
      width={1}
      sx={{
        cursor: "pointer",
        ":hover": {
          transform: "translateY(-1px)",
          boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
          transition: "all 0.3s",
        },
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Typography color="#121212" fontSize="18px" fontWeight="bold">
            {meeting.title}
          </Typography>
          <Typography color="#606B80" fontSize="12px">
            {creators.join(", ")}
          </Typography>
        </Box>
        <Typography color="#606B80" fontSize="12px">
          문제 {meeting.quizIds.length}개
        </Typography>
      </Box>
      {
        <Image
          width={60}
          height={60}
          src={meeting.imageSource ?? "/image/logo/quiz-logo.png"}
          alt={meeting.title}
          style={{
            borderRadius: "12px",
          }}
        />
      }
    </Box>
  );
}
