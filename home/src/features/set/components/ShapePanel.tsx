import { Box } from "@mui/material";
import { PictureType } from "../types";
import { Circle, Error, PlayArrow, Square } from "@mui/icons-material";

export default function ShapePanel({
  picture,
  isSelected,
}: {
  picture: PictureType;
  isSelected: boolean;
}) {
  const getIcon = (shape: string) => {
    switch (shape) {
      case "circle":
        return (
          <Circle
            sx={{
              fontSize: 72,
            }}
          />
        );
      case "square":
        return (
          <Square
            sx={{
              fontSize: 72,
            }}
          />
        );
      case "triangle":
        return (
          <PlayArrow
            sx={{
              transform: "rotate(-90deg)",
              fontSize: 110,
            }}
          />
        );
      default:
        return (
          <Error
            sx={{
              fontSize: 72,
            }}
          />
        );
    }
  };

  return (
    <Box
      display="flex"
      textAlign="center"
      width="100px"
      height="100px"
      justifyContent="center"
      alignItems="center"
      color={picture.color}
      border={
        isSelected
          ? "blue 1.5px solid"
          : picture.backgroundColor === "white"
          ? "1.5px solid black"
          : "1.5px solid transparent"
      }
      sx={{
        cursor: "pointer",
        boxShadow: isSelected ? "0px 0px 10px 0px blue" : "none",
        backgroundColor: picture.backgroundColor,
      }}
    >
      {getIcon(picture.shape)}
    </Box>
  );
}
