import { createTheme } from "@mui/material";

export function createScenarioTheme(color: string) {
  return createTheme({
    palette: {
      primary: {
        main: color,
        contrastText: "#fafafa",
      },
    },
  });
}
