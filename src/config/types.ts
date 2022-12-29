export interface MCAppState {
  gameLevel: MCGameLevel;
  gameCards: MCGameCardList;
  gameStatus: MCGameStatus;
  currentCountdown: number;
  cardsShown: MCGameCardsShown;
};

export type MCGameCardsShown = 2 | 1 | 0;

export interface MCGameLevel {
  label: 'easy' | 'normal' | 'hard';
  countdown: 45 | 30 | 15;
}

export type MCGameCard = {
  id: string;
  isHidden: boolean;
  isMatched: boolean;
};

export type MCGameCardList = MCGameCard[];


export type MCGameStatus = 'idle' | 'inProgress' | 'lose' | 'win';
