import { Route, Routes } from "react-router-dom";

import { Home, Play } from "@pages";
import { useAppContext, useGameContext } from "@contexts";
import { MCGameRoutePath } from "@config";
import GuardRoute from "./guard.route";

const Root = () => {
  const { state } = useGameContext();
  const { state: appState } = useAppContext();
  const { gameProgress } = appState;
  const { cardDeck } = state;
  return (
    <Routes>
      <Route path={MCGameRoutePath.HOME} element={<Home />} />
      <Route
        path={MCGameRoutePath.PLAY}
        element={
          <GuardRoute
            isPageAllowed={gameProgress !== "idle" && cardDeck.length > 0}
          >
            <Play />
          </GuardRoute>
        }
      />
    </Routes>
  );
};

export default Root;
