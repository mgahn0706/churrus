import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { PlayerType } from "../types";
import { useState } from "react";

export default function HiddenCubeBidModal({
  isOpen,
  onClose,
  hiddenCube,
  players,
  onBid,
}: {
  isOpen: boolean;
  onClose: () => void;
  hiddenCube: number;
  players: PlayerType[];
  onBid: (player: PlayerType, bid: number) => void;
}) {
  const [bider, setBider] = useState<PlayerType | null>(null);
  return (
    <Dialog open={isOpen}>
      <DialogTitle>히든큐브 경매</DialogTitle>
      <DialogContent>
        <DialogContentText>
          히든큐브를 확인하고 게임 포함 여부를 선택할 수 있는 권리에 대한 경매가
          진행됩니다.
        </DialogContentText>
        <InputLabel id="hidden-bidder-label">경매 낙찰자</InputLabel>
        <Select
          labelId="hidden-bidder-label"
          id="demo-simple-select"
          value={bider}
          label="경매 낙찰자"
          onChange={(e) => {
            setBider(
              players.filter((player) => player.name === e.target.value)[0]
            );
          }}
        >
          {players.map((player) => (
            <MenuItem value={player.order}>{player.name}</MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>낙찰 완료</Button>

        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
