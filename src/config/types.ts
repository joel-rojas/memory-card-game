export interface MCSingleComponentProps {
  children: React.ReactNode;
}

export interface MCAppState {
  gameLevel: MCGameLevel;
  gameStatus: MCGameStatus;
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

export type MCGameStatus = "idle" | "inProgress" | "lose" | "win";
