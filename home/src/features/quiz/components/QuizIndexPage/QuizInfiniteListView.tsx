import {
  ArrowDownwardRounded,
  CloseRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ALL_QUIZZES,
  compareQuizzesByChronology,
  compareQuizzesByRecentFirst,
  getMeetingById,
} from "@/features/quiz/domain";
import { QUIZ_TAG_KOREAN_NAME } from "@/features/quiz/fixtures/tagName";
import useSolvedQuizzes from "@/features/quiz/hooks/useSolvedQuizzes";
import { QuizType, Tags } from "@/features/quiz/types";
import QuizListRow from "./QuizListRow";

const INITIAL_VISIBLE_COUNT = 30;
const LOAD_MORE_COUNT = 30;

const getNextVisibleCount = (currentCount: number, totalCount: number) =>
  Math.min(currentCount + LOAD_MORE_COUNT, totalCount);

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();
type QuizStatusFilter = "all" | "solved" | "unsolved";
type QuizSortField = "meeting" | "status" | "title" | "creator";
type QuizSortDirection = "asc" | "desc";
const LIST_TOOLBAR_TOP = ["96px", "104px", "122px"];

const getQuizSearchText = (quiz: QuizType) => {
  const meeting = getMeetingById(quiz.meetingId);

  return [
    quiz.title,
    meeting?.title,
    meeting?.subtitle,
    quiz.creators.join(" "),
    quiz.tags.map((tag) => QUIZ_TAG_KOREAN_NAME[tag]).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

export default function QuizInfiniteListView({
  tagFilter,
}: {
  tagFilter?: Tags;
}) {
  const { isSolved } = useSolvedQuizzes();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const quizzes = useMemo<QuizType[]>(() => ALL_QUIZZES, []);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [showTags, setShowTags] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuizStatusFilter>("all");
  const [sortField, setSortField] = useState<QuizSortField>("meeting");
  const [sortDirection, setSortDirection] = useState<QuizSortDirection>("desc");

  const normalizedSearchValue = normalizeSearchValue(searchValue);

  const filteredQuizzes = useMemo(
    () =>
      [...quizzes]
        .filter((quiz) => {
          const matchesSearch =
            normalizedSearchValue.length === 0 ||
            getQuizSearchText(quiz).includes(normalizedSearchValue);
          const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "solved" && isSolved(quiz.id)) ||
            (statusFilter === "unsolved" && !isSolved(quiz.id));
          const matchesTag = !tagFilter || quiz.tags.includes(tagFilter);

          return matchesSearch && matchesStatus && matchesTag;
        })
        .sort((leftQuiz, rightQuiz) => {
          const compareByMeeting =
            sortDirection === "asc"
              ? compareQuizzesByChronology(leftQuiz, rightQuiz)
              : compareQuizzesByRecentFirst(leftQuiz, rightQuiz);

          if (sortField === "meeting") {
            return compareByMeeting;
          }

          if (sortField === "status") {
            const solvedDifference =
              Number(isSolved(leftQuiz.id)) - Number(isSolved(rightQuiz.id));

            if (solvedDifference !== 0) {
              return sortDirection === "asc" ? solvedDifference : -solvedDifference;
            }

            return compareQuizzesByRecentFirst(leftQuiz, rightQuiz);
          }

          if (sortField === "title") {
            const titleDifference = leftQuiz.title.localeCompare(rightQuiz.title, "ko");

            if (titleDifference !== 0) {
              return sortDirection === "asc" ? titleDifference : -titleDifference;
            }

            return compareQuizzesByRecentFirst(leftQuiz, rightQuiz);
          }

          const creatorDifference = leftQuiz.creators
            .join(", ")
            .localeCompare(rightQuiz.creators.join(", "), "ko");

          if (creatorDifference !== 0) {
            return sortDirection === "asc"
              ? creatorDifference
              : -creatorDifference;
          }

          return compareQuizzesByRecentFirst(leftQuiz, rightQuiz);
        }),
    [
      isSolved,
      normalizedSearchValue,
      quizzes,
      sortDirection,
      sortField,
      statusFilter,
      tagFilter,
    ]
  );

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [normalizedSearchValue, sortDirection, sortField, statusFilter, tagFilter]);

  const handleSortChange = (nextField: QuizSortField) => {
    if (nextField === sortField) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc"
      );
      return;
    }

    setSortField(nextField);
    setSortDirection(nextField === "meeting" ? "desc" : "asc");
  };

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (!firstEntry?.isIntersecting) {
          return;
        }

        setVisibleCount((currentCount) =>
          currentCount >= filteredQuizzes.length
            ? currentCount
            : getNextVisibleCount(currentCount, filteredQuizzes.length)
        );
      },
      {
        rootMargin: "240px 0px",
      }
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [filteredQuizzes.length]);

  const visibleQuizzes = filteredQuizzes.slice(0, visibleCount);

  return (
    <Box mt={5}>
      <Box
        position="sticky"
        top={LIST_TOOLBAR_TOP}
        zIndex={9}
        mx={[-0.5, -0.5, -1]}
        px={[0.5, 0.5, 1]}
        py={1}
        mb={1}
        sx={{
          backdropFilter: "blur(10px)",
          background:
            "linear-gradient(180deg, rgba(245, 246, 250, 0.95) 0%, rgba(245, 246, 250, 0.88) 100%)",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          flexWrap="wrap"
          color="#6B7280"
          fontSize={13}
        >
          <Box
            display="flex"
            alignItems="center"
            flex="1 1 280px"
            minWidth={[1, 220, 280]}
            maxWidth={["none", "none", 420]}
            px={1}
            border="1px solid #E5EAF1"
            borderRadius="12px"
            bgcolor="rgba(255, 255, 255, 0.9)"
          >
            <SearchRounded sx={{ color: "#98A2B3", fontSize: 18, mr: 0.5 }} />
            <InputBase
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder={
                tagFilter
                  ? `${QUIZ_TAG_KOREAN_NAME[tagFilter]} 문제 검색`
                  : "제목, 모임, 출제자, 태그"
              }
              sx={{
                flex: 1,
                fontSize: 14,
                color: "#1F2937",
              }}
            />
            {searchValue.length > 0 && (
              <IconButton
                size="small"
                onClick={() => setSearchValue("")}
                sx={{ color: "#98A2B3", ml: 0.5 }}
              >
                <CloseRounded sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
            flexWrap="wrap"
            flex="0 0 auto"
            width={["100%", "100%", "auto"]}
            minWidth={0}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight={36}
              sx={{
                gap: 0.25,
              }}
            >
              <Switch
                size="small"
                checked={showTags}
                onChange={(event) => setShowTags(event.target.checked)}
                sx={{ mr: 0.25 }}
              />
              <Typography
                fontSize={13}
                color="#6B7280"
                fontWeight={500}
                lineHeight={1}
              >
                태그
              </Typography>
            </Box>
            <Select
              size="small"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as QuizStatusFilter)
              }
              sx={{
                minWidth: 104,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5EAF1",
                },
                "& .MuiSelect-select": {
                  py: 0.75,
                  fontSize: 13,
                  color: "#6B7280",
                  fontWeight: 500,
                },
              }}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="solved">풀이 완료</MenuItem>
              <MenuItem value="unsolved">미해결</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="#FFFFFF"
        border="1px solid #E9EDF3"
        borderRadius="16px"
        overflow="hidden"
      >
        <Box
          display={["none", "none", "grid"]}
          gridTemplateColumns={
            showTags
              ? "28px minmax(0, 1fr) 180px 180px 220px"
              : "28px minmax(0, 1fr) 180px 180px"
          }
          gap={1.5}
          px={2.5}
          py={1.25}
          borderBottom="1px solid #E9EDF3"
          bgcolor="#FBFCFE"
        >
          <SortableHeader
            label="상태"
            isActive={sortField === "status"}
            direction={sortDirection}
            onClick={() => handleSortChange("status")}
          />
          <SortableHeader
            label="제목"
            isActive={sortField === "title"}
            direction={sortDirection}
            onClick={() => handleSortChange("title")}
          />
          <SortableHeader
            label="모임"
            isActive={sortField === "meeting"}
            direction={sortDirection}
            onClick={() => handleSortChange("meeting")}
          />
          <SortableHeader
            label="출제자"
            isActive={sortField === "creator"}
            direction={sortDirection}
            onClick={() => handleSortChange("creator")}
            textAlign="right"
          />
          {showTags && (
            <Typography fontSize={12} fontWeight={600} color="#98A2B3">
              태그
            </Typography>
          )}
        </Box>
        {visibleQuizzes.length > 0 ? (
          visibleQuizzes.map((quiz) => (
            <QuizListRow
              key={quiz.id}
              quiz={quiz}
              isSolved={isSolved(quiz.id)}
              showTags={showTags}
            />
          ))
        ) : (
          <Box px={2.5} py={6} textAlign="center">
            <Typography color="#4B5563" fontSize={15} fontWeight={500}>
              조건에 맞는 문제가 없습니다
            </Typography>
            <Typography color="#98A2B3" fontSize={13} mt={0.5}>
              검색어나 필터 조건을 바꿔서 다시 확인해 보세요.
            </Typography>
          </Box>
        )}
      </Box>
      <Box ref={loaderRef} height={1} />
    </Box>
  );
}

interface SortableHeaderProps {
  label: string;
  isActive: boolean;
  direction: QuizSortDirection;
  onClick: () => void;
  textAlign?: "left" | "right" | "center";
}

function SortableHeader({
  label,
  isActive,
  direction,
  onClick,
  textAlign = "left",
}: SortableHeaderProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        justifyContent: textAlign === "right" ? "flex-end" : "flex-start",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={textAlign === "right" ? "flex-end" : "flex-start"}
        width="100%"
        gap={0.25}
      >
        <Typography fontSize={12} fontWeight={600} color={isActive ? "#667085" : "#98A2B3"}>
          {label}
        </Typography>
        {isActive && (
          <ArrowDownwardRounded
            sx={{
              fontSize: 14,
              color: "#667085",
              transform: direction === "asc" ? "rotate(180deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        )}
      </Box>
    </ButtonBase>
  );
}
