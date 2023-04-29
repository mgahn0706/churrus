import { Button, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ClueButtonProps {
  label: string;
  index: number;
  x: number;
  y: number;
  onClick: () => void;
}

export function ClueButton({ label, index, onClick, x, y }: ClueButtonProps) {
  return (
    <Button
      color="warning"
      variant="contained"
      endIcon={<SearchIcon />}
      size="small"
      onClick={onClick}
      sx={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <Typography>{index}</Typography>
      <Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
      {label}
    </Button>
  );
}
