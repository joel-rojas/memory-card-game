import React from "react";
import "./App.css";
import Home from "@pages/Home";
import Play from "@pages/Play";
import AppProvider from "@contexts/app-context";
import GameProvider from "@contexts/game-context";

function App() {
  return (
    <AppProvider>
      <Home>
        <GameProvider>
          <Play />
        </GameProvider>
      </Home>
    </AppProvider>
  );
}

export default App;
