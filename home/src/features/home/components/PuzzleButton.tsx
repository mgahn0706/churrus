import { Box } from "@mui/material";
import Image from "next/image";

export default function PuzzleButton({
  src,
  label,
  onClick,
}: {
  src: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        onClick={onClick}
        width={80}
        height={80}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb="12px"
        sx={{
          cursor: "pointer",
          borderRadius: "50%",
          bgcolor: "white",
        }}
      >
        <Image src={src} width={32} height={32} alt={label} />
      </Box>
      <Box
        textAlign="center"
        fontSize={12}
        fontWeight={600}
        sx={{
          wordBreak: "keep-all",
        }}
      >
        {label}
      </Box>
    </Box>
  );
}
