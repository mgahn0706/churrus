import { MeetingData } from "@/features/quiz/fixtures";
import { QuizType } from "@/features/quiz/types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export default function HomeQuizCard({ quiz }: { quiz: QuizType }) {
  const router = useRouter();
  return (
    <CardActionArea
      sx={{
        borderRadius: "20px",
        width: 150,
        mr: 2,
      }}
      onClick={() => {
        router.push(`/quiz/${quiz.id}`);
      }}
    >
      <Card
        sx={{
          width: 150,
          borderRadius: "20px",
          height: 170,
        }}
      >
        <CardMedia
          component="img"
          image={quiz.quizImgSrc}
          title="Quiz"
          sx={{
            height: 120,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {quiz.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {MeetingData[quiz.meetingId].title}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
