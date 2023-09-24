import React from "react";
import "./App.css";
import Home from "@pages/Home";
import Play from "@pages/Play";
import { AppProvider, GameProvider } from "@contexts";

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
