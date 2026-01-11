export enum Winner {
  PLAYER = 'Player',
  BANKER = 'Banker',
  TIE = 'Tie'
}

export enum Result {
  WIN = 'Win',
  LOSS = 'Loss',
  PUSH = 'Push',
  PENDING = 'Pending'
}

export interface Hand {
  id: number;
  winner: Winner;
  isFourCards: boolean;
  prediction: Winner | null;
  result: Result;
  runningTotal: number;
}