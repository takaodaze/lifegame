import React from "react";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { createTheme } from "@mui/material";
import { Game } from "./components/Game";
import { GameFrame } from "./components/GameFrame";

const theme = createTheme({
  palette: {
    primary: {
      main: "#52A44E",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <GameFrame>
          <Game />
        </GameFrame>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

const AppWrapper = styled.div({
  padding: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
