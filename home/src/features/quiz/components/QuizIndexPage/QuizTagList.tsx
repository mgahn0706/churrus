import { Box, Typography } from "@mui/material";
import { QUIZ_TAG_KOREAN_NAME } from "@/features/quiz/fixtures/tagName";
import { Tags } from "@/features/quiz/types";

interface QuizTagListProps {
  tags: Tags[];
}

export default function QuizTagList({ tags }: QuizTagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <Box display="flex" flexWrap="wrap" gap={0.75} mt={0.75}>
      {tags.map((tag) => (
        <Box
          key={tag}
          px={0.75}
          py={0.25}
          borderRadius="999px"
          bgcolor="#F3F6FA"
          border="1px solid #E5EAF1"
        >
          <Typography fontSize={11} color="#6B7280" lineHeight={1.2}>
            {QUIZ_TAG_KOREAN_NAME[tag]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
