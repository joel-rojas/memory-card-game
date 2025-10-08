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

// Fixed selector hook - remove unnecessary memoization
export const useSelector = <T>(selector: (state: RootState) => T) => {
  const { state } = useRootStore();
  // Remove the problematic memoization - let the selector handle its own memoization
  return selector(state);
};

// Specific selectors for app state with proper memoization
export const useAppState = () => {
  const { state } = useRootStore();
  // Memoize the specific app state slice
  return React.useMemo(() => state.app, [state.app]);
};

export const useAppDispatch = () => {
  const { dispatch } = useRootStore();
  return dispatch;
};

// Specific selectors for game state with proper memoization
export const useGameState = () => {
  const { state } = useRootStore();
  // Memoize the specific game state slice
  return React.useMemo(() => state.game, [state.game]);
};

export const useGameDispatch = () => {
  const { dispatch } = useRootStore();
  return dispatch;
};

// Combined app hook (maintains similar API to your original useAppContext)
export const useAppContext = () => {
  const { state, dispatch } = useRootStore();

  // Memoize the returned object to prevent unnecessary re-renders
  return React.useMemo(() => ({ state: state.app, dispatch }), [state.app, dispatch]);
};

// Combined game hook (maintains similar API to your original useGameContext)
export const useGameContext = () => {
  const state = useGameState();
  const dispatch = useGameDispatch();

  // Memoize the returned object to prevent unnecessary re-renders
  return React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
};

// Advanced selectors with proper dependencies
export const useGameLevel = () => {
  const { state } = useRootStore();
  return React.useMemo(() => state.app.gameLevel, [state.app.gameLevel]);
};

export const useGameProgress = () => {
  const { state } = useRootStore();
  return React.useMemo(() => state.app.gameProgress, [state.app.gameProgress]);
};

// Add a specific hook for image assets to ensure updates are detected
export const useImageAssets = () => {
  const { state } = useRootStore();
  return React.useMemo(() => state.app.imageAssets, [state.app.imageAssets]);
};
