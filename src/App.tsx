import React from "react";
import "./App.css";
import Play from "@pages/Play";
import { AppProvider, GameProvider } from "@contexts";
import { Page } from "@components";

function App() {
  return (
    <AppProvider>
      <GameProvider>
        <Page>
          <Play />
        </Page>
      </GameProvider>
    </AppProvider>
  );
}

export default App;
