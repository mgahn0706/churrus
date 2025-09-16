import { Box, SxProps } from "@mui/material";

interface HexagonButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: "center" | "outer";
  sx?: SxProps;
}

export default function HexagonButton({
  children,
  onClick,
  variant,
  sx,
}: HexagonButtonProps) {
  return (
    <Box
      width="100px"
      height="100px"
      color="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="2.5rem"
      fontWeight={900}
      onClick={onClick}
      sx={{
        ...sx,
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        transition: "transform 80ms ease-out",
        "&:hover": {
          transform: "none", // no hover enlargement
        },
        "&:active": {
          transform: "scale(0.95)", // boop shrink effect
        },
        backgroundColor: variant === "center" ? "#FECD57" : "#E5E8EC",
        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
      }}
    >
      {children}
    </Box>
  );
}
