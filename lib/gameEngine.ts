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

export function rollDice(): DiceRoll {
  const d10a = Math.floor(Math.random() * 11);
  const d10b = Math.floor(Math.random() * 11);
  const d6 = Math.floor(Math.random() * 6) + 1;
  
  return { d10a, d10b, d6 };
}

export function calculateCompositions(dice: DiceRoll): Composition[] {
  const { d10a, d10b, d6 } = dice;
  const compositions: Composition[] = [];
  const seen = new Set<number>();

  const addComposition = (value: number, formula: string, description: string) => {
    if (value >= 1 && value <= 101 && !seen.has(value)) {
      seen.add(value);
      compositions.push({ value, formula, description });
    }
  };

  if (d10a !== 0) {
    addComposition(d10a, `${d10a}`, `D10a seul: ${d10a}`);
  }
  if (d10b !== 0) {
    addComposition(d10b, `${d10b}`, `D10b seul: ${d10b}`);
  }
  addComposition(d6, `${d6}`, `D6 seul: ${d6}`);

  if (d10a !== 0 && d10b !== 0) {
    const juxtaAB = parseInt(`${d10a}${d10b}`);
    addComposition(juxtaAB, `${d10a}${d10b}`, `Juxtaposition D10a+D10b: ${d10a}${d10b}`);
    
    const juxtaBA = parseInt(`${d10b}${d10a}`);
    addComposition(juxtaBA, `${d10b}${d10a}`, `Juxtaposition D10b+D10a: ${d10b}${d10a}`);
  }

  if (d10a !== 0) {
    const juxtaA6 = parseInt(`${d10a}${d6}`);
    addComposition(juxtaA6, `${d10a}${d6}`, `Juxtaposition D10a+D6: ${d10a}${d6}`);
  }

  if (d10b !== 0) {
    const juxtaB6 = parseInt(`${d10b}${d6}`);
    addComposition(juxtaB6, `${d10b}${d6}`, `Juxtaposition D10b+D6: ${d10b}${d6}`);
  }

  if (d10a !== 0) {
    const juxta6A = parseInt(`${d6}${d10a}`);
    addComposition(juxta6A, `${d6}${d10a}`, `Juxtaposition D6+D10a: ${d6}${d10a}`);
  }

  if (d10b !== 0) {
    const juxta6B = parseInt(`${d6}${d10b}`);
    addComposition(juxta6B, `${d6}${d10b}`, `Juxtaposition D6+D10b: ${d6}${d10b}`);
  }

  addComposition(d10a + d10b, `${d10a}+${d10b}`, `Addition D10a+D10b: ${d10a}+${d10b}=${d10a + d10b}`);
  addComposition(d10a + d6, `${d10a}+${d6}`, `Addition D10a+D6: ${d10a}+${d6}=${d10a + d6}`);
  addComposition(d10b + d6, `${d10b}+${d6}`, `Addition D10b+D6: ${d10b}+${d6}=${d10b + d6}`);
  addComposition(d10a + d10b + d6, `${d10a}+${d10b}+${d6}`, `Addition des 3 dés: ${d10a}+${d10b}+${d6}=${d10a + d10b + d6}`);

  compositions.sort((a, b) => a.value - b.value);
  
  return compositions;
}

export interface ScoreCalculation {
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  isPrefecture: boolean;
  indicesUsed: number;
}

export function calculateScore(
  indicesUsed: number,
  isPrefecture: boolean,
  isCorrect: boolean
): ScoreCalculation {
  if (!isCorrect) {
    return {
      basePoints: -500,
      bonusPoints: 0,
      totalPoints: -500,
      isPrefecture: false,
      indicesUsed,
    };
  }

  let basePoints = 0;
  switch (indicesUsed) {
    case 0:
      basePoints = 1000;
      break;
    case 1:
      basePoints = 500;
      break;
    case 2:
      basePoints = 250;
      break;
    case 3:
      basePoints = 100;
      break;
    default:
      basePoints = 0;
  }

  const bonusPoints = isPrefecture ? 500 : 0;
  const totalPoints = basePoints + bonusPoints;

  return {
    basePoints,
    bonusPoints,
    totalPoints,
    isPrefecture,
    indicesUsed,
  };
}

export function canAfford(playerMoney: number, cost: number): boolean {
  return playerMoney >= cost;
}

export function isPlayerEliminated(
  playerMoney: number,
  ownedSouvenirCards: number
): boolean {
  if (playerMoney >= 0) return false;
  if (ownedSouvenirCards >= 2) return false;
  return true;
}

export function calculateSouvenirCardsCount(
  cards: Array<{ type: string; isFaceUp: boolean }>
): number {
  return cards.filter((c) => c.type === 'souvenir' && !c.isFaceUp).length;
}

export function shouldCreateChampionCard(souvenirCount: number): boolean {
  return souvenirCount === 10 || souvenirCount === 20 || souvenirCount === 30;
}

export function canSellSouvenirs(souvenirCount: number): boolean {
  return souvenirCount >= 2;
}

export function generateGameCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

