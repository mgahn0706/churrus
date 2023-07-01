import { Box } from "@mui/material";

export default function SelectedPanelItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Box
      width="100px"
      height="100px"
      border="1px solid black"
      borderRadius={5}
      display="flex"
      fontSize={72}
      fontWeight="bolder"
      justifyContent="center"
      alignItems="center"
      lineHeight="100px"
      sx={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
