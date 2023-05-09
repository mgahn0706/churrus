import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { ClueType } from "@/fixtures/startup/clues/clues";

interface ClueDetailViewProps {
  id: number | null;
  clueData: ClueType | null;
  suspects: string[];
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ClueDetailView({
  id,
  clueData,
  suspects,
  onClose,
}: ClueDetailViewProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isInterrogateMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (clueData === null || id === null) {
    return null;
  }

  return (
    <Dialog fullScreen open onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 3, flex: 1, my: 1 }}
            variant="h5"
            component="div"
          >
            {`${clueData.id}. ${clueData?.title}`}
          </Typography>
          <>
            <Button autoFocus color="inherit" onClick={handleClick}>
              심문
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isInterrogateMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {suspects.map((suspect) => {
                return (
                  <MenuItem key={suspect} onClick={handleClose}>
                    {suspect}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        </Toolbar>
      </AppBar>
      <Box display="flex" mt={4}>
        <Box display="flex" m={"150px"} width="30%" height="30%">
          <Image
            src={clueData.image}
            alt={`${clueData.id}번째 단서 이미지`}
            width={300}
            height={300}
          />
        </Box>
        <Box display="flex">
          <Divider orientation="vertical" flexItem />
          <Box mx={"50px"} mt="150px">
            <Typography
              variant="h5"
              sx={{
                wordBreak: "keep-all",
                lineHeight: "2",
              }}
            >
              {clueData.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
