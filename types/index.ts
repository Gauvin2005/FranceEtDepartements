export interface User {
  id: number;
  pseudo: string;
  email: string;
  role: string;
  isConfirmed: boolean;
  createdAt: string;
}

export interface Department {
  id: number;
  numero: string;
  nom: string;
  prefecture: string;
  indices: string[];
  blason: string;
}

export interface Card {
  id: number;
  cardNumber: number;
  departmentId: number;
  type: 'souvenir' | 'champion';
  value: number;
  department?: Department;
}

export interface OwnedCard {
  id: number;
  gamePlayerId: number;
  cardId: number;
  isFaceUp: boolean;
  card: Card;
}

export interface GamePlayer {
  id: number;
  gameId: number;
  userId?: number;
  guestPseudo?: string;
  position: number;
  money: number;
  isEliminated: boolean;
  playerOrder: number;
  ownedCards: OwnedCard[];
  user?: User;
}

export interface Game {
  id: number;
  code: string;
  hostId: number;
  status: 'lobby' | 'running' | 'paused' | 'finished';
  maxPlayers: number;
  createdAt: string;
  updatedAt: string;
  turnIndex: number;
  maxTurns?: number;
  timeLimitSec?: number;
  players: GamePlayer[];
}

export interface DiceRoll {
  d10a: number;
  d10b: number;
  d6: number;
}

export interface Composition {
  value: number;
  formula: string;
  description: string;
}

export interface GameState {
  game: Game;
  currentTurn: {
    playerId: number;
    diceRoll?: DiceRoll;
    compositions?: Composition[];
    indicesRevealed: number[];
  };
  availableCards: number[];
  spectators: string[];
}

export interface SocketEvents {
  'game:state:update': (state: Partial<GameState>) => void;
  'game:player:joined': (player: GamePlayer) => void;
  'game:player:left': (playerId: number) => void;
  'game:turn:started': (playerId: number) => void;
  'game:dice:rolled': (dice: DiceRoll) => void;
  'game:compositions:list': (compositions: Composition[]) => void;
  'game:indices:reveal': (index: number, text: string) => void;
  'game:move:piece': (playerId: number, newPosition: number) => void;
  'game:round:result': (result: RoundResult) => void;
  'game:spectator:update': (state: GameState) => void;
  error: (message: string) => void;
}

export interface RoundResult {
  playerId: number;
  departmentChosen: Department;
  isCorrect: boolean;
  pointsEarned: number;
  cardReceived?: Card;
  newMoney: number;
  newPosition: number;
}

export interface CreateGameParams {
  maxPlayers: number;
  maxTurns?: number;
  timeLimitSec?: number;
}

export interface JoinGameParams {
  code: string;
  pseudo: string;
  token?: string;
}

