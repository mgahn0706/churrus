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
  Switch,
  TextField,
  Typography,
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
  const [bider, setBider] = useState<string>("");
  const [finalChip, setFinalChip] = useState<number>(0);
  const [isIncludingHiddenCube, setIsIncludingHiddenCube] =
    useState<boolean>(false);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>히든큐브 경매</DialogTitle>
      <DialogContent>
        <DialogContentText mb={5}>
          히든큐브를 확인하고 게임 포함 여부를 선택할 수 있는 권리에 대한 경매가
          진행됩니다.
        </DialogContentText>
        <Select
          id="demo-simple-select"
          sx={{
            width: "300px",
            mr: 3,
          }}
          autoWidth
          value={bider}
          label="Bider"
          onChange={(e) => {
            setBider(e.target.value as string);
          }}
        >
          {players.map((player) => (
            <MenuItem value={player.order}>{player.name}</MenuItem>
          ))}
        </Select>
        <TextField
          label="최종 낙찰가"
          id="hidden-bidder-label"
          value={finalChip}
          type="number"
          onChange={(e) => {
            setFinalChip(Number(e.target.value));
          }}
        />
      </DialogContent>
      <DialogContent>
        <InputLabel id="is-including">히든 큐브 포함 여부</InputLabel>
        <Switch
          value={isIncludingHiddenCube}
          onChange={(e) => {
            setIsIncludingHiddenCube(e.target.checked);
          }}
        />
        <Typography
          variant="body2"
          color={isIncludingHiddenCube ? "primary.main" : "gray"}
          ml={2}
        >
          {isIncludingHiddenCube ? "포함" : "제외"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!bider || !finalChip}
          onClick={() => {
            onBid(
              players.find((player) => {
                return player.name === bider;
              })!,
              finalChip
            );
            onClose();
          }}
        >
          낙찰 완료
        </Button>

        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
