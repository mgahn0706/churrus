import { Box, Grid } from "@mui/material";

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
  onSelect: (color: string) => void;
}) {
  return (
    <Grid container width="80dvw" spacing={1}>
      {COLORS.map((color) => {
        return <ColorPanel color={color} />;
      })}
    </Grid>
  );
}
