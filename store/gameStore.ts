import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Department, getDepartmentById, getDepartmentByNumero, departments } from '../data/departments';

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
  availableDepartments: string[];
  compositions: string[];
  hintsUsed: number;
  currentDepartment?: Department;
  phase: 'rolling' | 'choosing' | 'guessing' | 'end';
  gameStarted: boolean;
  gameEnded: boolean;
  winner?: Player;
  // Timer
  timerDuration: number;
  timeRemaining: number;
  timerActive: boolean;
  timerId?: NodeJS.Timeout;
}

interface GameActions {
  // Actions de base
  addPlayer: (name: string) => void;
  removePlayer: (id: number) => void;
  updatePlayerName: (id: number, newName: string) => void;
  startGame: () => void;
  endGame: () => void;
  
  // Actions de dés
  rollDice: () => void;
  setDiceResults: (results: number[]) => void;
  
  // Actions de composition
  setCompositions: (compositions: string[]) => void;
  selectComposition: (numero: string) => void;
  
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
  
  // Actions de timer
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
  accelerateTimer: (seconds: number) => void;
  
  // Actions de sauvegarde
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  players: [
    { id: 1, name: 'Joueur 1', score: 0, souvenirCards: [], championCards: 0, isActive: true }
  ],
  currentPlayerIndex: 0,
  diceResults: [],
  availableDepartments: departments.map(d => d.numero),
  compositions: [],
  hintsUsed: 0,
  phase: 'rolling',
  gameStarted: false,
  gameEnded: false,
  // Timer
  timerDuration: 120, // 120 secondes
  timeRemaining: 120,
  timerActive: false,
};

