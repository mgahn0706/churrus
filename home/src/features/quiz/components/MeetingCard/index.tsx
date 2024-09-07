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
      height={72}
      width={1}
      alignItems="center"
      py={1}
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
        width={72}
        height={72}
        overflow="hidden"
        borderRadius="12px"
        display="flex"
        minWidth={72}
        justifyContent="center"
      >
        <Image
          className="meeting-card-image"
          width={128}
          height={72}
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
        >
          <Typography color="#121212" fontSize="16px" fontWeight={500}>
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
