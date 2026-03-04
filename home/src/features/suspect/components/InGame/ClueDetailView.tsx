import {
  AppBar,
  Box,
  Dialog,
  Divider,
  IconButton,
  Skeleton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBack } from "@mui/icons-material";
import { ClueType } from "@/features/suspect/types";

interface ClueDetailViewProps {
  clueData: ClueType | null;
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
  clueData,
  onClose,
}: ClueDetailViewProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (clueData?.image) {
      setIsImageLoading(true);
    }
  }, [clueData]);

  if (clueData === null) {
    return null;
  }

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
        </Toolbar>
      </AppBar>
      <Box display="flex" mt={4}>
        <Box display="flex" ml="50px" mr="100px" my={"50px"}>
          <Image
            priority
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            src={clueData.image}
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
