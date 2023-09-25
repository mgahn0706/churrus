import { HomeOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";

export default function HomeButton() {
  const router = useRouter();
  return (
    <Box position="fixed" top={0} left={0} zIndex={100} p={2}>
      <IconButton onClick={() => router.push("/games")}>
        <HomeOutlined />
      </IconButton>
    </Box>
  );
}
