import { Box, Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import QuizCard from "@/features/quiz/components/QuizCard";
import {
  getTagBySlug,
  getQuizTagGroup,
  getQuizzesByTag,
  QUIZ_TAG_GROUPS,
} from "@/features/quiz/domain";
import { QUIZ_TAG_KOREAN_NAME } from "@/features/quiz/fixtures/tagName";
import useSolvedQuizzes from "@/features/quiz/hooks/useSolvedQuizzes";

const BACKGROUND_COLOR = "#F9FAFC";

const getRandomItems = <T,>(items: T[], count: number): T[] => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy.slice(0, count);
};

export default function TagPage() {
  const { isSolved } = useSolvedQuizzes();
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return (
      <Box display="flex" justifyContent="center" bgcolor={BACKGROUND_COLOR}>
        loading...
      </Box>
    );
  }

  const tagSlug = (Array.isArray(id) ? id[0] : id)?.toLowerCase();
  const tagId = tagSlug ? getTagBySlug(tagSlug) : undefined;

  if (!tagId) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={BACKGROUND_COLOR}
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <Typography>존재하지 않는 태그입니다.</Typography>
        <Button onClick={() => router.push("/quiz?view=tag")}>
          태그 목록으로 이동
        </Button>
      </Box>
    );
  }

  const tagGroup = getQuizTagGroup(tagId);
  const quizzes = getQuizzesByTag(tagId);
  const otherTagGroups = getRandomItems(
    QUIZ_TAG_GROUPS.filter(({ tag }) => tag !== tagId),
    4
  );

  return (
    <>
      <Head>
        <title>{tagGroup?.label ?? QUIZ_TAG_KOREAN_NAME[tagId]} : 문제적 추러스</title>
      </Head>
      <GlobalHeader />
      <Box
        height={1}
        mt={[0, 0, 6]}
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        alignItems="center"
      >
        <Box
          height={["190px", "270px", "300px"]}
          maxWidth="800px"
          width={1}
          position="relative"
          mb={2}
          borderRadius="0 0 12px 12px"
          overflow="hidden"
        >
          <Box
            position="absolute"
            borderRadius="0 0 12px 12px"
            sx={{
              inset: 0,
              overflow: "hidden",
            }}
          >
            {tagGroup && (
              <Image
                src={tagGroup.imageSource}
                alt={tagGroup.label}
                fill
                priority
                sizes="800px"
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>
          <Box
            zIndex={2}
            flexDirection="column"
            justifyContent={["center", "center", "flex-end"]}
            alignItems={["center", "center", "start"]}
            display="flex"
            position="absolute"
            width={1}
            height={1}
            pt={1}
            sx={{
              background:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.16) 36%, rgba(255,255,255,0.9) 82%, rgba(255,255,255,1) 100%)",
            }}
          >
            <Box display="flex" flexDirection="column" px={3} mt={2}>
              <Typography color="#606B80" fontSize="12px" mb={1}>
                퀴즈 태그
              </Typography>
              <Typography fontWeight="bold" fontSize="24px">
                {tagGroup?.label}
              </Typography>
              <Typography color="#606B80" fontSize="16px" mb={2}>
                {tagGroup?.shortDescription}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          mx={[4, 6, 12]}
          width={1}
          mb={6}
          bgcolor={BACKGROUND_COLOR}
          maxWidth="800px"
        >
          <Box display="flex" mt={3} justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              maxWidth="530px"
              px={3}
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                width="100%"
                alignItems="center"
              >
                <Typography color="#121212" fontSize="14px">
                  문제 {`(${quizzes.length})`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={7}
              >
                <Grid
                  container
                  rowSpacing="4px"
                  columnSpacing={[0, 0, 3]}
                  width="100%"
                >
                  {quizzes.map((quiz) => (
                    <Grid item xs={12} key={quiz.id}>
                      <QuizCard quiz={quiz} isSolved={isSolved(quiz.id)} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            <Box
              display={["none", "none", "flex"]}
              flexDirection="column"
              width="270px"
              pl={2}
            >
              <Box display="flex" flexDirection="column">
                <Typography color="#121212" fontSize="12px">
                  설명
                </Typography>
                <Typography
                  color="#606B80"
                  fontSize="14px"
                  sx={{
                    wordBreak: "keep-all",
                  }}
                >
                  {tagGroup?.longDescription}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" mt={4}>
                <Typography color="#121212" fontSize="14px" mb={1}>
                  다른 태그들
                </Typography>
                {otherTagGroups.map((otherTagGroup) => (
                  <Box
                    key={otherTagGroup.tag}
                    mb="8px"
                    px={1.5}
                    py={1}
                    borderRadius="12px"
                    bgcolor="#FEFEFD"
                    boxShadow="0 8px 24px rgba(15, 23, 42, 0.04)"
                    sx={{ cursor: "pointer" }}
                    onClick={() => router.push(`/tags/${otherTagGroup.slug}`)}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        width={32}
                        height={32}
                        minWidth={32}
                        borderRadius="8px"
                        position="relative"
                        overflow="hidden"
                        bgcolor="#FEFEFD"
                        sx={{
                          "&:hover .other-tag-thumb-image": {
                            transform: "scale(1.08)",
                          },
                        }}
                      >
                        <Box
                          position="absolute"
                          top={4}
                          right={4}
                          bottom={4}
                          left={4}
                          borderRadius="6px"
                          overflow="hidden"
                        >
                          <Image
                            className="other-tag-thumb-image"
                            src={otherTagGroup.imageSource}
                            alt={otherTagGroup.label}
                            fill
                            sizes="28px"
                            style={{
                              objectFit: "cover",
                              transition: "transform 0.2s ease",
                            }}
                          />
                        </Box>
                      </Box>
                      <Box minWidth={0}>
                        <Typography color="#121212" fontSize="14px" fontWeight={500}>
                          {otherTagGroup.label}
                        </Typography>
                        <Typography color="#606B80" fontSize="12px">
                          문제 {otherTagGroup.quizCount}개
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    width: "100px",
                    color: "#606B80",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => router.push("/quiz?view=tag")}
                >
                  더보기
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
