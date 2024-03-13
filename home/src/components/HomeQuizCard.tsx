import { MeetingData } from "@/features/quiz/fixtures";
import { QuizType } from "@/features/quiz/types";
import {
  Box,
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
        <CardContent
          sx={{
            pt: "2px",
            px: "12px",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          <Typography
            fontWeight={500}
            fontSize={18}
            color="#121212"
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {quiz.title}
          </Typography>

          <Typography
            fontSize={12}
            color="#767676"
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {MeetingData[quiz.meetingId].title}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
