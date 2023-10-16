import { Modal } from "@mui/material";
import Image from "next/image";

export default function MapModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return <Modal open={isOpen} onClose={onClose}></Modal>;
}
