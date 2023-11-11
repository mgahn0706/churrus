import { useResponsiveValue } from "@/hooks/useResponsiveValue";

import { Mail, Menu, Home, InfoOutlined, Close } from "@mui/icons-material";
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
import LeftDrawer from "./LeftDrawer";

const mobileHeaderMenuItems = [
  {
    text: "HOME",
    url: "/",
    icon: <Home />,
  },
  {
    text: "ABOUT",
    url: "/about",
    icon: <InfoOutlined />,
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
          color: "#232937",
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
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            fontWeight={700}
            fontSize={24}
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
          color: "#232937",
          position: "fixed",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            sx={{
              ml: -1,
            }}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            {isDrawerOpen ? <Close /> : <Menu />}
          </IconButton>
          <Typography
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            fontWeight={700}
            fontSize={24}
            onClick={() => router.push("/")}
          >
            CHURRUS
          </Typography>
          <Button
            sx={{
              color: "#232937",
              fontWeight: 500,
            }}
            onClick={() => router.push("/")}
          >
            HOME
          </Button>
          <Button
            sx={{
              color: "#232937",
              fontWeight: 500,
            }}
            onClick={() => router.push("/about")}
          >
            ABOUT
          </Button>
          <Button
            sx={{
              color: "#232937",
              fontWeight: 500,
            }}
            onClick={() => router.push("/recruit")}
          >
            RECRUIT
          </Button>
        </Toolbar>
      </AppBar>
      <LeftDrawer isDrawerOpen={isDrawerOpen} />
    </Box>
  );
}
