import { Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
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

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="flex-start"
      alignItems={"center"}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      px="24px"
      height="60px"
      zIndex={100}
      bgcolor={"rgba(0, 0, 0, 0)"}
      sx={{
        backdropFilter: "blur(60px)",
      }}
    >
      <Box mr={4} sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
        <Typography fontWeight="bolder" fontSize={16} mr={1}>
          추러스 크라임씬
          <Search />
        </Typography>
      </Box>
      <Box display="flex">
        <HeaderButton text="규칙" onClick={() => router.push("/rules")} />
        <HeaderButton
          text="인증 카드"
          onClick={() => router.push("/certification")}
        />
      </Box>
    </Box>
  );
}
