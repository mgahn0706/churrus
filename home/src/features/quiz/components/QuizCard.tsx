import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";
import Image from "next/image";
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import { useState } from "react";
import ImageWithPlaceHolder from "@/components/ImageWithPlaceholder";

export default function QuizCard({
  quiz,
  isSolved,
  bgColor,
}: {
  quiz: QuizType;
  isSolved: boolean;
  bgColor?: string;
}) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const router = useRouter();

  const lightColor = "#ffe2db";

  return (
    <Grid item xs={responsiveXS}>
      <Card
        sx={{
          backgroundColor: "#f0f4f9",
          minWidth: "150px",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 30px rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardActionArea
          onClick={() => {
            router.push(`/quiz/${quiz.id}`);
          }}
        >
          <CardContent
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
                overflow="hidden"
                width="100%"
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
                      color: "#4285f5",
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
              <ImageWithPlaceHolder
                src={quiz.quizImgSrc}
                alt={quiz.title}
                width={200}
                height={100}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
