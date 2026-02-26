import {
  Category,
  Dashboard,
  Filter1,
  Help,
  Hexagon,
  IndeterminateCheckBox,
  ListRounded,
  Mail,
  Quiz,
  Search,
} from "@mui/icons-material";
import {
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";

const leftNavigationMenuItems: Record<
  string,
  {
    text: string;
    url: string;
    icon: React.ReactNode;
    badgeText?: string;
  }[]
> = {
  "추러스 : 서울대 추리 동아리": [
    {
      text: "문제적 추러스",
      url: "/quiz",
      icon: <Quiz />,
    },
    {
      text: "협동 크라임씬",
      url: "/suspect",
      icon: <Search />,
    },
  ],
  "정기 퍼즐": [
    {
      text: "추러스 커넥션",
      url: "/connections",
      icon: <Dashboard />,
    },
    {
      text: "스펠링 비",
      url: "/spelling-bee",
      icon: <Hexagon />,
    },
  ],
  "추러스 활동": [
    {
      text: "추러스 소개",
      url: "/about",
      icon: <Help />,
    },
    {
      text: "지원하기",
      url: "/recruit",
      icon: <Mail />,
    },
  ],
};

export default function LeftDrawer({
  isDrawerOpen,
}: {
  isDrawerOpen: boolean;
}) {
  const router = useRouter();
  return (
    <Drawer
      open={isDrawerOpen}
      variant="persistent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: "17rem",
          bgcolor: "#F5F6FA",
          borderRight: "none",
          boxShadow: "12px 0 24px rgba(16, 16, 16, 0.08)",
        },
      }}
    >
      <Toolbar />
      <List sx={{ px: 1.5, pb: 2 }}>
        {Object.entries(leftNavigationMenuItems).map(([key, value]) => {
          return (
            <Fragment key={key}>
              <ListItem key={key} sx={{ pt: 1.25, pb: 0.5 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#6B6B6B",
                  }}
                >
                  {key}
                </Typography>
              </ListItem>
              {value.map((item) => (
                <ListItem
                  key={item.text}
                  alignItems="flex-start"
                  disablePadding
                  onClick={() => {
                    router.push(item.url);
                  }}
                >
                  <ListItemButton
                    sx={{
                      py: 0.75,
                      px: 1.25,
                      borderRadius: "10px",
                      width: "100%",
                      justifyContent: "flex-start",
                      "&:hover": {
                        bgcolor: "#ECEFF6",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "unset",
                        marginRight: "0.75rem",
                        color: "#5A6477",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1B2430",
                      }}
                    />
                    {item.badgeText && (
                      <Chip
                        label={item.badgeText}
                        sx={{
                          ml: 1,
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          height: "1.4rem",
                          color: "#1B2430",
                          bgcolor: "#E7ECF7",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider
                sx={{
                  my: 1.25,
                  borderColor: "#E4E7F0",
                }}
              />
            </Fragment>
          );
        })}
        <ListItem
          alignItems="flex-start"
          disablePadding
          onClick={() => {
            router.push("/all-services");
          }}
        >
          <ListItemButton
            sx={{
              py: 0.75,
              px: 1.25,
              borderRadius: "10px",
              width: "100%",
              justifyContent: "flex-start",
              "&:hover": {
                bgcolor: "#ECEFF6",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "unset",
                marginRight: "0.75rem",
                color: "#5A6477",
              }}
            >
              <ListRounded />
            </ListItemIcon>
            <ListItemText
              primary="전체 서비스"
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1B2430",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
