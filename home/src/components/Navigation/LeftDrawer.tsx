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
          width: "15rem",
        },
      }}
    >
      <Toolbar />
      <List>
        {Object.entries(leftNavigationMenuItems).map(([key, value]) => {
          return (
            <>
              <ListItem>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
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
                      py: "4px",
                      width: "100%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <ListItemIcon
                      color="#232937"
                      sx={{
                        minWidth: "unset",
                        marginRight: "0.5rem",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    {item.badgeText && (
                      <Chip
                        label={item.badgeText}
                        sx={{
                          ml: 1,
                          fontSize: "0.5rem",
                          fontWeight: "bold",
                          height: "1.5rem",
                          color: "white",
                          bgcolor: "#eeb900",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider
                sx={{
                  my: 1,
                }}
              />
            </>
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
              py: "4px",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <ListItemIcon
              color="#232937"
              sx={{
                minWidth: "unset",
                marginRight: "0.5rem",
              }}
            >
              <ListRounded />
            </ListItemIcon>
            <ListItemText primary="전체 서비스" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
