import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function GlobalHeader() {
  const isMobile = useResponsiveValue([true, true, false]);

  const router = useRouter();

  if (isMobile) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          bgcolor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            fontWeight={600}
            onClick={() => router.push("/")}
          >
            CHURRUS
          </Typography>
          <Button
            sx={{
              color: "black",
              fontWeight: 500,
            }}
            onClick={() => router.push("/")}
          >
            HOME
          </Button>
          <Button
            sx={{
              color: "black",
              fontWeight: 500,
            }}
            onClick={() => router.push("/games")}
          >
            GAMES
          </Button>
          <Button
            sx={{
              color: "black",
              fontWeight: 500,
            }}
            onClick={() => router.push("/recruit")}
          >
            RECRUIT
          </Button>
          <Button
            onClick={() => router.push("/contact")}
            sx={{
              color: "black",
              fontWeight: 500,
            }}
          >
            CONTACT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
