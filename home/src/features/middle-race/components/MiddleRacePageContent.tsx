import { DeleteOutlineRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MIDDLE_RACE_CHARACTERS } from "@/features/middle-race/fixtures/characters";
import {
  getCharacterByName,
  getPlayerTargetMeta,
} from "@/features/middle-race/lib/utils";
import { Direction, Effect, PendingAbility, RacePlayerState } from "@/features/middle-race/types";
import { useMiddleRaceGame } from "@/features/middle-race/hooks/useMiddleRaceGame";
import Image from "next/image";

type MiddleRaceGame = ReturnType<typeof useMiddleRaceGame>;

const fieldSx = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.1)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.32)",
    opacity: 1,
  },
};

export function MiddleRacePageContent({ game }: { game: MiddleRaceGame }) {
  const {
    phase,
    setPhase,
    playerName,
    setPlayerName,
    players,
    assignments,
    openedAbilityByPlayer,
    setOpenedAbilityByPlayer,
    racePlayers,
    silencedPlayerName,
    currentPlayer,
    currentCharacter,
    pendingEffect,
    effectTarget,
    setEffectTarget,
    effectKeepCard,
    setEffectKeepCard,
    effectDirection,
    setEffectDirection,
    lastAbilityTargetByPlayer,
    resultPlayers,
    turnOrder,
    submitModalOpen,
    setSubmitModalOpen,
    selectedCardByPlayer,
    setSelectedCardByPlayer,
    pendingAbility,
    abilityModalOpen,
    setAbilityModalOpen,
    pendingAbilityTarget,
    setPendingAbilityTarget,
    showPieceNames,
    setShowPieceNames,
    canManualReset,
    handleSubmit,
    removePlayer,
    startCharacterPhase,
    assignCharacter,
    startRacePhase,
    startRandomAssign,
    resetHandForPlayer,
    submitTurn,
    resolvePendingAbility,
    getEligibleTargets,
    resolveEffect,
    sortedCharacters,
  } = game;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#05070b",
        color: "white",
        display: "flex",
        justifyContent: "center",
        px: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1680,
          pt: 6,
          pb: 2,
        }}
      >
        <TopBar
          phase={phase}
          playerCount={players.length}
          readyCount={Object.values(assignments).filter(Boolean).length}
        />

        {phase === 1 ? (
          <SectionPanel>
            <Typography color="rgba(255,255,255,0.56)" mb={2}>
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
                    borderRadius: "12px",
                  },
                }}
                sx={fieldSx}
              />
              <Button type="submit" disabled={!playerName.trim()} sx={buttonSx("white", "#05070b")}>
                추가
              </Button>
            </Box>

            <PlayerGrid players={players} onRemove={removePlayer} />

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                disabled={players.length < 2}
                onClick={startCharacterPhase}
                sx={buttonSx("white", "#05070b")}
              >
                캐릭터 선택
              </Button>
            </Box>
          </SectionPanel>
        ) : null}

        {phase === 2 ? (
          <SectionPanel>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 1,
                flexDirection: { xs: "column", md: "row" },
                mb: 2,
              }}
            >
              <Typography color="rgba(255,255,255,0.56)">캐릭터 선택</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Button onClick={startRandomAssign} sx={buttonSx("#111827", "white")}>
                  랜덤
                </Button>
                <Button onClick={() => setPhase(1)} sx={outlineButtonSx}>
                  이전
                </Button>
                <Button
                  disabled={!players.every((player) => assignments[player])}
                  onClick={startRacePhase}
                  sx={buttonSx("white", "#05070b")}
                >
                  레이스 시작
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
              {players.map((player, index) => {
                const character = getCharacterByName(assignments[player] || null);
                const availableCharacters = sortedCharacters.filter((candidate) => {
                  const assignedPlayer = Object.entries(assignments).find(
                    ([name, assigned]) => name !== player && assigned === candidate.name
                  );

                  return !assignedPlayer || candidate.name === assignments[player];
                });

                return (
                  <Box key={player} sx={playerCardSx}>
                    <Typography fontSize={11} color="rgba(255,255,255,0.42)">
                      PLAYER {index + 1}
                    </Typography>
                    <Typography fontWeight={800}>{player}</Typography>
                    {character ? (
                      <SelectedCharacterCard
                        character={character}
                        isOpen={Boolean(openedAbilityByPlayer[player])}
                        onToggle={() =>
                          setOpenedAbilityByPlayer((previous) => ({
                            ...previous,
                            [player]: !previous[player],
                          }))
                        }
                      />
                    ) : null}
                    <Select
                      value={assignments[player] ?? ""}
                      displayEmpty
                      fullWidth
                      size="small"
                      onChange={(event) => assignCharacter(player, event.target.value)}
                      sx={selectSx}
                      renderValue={(value) => {
                        if (!value) {
                          return "캐릭터 선택";
                        }

                        const selectedCharacter = getCharacterByName(value);
                        if (!selectedCharacter) {
                          return value;
                        }

                        return (
                          <InlineMetaLabel
                            primary={selectedCharacter.label}
                            secondary={selectedCharacter.name}
                          />
                        );
                      }}
                    >
                      {availableCharacters.map((characterOption) => (
                        <MenuItem key={characterOption.id} value={characterOption.name}>
                          <InlineMetaLabel
                            primary={`${characterOption.priority}. ${characterOption.label}`}
                            secondary={characterOption.name}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                );
              })}
            </Box>
          </SectionPanel>
        ) : null}

        {phase === 3 ? (
          <SectionPanel>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", xl: "320px minmax(0, 1fr)" },
                gap: 1,
              }}
            >
              <Box sx={sidePanelSx}>
                {pendingEffect ? (
                  <EffectResolver
                    effect={pendingEffect}
                    racePlayers={racePlayers}
                    effectTarget={effectTarget}
                    effectKeepCard={effectKeepCard}
                    effectDirection={effectDirection}
                    lastAbilityTargetByPlayer={lastAbilityTargetByPlayer}
                    setEffectTarget={setEffectTarget}
                    setEffectKeepCard={setEffectKeepCard}
                    setEffectDirection={setEffectDirection}
                    resolveEffect={resolveEffect}
                  />
                ) : currentPlayer && currentCharacter ? (
                  <CurrentTurnCard
                    player={currentPlayer}
                    character={currentCharacter}
                    silencedPlayerName={silencedPlayerName}
                    canManualReset={canManualReset}
                    onReset={() => resetHandForPlayer(currentPlayer.name)}
                    onOpenModal={() => setSubmitModalOpen(true)}
                  />
                ) : null}

                {resultPlayers.length === players.length && resultPlayers.length > 0 ? (
                  <ResultPanel players={resultPlayers} />
                ) : null}
              </Box>

              <RaceBoard
                players={turnOrder.map((name) => racePlayers[name]).filter(Boolean)}
                assignments={assignments}
                showPieceNames={showPieceNames}
                onTogglePieceNames={() => setShowPieceNames((previous) => !previous)}
              />
            </Box>

            {currentPlayer && currentCharacter && !pendingEffect ? (
              <SubmitTurnModal
                open={submitModalOpen}
                player={currentPlayer}
                character={currentCharacter}
                selectedCard={selectedCardByPlayer[currentPlayer.name] ?? ""}
                silencedPlayerName={silencedPlayerName}
                onClose={() => setSubmitModalOpen(false)}
                onSelectCard={(value) =>
                  setSelectedCardByPlayer((previous) => ({
                    ...previous,
                    [currentPlayer.name]: value,
                  }))
                }
                onSubmitTurn={() => {
                  submitTurn();
                  setSubmitModalOpen(false);
                }}
              />
            ) : null}

            {pendingAbility ? (
              <AbilityModal
                open={abilityModalOpen}
                ability={pendingAbility}
                sourcePlayer={racePlayers[pendingAbility.source]}
                racePlayers={racePlayers}
                target={pendingAbilityTarget}
                availableTargets={getEligibleTargets(pendingAbility.source).map((player) => player.name)}
                onClose={() => setAbilityModalOpen(false)}
                onSelectTarget={setPendingAbilityTarget}
                onSkip={() => resolvePendingAbility(false)}
                onApply={() => resolvePendingAbility(true)}
              />
            ) : null}
          </SectionPanel>
        ) : null}
      </Box>
    </Box>
  );
}

