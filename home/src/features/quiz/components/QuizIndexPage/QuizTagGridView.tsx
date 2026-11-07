import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { QUIZ_TAG_GROUPS } from "@/features/quiz/domain";

export default function QuizTagGridView() {
  const router = useRouter();
  const cardXs = useResponsiveValue([12, 6, 4]);

  return (
    <Box mt={[3, 4, 7]}>
      <Grid
        container
        rowSpacing={[1.5, 1, 1]}
        columnSpacing={[0, 0, 3]}
        width="100%"
      >
        {QUIZ_TAG_GROUPS.map((tagGroup) => (
          <Grid item xs={cardXs} key={tagGroup.tag}>
            <Box
              display="flex"
              minHeight={[80, 88, 88]}
              width={1}
              alignItems="center"
              py={[0.5, 1, 1]}
              gap={[1.5, 2, 2]}
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
                width={[64, 72, 72]}
                height={[64, 72, 72]}
                minWidth={[64, 72, 72]}
                borderRadius="12px"
                overflow="hidden"
                bgcolor="#FEFEFD"
                position="relative"
              >
                <Image
                  className="quiz-tag-thumb-image"
                  src={tagGroup.imageSource}
                  alt={tagGroup.label}
                  fill
                  sizes="72px"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.2s ease",
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height={["auto", 72, 72]}
                minHeight={[64, 72, 72]}
                minWidth={0}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  maxWidth={["200px", "300px", "500px"]}
                  minWidth={0}
                  overflow="hidden"
                >
                  <Typography
                    color="#121212"
                    fontSize={[16, 18, 18]}
                    fontWeight={500}
                    lineHeight={1.3}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: ["normal", "nowrap", "nowrap"],
                    }}
                  >
                    {tagGroup.label}
                  </Typography>
                  <Typography
                    color="#606B80"
                    fontSize="12px"
                    lineHeight={1.3}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: [2, 1, 1],
                      overflow: "hidden",
                    }}
                  >
                    {tagGroup.shortDescription}
                  </Typography>
                </Box>
                <Typography color="#606B80" fontSize="12px" mt={0.5} flexShrink={0}>
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
