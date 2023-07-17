import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function Dial({ isCoverRemoved }: { isCoverRemoved: boolean }) {
  // exact dial can be 1 to 14.
  const [exactDegree, setExactDegree] = useState(0);
  const [dialDegree, setDialDegree] = useState(0);

  useEffect(() => {
    setExactDegree(Math.floor(Math.random() * 14));
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" mt={10}>
        <Box
          height="300px"
          width="600px"
          bgcolor={!isCoverRemoved ? "#D1CBA7" : "#62afa8"}
          borderRadius="300px 300px 0 0"
        />
        <Box
          width="7px"
          zIndex={4}
          height="200px"
          bgcolor="red"
          position="absolute"
          borderRadius={3}
          left="50%"
          bottom="49%"
          sx={{
            transform: `rotate(${dialDegree}deg)`,
            transformOrigin: "bottom center",
            transition: "transform 0.5s ease",
          }}
        />
        <Box
          position="absolute"
          zIndex={3}
          sx={{
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "linear-gradient(12deg, #A8CCE1 17.53%, transparent 17.53%) 0 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50% 50%",
            transform: `rotate(${exactDegree * 12}deg)`,
          }}
        />
        <Box
          position="absolute"
          zIndex={2}
          sx={{
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "linear-gradient(36deg, #FA6328 42.34%, transparent 42.34%) 0 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50% 50%",
            transform: `rotate(${(exactDegree - 1) * 12}deg)`,
          }}
        />
        <Box
          position="absolute"
          zIndex={1}
          sx={{
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "linear-gradient(60deg, #FBBB0A 63.4%, transparent 63.4%) 0 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50% 50%",
            transform: `rotate(${(exactDegree - 2) * 12}deg)`,
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        pt={3}
        gap={3}
        pb={5}
        zIndex={10}
        bgcolor="white"
        position="absolute"
        width="100%"
      >
        <Button
          variant="contained"
          onClick={() => setDialDegree(dialDegree - 12)}
          color="error"
          disabled={dialDegree < -80}
        >
          왼쪽으로
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={dialDegree > 80}
          onClick={() => setDialDegree(dialDegree + 12)}
        >
          오른쪽으로
        </Button>
      </Box>
    </>
  );
}
