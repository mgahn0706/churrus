import {
  BarChartRounded,
  ShuffleOnRounded,
} from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { QuizViewMode } from "@/features/quiz/types";

const VIEW_OPTIONS = [
  { value: "grid", label: "모임별" },
  { value: "tag", label: "태그별" },
  { value: "list", label: "전체" },
] as const;

interface QuizIndexHeaderProps {
  viewMode: QuizViewMode;
  onViewModeChange: (viewMode: QuizViewMode) => void;
  onStatsClick: () => void;
  onRandomQuizClick: () => void;
}

export default function QuizIndexHeader({
  viewMode,
  onViewModeChange,
  onStatsClick,
  onRandomQuizClick,
}: QuizIndexHeaderProps) {
  return (
    <Box
      width="100%"
      mb={[1, 2, 2]}
      position="sticky"
      top={[0, 0, "48px"]}
      zIndex={10}
      mx={[-1, -1.5, -2]}
      px={[1, 1.5, 2]}
      pt={[1, 2, 2.5]}
      pb={0}
      sx={{
        backdropFilter: "blur(10px)",
        background:
          "linear-gradient(180deg, rgba(245, 246, 250, 0.96) 0%, rgba(245, 246, 250, 0.9) 100%)",
      }}
    >
      <Box
        textAlign="left"
        color="#212837"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        flexWrap="nowrap"
      >
        <Typography
          fontSize={[20, 22, 24]}
          fontWeight={700}
          fontFamily="NanumSquareEB"
          whiteSpace="nowrap"
        >
          문제적 추러스
        </Typography>
        <Box display="flex" gap={0.75} flexShrink={0} justifyContent="flex-end">
          <Button
            aria-label="통계 보기"
            variant="outlined"
            sx={{
              borderRadius: "999px",
              borderColor: "#E8ECF2",
              bgcolor: "rgba(255, 255, 255, 0.72)",
              minWidth: [34, 34, 0],
              px: [0, 0, 1.125],
              py: 0.375,
              minHeight: 34,
            }}
            onClick={onStatsClick}
          >
            <BarChartRounded
              sx={{
                color: "#318AE1",
                mr: [0, 0, 0.5],
                width: 15,
              }}
            />
            <Typography
              display={["none", "none", "block"]}
              fontSize={14}
              color="#4E5968"
              fontWeight={500}
            >
              통계 보기
            </Typography>
          </Button>
          <Button
            aria-label="랜덤 문제"
            variant="outlined"
            sx={{
              borderRadius: "999px",
              borderColor: "#E8ECF2",
              bgcolor: "rgba(255, 255, 255, 0.72)",
              minWidth: [34, 34, 0],
              px: [0, 0, 1.125],
              py: 0.375,
              minHeight: 34,
            }}
            onClick={onRandomQuizClick}
          >
            <ShuffleOnRounded
              sx={{
                color: "#318AE1",
                mr: [0, 0, 0.5],
                width: 15,
              }}
            />
            <Typography
              display={["none", "none", "block"]}
              fontSize={14}
              color="#4E5968"
              fontWeight={500}
            >
              랜덤 문제
            </Typography>
          </Button>
        </Box>
      </Box>
      <Tabs
        value={viewMode}
        onChange={(_, nextViewMode: QuizViewMode) => onViewModeChange(nextViewMode)}
        aria-label="문제 보기 방식"
        sx={{
          mt: 0.5,
          minHeight: 36,
          borderBottom: "1px solid #E3E7ED",
          "& .MuiTabs-indicator": { bgcolor: "#318AE1", height: 2 },
        }}
      >
        {VIEW_OPTIONS.map(({ value, label }) => (
          <Tab
            key={value}
            value={value}
            label={label}
            disableRipple
            sx={{
              minHeight: 36,
              minWidth: 0,
              px: [1.5, 2, 2.5],
              fontSize: [13, 14, 14],
              fontWeight: 600,
              color: "#606B80",
              textTransform: "none",
              "&.Mui-selected": { color: "#212837", fontWeight: 700 },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
