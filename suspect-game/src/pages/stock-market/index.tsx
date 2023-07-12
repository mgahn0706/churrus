import HomeButton from "@/components/HomeButton";
import CubInAuction from "@/features/minus-auction/components/CubeInAuction";
import PlayerSetModal from "@/features/minus-auction/components/PlayerSetModal";
import { PlayerType } from "@/features/minus-auction/types";
import { Delete, Token } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";

export default function StockMarket() {
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  return (
    <Box textAlign="center" pt={4}>
      <HomeButton />

      <Typography variant="h5">폭풍의 증권시장</Typography>
      <Typography variant="h6">Round {round}</Typography>
    </Box>
  );
}
