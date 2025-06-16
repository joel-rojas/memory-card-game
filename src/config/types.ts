export interface MCSingleComponentProps {
  children: React.ReactNode;
}

export type MCGameMaxCardsInDeck = 10;

export type MCGameMaxAvailableCards = 16 | number;

export type MCGameLevelKeys = "easy" | "medium" | "hard";

export type MCAppScreenSizes = "mobile" | "tablet" | "desktop";

export type MCGameLevelCountdown = 60 | 40 | 20;
export interface MCGameLevel {
  label: MCGameLevelKeys;
  countdown: MCGameLevelCountdown;
}

export type MCGameCard = {
  id: string;
  uid: string;
  src: string;
  isHidden: boolean;
  isMatched: boolean;
};

export type MCAppPreRenderedImgAsset = {
  src: string;
  imgId: string;
};

export type MCGameCardDeck = MCGameCard[];

export type MCGameProgress = "idle" | "inProgress" | "lose" | "win";

export type MCGameStatus = "new" | "reset" | "resume" | "pause" | "end";

export interface MCAppState {
  gameLevel: MCGameLevel;
  gameStatus: MCGameStatus;
  gameProgress: MCGameProgress;
  imageAssets: MCAppPreRenderedImgAsset[];
}

export interface MCGameState {
  error: string | null;
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

export type MCGameUITypes =
  | "button"
  | "headline"
  | "paragraph"
  | "radio-group"
  | "radio";

export type MCGameChoosenUIType<T> = T extends MCGameUITypes ? T : never;

export type MCGamePropsSet<T> = T;

export type MCGameCurrentUIProps =
  | MCGamePropsSet<MCGameRadioGroupProps>
  | MCGamePropsSet<MCGameButtonProps>
  | MCGamePropsSet<MCGameTextProps>;

export type MCGameUIPropsList = MCGameCurrentUIProps[];

export type MCGameCurrentModalActionKeys =
  | "title"
  | "resume"
  | "reset"
  | "mainMenu";

export type MCGameUISetPropsMap<T extends MCGameMenuKeys, U> = {
  [P in keyof Record<T, string>]?: U;
};

export interface MCGameGenericUIInputCmpProps<T> {
  type: MCGameChoosenUIType<T>;
  label?: string;
  name?: string;
}

export interface MCGameRadioGroupProps
  extends MCGameGenericUIInputCmpProps<"radio-group"> {
  options:
    | MCGameRadioButtonProps[]
    | React.ReactElement<MCGameRadioButtonProps>[]
    | null;
}

export interface MCGameRadioButtonProps
  extends MCGameGenericUIInputCmpProps<"radio"> {
  name: string;
  value: MCGameLevelKeys;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MCGameButtonProps
  extends MCGameGenericUIInputCmpProps<"button"> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnCls?: string;
  textCls?: string;
}

export interface MCGameTextProps
  extends MCGameGenericUIInputCmpProps<"headline" | "paragraph"> {
  size: MCGameTextSizes;
}

export type MCGameTextSizes = "small" | "medium" | "large" | "x-large";

export const MCGameRoutePath = {
  ANYTHING: "*",
  HOME: "/home",
  PLAY: "/play",
} as const;

export type MCGameMenuKeys =
  | MCGameCurrentModalActionKeys
  | MCGameMainMenuContentKeys
  | MCGameStartGameMenuKeys
  | MCGamePlayMenuKeys;

export type MCGameMainMenuContentKeys = "startGameMenu" | "gameLevelMenu";

export type MCGameProgressiveMenuKeys =
  | MCGameStartGameMenuKeys
  | MCGamePlayMenuKeys;

export type MCGameStartGameMenuKeys = "startGame" | "about";

export type MCGamePlayMenuKeys = "backToStart" | "gameLevel" | "play";

export type MCAppAnimatedCardLayoutItemStatus = "entering" | "exiting";

export type MCAppAnimatedCardLayoutItem = {
  index: number;
  item: MCAppPreRenderedImgAsset;
  position: { x: number; y: number };
  status: MCAppAnimatedCardLayoutItemStatus;
};

export type MCAppAnimatedCardLayout = {
  items: MCAppAnimatedCardLayoutItem[];
};
