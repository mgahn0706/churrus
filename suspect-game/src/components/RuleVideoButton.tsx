import { Help } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import ModalVideo from "react-modal-video";

export default function RuleVideoButton({ url }: { url: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box position="fixed" top={0} right={0} zIndex={100} p={2}>
      <IconButton
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Help />
      </IconButton>
      <ModalVideo
        channel="youtube"
        isOpen={isModalOpen}
        videoId={url}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
}
