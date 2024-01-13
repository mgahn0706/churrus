import { Box, Grid, Typography } from "@mui/material";
import { COLORS } from "../fixtures";
import { getCharCodeFromNumber } from "../libs";
import { RouteTwoTone } from "@mui/icons-material";

const COLOM_HEADERS = Array.from({ length: 30 }, (_, i) => i + 1);

const ColorPanel = ({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) => (
  <Grid item xs={0.387}>
    <Box
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
    />
  </Grid>
);

export default function ColorSelectSection({
  onSelect,
}: {
  onSelect: (color: [number, number]) => void;
}) {
  return (
    <Grid container width="80dvw" spacing={1}>
      <Grid item xs={0.387} />

      {COLOM_HEADERS.map((colom) => (
        <Grid
          item
          xs={0.387}
          key={colom}
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "1.2rem",
          }}
        >
          {colom}
        </Grid>
      ))}
      {Object.values(COLORS).map((colors, row) => {
        return (
          <>
            <Grid
              item
              xs={0.387}
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
                color={color}
                onClick={() => {
                  onSelect([row, col]);
                }}
              />
            ))}
          </>
        );
      })}
    </Grid>
  );
}
