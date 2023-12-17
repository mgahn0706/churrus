import { HomeOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";

export default function HomeButton({ color }: { color?: string }) {
  const router = useRouter();
  return (
    <Box position="fixed" top={0} left={0} zIndex={100} p={2}>
      <IconButton onClick={() => router.push("/")}>
        <HomeOutlined
          sx={{
            color: color || "black",
            fontSize: "1.5rem",
          }}
        />
      </IconButton>
    </Box>
  );
}
