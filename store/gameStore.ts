import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Department, getDepartmentById } from '../data/departments';

export interface Player {
  id: number;
  name: string;
  score: number;
  souvenirCards: number[];
  championCards: number;
  isActive: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  diceResults: number[];
  availableDepartments: number[];
  compositions: number[];
  hintsUsed: number;
  currentDepartment?: Department;
  phase: 'rolling' | 'choosing' | 'guessing' | 'end';
  gameStarted: boolean;
  gameEnded: boolean;
  winner?: Player;
}

interface GameActions {
  // Actions de base
  addPlayer: (name: string) => void;
  removePlayer: (id: number) => void;
  startGame: () => void;
  endGame: () => void;
  
  // Actions de dés
  rollDice: () => void;
  setDiceResults: (results: number[]) => void;
  
  // Actions de composition
  setCompositions: (compositions: number[]) => void;
  selectComposition: (departmentId: number) => void;
  
  // Actions d'indices
  setHintCount: (hintCount: number) => void;
  resetHints: () => void;
  
  // Actions de devinette
  submitGuess: (guess: string) => boolean;
  submitBonusQuestion: (prefecture: string) => boolean;
  finishTurn: () => void;
  
  // Actions de tour
  nextTurn: () => void;
  passTurn: () => void;
  
  // Actions de cartes
  addSouvenirCard: (departmentId: number) => void;
  addChampionCard: () => void;
  sellChampionCard: () => void;
  
  // Actions de score
  updateScore: (playerId: number, points: number) => void;
  
  // Actions de phase
  setPhase: (phase: GameState['phase']) => void;
  
  // Actions de sauvegarde
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  players: [
    { id: 1, name: 'Joueur 1', score: 0, souvenirCards: [], championCards: 0, isActive: true },
    { id: 2, name: 'Joueur 2', score: 0, souvenirCards: [], championCards: 0, isActive: true }
  ],
  currentPlayerIndex: 0,
  diceResults: [],
  availableDepartments: Array.from({ length: 101 }, (_, i) => i + 1),
  compositions: [],
  hintsUsed: 0,
  phase: 'rolling',
  gameStarted: false,
  gameEnded: false,
};

// Fonction pour calculer les compositions possibles
const calculateCompositions = (diceResults: number[]): number[] => {
  if (diceResults.length !== 3) return [];
  
  const [dice1, dice2, dice3] = diceResults;
  const compositions = new Set<number>();
  
  // Ajouter les valeurs individuelles des dés
  compositions.add(dice1);
  compositions.add(dice2);
  compositions.add(dice3);
  
  // Générer toutes les combinaisons possibles avec les 3 dés
  const dice = [dice1, dice2, dice3];
  
  // Combinaisons à 2 chiffres (concaténation)
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice.length; j++) {
      if (i !== j) {
        const twoDigit = dice[i] * 10 + dice[j];
        if (twoDigit >= 1 && twoDigit <= 101) {
          compositions.add(twoDigit);
        }
      }
    }
  }
  
  // Combinaisons à 3 chiffres (concaténation)
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice.length; j++) {
      for (let k = 0; k < dice.length; k++) {
        if (i !== j && i !== k && j !== k) {
          const threeDigit = dice[i] * 100 + dice[j] * 10 + dice[k];
          if (threeDigit >= 1 && threeDigit <= 101) {
            compositions.add(threeDigit);
          }
        }
      }
    }
  }
  
  // Opérations mathématiques avec 2 dés
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice.length; j++) {
      if (i !== j) {
        const a = dice[i];
        const b = dice[j];
        
        // Addition
        const add = a + b;
        if (add >= 1 && add <= 101) compositions.add(add);
        
        // Soustraction (résultat positif)
        const sub1 = Math.abs(a - b);
        if (sub1 >= 1 && sub1 <= 101) compositions.add(sub1);
        
        // Multiplication
        const mult = a * b;
        if (mult >= 1 && mult <= 101) compositions.add(mult);
      }
    }
  }
  
  // Opérations mathématiques avec 3 dés
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice.length; j++) {
      for (let k = 0; k < dice.length; k++) {
        if (i !== j && i !== k && j !== k) {
          const a = dice[i];
          const b = dice[j];
          const c = dice[k];
          
          // Addition de 3 nombres
          const add3 = a + b + c;
          if (add3 >= 1 && add3 <= 101) compositions.add(add3);
          
          // Addition de 2 puis soustraction du 3ème
          const addSub = (a + b) - c;
          if (addSub >= 1 && addSub <= 101) compositions.add(addSub);
          
          // Multiplication de 2 puis addition du 3ème
          const multAdd = (a * b) + c;
          if (multAdd >= 1 && multAdd <= 101) compositions.add(multAdd);
          
          // Multiplication de 2 puis soustraction du 3ème
          const multSub = (a * b) - c;
          if (multSub >= 1 && multSub <= 101) compositions.add(multSub);
          
          // Multiplication de 3 nombres
          const mult3 = a * b * c;
          if (mult3 >= 1 && mult3 <= 101) compositions.add(mult3);
        }
      }
    }
  }
  
  return Array.from(compositions).sort((a, b) => a - b);
};

