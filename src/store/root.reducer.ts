import type { MCAppAction } from "./app-store/app.actions";
import { appInitialState, appReducer } from "./app-store/app.reducer";
import type { MCGameAction } from "./game-store/game.actions";
import { gameInitialState, gameReducer } from "./game-store/game.reducer";

export interface RootState {
  app: ReturnType<typeof appReducer>;
  game: ReturnType<typeof gameReducer>;
}

// Combined action type
export type RootAction = MCAppAction | MCGameAction;

export const rootReducer = (
  state: RootState,
  action: RootAction
): RootState => ({
  app: appReducer(state.app, action as MCAppAction),
  game: gameReducer(state.game, action as MCGameAction),
});

export const initialState: RootState = {
  app: appInitialState,
  game: gameInitialState,
};
