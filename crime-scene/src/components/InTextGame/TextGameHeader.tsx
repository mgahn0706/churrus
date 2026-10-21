import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MapModal from "./MapModal";
import SuspectsInfoCard from "../InGame/SuspectsInfoCard";
import SuspectVoteModal from "../InGame/SuspectVoteModal";
import { ErrorOutline } from "@mui/icons-material";
import type { PhysicalClue, TextScenarioType } from "@/types";
import PhysicalClueDialog from "./PhysicalClueDialog";

interface TextGameHeaderProps {
  scenario: TextScenarioType;
  acquiredPhysicalClues: PhysicalClue[];
}

export default function TextGameHeader({
  scenario,
  acquiredPhysicalClues,
}: TextGameHeaderProps) {
  const router = useRouter();
  const [modalState, setModalState] = useState<
    "MAP" | "PHYSICAL_CLUES" | "SUSPECT" | "SUBMIT" | "VOTE" | null
  >(null);
  const [selectedPhysicalClue, setSelectedPhysicalClue] =
    useState<PhysicalClue | null>(null);

  const { victims, suspects, places, title } = scenario;
  const shouldShowMap = places.length > 0;
  const physicalClues = scenario.clues.reduce<PhysicalClue[]>((clues, clue) => {
    if (clue.physicalClueId !== undefined) {
      clues.push({
        id: clue.physicalClueId,
        images: clue.images,
        text: clue.text,
      });
    }

    return clues;
  }, []);
  const acquiredPhysicalCluesById = new Map(
    acquiredPhysicalClues.map((clue) => [clue.id, clue])
  );

  return (
    <>
      {shouldShowMap && (
        <MapModal
          scenarioId={scenario.id}
          isOpen={modalState === "MAP"}
          onClose={() => {
            setModalState(null);
          }}
          places={places}
        />
      )}
      <Dialog
        open={modalState === "PHYSICAL_CLUES"}
        onClose={() => {
          setModalState(null);
          setSelectedPhysicalClue(null);
        }}
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle>
          획득한 실물단서
          <IconButton
            aria-label="닫기"
            onClick={() => setModalState(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {physicalClues.length > 0 ? (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              }}
              gap={1}
              width="100%"
            >
              {physicalClues.map((clue) => {
                const acquiredClue = acquiredPhysicalCluesById.get(clue.id);

                return acquiredClue ? (
                  <ButtonBase
                    key={clue.id}
                    aria-label={`${clue.id}번 실물단서 크게 보기`}
                    onClick={() => setSelectedPhysicalClue(acquiredClue)}
                    sx={{
                      minWidth: 0,
                      width: "100%",
                      p: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "110px minmax(0, 1fr)",
                      },
                      gap: 1,
                      alignItems: "center",
                      textAlign: "left",
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      "&:hover img": {
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: 0.5,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={acquiredClue.images[0]}
                        alt={`${clue.id}번 실물단서`}
                        sx={{
                          display: "block",
                          width: "100%",
                          height: 110,
                          objectFit: "contain",
                          bgcolor: "rgba(0, 0, 0, 0.04)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </Box>
                    <Box minWidth={0}>
                      <Typography fontWeight="bold" fontSize="0.875rem" mb={0.5}>
                        {clue.id}번 실물단서
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="0.75rem"
                        lineHeight={1.4}
                      >
                        {acquiredClue.text}
                      </Typography>
                    </Box>
                  </ButtonBase>
                ) : (
                  <Box
                    key={clue.id}
                    minWidth={0}
                    p={1}
                    border="1px solid"
                    borderColor="divider"
                    borderRadius={1}
                    display="grid"
                    gridTemplateColumns={{
                      xs: "1fr",
                      sm: "110px minmax(0, 1fr)",
                    }}
                    gap={1}
                    alignItems="center"
                  >
                    <Skeleton variant="rectangular" height={110} animation={false} />
                    <Box minWidth={0}>
                      <Typography
                        color="text.secondary"
                        fontWeight="bold"
                        fontSize="0.875rem"
                        mb={0.5}
                      >
                        미획득 실물단서
                      </Typography>
                      <Skeleton variant="text" width="100%" animation={false} />
                      <Skeleton variant="text" width="82%" animation={false} />
                      <Skeleton variant="text" width="64%" animation={false} />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography>이 시나리오에는 실물단서가 없습니다.</Typography>
          )}
        </DialogContent>
      </Dialog>
      <PhysicalClueDialog
        clue={selectedPhysicalClue}
        onClose={() => setSelectedPhysicalClue(null)}
      />
      <SuspectsInfoCard
        victims={victims}
        suspects={suspects}
        isOpen={modalState === "SUSPECT"}
        onClose={() => {
          setModalState(null);
        }}
      />
      <SuspectVoteModal
        isOpen={modalState === "VOTE"}
        suspects={suspects}
        scenarioId={scenario.id}
        scenarioTitle={title}
        episodeNumber={scenario.episodeNumber}
        onClose={() => {
          setModalState(null);
        }}
      />
      <Dialog
        open={modalState === "SUBMIT"}
        sx={{
          zIndex: 1000,
        }}
      >
        <DialogTitle alignItems="center" variant="h5">
          <ErrorOutline
            sx={{
              mr: 1,
            }}
          />
          최종 제출 안내
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            최종 제출 단계에서는 다시 조사를 진행할 수 없습니다. <br />
            충분한 단서를 탐색한 후 진행해주세요.
          </DialogContentText>
          <DialogContentText>
            최종 제출 단계에서는 아래의 질문들에 대한 답변을 제출해야합니다.
          </DialogContentText>
          <List>
            <ListItem>범인은 누구인가요?</ListItem>
            <ListItem>살해 방법은 무엇인가요?</ListItem>
            <ListItem>살해 동기는 무엇인가요?</ListItem>
            <ListItem>...외 다른 인물들의 숨은 이야기에 관한 추가 질문들</ListItem>
          </List>
          <DialogActions>
            <Button
              onClick={() => {
                setModalState(null);
              }}
            >
              닫기
            </Button>
            <Button
              onClick={() => {
                router.push(`/scenarios/scenario/${scenario.id}/submit`);
              }}
            >
              최종 제출
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Box
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        position="fixed"
        top={0}
        left={0}
        width="100%"
        px="24px"
        height="60px"
        zIndex={100}
        bgcolor={"rgba(0, 0, 0, 0)"}
        sx={{
          backdropFilter: "blur(60px)",
        }}
      >
        <Box>
          <Typography fontWeight="bolder" fontSize={16}>
            {title} {scenario.emoji}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mr={5}>
          {shouldShowMap && (
            <ButtonBase
              sx={{
                mx: 1,
                px: 2,
                py: 1,
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgb(60, 60, 60)",
                },
              }}
              onClick={() => {
                setModalState("MAP");
              }}
            >
              <Typography fontWeight="bolder" fontSize={16}>
                지도
              </Typography>
            </ButtonBase>
          )}
          {physicalClues.length > 0 && (
            <ButtonBase
              sx={{
                mx: 1,
                px: 2,
                py: 1,
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgb(60, 60, 60)",
                },
              }}
              onClick={() => setModalState("PHYSICAL_CLUES")}
            >
              <Typography fontWeight="bolder" fontSize={16}>
                실물단서
              </Typography>
            </ButtonBase>
          )}
          <ButtonBase
            sx={{
              mx: 1,
              px: 2,
              py: 1,
              borderRadius: "2px",
              "&:hover": {
                backgroundColor: "rgb(60, 60, 60)",
              },
            }}
            onClick={() => setModalState("SUSPECT")}
          >
            <Typography fontWeight="bolder" fontSize={16}>
              인물
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              mx: 1,
              px: 2,
              py: 1,
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              "&:hover": {
                backgroundColor: "rgb(60, 60, 60)",
              },
            }}
            onClick={() => setModalState("VOTE")}
          >
            <HowToVoteIcon sx={{ fontSize: 18 }} />
            <Typography fontWeight="bolder" fontSize={16}>
              투표
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              mx: 1,
              px: 2,
              py: 1,
              borderRadius: "2px",
              "&:hover": {
                backgroundColor: "rgb(60, 60, 60)",
              },
            }}
            onClick={() => setModalState("SUBMIT")}
          >
            <Typography fontWeight="bolder" fontSize={16}>
              최종 제출
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
    </>
  );
}
