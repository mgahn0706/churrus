import { Search, VolumeUpRounded, VolumeOffRounded } from "@mui/icons-material";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

function HeaderButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <Box
      px="12px"
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
      <Typography fontSize={16}>{text}</Typography>
    </Box>
  );
}

export default function Header() {
  const router = useRouter();
  const [bgmOn, setBgmOn] = useState(true);

  const toggleBgm = () => {
    setBgmOn((prev) => !prev);
    // 여기에서 실제 오디오 컨트롤 로직 연결 가능
    // 예: audioRef.current?.play() / pause()
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
      width={"calc(100% - 48px)"}
      px="24px"
      height="60px"
      zIndex={100}
      bgcolor="rgba(0, 0, 0, 0)"
      sx={{
        backdropFilter: "blur(60px)",
      }}
    >
      {/* Left: Logo & Navigation */}
      <Box display="flex" alignItems="center">
        <Box
          mr={4}
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => router.push("/suspect")}
        >
          <Typography fontWeight="bolder" fontSize={16} mr={1}>
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

      {/* Right: BGM Toggle */}
      <Tooltip title={bgmOn ? "BGM 끄기" : "BGM 켜기"} arrow>
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
          }}
        >
          {bgmOn ? <VolumeUpRounded /> : <VolumeOffRounded />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
