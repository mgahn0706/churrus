import { BarChartRounded, ShuffleOnRounded } from "@mui/icons-material";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { QuizViewMode } from "@/features/quiz/types";

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
      mb={[1, 2, 3]}
      position="sticky"
      top={[0, 0, "48px"]}
      zIndex={10}
      mx={[-1, -1.5, -2]}
      px={[1, 1.5, 2]}
      pt={[2, 5, "40px"]}
      pb={1}
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
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center" gap={1.25} flexWrap="wrap">
          <Typography fontSize={[22, 24, 24]} fontWeight={700} fontFamily="NanumSquareEB">
            문제적 추러스
          </Typography>
          <Select
            size="small"
            value={viewMode}
            onChange={(event) => onViewModeChange(event.target.value as QuizViewMode)}
            sx={{
              minWidth: 92,
              bgcolor: "rgba(255, 255, 255, 0.82)",
              borderRadius: "999px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E8ECF2",
              },
              "& .MuiSelect-select": {
                py: 0.625,
                pl: 1.375,
                pr: 4,
                fontSize: 14,
                fontWeight: 500,
                color: "#4E5968",
              },
            }}
          >
            <MenuItem value="grid">모임별</MenuItem>
            <MenuItem value="tag">태그별</MenuItem>
            <MenuItem value="list">문제별</MenuItem>
          </Select>
        </Box>
        <Box display="flex" gap={0.75} flexWrap="wrap" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{
              borderRadius: "999px",
              borderColor: "#E8ECF2",
              bgcolor: "rgba(255, 255, 255, 0.72)",
              px: 1.125,
              py: 0.375,
              minHeight: 34,
            }}
            onClick={onStatsClick}
          >
            <BarChartRounded
              sx={{
                color: "#318AE1",
                mr: 0.5,
                width: 15,
              }}
            />
            <Typography fontSize={14} color="#4E5968" fontWeight={500}>
              통계 보기
            </Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "999px",
              borderColor: "#E8ECF2",
              bgcolor: "rgba(255, 255, 255, 0.72)",
              px: 1.125,
              py: 0.375,
              minHeight: 34,
            }}
            onClick={onRandomQuizClick}
          >
            <ShuffleOnRounded
              sx={{
                color: "#318AE1",
                mr: 0.5,
                width: 15,
              }}
            />
            <Typography fontSize={14} color="#4E5968" fontWeight={500}>
              랜덤 문제
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
