import { Box, CardActionArea, Grid, Typography } from "@mui/material";
import { CrosswordType } from "../types";
import { monthFormatter } from "../fixtures";
import { useRouter } from "next/router";
export default function CrosswordCard({
  title,
  author,
  date,
  id,
}: CrosswordType) {
  const router = useRouter();
  return (
    <Grid item xs={6}>
      <CardActionArea
        sx={{
          borderRadius: "20px",
        }}
        onClick={() => {
          router.push(`/crossword/${id}`);
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="#ffffff"
          borderRadius="20px"
          height="200px"
          sx={{
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              transition: "0.1s",
            },
          }}
          onClick={() => {
            router.push(`/crossword/${id}`);
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            height={1}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              px="10px"
              textAlign="center"
            >
              <Typography
                color="#121212"
                fontSize={16}
                fontWeight={700}
                sx={{
                  width: 1,
                  wordBreak: "keep-all",
                }}
              >
                {title}
              </Typography>
              <Typography fontSize={12} color="#6b6b6b">
                {monthFormatter[date.month]}. {date.year}
              </Typography>
            </Box>
            <Typography fontSize={12} color="#6b6b6b">
              {author}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Grid>
  );
}
