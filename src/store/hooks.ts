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
  return state.app;
};

export const useAppDispatch = () => {
  const { dispatch } = useRootStore();
  return dispatch;
};

// Specific selectors for game state with proper memoization
export const useGameState = () => {
  const { state } = useRootStore();
  // Memoize the specific game state slice
  return state.game;
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

