import { Box } from "@mui/material";
import { ReactNode } from "react";

export function ShakeTextSection({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        color: "white",
        padding: "16px",
        width: "fit-content",
        margin: "0 auto",
        textAlign: "center",
        fontWeight: 500,
        animation: "rgbGhostShake 1.35s ease-in-out infinite",
        position: "relative",
        textShadow:
          "-3px 0 0 rgba(255, 255, 255, 0.22), 3px 0 0 rgba(255, 255, 255, 0.22), -10px 0 0 rgba(255, 80, 80, 0.3), 10px 0 0 rgba(80, 220, 255, 0.3)",
        "& .MuiTypography-root": {
          fontWeight: 500,
        },
        "@keyframes rgbGhostShake": {
          "0%": {
            left: "-1px",
            textShadow:
              "-4px 0 0 rgba(255, 255, 255, 0.26), 4px 0 0 rgba(255, 255, 255, 0.26), -12px 0 0 rgba(255, 80, 80, 0.38), 12px 0 0 rgba(80, 220, 255, 0.38)",
            filter: "brightness(1.02)",
          },
          "10%": {
            left: "1px",
            textShadow:
              "2px 0 0 rgba(255, 255, 255, 0.18), -2px 0 0 rgba(255, 255, 255, 0.18), 9px 0 0 rgba(255, 80, 80, 0.3), -9px 0 0 rgba(80, 220, 255, 0.3)",
            filter: "brightness(1)",
          },
          "20%": {
            left: "2px",
            textShadow:
              "-5px 0 0 rgba(255, 255, 255, 0.28), 5px 0 0 rgba(255, 255, 255, 0.28), -13px 0 0 rgba(255, 80, 80, 0.42), 13px 0 0 rgba(80, 220, 255, 0.42)",
              filter: "brightness(1.05)",
          },
          "30%": {
            left: "1px",
            textShadow:
              "2px 0 0 rgba(255, 255, 255, 0.18), -2px 0 0 rgba(255, 255, 255, 0.18), 9px 0 0 rgba(255, 80, 80, 0.3), -9px 0 0 rgba(80, 220, 255, 0.3)",
            filter: "brightness(1.01)",
          },
          "40%": {
            left: "-2px",
            textShadow:
              "-5px 0 0 rgba(255, 255, 255, 0.3), 5px 0 0 rgba(255, 255, 255, 0.3), -14px 0 0 rgba(255, 80, 80, 0.44), 14px 0 0 rgba(80, 220, 255, 0.44)",
              filter: "brightness(1.05)",
          },
          "50%": {
            left: "-1px",
            textShadow:
              "2px 0 0 rgba(255, 255, 255, 0.16), -2px 0 0 rgba(255, 255, 255, 0.16), 9px 0 0 rgba(255, 80, 80, 0.28), -9px 0 0 rgba(80, 220, 255, 0.28)",
              filter: "brightness(1)",
          },
          "55%": {
            left: 0,
            textShadow: "none",
            filter: "brightness(1)",
          },
          "100%": {
            left: 0,
            textShadow: "none",
            filter: "brightness(1)",
          },
        },
      }}
    >
      {children}
    </Box>
  );
}
