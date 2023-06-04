import { Button, Divider, Grow, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ClueType } from "@/types";

interface ClueButtonProps {
  clue: ClueType;
  onClick: () => void;
}

export function ClueButton({ clue, onClick }: ClueButtonProps) {
  return (
    <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        size="small"
        onClick={onClick}
        sx={{
          zIndex: clue.type === "additional" ? 1081 : 0,
          position: "absolute",
          left: `${clue.x}%`,
          top: `${clue.y}%`,
        }}
      >
        <Typography>{clue.id}</Typography>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
        {clue.title}
      </Button>
    </Grow>
  );
}
