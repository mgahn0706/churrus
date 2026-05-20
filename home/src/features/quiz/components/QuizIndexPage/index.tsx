import { Box } from "@mui/material";
import { useRouter } from "next/router";
import {
  getRandomQuizId,
  MEETING_YEAR_GROUPS,
} from "@/features/quiz/domain";
import { QuizViewMode } from "@/features/quiz/types";
import { Tags } from "@/features/quiz/types";
import { QUIZ_TAGS } from "@/features/quiz/fixtures/tagName";
import QuizIndexHeader from "./QuizIndexHeader";
import QuizTagGridView from "./QuizTagGridView";
import QuizMeetingGridView from "./QuizMeetingGridView";
import QuizInfiniteListView from "./QuizInfiniteListView";

const BACKGROUND_COLOR = "#F5F6FA";
const DEFAULT_VIEW_MODE: QuizViewMode = "grid";

const getQuizViewMode = (view: string | string[] | undefined): QuizViewMode => {
  if (view === "list") {
    return "list";
  }

  if (view === "tag") {
    return "tag";
  }

  return DEFAULT_VIEW_MODE;
};

const getTagFilter = (tag: string | string[] | undefined): Tags | undefined => {
  if (typeof tag !== "string") {
    return undefined;
  }

  return QUIZ_TAGS.includes(tag as Tags) ? (tag as Tags) : undefined;
};

export default function QuizIndexPage() {
  const router = useRouter();
  const viewMode = getQuizViewMode(router.query.view);
  const tagFilter = getTagFilter(router.query.tag);

  const handleViewModeChange = (nextViewMode: QuizViewMode) => {
    const nextQuery =
      nextViewMode === DEFAULT_VIEW_MODE
        ? {}
        : {
            view: nextViewMode,
            ...(nextViewMode === "list" && tagFilter ? { tag: tagFilter } : {}),
          };

    router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleRandomQuizClick = () => {
    const randomQuizId = getRandomQuizId();
    if (randomQuizId) {
      router.push(`/quiz/${randomQuizId}`);
    }
  };

  return (
    <Box
      minHeight="100vh"
      bgcolor={BACKGROUND_COLOR}
      display="flex"
      justifyContent="center"
    >
      <Box
        mx={[4, 6, 8]}
        width={1}
        mb={6}
        minHeight="100vh"
        bgcolor={BACKGROUND_COLOR}
        maxWidth="938px"
      >
        <QuizIndexHeader
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onStatsClick={() => {
            router.push("/quiz/stats");
          }}
          onRandomQuizClick={handleRandomQuizClick}
        />
        {viewMode === "list" ? (
          <QuizInfiniteListView tagFilter={tagFilter} />
        ) : viewMode === "tag" ? (
          <QuizTagGridView />
        ) : (
          <QuizMeetingGridView meetingYearGroups={MEETING_YEAR_GROUPS} />
        )}
      </Box>
    </Box>
  );
}
