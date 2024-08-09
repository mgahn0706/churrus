import { useState } from "react";
import useFoodChainPlayerContext from "../../context";
import { Box, Typography } from "@mui/material";

export default function MoveBiomePhase() {
  const { playerStatus } = useFoodChainPlayerContext();

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Typography color="#121212" fontSize="24px" fontWeight="bold">
          장소 이동
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="8px"
          mb="4px"
        >
          {["FIELD", "FOREST", "RIVER", "SKY"].map((biome) => (
            <Box
              key={biome}
              mt={2}
              bgcolor="white"
              borderRadius="12px"
              p={3}
              width={1}
              display="flex"
              gap={1}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography color="#121212" fontSize="16px">
                {biome}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
