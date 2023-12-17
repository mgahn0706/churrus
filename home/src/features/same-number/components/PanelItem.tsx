import { Box } from "@mui/material";

export default function PanelItem({
  isFlipped,
  isSelected,
  children,
  onClick,
}: {
  isFlipped: boolean;
  isSelected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Box
      sx={{
        cursor: "pointer",
        transition: "transform 0.8s",
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(360deg)" : "rotateY(0deg)",
        backgroundColor:
          isSelected && !isFlipped ? "rgb(200, 200, 200)" : "white",
        "&:hover": {
          backgroundColor: "rgb(220, 220, 220)",
        },
      }}
      width="100px"
      height="100px"
      border="1px solid black"
      display="flex"
      fontSize={72}
      fontWeight="bolder"
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
