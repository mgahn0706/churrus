import { Box, Typography, Button, Drawer, Grid, Snackbar } from "@mui/material";
import useFoodChainPlayerContext from "../../context";
import { useState } from "react";
import Image from "next/image";
import { DoubleArrowRounded, PersonAddAlt1Rounded } from "@mui/icons-material";
import useValidateAttack from "../../hooks/useValidateAttack";
import useExecuteAttack from "../../hooks/useExecuteAttack";
import useCheckHasEaten from "../../hooks/useCheckHasEaten";

interface AttackPhaseProps {
  round: number;
  onNextPhase: () => void;
}

export default function AttackPhase({ round, onNextPhase }: AttackPhaseProps) {
  const [attackerPlayerId, setAttackerPlayerId] = useState<number | null>(null);
  const [defenderPlayerId, setDefenderPlayerId] = useState<number | null>(null);

  const [snackbarMessage, setSnackbarMessage] = useState<string | false>(false);
  const [starveMessage, setStarveMessage] = useState<string | false>(false);

  const { canAttack, errorMessage } = useValidateAttack({
    attackerId: attackerPlayerId,
    defenderId: defenderPlayerId,
    round: round,
  });

  const { executeAttack } = useExecuteAttack({
    attackerId: attackerPlayerId,
    defenderId: defenderPlayerId,
    round: round,
  });

  const { checkHasEaten } = useCheckHasEaten({
    round: round,
  });

  return (
    <>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={5000}
        onClose={() => {
          setSnackbarMessage(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={snackbarMessage}
      />
      <Snackbar
        open={!!starveMessage}
        autoHideDuration={5000}
        onClose={() => {
          setStarveMessage(false);
          onNextPhase();
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={starveMessage}
      />
      <Box width={1}>
        <Box display="flex" flexDirection="column" my={2}>
          <Typography color="#121212" fontSize="12px">
            {round} 라운드
          </Typography>
          <Typography color="#121212" fontSize="24px" fontWeight="bold">
            공격
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            height={180}
            mt={2}
          >
            <AttackerInput
              attackerPlayerId={attackerPlayerId}
              onSelect={(id) => {
                setAttackerPlayerId(id);
                setDefenderPlayerId(null);
              }}
            />
            <DoubleArrowRounded
              sx={{
                color: "#a80e0a",
              }}
            />
            <DefenderInput
              attackerPlayerId={attackerPlayerId}
              defenderPlayerId={defenderPlayerId}
              onSelect={setDefenderPlayerId}
            />
          </Box>

          <Button
            fullWidth
            disabled={!canAttack}
            variant="contained"
            onClick={() => {
              const { message } = executeAttack();
              setSnackbarMessage(message);
              setAttackerPlayerId(null);
              setDefenderPlayerId(null);
            }}
            sx={{
              borderRadius: "50px",
              mt: 6,
            }}
          >
            공격 시도
          </Button>
          {errorMessage && (
            <Typography color="#a80e0a" fontSize="12px" mt="2px">
              {errorMessage}
            </Typography>
          )}

          <Box position="fixed" bottom="12px" right="12px">
            <Button
              sx={{
                borderRadius: "50px",
              }}
              fullWidth
              onClick={() => {
                const { message } = checkHasEaten();

                setStarveMessage(message);
              }}
            >
              공격 시간 종료
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const AttackerInput = ({
  attackerPlayerId,
  onSelect,
}: {
  attackerPlayerId: number | null;
  onSelect: (playerId: number) => void;
}) => {
  const { playerStatus } = useFoodChainPlayerContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const attackerPlayer = playerStatus.find(
    (player) => player.id === attackerPlayerId
  );

  return (
    <>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Grid container p={2} spacing={2}>
          {playerStatus.map((player) => (
            <Grid item xs={4} key={player.id}>
              <PlayerPanel
                disabled={player.status !== "ALIVE" || player.role === "SNAKE"}
                onClick={() => {
                  onSelect(player.id);
                  setIsDrawerOpen(false);
                }}
              >
                <Typography fontSize="14px">{player.id}번</Typography>
                <Typography fontSize="18px" fontWeight={500}>
                  {player.name}
                </Typography>
                {player.status !== "ALIVE" && (
                  <Typography fontSize="12px" color="#a80e0a">
                    죽음
                  </Typography>
                )}
                {player.status === "ALIVE" && player.role === "SNAKE" && (
                  <Typography fontSize="12px" color="#a80e0a">
                    뱀은 공격 불가
                  </Typography>
                )}
              </PlayerPanel>
            </Grid>
          ))}
        </Grid>
      </Drawer>
      {attackerPlayerId ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={100}
          overflow={"hidden"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <Image
            width={80}
            height={80}
            style={{
              borderRadius: "24px",
            }}
            src={`/image/icon/food-chain/${attackerPlayer?.role}.svg`}
            alt={attackerPlayer?.role ?? "animal role"}
          />
          <Typography color="#121212" fontSize="14px" mt="2px">
            {attackerPlayerId}번
          </Typography>
          <Typography color="#121212" fontSize="18px">
            {attackerPlayer?.name}
          </Typography>
        </Box>
      ) : (
        <Box
          bgcolor={"#f0f0f0"}
          borderRadius="12px"
          width={100}
          height={100}
          onClick={() => setIsDrawerOpen(true)}
          alignItems="center"
          justifyContent="center"
          display="flex"
          gap={1}
          flexDirection="column"
          color="#121212"
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <Typography color="#121212" fontSize="16px">
            공격자 선택
          </Typography>
          <PersonAddAlt1Rounded />
        </Box>
      )}
    </>
  );
};

const DefenderInput = ({
  attackerPlayerId,
  defenderPlayerId,
  onSelect,
}: {
  attackerPlayerId: number | null;
  defenderPlayerId: number | null;
  onSelect: (playerId: number) => void;
}) => {
  const { playerStatus } = useFoodChainPlayerContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const attackerPlayer = playerStatus.find(
    (player) => player.id === attackerPlayerId
  );

  const defenderPlayer = playerStatus.find(
    (player) => player.id === defenderPlayerId
  );

  return (
    <>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Grid container p={2} spacing={2}>
          {playerStatus.map((player) => {
            const isPlayerDead = player.status !== "ALIVE";
            const isSameBiome =
              player.biomeHistory[player.biomeHistory.length - 1] ===
              attackerPlayer?.biomeHistory[
                attackerPlayer.biomeHistory.length - 1
              ];

            const isAttacker = player.id === attackerPlayerId;
            return (
              <Grid item xs={4} key={player.id}>
                <PlayerPanel
                  disabled={
                    player.status !== "ALIVE" || !isSameBiome || isAttacker
                  }
                  onClick={() => {
                    onSelect(player.id);
                    setIsDrawerOpen(false);
                  }}
                >
                  <Typography fontSize="14px">{player.id}번</Typography>
                  <Typography fontSize="18px" fontWeight={500}>
                    {player.name}
                  </Typography>
                  {isPlayerDead && (
                    <Typography fontSize="12px" color="#a80e0a">
                      죽음
                    </Typography>
                  )}
                  {!isPlayerDead && !isSameBiome && (
                    <Typography fontSize="12px" color="#a80e0a">
                      다른 지역에 있음
                    </Typography>
                  )}
                  {!isPlayerDead && isSameBiome && isAttacker && (
                    <Typography fontSize="12px" color="#a80e0a">
                      자기 자신 공격 불가
                    </Typography>
                  )}
                </PlayerPanel>
              </Grid>
            );
          })}
        </Grid>
      </Drawer>
      {defenderPlayerId ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={100}
          overflow={"hidden"}
          onClick={() => setIsDrawerOpen(true)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <Image
            width={80}
            height={80}
            style={{
              borderRadius: "24px",
            }}
            src={`/image/icon/food-chain/${defenderPlayer?.role}.svg`}
            alt={defenderPlayer?.role ?? "animal role"}
          />
          <Typography fontSize="14px" mt="2px">
            {defenderPlayerId}번
          </Typography>
          <Typography fontSize="18px">{defenderPlayer?.name}</Typography>
        </Box>
      ) : (
        <Box
          bgcolor={"#f0f0f0"}
          borderRadius="12px"
          width={100}
          height={100}
          onClick={() => setIsDrawerOpen(true)}
          alignItems="center"
          justifyContent="center"
          display="flex"
          gap={1}
          flexDirection="column"
          color="#121212"
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <Typography color="#121212" fontSize="16px">
            피식자 선택
          </Typography>
          <PersonAddAlt1Rounded />
        </Box>
      )}
    </>
  );
};

const PlayerPanel = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  if (disabled) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="#9E9E9E"
        height="65px"
        bgcolor="#f5f5f5"
        flexDirection="column"
        py={2}
        sx={{
          width: "100%",
          borderRadius: "12px",
          cursor: "not-allowed",
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={"#121212"}
      height="65px"
      bgcolor={"#f5f5f5"}
      position="relative"
      flexDirection="column"
      py={2}
      sx={{
        width: "100%",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#e0e0e0",
        },
        transition: "background-color 0.3s",
      }}
      borderRadius="12px"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
