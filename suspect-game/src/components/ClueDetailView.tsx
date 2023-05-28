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
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { ClueType } from "@/fixtures/startup/clues";
import { SuspectType } from "@/fixtures/startup/suspects";
import { Circle } from "@mui/icons-material";

interface ClueDetailViewProps {
  id: number | null;
  clueData: ClueType | null;
  suspects: SuspectType[];
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

  const IS_INTERROGATE = false;

  return (
    <Dialog
      fullScreen
      open
      onClose={onClose}
      TransitionComponent={Transition}
      sx={{ zIndex: 1080 }}
    >
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
          { IS_INTERROGATE &&
            <Button autoFocus color="inherit" onClick={handleClick}>
              심문
            </Button>
}
<Tooltip placement="left" title={clueData.reliability === 'high' ? '믿을만한 정보입니다.' : clueData.reliability ==='medium' ? '불확실한 정보입니다.' : '거짓말일 수 있는 정보입니다.'}>
<Circle sx={{
  backgroundColor: clueData.reliability === 'high' ? '#4caf50' : clueData.reliability ==='medium' ? '#ff9800' : '#f44336',
  borderRadius: '50%',
  boxShadow: `0 0 10px 5px ${clueData.reliability === 'high' ? '#4caf50' : clueData.reliability ==='medium' ? '#ff9800' : '#f44336'}`
}} color={clueData.reliability === 'high' ? 'success' : clueData.reliability ==='medium' ? 'warning' : 'error'} />
</Tooltip>
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
                  <MenuItem key={suspect.name} onClick={handleClose}>
                    {suspect.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        </Toolbar>
      </AppBar>
      <Box display="flex" mt={4}>
        <Box display="flex" m={"150px"}>
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
