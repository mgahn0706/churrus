import { Box } from "@mui/material";

export default function PanelItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Box
      sx={{ cursor: "pointer" }}
      width="100px"
      height="100px"
      border="1px solid black"
      display="flex"
      fontSize={72}
      fontWeight="bolder"
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
