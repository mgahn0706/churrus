import { LibraryBooks } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

export default function MemoButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip title="추리 노트" placement="right">
      <Button
        variant="contained"
        startIcon={<LibraryBooks sx={{ color: "primary.main" }} />}
        sx={{
          position: "absolute",
          boxShadow: 4,
          zIndex: 2023,
          minWidth: 132,
          height: 48,
          px: 1.8,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: "rgba(255,255,255,0.96)",
          color: "primary.main",
          fontWeight: 700,
          letterSpacing: 0.2,
          bottom: 40,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,1)",
          },
        }}
        aria-label="memo"
        onClick={onClick}
      >
        추리 노트
      </Button>
    </Tooltip>
  );
}
