import Image from "next/image";
import { Inter } from "next/font/google";
import ScenarioCard from "@/components/ScenarioCard";
import { Box, Grid } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignContent="center"
      width="100%"
      height="100%"
    >
      <Image
        src="/Suspect_Logo.png"
        alt="스타트업 라운지 이미지"
        width={100}
        height={100}
      />
      <Grid>
        <ScenarioCard
          title="스타트업 살인사건"
          isSelected={selectedScenario === "스타트업 살인사건"}
          onClick={() => {
            setSelectedScenario("스타트업 살인사건");
          }}
        />
      </Grid>
    </Box>
  );
}
