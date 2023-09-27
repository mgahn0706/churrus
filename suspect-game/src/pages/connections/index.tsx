import HomeButton from "@/components/HomeButton";
import RuleVideoButton from "@/components/RuleVideoButton";
import { QuestionAnswer } from "@mui/icons-material";
import { Box, Tooltip, IconButton, Typography } from "@mui/material";

export default function Connections() {
  return (
    <Box textAlign="center" pt={3} width="100%" justifyContent="center">
      <HomeButton />
      <RuleVideoButton url="QUVbVeWz5cs" />
      <Box position="fixed" top="10px" right="40px" m={1}></Box>
      <Typography variant="h4" mb={1}>
        추러스 커넥션
      </Typography>
      <Typography variant="h6">ROUND {1}</Typography>
    </Box>
  );
}
