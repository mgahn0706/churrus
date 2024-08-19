import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useFoodChainPlayerContext from "../../context";
import Image from "next/image";
import { ANIMALS } from "../../fixtures/animal";
import { Player } from "../../types";
import { EmojiEventsRounded } from "@mui/icons-material";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import useCheckVictory from "../../hooks/useCheckVictory";
import { BIOMES } from "../../fixtures/biome";

export default function ResultPhase({
  onNextPhase,
}: {
  onNextPhase: () => void;
}) {
  const { playerStatus, resetPlayers } = useFoodChainPlayerContext();

  useCheckVictory();

  const xs = useResponsiveValue([12, 12, 6]);

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Typography color="#121212" fontSize="24px" fontWeight={500}>
          먹이사슬 결과
        </Typography>
      </Box>
      <Grid container spacing={2} xs={12} my={1}>
        <Grid item xs={xs}>
          <Typography color="#121212" fontSize="16px" height="18px">
            우승자
          </Typography>
          <Card
            sx={{
              minHeight: "100px",
              p: "12px",
              mt: "8px",
            }}
          >
            {playerStatus
              .filter((player) => player.result === "WIN")
              .map((player) => (
                <PlayerCard key={player.id} player={player} hasWon={true} />
              ))}
          </Card>
        </Grid>
        <Grid item xs={xs}>
          <Card
            sx={{
              mt: "26px",
              minHeight: "100px",
              p: "12px",
            }}
          >
            {playerStatus
              .filter((player) => player.result === "LOSE")
              .map((player) => (
                <PlayerCard key={player.id} player={player} hasWon={false} />
              ))}
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
        position="fixed"
        display="flex"
        justifyContent="flex-end"
        bottom={0}
        right={0}
        width={1}
        px={2}
      >
        <Button
          sx={{
            borderRadius: "50px",
          }}
          onClick={() => {
            resetPlayers();
            onNextPhase();
          }}
        >
          게임 종료
        </Button>
      </Box>
      <Typography fontSize="16px">게임 진행 상세</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>플레이어</TableCell>
              <TableCell align="right">1라운드</TableCell>
              <TableCell align="right">2라운드</TableCell>
              <TableCell align="right">3라운드</TableCell>
              <TableCell align="right">4라운드</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerStatus.map((player) => (
              <TableRow key={player.id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    minWidth: "150px",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Typography
                      color="#318AE1"
                      fontWeight={500}
                      sx={{ width: "36px" }}
                    >
                      {player.id}
                    </Typography>

                    <Avatar
                      sx={{
                        width: "24px",
                        height: "24px",
                        marginRight: "8px",
                      }}
                      src={`/image/icon/food-chain/${player.role}.svg`}
                    />
                    <Typography>{player.name}</Typography>
                    {player.result === "WIN" && (
                      <EmojiEventsRounded
                        sx={{
                          width: "18px",
                          height: "18px",
                          color: "#318AE1",
                          ml: "8px",
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
                {player.biomeHistory.map((biome) => (
                  <TableCell
                    key={biome}
                    align="right"
                    style={{
                      backgroundColor: biome ? BIOMES[biome].color : "black",
                      color: biome ? "white" : "black",
                    }}
                  >
                    {biome ? BIOMES[biome].name : "죽음"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const PlayerCard = ({
  player,
  hasWon,
}: {
  player: Player;
  hasWon: boolean;
}) => {
  if (!player.role) {
    return null;
  }
  return (
    <Card
      elevation={0}
      sx={{
        p: "12px",

        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" gap="12px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="16px"
        >
          <Typography color="#318AE1" fontSize="16px" fontWeight={500}>
            {player.id}
          </Typography>
        </Box>
        <Image
          src={`/image/icon/food-chain/${player.role}.svg`}
          width={48}
          alt={`${player.role} icon`}
          height={48}
        />
        <Box
          display="flex"
          flexDirection="column"
          gap="4px"
          justifyContent="space-between"
        >
          <Typography color="#121212" fontSize="16px" fontWeight={500}>
            {player.name}
          </Typography>
          <Typography color="#828282" fontSize="12px">
            {ANIMALS[player.role].name}
          </Typography>
        </Box>
      </Box>
      {hasWon && (
        <EmojiEventsRounded
          sx={{
            color: "#318AE1",
          }}
        />
      )}
    </Card>
  );
};
