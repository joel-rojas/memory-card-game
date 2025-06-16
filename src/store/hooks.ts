import React from "react";

import { type RootState } from "./root.reducer";
import { RootContext } from "./root.context";

export const useRootStore = () => {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error("useRootStore must be used within RootProvider");
  }
  return context;
};

// Generic selector hook
export const useSelector = <T>(selector: (state: RootState) => T) => {
  const { state } = useRootStore();
  const memoizedState = React.useMemo(() => state, [state]);
  return selector(memoizedState);
};

// Specific selectors for app state
export const useAppState = () => {
  return useSelector((state) => state.app);
};

export const useAppDispatch = () => {
  const { dispatch } = useRootStore();
  return dispatch;
};

// Specific selectors for game state
export const useGameState = () => {
  return useSelector((state) => state.game);
};

export const useGameDispatch = () => {
  const { dispatch } = useRootStore();
  return dispatch;
};

// Combined app hook (maintains similar API to your original useAppContext)
export const useAppContext = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  return { state, dispatch };
};

// Combined game hook (maintains similar API to your original useGameContext)
export const useGameContext = () => {
  const state = useGameState();
  const dispatch = useGameDispatch();
  return { state, dispatch };
};

// Advanced selectors
export const useGameLevel = () => {
  return useSelector((state) => state.app.gameLevel);
};

export const useGameProgress = () => {
  return useSelector((state) => state.app.gameProgress);
};
