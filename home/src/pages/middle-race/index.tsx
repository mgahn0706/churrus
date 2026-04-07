import { DeleteOutlineRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MIDDLE_RACE_CHARACTERS } from "@/features/middle-race/fixtures/characters";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const fieldSx = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.1)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.32)",
    opacity: 1,
  },
};

export default function MiddleRacePage() {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [openedAbilityByPlayer, setOpenedAbilityByPlayer] = useState<
    Record<string, boolean>
  >({});

  const usedCharacters = useMemo(
    () => new Set(Object.values(assignments).filter(Boolean)),
    [assignments]
  );
  const sortedCharacters = useMemo(
    () =>
      [...MIDDLE_RACE_CHARACTERS].sort(
        (left, right) => left.priority - right.priority
      ),
    []
  );
  const characterNames = sortedCharacters.map((character) => character.name);
  const getCharacter = (name: string) =>
    MIDDLE_RACE_CHARACTERS.find((character) => character.name === name);

  const addPlayer = () => {
    const trimmedName = playerName.trim();

    if (!trimmedName || players.includes(trimmedName)) {
      return;
    }

    setPlayers((previous) => [...previous, trimmedName]);
    setPlayerName("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPlayer();
  };

  const startRandomAssign = () => {
    const shuffled = [...characterNames].sort(() => Math.random() - 0.5);
    const nextAssignments = Object.fromEntries(
      players.map((player, index) => [player, shuffled[index]])
    );

    setAssignments((previous) => ({
      ...previous,
      ...nextAssignments,
    }));
  };

  const startCharacterPhase = () => {
    setAssignments((previous) => {
      const nextAssignments = { ...previous };

      players.forEach((player) => {
        if (!(player in nextAssignments)) {
          nextAssignments[player] = "";
        }
      });

      Object.keys(nextAssignments).forEach((player) => {
        if (!players.includes(player)) {
          delete nextAssignments[player];
        }
      });

      return nextAssignments;
    });
    setPhase(2);
  };

  return (
    <>
      <Head>
        <title>중간 달리기</title>
      </Head>
      <Box
        sx={{
          minHeight: "100dvh",
          bgcolor: "#05070b",
          color: "white",
          display: "flex",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 880,
            pt: { xs: 10, md: 14 },
            pb: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "flex-end" },
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              mb: 4,
            }}
          >
            <Box>
              <Typography
                fontSize={{ xs: 12, md: 13 }}
                color="rgba(255,255,255,0.45)"
                letterSpacing="0.12em"
                fontWeight={700}
              >
                PHASE {phase}
              </Typography>
              <Typography
                fontSize={{ xs: 36, md: 42 }}
                fontWeight={900}
                letterSpacing="-0.05em"
                lineHeight={1}
                mt={0.5}
              >
                중간 달리기
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(84px, 1fr))",
                gap: 1,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <StatCard label="PLAYERS" value={`${players.length}`} />
              <StatCard
                label="READY"
                value={`${players.filter((player) => assignments[player]).length}`}
              />
            </Box>
          </Box>

          {phase === 1 ? (
            <>
              <SectionPanel>
                <Typography color="rgba(255,255,255,0.56)" mb={3}>
                  플레이어 등록
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", sm: "1fr auto" }}
                  gap={1}
                >
                  <TextField
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                    placeholder="이름"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: {
                        bgcolor: "#05070b",
                        color: "white",
                        borderRadius: "14px",
                      },
                    }}
                    sx={fieldSx}
                  />
                  <Button
                    type="submit"
                    disabled={!playerName.trim()}
                    sx={buttonSx("white", "#05070b")}
                  >
                    추가
                  </Button>
                </Box>

                <Box
                  mt={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                  }}
                  gap={1}
                >
                  {players.map((name) => (
                    <Box key={name} sx={rowSx}>
                      <Typography fontWeight={600}>{name}</Typography>
                      <IconButton
                        onClick={() =>
                          setPlayers((previous) =>
                            previous.filter((player) => player !== name)
                          )
                        }
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        <DeleteOutlineRounded />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button
                    disabled={players.length < 2}
                    onClick={startCharacterPhase}
                    sx={buttonSx("white", "#05070b")}
                  >
                    다음
                  </Button>
                </Box>
              </SectionPanel>
            </>
          ) : (
            <>
              <SectionPanel>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                    mb: 3,
                  }}
                >
                  <Typography color="rgba(255,255,255,0.56)">
                    캐릭터 선택
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    <Button
                      onClick={startRandomAssign}
                      sx={buttonSx("#111827", "white")}
                    >
                      랜덤 배정
                    </Button>
                    <Button onClick={() => setPhase(1)} sx={outlineButtonSx}>
                      이전
                    </Button>
                    <Button
                      disabled={players.some((player) => !assignments[player])}
                      sx={buttonSx("white", "#05070b")}
                    >
                      다음
                    </Button>
                  </Box>
                </Box>

                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))",
                  }}
                  gap={1}
                >
                  {players.map((player) => {
                    const character = getCharacter(assignments[player]);

                    return (
                      <Box
                        key={player}
                        sx={{
                          ...rowSx,
                          alignItems: "stretch",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          gap: 1.4,
                          p: 0,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            px: 1.5,
                            pt: 1.5,
                            pb: 0,
                          }}
                        >
                          <Typography
                            fontSize={13}
                            fontWeight={800}
                            color="rgba(255,255,255,0.92)"
                          >
                            {player}
                          </Typography>
                        </Box>

                        <Box sx={{ px: 1.5, pb: 1.5 }}>
                          <Select
                            value={assignments[player] ?? ""}
                            displayEmpty
                            fullWidth
                            size="small"
                            onChange={(event) =>
                              setAssignments((previous) => ({
                                ...previous,
                                [player]: event.target.value,
                              }))
                            }
                            sx={{
                              bgcolor: "#05070b",
                              color: "white",
                              borderRadius: "12px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(255,255,255,0.1)",
                              },
                              "& .MuiSvgIcon-root": {
                                color: "rgba(255,255,255,0.72)",
                              },
                            }}
                            renderValue={(selected) => selected || "캐릭터 선택"}
                          >
                            {sortedCharacters.map((item) => {
                              const isSelected = assignments[player] === item.name;
                              const isUsed =
                                usedCharacters.has(item.name) && !isSelected;

                              return (
                                <MenuItem
                                  key={item.id}
                                  value={item.name}
                                  disabled={isUsed}
                                >
                                  {item.priority}. {item.label} ({item.name})
                                </MenuItem>
                              );
                            })}
                          </Select>

                          {character ? (
                            <Box
                              sx={{
                                mt: 1,
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.08)",
                                background: `linear-gradient(180deg, ${character.color}22, rgba(255,255,255,0.02))`,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "56px 1fr",
                                  alignItems: "center",
                                  gap: 0.9,
                                  p: 0.9,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    bgcolor: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    position: "relative",
                                  }}
                                >
                                  <Image
                                    src={character.imageSrc}
                                    alt={character.name}
                                    fill
                                    sizes="56px"
                                    style={{ objectFit: "cover" }}
                                  />
                                </Box>
                                <Box minWidth={0}>
                                  <Typography
                                    fontSize={10}
                                    color="rgba(255,255,255,0.5)"
                                    fontWeight={700}
                                    letterSpacing="0.12em"
                                  >
                                    SELECTED
                                  </Typography>
                                  <Typography fontSize={15} fontWeight={800} mt={0.2}>
                                    {character.label}
                                  </Typography>
                                  <Typography
                                    fontSize={11}
                                    color="rgba(255,255,255,0.66)"
                                    mt={0.1}
                                  >
                                    {character.name}
                                  </Typography>
                                  <Typography fontSize={10} color="rgba(255,255,255,0.46)" mt={0.25}>
                                    #{character.priority}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  px: 0.9,
                                  pb: 0.9,
                                  pt: 0,
                                }}
                              >
                                <Button
                                  onClick={() =>
                                    setOpenedAbilityByPlayer((previous) => ({
                                      ...previous,
                                      [player]: !previous[player],
                                    }))
                                  }
                                  sx={{
                                    px: 0,
                                    minWidth: "auto",
                                    justifyContent: "flex-start",
                                    color: "rgba(255,255,255,0.78)",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    lineHeight: 1,
                                  }}
                                >
                                  {openedAbilityByPlayer[player]
                                    ? "능력 숨기기"
                                    : "능력 보기"}
                                </Button>
                                {openedAbilityByPlayer[player] ? (
                                  <Typography
                                    fontSize={12}
                                    color="rgba(255,255,255,0.72)"
                                    lineHeight={1.55}
                                    mt={0.45}
                                  >
                                    {character.ability}
                                  </Typography>
                                ) : null}
                              </Box>
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </SectionPanel>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

const rowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  px: 1,
  py: 0.85,
  borderRadius: "14px",
  bgcolor: "#0d1117",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
};

const buttonSx = (bgcolor: string, color: string) => ({
  minWidth: 84,
  borderRadius: "12px",
  bgcolor,
  color,
  fontWeight: 700,
  px: 1.4,
  py: 0.75,
  "&:hover": {
    bgcolor,
    opacity: 0.92,
  },
  "&.Mui-disabled": {
    bgcolor: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.28)",
  },
});

const outlineButtonSx = {
  minWidth: 84,
  borderRadius: "12px",
  color: "white",
  border: "1px solid rgba(255,255,255,0.12)",
  bgcolor: "transparent",
  fontWeight: 700,
  px: 1.4,
  py: 0.75,
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.04)",
  },
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.28)",
    borderColor: "rgba(255,255,255,0.06)",
  },
};

const SectionPanel = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      borderRadius: "24px",
      border: "1px solid rgba(255,255,255,0.06)",
      background:
        "linear-gradient(180deg, rgba(14,17,23,0.96), rgba(10,13,18,0.96))",
      boxShadow: "0 24px 50px rgba(0,0,0,0.28)",
      p: { xs: 1, md: 1.25 },
    }}
  >
    {children}
  </Box>
);

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.06)",
      bgcolor: "#0d1117",
      px: 1,
      py: 0.85,
      minWidth: 0,
    }}
  >
    <Typography
      fontSize={10}
      fontWeight={700}
      letterSpacing="0.12em"
      color="rgba(255,255,255,0.44)"
    >
      {label}
    </Typography>
    <Typography fontSize={20} fontWeight={800} mt={0.2}>
      {value}
    </Typography>
  </Box>
);