const InlineMetaLabel = ({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) => (
  <Box display="flex" alignItems="center" gap={0.35}>
    <Box component="span">{primary}</Box>
    <Box component="span" color="rgba(255,255,255,0.42)">
      ({secondary})
    </Box>
  </Box>
);

function TopBar({
  phase,
  playerCount,
  readyCount,
}: {
  phase: number;
  playerCount: number;
  readyCount: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
        mb: 2,
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
          fontSize={{ xs: 32, md: 38 }}
          fontWeight={900}
          letterSpacing="-0.05em"
          lineHeight={1}
          mt={0.4}
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
        <StatCard label="PLAYERS" value={`${playerCount}`} />
        <StatCard label="READY" value={`${readyCount}`} />
      </Box>
    </Box>
  );
}

function PlayerGrid({
  players,
  onRemove,
}: {
  players: string[];
  onRemove: (name: string) => void;
}) {
  return (
    <Box
      mt={2}
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
          <IconButton onClick={() => onRemove(name)} sx={{ color: "rgba(255,255,255,0.7)" }}>
            <DeleteOutlineRounded />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

function SelectedCharacterCard({
  character,
  isOpen,
  onToggle,
}: {
  character: (typeof MIDDLE_RACE_CHARACTERS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
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
          <Image src={character.imageSrc} alt={character.name} fill sizes="56px" style={{ objectFit: "cover" }} />
        </Box>
        <Box minWidth={0}>
          <Typography fontSize={15} fontWeight={800}>
            {character.label}
          </Typography>
          <Typography fontSize={11} color="rgba(255,255,255,0.66)">
            {character.name} · #{character.priority}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 0.9, pb: 0.9, pt: 0 }}>
        <Button onClick={onToggle} sx={miniButtonSx}>
          {isOpen ? "능력 숨기기" : "능력 보기"}
        </Button>
        {isOpen ? (
          <Typography fontSize={12} color="rgba(255,255,255,0.72)" lineHeight={1.55} mt={0.45}>
            {character.ability}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

function CurrentTurnCard({
  player,
  character,
  silencedPlayerName,
  canManualReset,
  onReset,
  onOpenModal,
}: {
  player: RacePlayerState;
  character: (typeof MIDDLE_RACE_CHARACTERS)[number];
  silencedPlayerName: string | null;
  canManualReset: boolean;
  onReset: () => void;
  onOpenModal: () => void;
}) {
  return (
    <Box sx={sideBlockSx}>
      <Typography fontSize={11} color="rgba(255,255,255,0.42)">
        CURRENT TURN
      </Typography>
      <Typography fontSize={24} fontWeight={900} mt={0.35}>
        {player.name}
      </Typography>
      <Typography fontSize={13} color="rgba(255,255,255,0.66)" mt={0.3}>
        {character.label} ({character.name})
      </Typography>
      <Typography fontSize={12} color="rgba(255,255,255,0.46)" mt={0.35}>
        위치 {player.position} · 손패 {player.hand.join(", ")}
      </Typography>
      {silencedPlayerName === player.name ? (
        <Typography fontSize={12} color="#fda4af" mt={0.75}>
          능력 무효화 상태
        </Typography>
      ) : null}
      <Box mt={1.5} display="grid" gap={0.75}>
        <Button onClick={onOpenModal} sx={buttonSx("white", "#05070b")}>
          카드 제출
        </Button>
        {canManualReset ? (
          <Button onClick={onReset} sx={outlineButtonSx}>
            점프 리셋
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

function SubmitTurnModal({
  open,
  player,
  character,
  selectedCard,
  silencedPlayerName,
  onSelectCard,
  onSubmitTurn,
  onClose,
}: {
  open: boolean;
  player: RacePlayerState;
  character: (typeof MIDDLE_RACE_CHARACTERS)[number];
  selectedCard: number | "";
  silencedPlayerName: string | null;
  onSelectCard: (value: number | "") => void;
  onSubmitTurn: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: "#0d1117",
          color: "white",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "none",
        },
      }}
    >
      <DialogContent sx={{ p: 1.25 }}>
        <Typography fontSize={11} color="rgba(255,255,255,0.42)">
          CARD SUBMIT
        </Typography>
        <Typography fontSize={24} fontWeight={900} mt={0.35}>
          {player.name}
        </Typography>
        <Typography fontSize={13} color="rgba(255,255,255,0.66)" mt={0.3}>
          {character.label} ({character.name})
        </Typography>
        <Typography fontSize={12} color="rgba(255,255,255,0.46)" mt={0.35}>
          위치 {player.position} · 손패 {player.hand.join(", ")}
        </Typography>
        {silencedPlayerName === player.name ? (
          <Typography fontSize={12} color="#fda4af" mt={0.75}>
            능력 무효화 상태
          </Typography>
        ) : null}

        <Box mt={1.5} display="grid" gap={0.9}>
          <Typography fontSize={11} color="rgba(255,255,255,0.42)">
            남은 카드
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 0.75,
            }}
          >
            {player.hand.map((card, index) => {
              const isSelected = selectedCard === card;

              return (
                <Button
                  key={`${card}-${index}`}
                  onClick={() => onSelectCard(card)}
                  sx={{
                    minWidth: 0,
                    borderRadius: "14px",
                    py: 1.15,
                    px: 0,
                    fontSize: 22,
                    fontWeight: 900,
                    color: isSelected ? "#05070b" : "white",
                    bgcolor: isSelected ? "white" : "#05070b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: isSelected ? "white" : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {card}
                </Button>
              );
            })}
          </Box>
        </Box>

        <Box mt={1.5}>
          <Button
            onClick={onSubmitTurn}
            disabled={selectedCard === "" || selectedCard == null}
            sx={buttonSx("white", "#05070b")}
          >
            카드 제출
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function AbilityModal({
  open,
  ability,
  sourcePlayer,
  racePlayers,
  target,
  availableTargets,
  onClose,
  onSelectTarget,
  onSkip,
  onApply,
}: {
  open: boolean;
  ability: PendingAbility;
  sourcePlayer: RacePlayerState | undefined;
  racePlayers: Record<string, RacePlayerState>;
  target: string;
  availableTargets: string[];
  onClose: () => void;
  onSelectTarget: (value: string) => void;
  onSkip: () => void;
  onApply: () => void;
}) {
  const labels = {
    gravity: "그래비티",
    silence: "사일런스",
    union: "유니온",
    with: "위드",
  } as const;
  const descriptions = {
    gravity: "선택한 카드를 그대로 제출하거나, 그 카드를 버리고 그래비티 능력을 사용합니다.",
    silence: "카드를 제출하기 전에 대상 1명을 지목해 능력을 무효화할 수 있습니다.",
    union: "현재 자신의 1칸 앞에 있는 플레이어들을 모두 자신의 칸으로 끌어들일 수 있습니다.",
    with: "마지막 카드라면 대상을 지목해 함께 이동할 수 있습니다.",
  } as const;
  const skipLabel = ability.type === "gravity" ? "카드 제출" : "사용 안 함";
  const applyLabel = ability.type === "gravity" ? "버리고 능력 사용" : "사용";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: "#0d1117",
          color: "white",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "none",
        },
      }}
    >
      <DialogContent sx={{ p: 1.25 }}>
        <Typography fontSize={11} color="rgba(255,255,255,0.42)">
          ABILITY
        </Typography>
        <Typography fontSize={24} fontWeight={900} mt={0.35}>
          {labels[ability.type]}
        </Typography>
        <Typography fontSize={12} color="rgba(255,255,255,0.58)" mt={0.35}>
          {sourcePlayer?.name}
        </Typography>
        <Typography fontSize={12} color="rgba(255,255,255,0.66)" mt={0.6} lineHeight={1.5}>
          {descriptions[ability.type]}
        </Typography>

        {ability.type === "union" ? (
          <Box mt={1.5} display="grid" gap={0.55}>
            {ability.targets.map((name) => (
              <Typography key={name} fontSize={12} color="rgba(255,255,255,0.74)">
                {name}
              </Typography>
            ))}
          </Box>
        ) : (
          <Box mt={1.5} display="grid" gap={0.9}>
            <Select
              size="small"
              value={target}
              displayEmpty
              onChange={(event) => onSelectTarget(event.target.value)}
              sx={selectSx}
              renderValue={(value) => {
                if (!value) {
                  return "대상";
                }

                const meta = getPlayerTargetMeta(racePlayers, value);
                return <InlineMetaLabel primary={meta.name} secondary={meta.characterLabel} />;
              }}
            >
              {availableTargets.map((playerName) => {
                const meta = getPlayerTargetMeta(racePlayers, playerName);

                return (
                  <MenuItem key={playerName} value={playerName}>
                    <InlineMetaLabel primary={meta.name} secondary={meta.characterLabel} />
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        )}

        <Box mt={1.5} display="grid" gridTemplateColumns="1fr 1fr" gap={0.75}>
          <Button onClick={onSkip} sx={outlineButtonSx}>
            {skipLabel}
          </Button>
          <Button onClick={onApply} sx={buttonSx("white", "#05070b")}>
            {applyLabel}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function EffectResolver({
  effect,
  racePlayers,
  effectTarget,
  effectKeepCard,
  effectDirection,
  lastAbilityTargetByPlayer,
  setEffectTarget,
  setEffectKeepCard,
  setEffectDirection,
  resolveEffect,
}: {
  effect: Effect;
  racePlayers: Record<string, RacePlayerState>;
  effectTarget: string;
  effectKeepCard: number | "";
  effectDirection: Direction;
  lastAbilityTargetByPlayer: Record<string, string>;
  setEffectTarget: (value: string) => void;
  setEffectKeepCard: (value: number | "") => void;
  setEffectDirection: (value: Direction) => void;
  resolveEffect: () => void;
}) {
  const targetOptions = Object.values(racePlayers)
    .filter(
      (player) =>
        player.name !== effect.source &&
        player.finishedRank == null &&
        player.name !== lastAbilityTargetByPlayer[effect.source]
    )
    .map((player) => player.name);

  return (
    <Box sx={sideBlockSx}>
      <Typography fontSize={11} color="rgba(255,255,255,0.42)">
        EFFECT
      </Typography>
      <Typography fontSize={22} fontWeight={900} mt={0.35}>
        {effect.type.toUpperCase()}
      </Typography>
      <Typography fontSize={12} color="rgba(255,255,255,0.6)" mt={0.35}>
        {effect.source}
      </Typography>

      <Box mt={1.5} display="grid" gap={0.9}>
        {effect.type === "one" ? (
          <Select
            size="small"
            value={effectDirection}
            onChange={(event) => setEffectDirection(event.target.value as Direction)}
            sx={selectSx}
          >
            <MenuItem value={1}>앞 1칸</MenuItem>
            <MenuItem value={-1}>뒤 1칸</MenuItem>
          </Select>
        ) : effect.type === "delayedMove" ? (
          <Box
            sx={{
              px: 1,
              py: 0.9,
              borderRadius: "12px",
              bgcolor: "#05070b",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography fontSize={12} color="rgba(255,255,255,0.7)">
              {effect.source} 이동 처리
            </Typography>
          </Box>
        ) : (
          <Select
            size="small"
            value={effectTarget}
            displayEmpty
            onChange={(event) => setEffectTarget(event.target.value)}
            sx={selectSx}
            renderValue={(value) => {
              if (!value) {
                return "대상";
              }

              const meta = getPlayerTargetMeta(racePlayers, value);
              return <InlineMetaLabel primary={meta.name} secondary={meta.characterLabel} />;
            }}
          >
            {targetOptions.map((playerName) => {
              const meta = getPlayerTargetMeta(racePlayers, playerName);

              return (
                <MenuItem key={playerName} value={playerName}>
                  <InlineMetaLabel primary={meta.name} secondary={meta.characterLabel} />
                </MenuItem>
              );
            })}
          </Select>
        )}

        {effect.type === "delete" && effectTarget ? (
          <Select
            size="small"
            value={effectKeepCard}
            displayEmpty
            onChange={(event) => setEffectKeepCard(event.target.value as number | "")}
            sx={selectSx}
            renderValue={(value) => {
              const displayValue = String(value ?? "");
              return displayValue === "" ? "남길 카드" : displayValue;
            }}
          >
            {(racePlayers[effectTarget]?.hand ?? []).map((card, index) => (
              <MenuItem key={`${card}-${index}`} value={card}>
                {card}
              </MenuItem>
            ))}
          </Select>
        ) : null}
      </Box>

      <Box mt={1.5}>
        <Button onClick={resolveEffect} sx={buttonSx("white", "#05070b")}>
          적용
        </Button>
      </Box>
    </Box>
  );
}

function ResultPanel({ players }: { players: RacePlayerState[] }) {
  return (
    <Box sx={{ ...sideBlockSx, mt: 1 }}>
      <Typography fontSize={11} color="rgba(255,255,255,0.42)">
        RESULT
      </Typography>
      <Box mt={1} display="grid" gap={0.6}>
        {players.map((player) => (
          <Box key={player.name} sx={rowSx}>
            <Box>
              <Typography fontWeight={700}>
                {player.finishedRank}. {player.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function RaceBoard({
  players,
  assignments,
  showPieceNames,
  onTogglePieceNames,
}: {
  players: RacePlayerState[];
  assignments: Record<string, string>;
  showPieceNames: boolean;
  onTogglePieceNames: () => void;
}) {
  return (
    <Box sx={boardPanelSx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          px: 0.75,
          py: 0.55,
          bgcolor: "#0d1117",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Button onClick={onTogglePieceNames} sx={outlineButtonSx}>
          {showPieceNames ? "이름 숨기기" : "이름 보기"}
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#164735",
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(31, minmax(0, 1fr))",
            gap: 0,
          }}
        >
          <TrackStep
            label="START"
            pieces={players
              .filter((player) => player.position === 0)
              .map((player) => ({
                player: player.name,
                imageSrc: getCharacterByName(assignments[player.name])?.imageSrc ?? "",
              }))}
            isStart
            showPieceNames={showPieceNames}
          />
          {Array.from({ length: 30 }, (_, index) => {
            const step = index + 1;

            return (
              <TrackStep
                key={step}
                label={`${step}`}
                pieces={players
                  .filter((player) => player.position === step)
                  .map((player) => ({
                    player: player.name,
                    imageSrc: getCharacterByName(assignments[player.name])?.imageSrc ?? "",
                  }))}
                isGoal={step === 30}
                showPieceNames={showPieceNames}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
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

const playerCardSx = {
  ...rowSx,
  alignItems: "stretch",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: 0.8,
  p: 1,
};

const sideBlockSx = {
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.06)",
  bgcolor: "#0d1117",
  p: 1,
};

const sidePanelSx = {
  display: "grid",
  alignContent: "start",
  gap: 1,
};

const boardPanelSx = {
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.06)",
  background:
    "linear-gradient(180deg, rgba(14,17,23,0.96), rgba(10,13,18,0.96))",
  boxShadow: "0 24px 50px rgba(0,0,0,0.28)",
  p: 0.5,
  overflow: "hidden",
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

const miniButtonSx = {
  px: 0,
  minWidth: "auto",
  justifyContent: "flex-start",
  color: "rgba(255,255,255,0.78)",
  fontSize: 11,
  fontWeight: 700,
  lineHeight: 1,
};

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
};

const selectSx = {
  bgcolor: "#05070b",
  color: "white",
  borderRadius: "12px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.1)",
  },
  "& .MuiSvgIcon-root": {
    color: "rgba(255,255,255,0.72)",
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
      p: 1,
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

const TrackStep = ({
  label,
  pieces,
  isStart = false,
  isGoal = false,
  showPieceNames = false,
}: {
  label: string;
  pieces: { player: string; imageSrc: string }[];
  isStart?: boolean;
  isGoal?: boolean;
  showPieceNames?: boolean;
}) => (
  <Box
    sx={{
      width: "100%",
      minHeight: 560,
      backgroundColor: isGoal
        ? "rgba(255,255,255,0.18)"
        : isStart
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.08)",
      borderLeft: isStart ? "2px solid rgba(255,255,255,0.92)" : "none",
      borderRight: "2px solid rgba(255,255,255,0.92)",
      borderTop: "2px solid rgba(255,255,255,0.92)",
      borderBottom: "2px solid rgba(255,255,255,0.92)",
      px: 1,
      py: 1,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      minWidth: 0,
      overflow: "visible",
    }}
  >
    <Typography
      fontSize={isStart ? 9 : 12}
      fontWeight={800}
      color="rgba(255,255,255,0.92)"
      textAlign="center"
      lineHeight={1.05}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.45,
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        pt: 1.9,
        px: 0.15,
        overflow: "visible",
      }}
    >
      {pieces.map((piece) => (
        <Box
          key={piece.player}
          title={piece.player}
          sx={{
            width: 56,
            minWidth: 56,
            height: 56,
            position: "relative",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover .piece-name-badge": {
              opacity: 1,
              transform: "translateX(-50%) translateY(0)",
            },
          }}
        >
          <Box
            sx={{
              width: 56,
              aspectRatio: "1 / 1",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              bgcolor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.34)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
            }}
          >
            {piece.imageSrc ? (
              <Image
                src={piece.imageSrc}
                alt={piece.player}
                fill
                sizes="56px"
                style={{ objectFit: "cover" }}
              />
            ) : null}
          </Box>
          <Box
            className="piece-name-badge"
            sx={{
              position: "absolute",
              left: "50%",
              top: -8,
              transform: showPieceNames
                ? "translateX(-50%) translateY(0)"
                : "translateX(-50%) translateY(3px)",
              opacity: showPieceNames ? 1 : 0,
              transition: "opacity 120ms ease, transform 120ms ease",
              px: 0.55,
              py: 0.24,
              borderRadius: "999px",
              bgcolor: "rgba(5,7,11,0.88)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "white",
              fontSize: 9,
              fontWeight: 700,
              lineHeight: 1.25,
              whiteSpace: "nowrap",
              zIndex: 1,
              maxWidth: 52,
              overflow: "hidden",
              textOverflow: "ellipsis",
              pointerEvents: "none",
              boxShadow: "0 8px 18px rgba(0,0,0,0.24)",
            }}
          >
            {piece.player}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);
