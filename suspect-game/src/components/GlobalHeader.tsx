import { useResponsiveValue } from "@/hooks/useResponsiveValue";

import { Mail, Menu, Home, VideogameAsset } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const mobileHeaderMenuItems = [
  {
    text: "HOME",
    url: "/",
    icon: <Home />,
  },
  {
    text: "GAMES",
    url: "/games",
    icon: <VideogameAsset />,
  },
  {
    text: "RECRUIT",
    url: "/recruit",
    icon: <Mail />,
  },
];

export default function GlobalHeader() {
  const isMobile = useResponsiveValue([true, true, false]);

  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <AppBar
        sx={{
          bgcolor: "white",
          color: "black",
        }}
      >
        <Drawer
          open={isDrawerOpen}
          anchor="top"
          onClose={() => setIsDrawerOpen(false)}
        >
          <List>
            {mobileHeaderMenuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                onClick={() => {
                  router.push(item.url);
                  setIsDrawerOpen(false);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Toolbar>
          <IconButton
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            fontWeight={600}
            onClick={() => router.push("/")}
          >
            CHURRUS
          </Typography>
        </Toolbar>
      </AppBar>
    );
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
