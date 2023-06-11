import { Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="space-between"
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
      <Box sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
        <Typography fontWeight="bolder" fontSize={16}>
          추러스 크라임씬
          <Search />
        </Typography>
      </Box>

      <Box mr="48px">
        <Typography
          onClick={() => router.push("/certification")}
          fontSize={14}
          sx={{
            cursor: "pointer",
            "&:hover": {
              fontSize: 16,
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          추리 인증 카드
        </Typography>
      </Box>
    </Box>
  );
}
