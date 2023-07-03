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

const CUBES = [
  -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19,
  -20, -21, -22, -23, -24, -25, -26, -27, -28, -29, -30, -31, -32, -33, -34,
  -35,
];

export default function MinusAuction() {
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [cubesForRound, setCubesForRound] = useState<number[]>([]);
  const [eliminatedCubes, setEliminatedCubes] = useState<number[]>([]);
  const [currentOrder, setCurrentOrder] = useState(1);
  const [collectedChips, setCollectedChips] = useState(0);

  const [isPlayerSetModalOpen, setIsPlayerSetModalOpen] = useState(true);

  useEffect(() => {
    if (cubesForRound.length === 32 || cubesForRound.length === 33) {
      return;
    }
    const shuffledCubes = CUBES.sort(() => Math.random() - 0.5);
    setCubesForRound(shuffledCubes.slice(0, CUBES.length - 2));
    setEliminatedCubes(shuffledCubes.slice(CUBES.length - 2));
  }, []);

  console.log(cubesForRound, eliminatedCubes);

  useEffect(() => {
    if (round > cubesForRound.length && cubesForRound.length !== 0) {
      window.alert("게임이 종료되었습니다.");
    }
  }, [round, cubesForRound]);

  const handleBid = () => {
    setPlayers(
      players.map((player) => {
        if (player.order === currentOrder) {
          return {
            ...player,
            chips: player.chips + collectedChips,
            cubes: [...player.cubes, cubesForRound[round - 1]].sort(
              (a, b) => b - a
            ),
          };
        }
        return player;
      })
    );
    setCollectedChips(0);
    setRound(round + 1);
  };

  const handlePass = () => {
    const currentPlayer = players.filter(
      (player) => player.order === currentOrder
    )[0];
    if (currentPlayer.chips <= 0) {
      handleBid();
      return;
    }
    setCollectedChips(collectedChips + 1);
    setPlayers(
      players.map((player) => {
        if (player.order === currentOrder) {
          return {
            ...player,
            chips: player.chips - 1,
          };
        }
        return player;
      })
    );
    setCurrentOrder(currentOrder === players.length ? 1 : currentOrder + 1);
  };

  return (
    <Box textAlign="center" pt={4}>
      <HomeButton />
      <PlayerSetModal
        isOpen={isPlayerSetModalOpen}
        onEnterPlayer={setPlayers}
        onClose={() => {
          setIsPlayerSetModalOpen(false);
          const randomizedOrder = players.sort(() => Math.random() - 0.5);
          setPlayers(
            randomizedOrder.map((player, index) => ({
              ...player,
              order: index + 1,
            }))
          );
        }}
        players={players}
      />
      <Typography variant="h5">마이너스 경매</Typography>
      <Typography variant="h6">Round {round}</Typography>
      <CubInAuction>{cubesForRound[round - 1]}</CubInAuction>
      <Box display="flex" justifyContent="center" mb={2}>
        <Token
          sx={{
            mr: 1,
          }}
        />
        <Typography variant="h6"> X {collectedChips}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          width="200px"
          mb={2}
        >
          <Button
            size="large"
            variant="contained"
            color="error"
            onClick={handleBid}
          >
            낙찰
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handlePass}
          >
            패스
          </Button>
        </Box>
      </Box>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {players.map((player) => (
          <>
            <Divider component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor:
                      player.order === currentOrder ? deepOrange[500] : "grey",
                  }}
                >
                  {player.order}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={player.name}
                secondary={
                  <Box display="flex">
                    <Token />
                    <Typography> X {player.chips}</Typography>
                  </Box>
                }
              />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {player.cubes.map((cube, idx) => (
                  <Avatar
                    variant="square"
                    sx={{
                      mx: 1,
                      color: "black",
                      fontWeight: "bold",
                      opacity: player.cubes[idx - 1] === cube + 1 ? 0.2 : 1,
                      backgroundImage: `url("https://m.media-amazon.com/images/I/817Q3VCabwL.jpg")`,
                    }}
                  >
                    {cube}
                  </Avatar>
                ))}
              </Box>
            </ListItem>
          </>
        ))}
        <Divider component="li" />
      </List>
    </Box>
  );
}