// Fonction pour calculer les points selon les indices utilisés
const calculatePoints = (hintsUsed: number): number => {
  switch (hintsUsed) {
    case 0: return 5000;
    case 1: return 2000;
    case 2: return 1000;
    case 3: return 100;
    default: return 0;
  }
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialGameState,
      
      addPlayer: (name: string) => {
        const { players } = get();
        if (players.length >= 4) return;
        
        const newPlayer: Player = {
          id: players.length + 1,
          name,
          score: 0,
          souvenirCards: [],
          championCards: 0,
          isActive: true,
        };
        
        set({ players: [...players, newPlayer] });
      },
      
      removePlayer: (id: number) => {
        const { players, currentPlayerIndex } = get();
        const filteredPlayers = players.filter(p => p.id !== id);
        
        set({
          players: filteredPlayers,
          currentPlayerIndex: Math.min(currentPlayerIndex, filteredPlayers.length - 1),
        });
      },
      
      startGame: () => {
        set({ gameStarted: true, phase: 'rolling' });
      },
      
      endGame: () => {
        const { players } = get();
        const winner = players.reduce((prev, current) => 
          prev.score > current.score ? prev : current
        );
        
        set({ gameEnded: true, winner, phase: 'end' });
      },
      
      rollDice: () => {
        // 2 dés d10 (0-9) et 1 dé d6 (1-6)
        const dice1 = Math.floor(Math.random() * 10); // 0-9
        const dice2 = Math.floor(Math.random() * 10); // 0-9  
        const dice3 = Math.floor(Math.random() * 6) + 1; // 1-6
        
        const diceResults = [dice1, dice2, dice3];
        const compositions = calculateCompositions(diceResults);
        
        console.log('Dés lancés:', diceResults, 'Compositions:', compositions);
        
        set({
          diceResults,
          compositions,
          phase: 'choosing',
          hintsUsed: 0,
        });
      },
      
      setDiceResults: (results: number[]) => {
        const compositions = calculateCompositions(results);
        set({ diceResults: results, compositions });
      },
      
      setCompositions: (compositions: number[]) => {
        set({ compositions });
      },
      
      selectComposition: (departmentId: number) => {
        const department = getDepartmentById(departmentId);
        if (!department) return;
        
        set({
          currentDepartment: department,
          phase: 'guessing',
          hintsUsed: 0,
        });
      },
      
      setHintCount: (hintCount: number) => {
        set({ hintsUsed: hintCount });
      },
      
      resetHints: () => {
        set({ hintsUsed: 0 });
      },
      
      submitGuess: (guess: string) => {
        const { currentDepartment, hintsUsed, players, currentPlayerIndex } = get();
        if (!currentDepartment) return false;
        
        const isCorrect = currentDepartment.name.toLowerCase() === guess.toLowerCase().trim();
        const points = calculatePoints(hintsUsed);
        const currentPlayer = players[currentPlayerIndex];
        
        if (isCorrect) {
          // Ajouter les points
          const newScore = currentPlayer.score + points;
          
          // Ajouter une carte souvenir
          const newSouvenirCards = [...currentPlayer.souvenirCards, currentDepartment.id];
          
          // Vérifier si on doit donner une carte champion
          const souvenirCount = newSouvenirCards.length;
          const championCards = Math.floor(souvenirCount / 10);
          const championBonus = championCards * 5000;
          
          // Mettre à jour le joueur
          const updatedPlayers = players.map((player, index) => 
            index === currentPlayerIndex 
              ? {
                  ...player,
                  score: newScore + championBonus,
                  souvenirCards: newSouvenirCards,
                  championCards,
                }
              : player
          );
          
          set({ players: updatedPlayers });
          
          // Retirer le département des disponibles
          const { availableDepartments } = get();
          const newAvailableDepartments = availableDepartments.filter(id => id !== currentDepartment.id);
          
          set({
            availableDepartments: newAvailableDepartments,
            // Ne pas fermer la modal immédiatement pour permettre la question bonus
            // currentDepartment: undefined,
            // phase: 'rolling',
          });
          
          return true;
        } else {
          // Perdre des points
          const newScore = Math.max(0, currentPlayer.score - points);
          
          const updatedPlayers = players.map((player, index) => 
            index === currentPlayerIndex 
              ? { ...player, score: newScore }
              : player
          );
          
          set({ players: updatedPlayers });
          return false;
        }
      },

      submitBonusQuestion: (prefecture: string) => {
        const { currentDepartment, players, currentPlayerIndex } = get();
        if (!currentDepartment) return false;
        
        const isCorrect = currentDepartment.prefecture.toLowerCase() === prefecture.toLowerCase().trim();
        const currentPlayer = players[currentPlayerIndex];
        
        // Ajouter ou retirer des points selon la réponse
        const bonusPoints = isCorrect ? 1000 : -500;
        const newScore = Math.max(0, currentPlayer.score + bonusPoints);
        
        const updatedPlayers = players.map((player, index) => 
          index === currentPlayerIndex 
            ? { ...player, score: newScore }
            : player
        );
        
        set({ players: updatedPlayers });
        return isCorrect;
      },

      finishTurn: () => {
        set({
          currentDepartment: undefined,
          phase: 'rolling',
          hintsUsed: 0,
        });
      },
      
      nextTurn: () => {
        const { players, currentPlayerIndex } = get();
        const activePlayers = players.filter(p => p.isActive);
        const nextIndex = (currentPlayerIndex + 1) % activePlayers.length;
        
        set({
          currentPlayerIndex: nextIndex,
          phase: 'rolling',
          hintsUsed: 0,
          currentDepartment: undefined,
        });
      },
      
      passTurn: () => {
        get().nextTurn();
      },
      
      addSouvenirCard: (departmentId: number) => {
        const { players, currentPlayerIndex } = get();
        const currentPlayer = players[currentPlayerIndex];
        
        const updatedPlayers = players.map((player, index) => 
          index === currentPlayerIndex 
            ? { ...player, souvenirCards: [...player.souvenirCards, departmentId] }
            : player
        );
        
        set({ players: updatedPlayers });
      },
      
      addChampionCard: () => {
        const { players, currentPlayerIndex } = get();
        const currentPlayer = players[currentPlayerIndex];
        
        const updatedPlayers = players.map((player, index) => 
          index === currentPlayerIndex 
            ? { ...player, championCards: player.championCards + 1 }
            : player
        );
        
        set({ players: updatedPlayers });
      },
      
      sellChampionCard: () => {
        const { players, currentPlayerIndex } = get();
        const currentPlayer = players[currentPlayerIndex];
        
        if (currentPlayer.championCards > 0) {
          const updatedPlayers = players.map((player, index) => 
            index === currentPlayerIndex 
              ? { 
                  ...player, 
                  championCards: player.championCards - 1,
                  score: player.score - 5000 + 2000
                }
              : player
          );
          
          set({ players: updatedPlayers });
        }
      },
      
      updateScore: (playerId: number, points: number) => {
        const { players } = get();
        const updatedPlayers = players.map(player => 
          player.id === playerId 
            ? { ...player, score: Math.max(0, player.score + points) }
            : player
        );
        
        set({ players: updatedPlayers });
      },
      
      setPhase: (phase: GameState['phase']) => {
        set({ phase });
      },
      
      saveGame: () => {
        const state = get();
        localStorage.setItem('france-departments-game', JSON.stringify(state));
      },
      
      loadGame: () => {
        const saved = localStorage.getItem('france-departments-game');
        if (saved) {
          const state = JSON.parse(saved);
          set(state);
        }
      },
      
      resetGame: () => {
        set(initialGameState);
        localStorage.removeItem('france-departments-game');
      },
    }),
    {
      name: 'france-departments-game',
      partialize: (state) => ({
        players: state.players,
        currentPlayerIndex: state.currentPlayerIndex,
        availableDepartments: state.availableDepartments,
        gameStarted: state.gameStarted,
        gameEnded: state.gameEnded,
      }),
    }
  )
);
