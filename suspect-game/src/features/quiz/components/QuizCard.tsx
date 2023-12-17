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
          backgroundColor: bgColor ?? lightColor,
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
                      color: "#20954f",
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
                style={{
                  borderRadius: "0.5rem",
                }}
                width={isImageLoading ? 0 : 150}
                height={isImageLoading ? 0 : 100}
                priority
                onLoadingComplete={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
              {isImageLoading && (
                <Skeleton
                  variant="rectangular"
                  width="150px"
                  height="100px"
                  sx={{
                    borderRadius: "0.5rem",
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                  }}
                />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
