import { PaletteMode, createTheme } from "@mui/material";

export function createScenarioTheme(color: string, mode: PaletteMode = "light") {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: color,
        contrastText: "#fafafa",
      },
    },
  });
}
