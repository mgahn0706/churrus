import { LibraryBooks } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function MemoButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip title="추리 노트" placement="right">
      <IconButton
        sx={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: 0,
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: "primary.main",
          bottom: 40,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        aria-label="save"
        onClick={onClick}
      >
        <LibraryBooks sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
}
