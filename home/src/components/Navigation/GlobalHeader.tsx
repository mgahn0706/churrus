import { useResponsiveValue } from "@/hooks/useResponsiveValue";

import {
  Mail,
  Menu,
  InfoOutlined,
  Close,
  HomeRounded,
  Quiz,
  ListRounded,
  QuizRounded,
  MailRounded,
} from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import LeftDrawer from "./LeftDrawer";
import Image from "next/image";

const mobileHeaderMenuItems = [
  {
    text: "홈",
    url: "/",
    icon: <HomeRounded />,
  },
  {
    text: "문제적 추러스",
    url: "/quiz",
    icon: <QuizRounded />,
  },

  {
    text: "지원하기",
    url: "/recruit",
    icon: <MailRounded />,
  },
  {
    text: "전체",
    url: "/all-services",
    icon: <ListRounded />,
  },
];

const desktopHeaderMenuItems = [
  {
    text: "문제적 추러스",
    url: "/quiz",
  },
  {
    text: "협동 크라임씬",
    url: "/suspect",
  },
  {
    text: "소개",
    url: "/about",
  },
  {
    text: "지원하기",
    url: "/recruit",
  },
];

export default function GlobalHeader() {
  const isMobile = useResponsiveValue([true, true, false]);

  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          color: "#232937",
          top: "auto",
          bottom: 0,
          height: "60px",
          minWidth: "100vw",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {mobileHeaderMenuItems.map((item, index) => (
            <IconButton
              key={index}
              onClick={() => router.push(item.url)}
              sx={{
                color: router.pathname === item.url ? "#232937" : "#767676",
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Box>
      <AppBar
        sx={{
          bgcolor: "white",
          color: "#232937",
          position: "fixed",
          height: "48px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            height: "40px",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box display="flex" gap={1} alignItems="center">
            <IconButton
              sx={{
                ml: -1,
                mr: 1,
              }}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? <Close /> : <Menu />}
            </IconButton>
            <Image
              onClick={() => router.push("/")}
              style={{
                cursor: "pointer",
              }}
              alt="churrus-logo"
              width={30}
              height={25}
              src="/image/churrus-icon.svg"
            />
          </Box>
          <Box display="flex" height="40px">
            {desktopHeaderMenuItems.map((item, index) => (
              <DesktopTopMenu
                key={item.text}
                label={item.text}
                onClick={() => router.push(item.url)}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <LeftDrawer isDrawerOpen={isDrawerOpen} />
    </Box>
  );
}

interface DesktopTopMenuProps {
  label: string;
  onClick: () => void;
}

const DesktopTopMenu = ({ label, onClick }: DesktopTopMenuProps) => {
  return (
    <Button
      sx={{
        color: "#232937",
        fontWeight: 500,
        fontSize: 14,
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
