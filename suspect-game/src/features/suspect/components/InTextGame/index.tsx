import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  InputBase,
  Menu,
  Paper,
  TextField,
  createTheme,
} from "@mui/material";

import { useState } from "react";
import TextGameHeader from "./TextGameHeader";
import { SchoolPrologue } from "../../fixtures/school/prologue";
import { History, MenuBook, Search } from "@mui/icons-material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function InTextGame() {
  const [currentStep, setCurrentStep] = useState<
    "PROLOGUE" | "INTERROGATE" | "INVESTIGATE"
  >("PROLOGUE");

  return (
    <ThemeProvider theme={darkTheme}>
      <Box width="80vw" height="100vh" bgcolor="black" py="60px" px="10vw">
        <TextGameHeader />
        {currentStep === "PROLOGUE" && (
          <Box color="white" lineHeight={"2rem"}>
            <SchoolPrologue />
            <Button
              variant="contained"
              onClick={() => setCurrentStep("INVESTIGATE")}
            >
              조사하기
            </Button>
          </Box>
        )}
        {currentStep === "INVESTIGATE" && (
          <Box
            color="white"
            lineHeight={"2rem"}
            display="flex"
            justifyContent="center"
          >
            <Paper
              component="form"
              sx={{
                p: "6px 12px",
                display: "flex",
                alignItems: "center",
                width: 400,
                mt: "60px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "1.5rem", fontWeight: "bold" }}
                placeholder="조사 키워드를 입력하세요."
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton sx={{ p: "10px" }} aria-label="directions">
                <History />
              </IconButton>
            </Paper>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
