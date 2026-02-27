import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBack } from "@mui/icons-material";
import { ClueType, SuspectType } from "@/features/suspect/types";
import { Circle } from "@mui/icons-material";

interface ClueDetailViewProps {
  id: number | null;
  clueData: ClueType | null;
  suspects: SuspectType[];
  scenarioKeyword: string;
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
  scenarioKeyword,
  clueData,
  suspects,
  onClose,
}: ClueDetailViewProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isInterrogateMenuOpen = Boolean(anchorEl);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (clueData?.image) {
      setIsImageLoading(true);
    }
  }, [clueData]);

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
      <AppBar
        sx={{
          position: "relative",
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 62%, ${theme.palette.primary.light} 100%)`,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            {clueData.type === "additional" ? <ArrowBack /> : <CloseIcon />}
          </IconButton>
          <Typography
            sx={{ ml: 3, flex: 1, my: 1 }}
            variant="h5"
            component="div"
          >
            {`${clueData.id}. ${clueData?.title}`}
          </Typography>
          <>
            {IS_INTERROGATE && (
              <Button autoFocus color="inherit" onClick={handleClick}>
                심문
              </Button>
            )}

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
        <Box display="flex" ml="50px" mr="100px" my={"50px"}>
          <Image
            priority
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            src={`/image/suspect/scenario/${scenarioKeyword}/clues/${scenarioKeyword}-${id}.png`}
            alt={`${clueData.id}번째 단서 이미지`}
            width={isImageLoading ? 0 : 600}
            height={isImageLoading ? 0 : 600}
            style={{ borderRadius: 16 }}
          />
          {isImageLoading && (
            <Skeleton
              variant="rectangular"
              width={600}
              height={600}
              sx={{ borderRadius: 2 }}
            />
          )}
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
