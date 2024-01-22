import { Box, Button } from "@mui/material";

export default function ColorForm({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      color="white"
      bgcolor="#313131"
      alignItems="center"
      width="180px"
      px={2}
      justifyContent="center"
      borderRadius="5px"
      height="70px"
    >
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        제출
      </Button>
    </Box>
  );
}
