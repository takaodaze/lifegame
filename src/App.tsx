import React from "react";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { createTheme } from "@mui/material";
import { Game } from "./components/Game";
import { GameFrame } from "./components/GameFrame";
import { LifeGameDiscription } from "./components/LifeGameDiscription";
import { GREEN } from "./color";
import { Spacer } from "./components/utils/Spacer";

const theme = createTheme({
  palette: {
    primary: {
      main: GREEN,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper displayWidth={window.outerWidth}>
        <LifeGameDiscription />
        <Spacer height="50px" width="50px" />
        <GameFrame>
          <Game />
        </GameFrame>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

const AppWrapper = styled.div((props: { displayWidth: number }) => ({
  padding: "50px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: props.displayWidth >= 1350 ? "row" : "column",
  alignItems: props.displayWidth >= 1350 ? "start" : "center",
  overflow: "auto",
}));
