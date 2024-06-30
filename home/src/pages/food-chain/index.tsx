import RoleRevealPhase from "@/features/food-chain/components/RoleRevealPhase";
import SettingPhase from "@/features/food-chain/components/SettingPhase";
import { PlayerContextProvider } from "@/features/food-chain/context";
import useGamePhase from "@/features/food-chain/hooks/useGamePhase";
import usePreventUnload from "@/hooks/usePreventUnload";
import { Box } from "@mui/material";
import Head from "next/head";

const BACKGROUND_COLOR = "#F9FAFC";

export default function FoodChain() {
  const { phase, moveToNextPhase } = useGamePhase();

  usePreventUnload();

  return (
    <>
      <Head>
        <title>먹이사슬</title>
      </Head>
      <Box
        minHeight="100dvh"
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
      >
        <Box px={[4, 8, 12]} width="100%" maxWidth={1000} py="48px">
          <PlayerContextProvider>
            {phase === "SETTING" && (
              <SettingPhase onNextPhase={moveToNextPhase} />
            )}
            {phase === "ROLE_REVEAL" && <RoleRevealPhase />}
          </PlayerContextProvider>
        </Box>
      </Box>
    </>
  );
}
