import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  CloseRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Head from "next/head";
import { QuizType } from "@/features/quiz/types";
import QuizCard from "@/features/quiz/components/QuizCard";
import { MEETINGS } from "@/features/quiz/fixtures/meetings";
import {
  getMeetingById,
  getMeetingQuizzes,
  getPrevNextQuizIds,
  getQuizById,
} from "@/features/quiz/domain";
import useSolvedQuizzes from "@/features/quiz/hooks/useSolvedQuizzes";

const BACKGROUND_COLOR = "#F5F6FA";

const uppercaseRegex = /^[A-Z\s]+$/;
const lowercaseRegex = /^[a-z\s]+$/;
const numericRegex = /^[0-9.\s]+$/;
const koreanRegex = /^[가-힣\s]+$/;

export default function QuizPage() {
  const router = useRouter();
  const { isSolved, markSolved } = useSolvedQuizzes();

  const [inputAnswer, setInputAnswer] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
  const [isQuizListDrawerOpen, setIsQuizListDrawerOpen] = useState(false);

  const { id } = router.query;
  const quizId = Array.isArray(id) ? id[0] : id;
  const isAnswerPage = Array.isArray(id) ? id[1] === "answer" : false;
  const quiz = quizId ? getQuizById(quizId) : null;
  const quizImageSrc = quiz
    ? isAnswerPage
      ? `/image/quiz/${quiz.id}-answer.png`
      : quiz.quizImageSource
    : null;

  useEffect(() => {
    if (!quizImageSrc) {
      return;
    }

    setIsImageLoading(true);

    const image = new window.Image();
    image.src = quizImageSrc;
    image.onload = () => {
      if (image.naturalWidth > 0 && image.naturalHeight > 0) {
        setImageAspectRatio(image.naturalWidth / image.naturalHeight);
      }
      setIsImageLoading(false);
    };
    image.onerror = () => {
      setImageAspectRatio(16 / 9);
      setIsImageLoading(false);
    };
  }, [quizImageSrc]);

  if (!id) {
    return <div>loading...</div>;
  }

  if (!quiz) {
    return <div>존재하지 않는 문제입니다.</div>;
  }

  const meeting = getMeetingById(quiz.meetingId);
  const { prevQuizId, nextQuizId } = getPrevNextQuizIds(quiz);
  const resolvedQuizImageSrc = quizImageSrc ?? quiz.quizImageSource;

  const handleSolvedQuiz = () => {
    setIsImageLoading(true);
    markSolved(quiz.id);
  };

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const removedSpaces = inputAnswer.replace(/\s/g, "");

    if (removedSpaces === quiz.answer?.replace(/\s/g, "")) {
      window.alert("정답입니다!");
      handleSolvedQuiz();
      router.push(`/quiz/${quiz.id}/answer`);
      return;
    }
    window.alert("오답입니다.");
  };

  const answerFormat = () => {
    if (!quiz.answer) {
      return "입력할 수 없음. 충분히 고민한 후 정답을 확인해주세요.";
    }
    if (uppercaseRegex.test(quiz.answer)) {
      return "영어 대문자";
    }
    if (lowercaseRegex.test(quiz.answer)) {
      return "영어 소문자";
    }
    if (numericRegex.test(quiz.answer)) {
      return "숫자";
    }
    if (koreanRegex.test(quiz.answer)) {
      return "한글";
    }
    return "입력할 수 없음. 충분히 고민한 후 정답을 확인해주세요.";
  };

  return (
    <>
      <Head>
        <title>문제적 추러스 : {quiz.title}</title>
      </Head>
      <Box
        alignItems="center"
        display="flex"
        minHeight="100dvh"
        flexDirection="column"
        bgcolor={BACKGROUND_COLOR}
      >
        <Box
          display="flex"
          alignItems="center"
          height={60}
          width="100%"
          justifyContent="center"
          position="fixed"
          sx={{
            backdropFilter: "blur(2px)",
            zIndex: 10,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            maxWidth="1200px"
            width={1}
            px={[1, 2, 0]}
            boxSizing="border-box"
          >
            <Box display="flex" alignItems="center" minWidth={0}>
              <ChurrusLogoButton onClick={() => router.push("/")} />

              <Box display="flex" alignItems="center" ml={[1, 2, 2]} minWidth={0}>
                <HeaderButton onClick={() => setIsQuizListDrawerOpen(true)}>
                  {meeting?.title}
                </HeaderButton>
                <IconButton
                  disabled={!prevQuizId}
                  onClick={() => {
                    setIsImageLoading(true);
                    if (prevQuizId) {
                      router.push(`/quiz/${prevQuizId}`);
                    }
                  }}
                >
                  <ChevronLeftRounded />
                </IconButton>
                <IconButton
                  disabled={!nextQuizId}
                  onClick={() => {
                    setIsImageLoading(true);
                    if (nextQuizId) {
                      router.push(`/quiz/${nextQuizId}`);
                    }
                  }}
                >
                  <ChevronRightRounded />
                </IconButton>
              </Box>
            </Box>
            {!isAnswerPage && (
              <Button
                sx={{
                  color: "#202837",
                  fontWeight: 700,
                  fontSize: 14,
                  mr: [0, 1, 2],
                }}
                variant="text"
                onClick={() => {
                  handleSolvedQuiz();
                  router.push(`/quiz/${quiz.id}/answer`);
                }}
              >
                정답 보기
              </Button>
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={1200}
          width={1}
          px={[2, 2, 0]}
          boxSizing="border-box"
          textAlign={["left", "left", "center"]}
        >
          <Typography
            fontSize={24}
            fontWeight={700}
            mt={12}
            color="#202837"
            width="fit-content"
          >
            {quiz.title}
            {isAnswerPage && " 정답"}
          </Typography>
          {isAnswerPage && (
            <Typography
              fontSize={24}
              fontWeight={700}
              color="#318AE1"
              width="fit-content"
            >
              {quiz.answer}
            </Typography>
          )}

          <Typography fontSize={12} color="#606B80" width="fit-content">
            {quiz.creator}
          </Typography>
        </Box>

        <Box
          width="100%"
          sx={{
            aspectRatio: imageAspectRatio,
          }}
          display={isImageLoading ? "none" : "flex"}
          justifyContent="center"
          mt={2}
          maxWidth={1200}
          position="relative"
        >
          <Image
            src={resolvedQuizImageSrc}
            alt={quiz.title}
            style={{
              borderRadius: "12px",
            }}
            fill
            priority
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </Box>
        {isImageLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.7)",
              aspectRatio: imageAspectRatio,
              marginTop: "16px",
              maxWidth: 1200,
              borderRadius: "12px",
              width: "100%",
              height: "100%",
            }}
          />
        )}
        {!isAnswerPage && (
          <Box
            component="form"
            onSubmit={handleAnswerSubmit}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mt={4}
              maxWidth={1200}
              width={["calc(100vw - 32px)", "calc(100vw - 32px)", "70vw"]}
              mx="auto"
              boxSizing="border-box"
            >
              <Typography
                color="#212837"
                fontSize={12}
                fontWeight={400}
                sx={{
                  ml: [0, 1, 2],
                  width: "100%",
                }}
              >
                정답 형식: {answerFormat()}
              </Typography>
              {quiz.answer && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={[1.5, 2, 3]}
                  flexDirection={["column", "column", "row"]}
                  width="100%"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={inputAnswer}
                    onChange={(e) => {
                      setInputAnswer(e.target.value);
                    }}
                    InputProps={{
                      sx: {
                        width: "100%",
                        maxWidth: 950,
                        borderRadius: "20px",
                        py: "2px",
                        height: "40px",
                      },
                    }}
                    sx={{
                      width: "100%",
                      maxWidth: ["none", "none", 950],
                    }}
                    placeholder={
                      quiz.answer
                        ? "정답을 입력해주세요."
                        : "정답을 입력할 수 없는 문제입니다."
                    }
                  />
                  <Button
                    fullWidth
                    sx={{
                      display: ["block", "block", "none"],
                      color: "white",
                      bgcolor: "#318AE1",
                      height: "40px",
                      borderRadius: "20px",
                      "&:hover": {
                        bgcolor: "#1B4B7B",
                      },
                    }}
                    type="submit"
                  >
                    제출
                  </Button>
                  <Button
                    sx={{
                      minWidth: "220px",
                      display: ["none", "none", "block"],
                      color: "white",
                      bgcolor: "#318AE1",
                      height: "40px",
                      borderRadius: "20px",
                      "&:hover": {
                        bgcolor: "#1B4B7B",
                      },
                    }}
                    type="submit"
                  >
                    제출
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <QuizListDrawer
        currentQuizId={quiz.id}
        isOpen={isQuizListDrawerOpen}
        onClose={() => setIsQuizListDrawerOpen(false)}
        quizList={getMeetingQuizzes(quiz.meetingId)}
        isSolved={isSolved}
        onClickMeeting={() => {
          router.push(`/meetings/${quiz.meetingId}`);
        }}
      />
    </>
  );
}

interface DesktopTopMenuProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const HeaderButton = ({ disabled, children, onClick }: DesktopTopMenuProps) => {
  return (
    <Button
      sx={{
        color: "#232937",
        fontWeight: 500,
        fontSize: 14,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const ChurrusLogoButton = ({ onClick }: { onClick?: () => void }) => (
  <Image
    onClick={onClick}
    style={{
      cursor: "pointer",
    }}
    alt="churrus-logo"
    width={30}
    height={25}
    src="/image/churrus-icon.svg"
  />
);

interface QuizListDrawerProps {
  isOpen: boolean;
  currentQuizId: string;
  quizList: QuizType[];
  isSolved: (quizId: string) => boolean;
  onClose: () => void;
  onClickMeeting: () => void;
}

const QuizListDrawer = ({
  isOpen,
  currentQuizId,
  onClose,
  quizList,
  isSolved,
  onClickMeeting,
}: QuizListDrawerProps) => {
  const meeting = quizList[0] ? MEETINGS[quizList[0].meetingId] : undefined;

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <Box
        display="flex"
        alignItems="center"
        p={2}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          onClick={onClickMeeting}
          sx={{
            cursor: "pointer",
            "&:hover": {
              "& .go-to-quiz-list": {
                transform: "translateX(4px)",
                transition: "all 0.3s",
              },
            },
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography fontSize={18} fontWeight={700} px={2}>
              {meeting?.title}
            </Typography>
            <Typography fontSize={14} fontWeight={400} px={2}>
              {meeting?.subtitle}
            </Typography>
          </Box>
          <ChevronRightRounded
            className="go-to-quiz-list"
            sx={{
              marginLeft: "12px",
            }}
          />
        </Box>
        <IconButton onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Box>
      <Grid container spacing={1} py={2} maxHeight="520px" overflow="scroll">
        {quizList.map((quiz) => (
          <Grid item xs={12} key={quiz.id} ml={4}>
            <QuizCard
              quiz={quiz}
              isSolved={isSolved(quiz.id)}
              isSelected={quiz.id === currentQuizId}
              onClick={() => {
                onClose();
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};
