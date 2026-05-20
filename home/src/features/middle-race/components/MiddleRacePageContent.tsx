import HomeButton from "@/components/HomeButton";
import { MIDDLE_RACE_COMMON_RULES } from "@/features/middle-race/fixtures/characters";
import { getCharacterById } from "@/features/middle-race/lib/utils";
import { MiddleRaceGame, RacePlayerState } from "@/features/middle-race/types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const phaseLabelMap = {
  1: "캐릭터 선택",
  2: "레이스 진행",
  3: "결과 확인",
} as const;

const renderTrack = (
  players: RacePlayerState[],
  finishLine: number,
  selectedPlayerName: string
) =>
  Array.from({ length: finishLine + 1 }, (_, position) => {
    const playersAtPosition = players.filter((player) => player.position === position);

    return (
      <Box
        key={position}
        sx={{
          minWidth: 68,
          borderRadius: 3,
          border: position === finishLine ? "2px solid #f59e0b" : "1px solid #d1d5db",
          backgroundColor: position === finishLine ? "#fff7ed" : "#ffffff",
          px: 1,
          py: 1.25,
        }}
      >
        <Typography fontSize={12} fontWeight={700} color="#6b7280">
          {position === 0 ? "START" : position === finishLine ? "FINISH" : position}
        </Typography>
        <Stack mt={1} spacing={0.5}>
          {playersAtPosition.length === 0 && (
            <Typography fontSize={12} color="#9ca3af">
              비어 있음
            </Typography>
          )}
          {playersAtPosition.map((player) => {
            const character = getCharacterById(player.characterId);
            return (
              <Chip
                key={player.name}
                label={player.name}
                size="small"
                sx={{
                  justifyContent: "flex-start",
                  backgroundColor:
                    player.name === selectedPlayerName
                      ? character?.color ?? "#111827"
                      : "#e5e7eb",
                  color: player.name === selectedPlayerName ? "#ffffff" : "#111827",
                  fontWeight: 700,
                }}
              />
            );
          })}
        </Stack>
      </Box>
    );
  });

