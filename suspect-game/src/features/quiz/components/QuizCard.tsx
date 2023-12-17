import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";
import Image from "next/image";
import { CardStyle } from "../fixtures";
import {
  CheckCircleOutline,
  Help,
  RadioButtonUnchecked,
  Star,
} from "@mui/icons-material";
import { useState } from "react";

export default function QuizCard({
  quiz,
  month,
  isSolved,
}: {
  quiz: QuizType;
  month: string;
  isSolved: boolean;
}) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const router = useRouter();

  const { baseColor, lightColor } = CardStyle[month] ?? {
    baseColor: "rgba(255, 255, 255, 0.2)",
    lightColor: "rgba(255, 255, 255, 0.3)",
  };

  return (
    <Grid item xs={responsiveXS}>
      <Card
        sx={{
          background: lightColor,
          borderRadius: "0.75rem",
          boxShadow: "0 4px 30px rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            bgcolor: baseColor,
          },
        }}
      >
        <CardContent
          onClick={() => {
            router.push(`/quiz/${quiz.id}`);
          }}
          sx={{
            cursor: "pointer",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Box
              color="#212837"
              textAlign="left"
              justifyContent="center"
              display="flex"
              flexDirection="column"
              whiteSpace="nowrap"
              width="130px"
            >
              <Typography
                fontSize={16}
                fontFamily={"NanumSquareEB"}
                fontWeight={700}
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {quiz.title}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              {isSolved ? (
                <CheckCircleOutline
                  sx={{
                    fontSize: "1.5rem",
                  }}
                />
              ) : (
                <RadioButtonUnchecked
                  sx={{
                    fontSize: "1.5rem",
                  }}
                />
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Image
              src={quiz.quizImgSrc}
              alt={quiz.title}
              width={isImageLoading ? 0 : 150}
              height={isImageLoading ? 0 : 100}
              priority
              onLoadingComplete={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
