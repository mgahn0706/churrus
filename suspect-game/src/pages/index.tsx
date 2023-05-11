import Image from "next/image";
import { Circle, PeopleAlt, Schedule } from "@mui/icons-material";
import ScenarioCard from "@/components/ScenarioCard";
import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { ScenarioType, scenarios } from "@/fixtures";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(
    null
  );

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      {!selectedScenario && (
        <Box width="100%" height="80%">
          <Box
            display="flex"
            alignContent="center"
            height="80%"
            width="100%"
            sx={{
              color: "white",
              position: "absolute",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, white 100%), url("/select-page.png")`,
            }}
          />
        </Box>
      )}
      {selectedScenario && (
        <Box height="80%" display="flex" justifyContent="space-between">
          <Box
            p={5}
            sx={{
              position: "absolute",
              top: "10%",
              left: "5%",
            }}
          >
            <Typography variant="h3">{selectedScenario.title}</Typography>
            <Rating
              icon={<Circle />}
              emptyIcon={<Circle />}
              name="read-only"
              value={selectedScenario.difficulty}
              readOnly
            />
            <Box display="flex">
              <PeopleAlt sx={{ mr: 2 }} />
              <Typography>{selectedScenario.numberOfSuspects}</Typography>
            </Box>
            <Box display="flex">
              <Schedule sx={{ mr: 2 }} />
              <Typography>약 {selectedScenario.playTime}분</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              margin: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              zIndex: -1,
              backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 3%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.55) 50%, #ffffff 85%), url("${selectedScenario.backgroundImage}")`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </Box>
      )}
      <Box display="flex" gap={2} mb={5} mx={4}>
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.title}
            scenario={scenario}
            isSelected={selectedScenario === scenario}
            onDeslect={() => setSelectedScenario(null)}
            onClick={() => setSelectedScenario(scenario)}
          />
        ))}
      </Box>
    </Box>
  );
}
