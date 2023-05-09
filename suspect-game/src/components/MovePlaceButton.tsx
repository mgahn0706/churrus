import { IconButton } from "@mui/material";
import PlayButtonIcon from "@mui/icons-material/PlayCircleFilled";

interface MovePlaceButtonProps {
  direction: "left" | "right" | "up" | "down";
  x: number;
  y: number;
  onClick: () => void;
}

export default function MovePlaceButton({
  direction,
  x,
  y,
  onClick,
}: MovePlaceButtonProps) {
  const rotateDeg = (direction: "left" | "right" | "up" | "down") => {
    switch (direction) {
      case "left":
        return 180;
      case "right":
        return 0;
      case "up":
        return 270;
      case "down":
        return 90;
    }
  };

  return (
    <IconButton
      color="primary"
      size="large"
      sx={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <PlayButtonIcon
        sx={{
          transform: `rotate(${rotateDeg(direction)}deg)`,
        }}
      />
    </IconButton>
  );
}
