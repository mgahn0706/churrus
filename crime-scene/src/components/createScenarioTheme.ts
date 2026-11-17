import { PaletteMode, createTheme } from "@mui/material";

export function createScenarioTheme(
  color: string,
  mode: PaletteMode = "light",
  fontFamily?: string,
) {
  return createTheme({
    typography: fontFamily ? { fontFamily } : undefined,
    palette: {
      mode,
      primary: {
        main: color,
        contrastText: "#fafafa",
      },
    },
  });
}
