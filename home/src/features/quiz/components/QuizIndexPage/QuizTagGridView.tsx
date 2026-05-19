import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { QUIZ_TAG_GROUPS } from "@/features/quiz/domain";

export default function QuizTagGridView() {
  const router = useRouter();
  const cardXs = useResponsiveValue([12, 6, 4]);

  return (
    <Box mt={7}>
      <Grid
        container
        rowSpacing={[0, 1, 1]}
        columnSpacing={[0, 0, 3]}
        width="100%"
      >
        {QUIZ_TAG_GROUPS.map((tagGroup) => (
          <Grid item xs={cardXs} key={tagGroup.tag}>
            <Box
              display="flex"
              height={72}
              width={1}
              alignItems="center"
              py={1}
              gap={2}
              borderRadius="12px"
              onClick={() => {
                router.push(`/tags/${tagGroup.slug}`);
              }}
              sx={{
                cursor: "pointer",
                "&:hover .quiz-tag-thumb-image": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <Box
                width={72}
                height={72}
                minWidth={72}
                borderRadius="12px"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#FEFEFD"
                position="relative"
              >
                <Box
                  position="absolute"
                  top={7}
                  right={7}
                  bottom={7}
                  left={7}
                  borderRadius="10px"
                  overflow="hidden"
                >
                  <Image
                    className="quiz-tag-thumb-image"
                    src={tagGroup.imageSource}
                    alt={tagGroup.label}
                    fill
                    sizes="64px"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </Box>
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
                >
                  <Typography color="#121212" fontSize="18px" fontWeight={500}>
                    {tagGroup.label}
                  </Typography>
                  <Typography color="#606B80" fontSize="12px">
                    {tagGroup.shortDescription}
                  </Typography>
                </Box>
                <Typography color="#606B80" fontSize="12px" sx={{ mb: 1 }}>
                  문제 {tagGroup.quizCount}개
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
