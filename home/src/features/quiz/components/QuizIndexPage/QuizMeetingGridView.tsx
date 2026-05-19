import MeetingCard from "@/features/quiz/components/MeetingCard";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Grid, Typography } from "@mui/material";

interface QuizMeetingYearGroup {
  year: string;
  meetingIds: string[];
}

interface QuizMeetingGridViewProps {
  meetingYearGroups: QuizMeetingYearGroup[];
}

export default function QuizMeetingGridView({
  meetingYearGroups,
}: QuizMeetingGridViewProps) {
  const cardXs = useResponsiveValue([12, 6, 4]);

  return (
    <>
      {meetingYearGroups.map(({ year, meetingIds }) => (
        <Box key={year}>
          <Typography
            fontSize={20}
            fontWeight={700}
            fontFamily="NanumSquareEB"
            color="#212837"
            mt={6}
            mb={2}
          >
            {year}
          </Typography>
          <Grid container rowSpacing={[0, 1, 1]} columnSpacing={[0, 0, 3]} width="100%">
            {meetingIds.map((meetingId) => (
              <Grid item xs={cardXs} key={meetingId}>
                <MeetingCard meetingId={meetingId} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );
}
