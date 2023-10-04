import React from "react";
import "./App.css";
import Home from "@pages/Home";
import Play from "@pages/Play";
import { AppProvider, GameProvider } from "@contexts";

function App() {
  return (
    <AppProvider>
      <GameProvider>
        <Play />
      </GameProvider>
    </AppProvider>
  );
}

export default App;
