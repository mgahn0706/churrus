import { Box, IconButton, SvgIcon, SxProps } from "@mui/material";

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
      color="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="2.5rem"
      fontWeight={900}
      height="100px"
      onClick={onClick}
      sx={{
        ...sx,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.1)",
        },
        backgroundColor: variant === "center" ? "#FECD57" : "#E5E8EC",
        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
      }}
    >
      {children}
    </Box>
  );
}
