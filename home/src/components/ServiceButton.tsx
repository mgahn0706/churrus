import { Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface ServiceButtonProps {
  label: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
}

export default function ServiceButton({
  label,
  url,
  icon,
  color = "#5B6475",
}: ServiceButtonProps) {
  const router = useRouter();
  return (
    <ButtonBase
      onClick={() => router.push(url)}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left",
        borderRadius: "12px",
        px: 1.5,
        py: 1.25,
        bgcolor: "#FFFFFF",
        boxShadow: "0 1px 0 rgba(15, 23, 42, 0.06)",
        transition: "box-shadow 180ms ease, transform 180ms ease",
        "&:hover": {
          boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius="10px"
        width="32px"
        height="32px"
        bgcolor="#F6F6F4"
        mr={1.5}
        color={color}
        flexShrink={0}
      >
        {icon}
      </Box>
      <Typography fontSize={14} fontWeight={600} color="#1F1F1F">
        {label}
      </Typography>
    </ButtonBase>
  );
}