export function MiddleRacePageContent({ game }: { game: MiddleRaceGame }) {
  const selectedPlayer =
    game.players.find((player) => player.name === game.selectedPlayerName) ?? game.players[0];
  const selectedCharacter = getCharacterById(selectedPlayer?.characterId ?? null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f4efe6 0%, #f9fafb 42%, #e0f2fe 100%)",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <HomeButton />
          <Chip
            label={`더미 레이아웃 · Phase ${game.phase}`}
            sx={{
              backgroundColor: "#111827",
              color: "#ffffff",
              fontWeight: 700,
            }}
          />
        </Stack>

        <Card sx={{ borderRadius: 6, overflow: "hidden", boxShadow: "none" }}>
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(17,24,39,0.96) 0%, rgba(31,41,55,0.92) 55%, rgba(15,118,110,0.85) 100%)",
              color: "#ffffff",
              px: { xs: 2.5, md: 4 },
              py: { xs: 3, md: 4 },
            }}
          >
            <Typography fontSize={{ xs: 28, md: 40 }} fontWeight={800}>
              중간 달리기
            </Typography>
            <Typography mt={1} maxWidth={780} color="rgba(255,255,255,0.78)">
              실제 게임 로직 대신, 턴 정보와 트랙 배치를 한 화면에서 점검할 수 있는
              임시 레이아웃입니다.
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} mt={3}>
              <Chip
                label={`현재 턴 ${game.currentPlayerName}`}
                sx={{ backgroundColor: "#ffffff", color: "#111827", fontWeight: 700 }}
              />
              <Chip
                label={`선택된 말 ${selectedPlayer?.name ?? "-"}`}
                sx={{ backgroundColor: "rgba(255,255,255,0.14)", color: "#ffffff" }}
              />
              <Chip
                label={`사일런스 ${game.silencedPlayerName ?? "없음"}`}
                sx={{ backgroundColor: "rgba(255,255,255,0.14)", color: "#ffffff" }}
              />
            </Stack>
          </Box>
        </Card>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", xl: "340px minmax(0, 1fr)" },
            gap: 3,
          }}
        >
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 5, boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontSize={20} fontWeight={800}>
                  컨트롤 패널
                </Typography>
                <Typography mt={0.75} fontSize={14} color="#6b7280">
                  실제 액션 연결 전 임시 상호작용입니다.
                </Typography>
                <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
                  <Button variant="contained" onClick={game.cyclePhase}>
                    Phase 변경
                  </Button>
                  <Button variant="outlined" onClick={game.clearSelectedCard}>
                    카드 선택 해제
                  </Button>
                </Stack>
                <Divider sx={{ my: 2.5 }} />
                <Stack spacing={1}>
                  <Typography fontSize={14} color="#6b7280">
                    현재 단계
                  </Typography>
                  <Typography fontSize={18} fontWeight={700}>
                    {phaseLabelMap[game.phase]}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
                  {game.players.map((player) => (
                    <Chip
                      key={player.name}
                      clickable
                      label={player.name}
                      onClick={() => {
                        game.selectPlayer(player.name);
                      }}
                      sx={{
                        backgroundColor:
                          player.name === game.selectedPlayerName ? "#111827" : "#f3f4f6",
                        color:
                          player.name === game.selectedPlayerName ? "#ffffff" : "#111827",
                        fontWeight: 700,
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 5, boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontSize={20} fontWeight={800}>
                  선택된 캐릭터
                </Typography>
                {selectedPlayer && selectedCharacter ? (
                  <Stack spacing={2.5} mt={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedCharacter.imageSrc}
                        alt={selectedCharacter.label}
                        sx={{ width: 72, height: 72, bgcolor: selectedCharacter.color }}
                      />
                      <Box>
                        <Typography fontSize={22} fontWeight={800}>
                          {selectedCharacter.label}
                        </Typography>
                        <Typography fontSize={14} color="#6b7280">
                          {selectedPlayer.name} · 드래프트 {selectedPlayer.draftOrder}순위
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography fontSize={14} lineHeight={1.7} color="#374151">
                      {selectedCharacter.ability}
                    </Typography>
                    <Divider />
                    <Box>
                      <Typography fontSize={14} color="#6b7280">
                        손패
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
                        {selectedPlayer.hand.map((card, index) => (
                          <Button
                            key={`${selectedPlayer.name}-hand-${card}-${index}`}
                            variant={game.selectedCard === card ? "contained" : "outlined"}
                            onClick={() => {
                              game.selectCard(card);
                            }}
                          >
                            {card >= 0 ? `+${card}` : card}
                          </Button>
                        ))}
                      </Stack>
                    </Box>
                    <Box>
                      <Typography fontSize={14} color="#6b7280">
                        버린 카드
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
                        {selectedPlayer.discard.map((card, index) => (
                          <Chip
                            key={`${selectedPlayer.name}-discard-${card}-${index}`}
                            label={card >= 0 ? `+${card}` : card}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                ) : (
                  <Typography mt={2} color="#6b7280">
                    선택된 플레이어가 없습니다.
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 5, boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontSize={20} fontWeight={800}>
                  공통 규칙 메모
                </Typography>
                <Stack spacing={1.25} mt={2}>
                  {MIDDLE_RACE_COMMON_RULES.map((rule) => (
                    <Typography key={rule} fontSize={14} color="#374151" lineHeight={1.7}>
                      • {rule}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Stack spacing={3}>
            <Card sx={{ borderRadius: 5, boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                  spacing={1}
                >
                  <Box>
                    <Typography fontSize={20} fontWeight={800}>
                      트랙 보드
                    </Typography>
                    <Typography fontSize={14} color="#6b7280" mt={0.75}>
                      스타트부터 {game.finishLine}칸까지 더미 말 배치를 표시합니다.
                    </Typography>
                  </Box>
                  <Chip label={`Lap ${game.lap}`} variant="outlined" />
                </Stack>
                <Box
                  sx={{
                    mt: 2.5,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(68px, 1fr))",
                    gap: 1,
                  }}
                >
                  {renderTrack(game.players, game.finishLine, game.selectedPlayerName)}
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 5, boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontSize={20} fontWeight={800}>
                  플레이어 개요
                </Typography>
                <Stack spacing={1.5} mt={2}>
                  {game.players.map((player) => {
                    const character = getCharacterById(player.characterId);
                    return (
                      <Box
                        key={player.name}
                        sx={{
                          borderRadius: 4,
                          border: "1px solid #e5e7eb",
                          backgroundColor:
                            player.name === game.currentPlayerName ? "#f8fafc" : "#ffffff",
                          p: 2,
                        }}
                      >
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Box>
                            <Typography fontSize={18} fontWeight={800}>
                              {player.name}
                            </Typography>
                            <Typography fontSize={14} color="#6b7280">
                              {character?.label ?? "미지정"} · 위치 {player.position}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip label={`손패 ${player.hand.length}`} size="small" />
                            <Chip label={`버림 ${player.discard.length}`} size="small" />
                            {player.name === game.currentPlayerName && (
                              <Chip label="현재 턴" size="small" color="primary" />
                            )}
                            {player.name === game.silencedPlayerName && (
                              <Chip label="사일런스 대상" size="small" color="warning" />
                            )}
                          </Stack>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
