import React from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "@pages";
import { AppProvider, GameProvider } from "@contexts";

function App() {
  return (
    <AppProvider>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </AppProvider>
  );
}

export default App;
