import { Button, Divider, Grow, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import LockIcon from "@mui/icons-material/Lock";
import { ClueType } from "@/features/suspect/types";

interface ClueButtonProps {
  clue: ClueType;
  status?: "default" | "checked" | "pending" | "locked";
  onClick: () => void;
}

const statusIconMap = {
  default: <SearchIcon />,
  checked: <CheckCircleIcon />,
  pending: <HourglassTopIcon />,
  locked: <LockIcon />,
} satisfies Record<NonNullable<ClueButtonProps["status"]>, React.ReactNode>;

export function ClueButton({
  clue,
  status = "default",
  onClick,
}: ClueButtonProps) {
  return (
    <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <Button
        variant="contained"
        endIcon={statusIconMap[status]}
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
