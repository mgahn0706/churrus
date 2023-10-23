import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import MapModal from "./MapModal";
import SuspectsInfoCard from "../InGame/SuspectsInfoCard";
import { schoolSuspects, schoolVictim } from "../../fixtures/school/suspects";
import MemoModal from "../InGame/MemoModal";

export default function TextGameHeader() {
  const router = useRouter();
  const [modalState, setModalState] = useState<
    "MAP" | "SUSPECT" | "SUBMIT" | null
  >(null);

  return (
    <>
      <MapModal
        isOpen={modalState === "MAP"}
        onClose={() => {
          setModalState(null);
        }}
        places={["school-3F", "school-2F"]}
      />
      <SuspectsInfoCard
        victim={schoolVictim}
        suspects={schoolSuspects}
        isOpen={modalState === "SUSPECT"}
        onClose={() => {
          setModalState(null);
        }}
      />
      <MemoModal
        isOpen={modalState === "SUBMIT"}
        isAllClueSearched
        onClose={() => {
          setModalState(null);
        }}
        suspects={schoolSuspects}
        questions={[]}
        scenarioKeyword={"school"}
      />
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
            와부고 살인사건 🏫
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
              추리 노트
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