// Fonction pour calculer les compositions possibles
const calculateCompositions = (diceResults: number[]): string[] => {
  if (diceResults.length !== 3) return [];
  
  const [dice1, dice2, dice3] = diceResults;
  const compositions = new Set<string>();
  
  // Ajouter les valeurs individuelles des dés
  compositions.add(dice1.toString().padStart(2, '0'));
  compositions.add(dice2.toString().padStart(2, '0'));
  compositions.add(dice3.toString().padStart(2, '0'));
  
  // Générer toutes les combinaisons possibles avec les 3 dés
  const dice = [dice1, dice2, dice3];
  
  // Combinaisons à 2 chiffres (concaténation)
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice.length; j++) {
      if (i !== j) {
        const twoDigit = dice[i].toString() + dice[j].toString();
        compositions.add(twoDigit.padStart(2, '0'));
      }
    }
  }
  
  // Combinaisons à 3 chiffres (concaténation)
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice.length; j++) {
      for (let k = 0; k < dice.length; k++) {
        if (i !== j && i !== k && j !== k) {
          const threeDigit = dice[i].toString() + dice[j].toString() + dice[k].toString();
          compositions.add(threeDigit);
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
        if (add >= 1 && add <= 101) compositions.add(add.toString().padStart(2, '0'));
        
        // Soustraction (résultat positif)
        const sub1 = Math.abs(a - b);
        if (sub1 >= 1 && sub1 <= 101) compositions.add(sub1.toString().padStart(2, '0'));
        
        // Multiplication
        const mult = a * b;
        if (mult >= 1 && mult <= 101) compositions.add(mult.toString().padStart(2, '0'));
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
          if (add3 >= 1 && add3 <= 101) compositions.add(add3.toString().padStart(2, '0'));
          
          // Addition de 2 puis soustraction du 3ème
          const addSub = (a + b) - c;
          if (addSub >= 1 && addSub <= 101) compositions.add(addSub.toString().padStart(2, '0'));
          
          // Multiplication de 2 puis addition du 3ème
          const multAdd = (a * b) + c;
          if (multAdd >= 1 && multAdd <= 1000) compositions.add(multAdd.toString());
          
          // Multiplication de 2 puis soustraction du 3ème
          const multSub = (a * b) - c;
          if (multSub >= 1 && multSub <= 1000) compositions.add(multSub.toString());
          
          // Multiplication de 3 nombres
          const mult3 = a * b * c;
          if (mult3 >= 1 && mult3 <= 1000) compositions.add(mult3.toString());
        }
      }
    }
  }
  
  // Règles spéciales pour la Corse (2A et 2B)
  // Si on a un 2 dans les dés, on peut obtenir la Corse
  if (dice.includes(2)) {
    compositions.add('2A');
    compositions.add('2B');
  }
  
  // Règles spéciales pour les DOM (971, 972, 973, 974, 976)
  // Stratégie : Augmenter significativement les chances d'obtenir les DOM-TOM
  // Le problème original est qu'il fallait avoir 9 ET 7, ce qui est trop rare
  
  // Règle original trop restrictive : 9 ET 7 requis
  // On garde cette règle pour la compatibilité
  
  // NOUVELLE RÈGLE PLUS PERMISSIVE : Si on a un 9 dans les dés
  // → On ouvre l'accès aux DOM-TOM (même sans le 7 exact)
  // Cela multiplie les chances car le 9 apparaît plus souvent
  if (dice.includes(9)) {
    compositions.add('971');
    compositions.add('972');
    compositions.add('973');
    compositions.add('974');
    compositions.add('976');
  }
  
  // Filtrer uniquement les numéros qui correspondent à des départements existants
  const validNumeros = departments.map(d => d.numero);
  const validCompositions = Array.from(compositions).filter(c => validNumeros.includes(c));
  
  return validCompositions.sort((a, b) => {
    // Tri numérique pour les numéros standards, alphabétique pour les spéciaux
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    return a.localeCompare(b);
  });
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
      
      updatePlayerName: (id: number, newName: string) => {
        const { players } = get();
        const updatedPlayers = players.map(player => 
          player.id === id ? { ...player, name: newName } : player
        );
        set({ players: updatedPlayers });
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
        
        // Démarrer le timer après le lancer de dés
        setTimeout(() => {
          get().startTimer();
        }, 100);
      },
      
      setDiceResults: (results: number[]) => {
        const compositions = calculateCompositions(results);
        set({ diceResults: results, compositions });
      },
      
      setCompositions: (compositions: string[]) => {
        set({ compositions });
      },
      
      selectComposition: (numero: string) => {
        const department = getDepartmentByNumero(numero);
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
          const newAvailableDepartments = availableDepartments.filter(num => num !== currentDepartment.numero);
          
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
        // Arrêter le timer
        get().stopTimer();
        
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
        
        // Arrêter le timer actuel
        get().stopTimer();
        
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
                  score: player.score + 25000
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
      
      // Actions de timer
      startTimer: () => {
        const { timerId, timerDuration } = get();
        
        // Arrêter le timer existant s'il y en a un
        if (timerId) {
          clearInterval(timerId);
        }
        
        // Démarrer le nouveau timer
        const newTimerId = setInterval(() => {
          const { timeRemaining, timerActive } = get();
          
          if (timerActive && timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
          } else if (timerActive && timeRemaining <= 0) {
            // Timer terminé - déclencher le timeout
            get().stopTimer();
            // Le timeout sera géré par le composant parent
          }
        }, 1000);
        
        set({ 
          timerActive: true, 
          timeRemaining: timerDuration,
          timerId: newTimerId 
        });
      },
      
      stopTimer: () => {
        const { timerId } = get();
        if (timerId) {
          clearInterval(timerId);
        }
        set({ 
          timerActive: false, 
          timerId: undefined 
        });
      },
      
      resetTimer: () => {
        const { timerId, timerDuration } = get();
        if (timerId) {
          clearInterval(timerId);
        }
        set({ 
          timerActive: false, 
          timeRemaining: timerDuration,
          timerId: undefined 
        });
      },
      
      tickTimer: () => {
        const { timeRemaining, timerActive } = get();
        if (timerActive && timeRemaining > 0) {
          set({ timeRemaining: timeRemaining - 1 });
        }
      },
      
      accelerateTimer: (seconds: number) => {
        const { timeRemaining, timerActive } = get();
        if (timerActive && timeRemaining > 0) {
          const newTimeRemaining = Math.max(0, timeRemaining - seconds);
          set({ timeRemaining: newTimeRemaining });
        }
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
