import { Box, Typography } from "@mui/material";
import { QuizData } from "../../fixtures/quizzes";
import Image from "next/image";
import { MEETINGS } from "../../fixtures/meetings";
import { useRouter } from "next/router";

export default function MeetingCard({ meetingId }: { meetingId: string }) {
  const router = useRouter();

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
      height={100}
      width={1}
      alignItems="center"
      py={2}
      gap={2}
      borderRadius="12px"
      onClick={() => {
        router.push(`/meetings/${meeting.id}`);
      }}
      sx={{
        cursor: "pointer",
        ":hover": {
          "& .meeting-card-image": {
            transform: "scale(1.2)",
            transition: "all 0.3s",
          },
        },
      }}
    >
      <Box
        width={100}
        height={100}
        overflow="hidden"
        borderRadius="12px"
        display="flex"
        justifyContent="center"
      >
        <Image
          className="meeting-card-image"
          width={170}
          height={100}
          src={meeting.imageSource ?? QuizData[meetingId][0].quizImageSource}
          alt={meeting.title}
          style={{
            paddingRight: "12px",
            borderRadius: "12px",
          }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={["200px", "300px", "500px"]}
          sx={{
            wordBreak: "keep-all",
          }}
          py={1}
        >
          <Typography color="#121212" fontSize="18px" fontWeight={500}>
            {meeting.title}
          </Typography>

          <Typography color="#606B80" fontSize="12px">
            {creators.join(", ")}
          </Typography>
        </Box>
        <Typography color="#606B80" fontSize="12px" sx={{ mb: 1 }}>
          문제 {meeting.quizIds.length}개
        </Typography>
      </Box>
    </Box>
  );
}
