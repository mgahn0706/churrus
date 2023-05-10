import { Button, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ClueType } from "@/fixtures/startup/clues";

interface ClueButtonProps {
  clue: ClueType;
  onClick: () => void;
}

export function ClueButton({ clue, onClick }: ClueButtonProps) {
  return (
    <Button
      variant="contained"
      endIcon={<SearchIcon />}
      size="small"
      onClick={onClick}
      sx={{
        zIndex: clue.type === "additional" ? 2 : 0,
        position: "absolute",
        left: `${clue.x}%`,
        top: `${clue.y}%`,
      }}
    >
      <Typography>{clue.id}</Typography>
      <Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
      {clue.title}
    </Button>
  );
}
