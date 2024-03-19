import { Box, Button, ButtonBase, Icon, Typography } from "@mui/material";
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
  color = "#318AE1",
}: ServiceButtonProps) {
  const router = useRouter();
  return (
    <Button
      sx={{
        color: color,
        justifyContent: "flex-start",
      }}
      onClick={() => router.push(url)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="5px"
        width="20px"
        height="20px"
        bgcolor="#f9f9f9"
        mr="12px"
        p="4px"
      >
        {icon}
      </Box>
      <Typography fontSize={12} color="#202837">
        {label}
      </Typography>
    </Button>
  );
}
