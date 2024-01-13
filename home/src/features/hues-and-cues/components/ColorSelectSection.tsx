import { Box, Grid } from "@mui/material";

const COLOM_HEADERS = Array.from({ length: 30 }, (_, i) => i + 1);

const COLORS = Array.from({ length: 480 }, (_, i) => `#FFFFFF`);

const ColorPanel = ({ color }: { color: string }) => (
  <Grid item xs={0.4}>
    <Box
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
      {COLOM_HEADERS.map((colom) => (
        <Grid
          item
          xs={0.4}
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
      {COLORS.map((color) => {
        return <ColorPanel color={color} />;
      })}
    </Grid>
  );
}
