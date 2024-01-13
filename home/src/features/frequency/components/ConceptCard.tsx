import { Box, Card } from "@mui/material";
import { ConceptType } from "../types";

export default function ConceptCard({ concept }: { concept: ConceptType }) {
  if (!concept) {
    return null;
  }
  return (
    <Card
      sx={{
        width: Math.max(concept.left.length, concept.right.length) * 60 + 300,
      }}
    >
      <Box
        display="flex"
        height="200px"
        lineHeight="200px"
        fontSize="50px"
        color="white"
      >
        <Box width="50%" bgcolor="error.main">
          {concept.left}
        </Box>
        <Box width="50%" bgcolor="primary.main">
          {concept.right}
        </Box>
      </Box>
    </Card>
  );
}
