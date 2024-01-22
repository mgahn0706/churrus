import { Box, Grid } from "@mui/material";
import { COLORS } from "../fixtures";
import { getCharCodeFromNumber, getColorFromNumbers } from "../libs";
import { useState } from "react";
import { Check } from "@mui/icons-material";

const COLOM_HEADERS = Array.from({ length: 30 }, (_, i) => i + 1);

const ColorPanel = ({
  isSelected,
  color,
  onClick,
}: {
  isSelected: boolean;
  color: string;
  onClick: () => void;
}) => (
  <Grid item xs={0.375}>
    <Box
      display="flex"
      justifyContent="center"
      color="#121212"
      alignItems="center"
      onClick={onClick}
      bgcolor={color}
      width="40px"
      height="40px"
      sx={{
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.1)",
          transition: "transform 0.2s",
        },
      }}
    >
      {isSelected && <Check />}
    </Box>
  </Grid>
);

export default function ColorSelectSection({
  selectedColor,
  onSelect,
}: {
  selectedColor: [number, number] | null;
  onSelect: (color: [number, number]) => void;
}) {
  return (
    <Grid container width="80dvw" spacing={1}>
      <Grid item xs={0.375} />
      {COLOM_HEADERS.map((colomn) => (
        <Grid
          item
          xs={0.375}
          key={colomn}
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "1.2rem",
          }}
        >
          {colomn}
        </Grid>
      ))}
      <Grid item xs={0.375} />
      {Object.values(COLORS).map((colors, row) => {
        return (
          <>
            <Grid
              item
              xs={0.375}
              key={row}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.2rem",
              }}
            >
              {getCharCodeFromNumber(row)}
            </Grid>
            {colors.map((color, col) => (
              <ColorPanel
                isSelected={color === getColorFromNumbers(selectedColor)}
                color={color}
                onClick={() => {
                  onSelect([row, col]);
                }}
              />
            ))}
            <Grid
              item
              xs={0.375}
              key={row}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.2rem",
              }}
            >
              {getCharCodeFromNumber(row)}
            </Grid>
          </>
        );
      })}
      <Grid item xs={0.375} />
      {COLOM_HEADERS.map((colomn) => (
        <Grid
          item
          xs={0.375}
          key={colomn}
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "1.2rem",
          }}
        >
          {colomn}
        </Grid>
      ))}
      <Grid item xs={0.375} />
    </Grid>
  );
}
