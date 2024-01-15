export interface MCSingleComponentProps {
  children: React.ReactNode;
}

export interface MCGameLevel {
  label: "easy" | "normal" | "hard";
  countdown: 45 | 30 | 15;
}

export type MCGameCard = {
  id: string;
  uid: string;
  isHidden: boolean;
  isMatched: boolean;
};

export type MCGameCardDeck = MCGameCard[];

export type MCGameProgress = "idle" | "inProgress" | "lose" | "win";

export type MCGameStatus = "new" | "reset" | "resume" | "pause" | "end";

export interface MCAppState {
  gameLevel: MCGameLevel;
  gameStatus: MCGameStatus;
  gameProgress: MCGameProgress;
}

export interface MCGameState {
  cardDeck: MCGameCardDeck;
  cardsShown: MCGameCardsShown;
}

export type MCGameCardsShown = {
  counter: 2 | 1 | 0;
  selectedCards: MCGameSelectedCards | null;
};

export type MCGameSelectedCards = {
  [key: MCGameCard["uid"]]: MCGameCard;
};

export type MCGameChoosenModalType<T> = T extends MCGameStatus ? T : never;

export type MCGameModalType = {
  type: MCGameChoosenModalType<"end" | "pause">;
  isShown: boolean;
};

export type MCGameUITypes = "button" | "title";

export type MCGameChoosenUIType<T> = T extends MCGameUITypes ? T : never;

export type MCGamePropsSet<T> = T;

export type MCGameCurrentUIProps =
  | MCGamePropsSet<MCGameButtonProps>
  | MCGamePropsSet<MCGameHeadlineProps>;

export type MCGameUIPropsList = MCGameCurrentUIProps[];

export type MCGameCurrentModalActionKeys =
  | "title"
  | "resume"
  | "reset"
  | "mainMenu";

export type MCGameUISetPropsMap = {
  [P in keyof Record<
    MCGameCurrentModalActionKeys,
    unknown
  >]: MCGameCurrentUIProps;
};

export interface MCGameButtonProps {
  text: string;
  type: MCGameChoosenUIType<"button">;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnCls?: string;
};

export interface MCGameHeadlineProps {
  text: string;
  type: MCGameChoosenUIType<"title">;
  size: "large" | "x-large";
};
