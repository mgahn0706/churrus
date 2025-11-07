import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import MapModal from "./MapModal";
import SuspectsInfoCard from "../InGame/SuspectsInfoCard";
import { ErrorOutline } from "@mui/icons-material";
import { scenarios } from "../../fixtures";

interface TextGameHeaderProps {
  scenarioId: string;
}

export default function TextGameHeader({ scenarioId }: TextGameHeaderProps) {
  const router = useRouter();
  const [modalState, setModalState] = useState<
    "MAP" | "SUSPECT" | "SUBMIT" | null
  >(null);

  const { victim, suspects, places, title } = scenarios.find(
    (s) => s.id === scenarioId
  )!;

  return (
    <>
      <MapModal
        scenarioId={scenarioId}
        isOpen={modalState === "MAP"}
        onClose={() => {
          setModalState(null);
        }}
        places={places}
      />
      <SuspectsInfoCard
        victim={victim}
        suspects={suspects}
        isOpen={modalState === "SUSPECT"}
        onClose={() => {
          setModalState(null);
        }}
      />
      <Dialog open={modalState === "SUBMIT"}>
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
            <ListItem>...외 다른 인물들의 숨은 이야기에 관한 질문 4개</ListItem>
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
                router.push(`/suspect/scenario/${scenarioId}/submit`);
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
            {title}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mr={5}>
          <Box
            mx={2}
            py={1}
            borderRadius="2px"
            sx={{
              cursor: "pointer",
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
          </Box>
          <Box
            mx={2}
            py={1}
            borderRadius="2px"
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgb(60, 60, 60)",
              },
            }}
            onClick={() => setModalState("SUSPECT")}
          >
            <Typography fontWeight="bolder" fontSize={16}>
              인물
            </Typography>
          </Box>
          <Box
            mx={2}
            py={1}
            borderRadius="2px"
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgb(60, 60, 60)",
              },
            }}
            onClick={() => setModalState("SUBMIT")}
          >
            <Typography fontWeight="bolder" fontSize={16}>
              최종 제출
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
