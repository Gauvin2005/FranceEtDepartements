import { create } from 'zustand';
import type { GameState, DiceRoll, Composition } from '@/types';

interface GameStoreState {
  gameState: GameState | null;
  currentDice: DiceRoll | null;
  currentCompositions: Composition[];
  indicesRevealed: number[];
  isSpectator: boolean;
  setGameState: (state: GameState) => void;
  updateGameState: (state: Partial<GameState>) => void;
  setCurrentDice: (dice: DiceRoll) => void;
  setCurrentCompositions: (compositions: Composition[]) => void;
  addRevealedIndex: (index: number) => void;
  resetCurrentTurn: () => void;
  setIsSpectator: (isSpectator: boolean) => void;
  clearGame: () => void;
}

export const useGameStore = create<GameStoreState>((set) => ({
  gameState: null,
  currentDice: null,
  currentCompositions: [],
  indicesRevealed: [],
  isSpectator: false,

  setGameState: (state) => set({ gameState: state }),

  updateGameState: (partialState) =>
    set((prev) => ({
      gameState: prev.gameState
        ? { ...prev.gameState, ...partialState }
        : (partialState as GameState),
    })),

  setCurrentDice: (dice) => set({ currentDice: dice }),

  setCurrentCompositions: (compositions) => set({ currentCompositions: compositions }),

  addRevealedIndex: (index) =>
    set((state) => ({
      indicesRevealed: [...state.indicesRevealed, index],
    })),

  resetCurrentTurn: () =>
    set({
      currentDice: null,
      currentCompositions: [],
      indicesRevealed: [],
    }),

  setIsSpectator: (isSpectator) => set({ isSpectator }),

  clearGame: () =>
    set({
      gameState: null,
      currentDice: null,
      currentCompositions: [],
      indicesRevealed: [],
      isSpectator: false,
    }),
}));

