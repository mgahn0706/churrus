import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { ClueType } from "@/fixtures/clues/startup";

interface ClueDetailViewProps {
  id: number | null;
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

export function ClueDetailView({ id, clueData, onClose }: ClueDetailViewProps) {
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
          <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
            {`${clueData.id}. ${clueData?.title}`}
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            단서 심문
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Box display="flex" m={"150px"} width={500} height={500}>
          <Image
            src={clueData.image}
            alt={`${clueData.id}번째 단서 이미지`}
            width={500}
            height={500}
          />
        </Box>
        <Box display="flex">
          <Divider orientation="vertical" flexItem />
          <Box ml={"50px"} mt="150px">
            <Typography variant="h6">{clueData.description}</Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
