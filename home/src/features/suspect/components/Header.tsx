import { VolumeUpRounded } from "@mui/icons-material";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

function HeaderButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <Box
      px={{ xs: "8px", sm: "12px" }}
      py="4px"
      sx={{
        cursor: "pointer",
        backgroundColor: "rgba(0, 0, 0, 0)",
        "&:hover": {
          backgroundColor: "rgb(60, 60, 60)",
        },
        transition: "all 0.3s ease-in-out",
        borderRadius: "2px",
      }}
      onClick={onClick}
    >
      <Typography fontSize={{ xs: 14, sm: 16 }}>{text}</Typography>
    </Box>
  );
}

export default function Header() {
  const router = useRouter();

  const toggleBgm = () => {
    // Move to youtube link
    window.open(
      "https://youtube.com/playlist?list=PLUpIDGJHdYTT19y4F7LxG7MQnDW4PI0VK&si=fO4IV6OuvUg9PIjH",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      px={{ xs: "12px", sm: "24px" }}
      py={{ xs: "8px", sm: 0 }}
      minHeight="60px"
      zIndex={100}
      bgcolor="rgba(0, 0, 0, 0)"
      sx={{
        backdropFilter: "blur(60px)",
        boxSizing: "border-box",
        gap: 1,
      }}
    >
      {/* Left: Logo & Navigation */}
      <Box display="flex" alignItems="center" minWidth={0}>
        <Box
          mr={{ xs: 1.5, sm: 4 }}
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => router.push("/suspect")}
        >
          <Typography
            fontWeight="bolder"
            fontSize={{ xs: 14, sm: 16 }}
            mr={1}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            추러스 크라임씬 🔍
          </Typography>
        </Box>

        <Box display="flex">
          <HeaderButton
            text="규칙"
            onClick={() => router.push("/suspect/rules")}
          />
          <HeaderButton
            text="인증 카드"
            onClick={() => router.push("/suspect/certification")}
          />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1 }}>
        <Box
          onClick={() => router.push("/")}
          sx={{
            cursor: "pointer",
            px: "10px",
            py: "6px",
            borderRadius: "999px",
            color: "rgba(255,255,255,0.68)",
            transition: "color 0.2s ease, background-color 0.2s ease",
            display: { xs: "none", sm: "block" },
            "&:hover": {
              color: "rgba(255,255,255,0.92)",
              backgroundColor: "rgba(255,255,255,0.06)",
            },
          }}
        >
          <Typography fontSize={13} fontWeight={500}>
            추러스 사이트로 돌아가기
          </Typography>
        </Box>

        <Tooltip title={"BGM"} arrow>
          <IconButton
            onClick={toggleBgm}
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
              borderRadius: "50%",
              transition: "all 0.3s ease",
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            <VolumeUpRounded />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
