import { Box, Typography } from "@mui/material";
import { QuizData } from "../../fixtures/quizzes";
import Image from "next/image";
import { MEETINGS } from "../../fixtures/meetings";
import { useRouter } from "next/router";

export default function MeetingCard({
  meetingId,
  size = "medium",
}: {
  meetingId: string;
  size?: "small" | "medium";
}) {
  const router = useRouter();

  const imageHeight = size === "small" ? 40 : 72;

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
      height={imageHeight}
      width={1}
      alignItems="center"
      py={1}
      gap={size === "small" ? 1 : 2}
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
        width={imageHeight}
        height={imageHeight}
        overflow="hidden"
        borderRadius={size === "small" ? "4px" : "12px"}
        display="flex"
        minWidth={imageHeight}
        justifyContent="center"
      >
        <Image
          className="meeting-card-image"
          width={(imageHeight * 16) / 9}
          height={imageHeight}
          src={meeting.imageSource ?? QuizData[meetingId][0].quizImageSource}
          alt={meeting.title}
          style={{
            paddingRight: `${size === "small" ? 4 : 12}px`,
            borderRadius: `${size === "small" ? "4px" : "12px"}px`,
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
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            color="#121212"
            fontSize={size === "small" ? "14px" : "18px"}
            fontWeight={500}
          >
            {meeting.title}
          </Typography>
          {size !== "small" && (
            <Typography color="#606B80" fontSize="12px">
              {creators.join(", ")}
            </Typography>
          )}
        </Box>

        <Typography color="#606B80" fontSize="12px" sx={{ mb: 1 }}>
          문제 {meeting.quizIds.length}개
        </Typography>
      </Box>
    </Box>
  );
}
