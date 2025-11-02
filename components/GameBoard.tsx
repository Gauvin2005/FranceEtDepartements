import React, { useState, useEffect, useCallback } from 'react';
import { Player } from '../store/gameStore';
import Dice from './Dice';

interface GameBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  gameStarted: boolean;
  onMovePlayer: (playerId: number, newPosition: number) => void;
  onUpdateScore: (playerId: number, points: number) => void;
  onLoseSouvenir: (playerId: number) => void;
  onAddChampionCard: (playerId: number) => void;
  onSellSouvenir: (playerId: number) => void;
  onStealAttempt: (fromPlayerId: number, toPlayerId: number) => void;
  onStartQuiz: () => void;
  onStartNeutralDice: () => void;
  onMoveComplete: () => void; // Callback quand le mouvement est terminé
  onPassTurn: () => void; // Passer au tour suivant
  isMyTurn: boolean;
}

interface BoardCase {
  id: number;
  label: string;
  type: 'start' | 'ordinary' | 'bonus' | 'malus';
  effect?: {
    points?: number;
    loseSouvenir?: number;
  };
  lore?: string;
}

const TOTAL_CASES = 24;

// Définition du plateau avec 24 cases
const boardCases: BoardCase[] = [
  { id: 0, label: 'Départ', type: 'start', lore: 'Case de départ - +10 000 points à tous les joueurs' },
  { id: 1, label: 'Case 1', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 2, label: 'Case 2', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 3, label: 'Bonus', type: 'bonus', effect: { points: 3000 }, lore: 'Gain de points !' },
  { id: 4, label: 'Case 4', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 5, label: 'Malus', type: 'malus', effect: { points: -2000 }, lore: 'Perte de points' },
  { id: 6, label: 'Case 6', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 7, label: 'Bonus', type: 'bonus', effect: { points: 5000 }, lore: 'Gain de points !' },
  { id: 8, label: 'Case 8', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 9, label: 'Case 9', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 10, label: 'Malus', type: 'malus', effect: { loseSouvenir: 1 }, lore: 'Perte d\'un souvenir' },
  { id: 11, label: 'Case 11', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 12, label: 'Bonus', type: 'bonus', effect: { points: 4000 }, lore: 'Gain de points !' },
  { id: 13, label: 'Case 13', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 14, label: 'Case 14', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 15, label: 'Malus', type: 'malus', effect: { points: -3000 }, lore: 'Perte de points' },
  { id: 16, label: 'Case 16', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 17, label: 'Bonus', type: 'bonus', effect: { points: 6000 }, lore: 'Gain de points !' },
  { id: 18, label: 'Case 18', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 19, label: 'Case 19', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 20, label: 'Malus', type: 'malus', effect: { points: -4000 }, lore: 'Perte de points' },
  { id: 21, label: 'Case 21', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
  { id: 22, label: 'Bonus', type: 'bonus', effect: { points: 8000 }, lore: 'Gain de points !' },
  { id: 23, label: 'Case 23', type: 'ordinary', lore: 'Lancez les dés de composition quand vous êtes prêt' },
];

const GameBoard: React.FC<GameBoardProps> = ({
  players,
  currentPlayerIndex,
  gameStarted,
  onMovePlayer,
  onUpdateScore,
  onLoseSouvenir,
  onAddChampionCard,
  onSellSouvenir,
  onStealAttempt,
  onStartQuiz,
  onStartNeutralDice,
  onMoveComplete,
  onPassTurn,
  isMyTurn,
}) => {
  const [moveDice, setMoveDice] = useState<number | null>(null);
  const [isRollingMoveDice, setIsRollingMoveDice] = useState(false);
  const [showStealChoice, setShowStealChoice] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [firstTurn, setFirstTurn] = useState<Set<number>>(new Set());
  const [hasMovedThisTurn, setHasMovedThisTurn] = useState(false);
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number | null>(null); // Case actuelle après déplacement
  const [caseEffectApplied, setCaseEffectApplied] = useState(false); // Si l'effet a été appliqué

  // Réinitialiser le dé de déplacement quand le joueur change
  useEffect(() => {
    setMoveDice(null);
    setIsRollingMoveDice(false);
    setShowStealChoice(false);
    setHasMovedThisTurn(false);
    setCurrentCaseIndex(null);
    setCaseEffectApplied(false);
  }, [currentPlayerIndex]);

  // Initialiser les positions depuis le store si nécessaire
  useEffect(() => {
    if (gameStarted) {
      // S'assurer que tous les joueurs ont une position
      const playersWithoutPosition = players.filter(p => p.position === undefined);
      if (playersWithoutPosition.length > 0) {
        playersWithoutPosition.forEach(player => {
          onMovePlayer(player.id, 0);
        });
      }
    }
  }, [gameStarted, players, onMovePlayer]);

  // Obtenir la position d'un joueur depuis le store
  const getPlayerPosition = useCallback((playerId: number): number => {
    const player = players.find(p => p.id === playerId);
    return player?.position ?? 0;
  }, [players]);

  // Obtenir la couleur d'un joueur (fixe selon son ID)
  const getPlayerColor = useCallback((playerId: number): string => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
    ];
    // Utiliser l'ID du joueur pour une couleur fixe (ID commence à 1, donc -1 pour l'index)
    return colors[(playerId - 1) % colors.length];
  }, []);

  // Calculer les positions pour affichage rectangulaire en serpent
  const getCasePosition = (caseIndex: number) => {
    // Disposition en serpent : 6 colonnes x 4 lignes
    const cols = 6;
    const row = Math.floor(caseIndex / cols);
    const col = caseIndex % cols;
    // Alternance gauche-droite pour effet serpent
    const finalCol = row % 2 === 0 ? col : (cols - 1 - col);
    return { row, col: finalCol, x: finalCol * 80, y: row * 80 };
  };

  // Obtenir la case actuelle d'un joueur
  const getCurrentCase = (playerId: number): BoardCase => {
    const position = getPlayerPosition(playerId);
    return boardCases[position];
  };

  // Gérer les transactions (points, cartes) - définie en premier pour éviter dépendances circulaires
  const handleTransaction = useCallback((
    player: Player,
    effect: { points?: number; loseSouvenir?: number },
    caseLabel: string
  ) => {
    if (effect.points !== undefined) {
      if (effect.points < 0 && player.score + effect.points < 0) {
        // Vérifier si le joueur peut payer
        if (player.souvenirCards.length < 2) {
          setCurrentEvent(`❌ ${player.name} est éliminé ! Pas assez de points et moins de 2 souvenirs.`);
          // TODO: Éliminer le joueur
          return;
        } else {
          // Forcer la vente de 2 souvenirs
          onSellSouvenir(player.id);
          setCurrentEvent(`⚠️ ${player.name} a dû vendre 2 souvenirs pour payer !`);
        }
      } else {
        onUpdateScore(player.id, effect.points);
        const sign = effect.points > 0 ? '+' : '';
        setCurrentEvent(`${caseLabel}: ${sign}${effect.points.toLocaleString()} points`);
      }
    }

    if (effect.loseSouvenir && effect.loseSouvenir > 0) {
      if (player.souvenirCards.length >= effect.loseSouvenir) {
        for (let i = 0; i < effect.loseSouvenir; i++) {
          onLoseSouvenir(player.id);
        }
        setCurrentEvent(`${caseLabel}: ${effect.loseSouvenir} souvenir(s) perdu(s)`);
      } else {
        setCurrentEvent(`${caseLabel}: Pas assez de souvenirs à perdre`);
      }
    }

    setTimeout(() => setCurrentEvent(null), 3000);
  }, [onUpdateScore, onLoseSouvenir, onSellSouvenir]);

  // Gérer l'effet de la case (sans lancer automatiquement les dés)
  const handleCaseAction = useCallback((caseIndex: number, player: Player) => {
    const caseData = boardCases[caseIndex];

    if (!caseData) return;

    // Enregistrer la case actuelle (pour afficher les boutons appropriés)
    setCurrentCaseIndex(caseIndex);

    // Case départ - ne fait rien quand on passe dessus (déjà géré au début)
    if (caseData.type === 'start') {
      // On ne fait rien, juste afficher un message
      setCurrentEvent(`📍 Case départ - Aucun effet`);
      setTimeout(() => setCurrentEvent(null), 2000);
      return;
    }

    // Cases bonus/malus - appliquer les effets automatiquement
    if ((caseData.type === 'bonus' || caseData.type === 'malus') && caseData.effect) {
      handleTransaction(player, caseData.effect, caseData.label);
      setCaseEffectApplied(true);
      return;
    }

    // Cases ordinaires - NE PAS lancer automatiquement, juste afficher un message
    if (caseData.type === 'ordinary') {
      setCurrentEvent(`📍 Case ordinaire - Lancez les dés quand vous êtes prêt`);
      setTimeout(() => setCurrentEvent(null), 2000);
      // Ne pas lancer automatiquement, le joueur le fera manuellement
      return;
    }
  }, [handleTransaction]);

  // Gérer le déplacement
  const handleMove = useCallback((steps: number) => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer) return;

    const currentPos = getPlayerPosition(currentPlayer.id);
    const newPos = (currentPos + steps) % TOTAL_CASES;
    
    // Mettre à jour la position dans le store
    onMovePlayer(currentPlayer.id, newPos);
    
    // Marquer que le mouvement est terminé
    setHasMovedThisTurn(true);
    
    // Notifier que le mouvement est complet (pour débloquer les dés de composition)
    onMoveComplete();

    // Déclencher l'effet de la case après un court délai
    setTimeout(() => {
      handleCaseAction(newPos, currentPlayer);
    }, 500);
  }, [currentPlayerIndex, players, onMovePlayer, handleCaseAction, getPlayerPosition, onMoveComplete]);

  // Lancer le dé de déplacement (d6)
  const rollMoveDice = useCallback(() => {
    setIsRollingMoveDice(true);
    setMoveDice(null);
    setShowStealChoice(false);
    
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setMoveDice(result);
      setIsRollingMoveDice(false);

      const currentPlayer = players[currentPlayerIndex];
      if (!currentPlayer) return;

      // Si résultat = 6, proposer vol ou avancer
      if (result === 6) {
        setShowStealChoice(true);
      } else {
        handleMove(result);
      }
    }, 1500);
  }, [currentPlayerIndex, players, handleMove]);

  // Gérer le vol de carte
  const handleStealChoice = useCallback((choice: 'steal' | 'move') => {
    setShowStealChoice(false);
    
    if (choice === 'steal') {
      // Trouver un autre joueur avec des souvenirs
      const currentPlayer = players[currentPlayerIndex];
      const targetPlayer = players.find(p => 
        p.id !== currentPlayer.id && p.souvenirCards.length > 0
      );

      if (targetPlayer) {
        onStealAttempt(targetPlayer.id, currentPlayer.id);
        setCurrentEvent(`🎴 Tentative de vol sur ${targetPlayer.name}...`);
      } else {
        setCurrentEvent(`⚠️ Aucun joueur avec des souvenirs à voler`);
        handleMove(6); // Avancer normalement si personne à voler
      }
    } else {
      handleMove(6);
    }
  }, [currentPlayerIndex, players, onStealAttempt, handleMove]);

  // Vérifier les cartes Champion (tous les 10 souvenirs)
  useEffect(() => {
    players.forEach(player => {
      const souvenirCount = player.souvenirCards.length;
      const expectedChampionCards = Math.floor(souvenirCount / 10);
      
      if (expectedChampionCards > player.championCards) {
        const missing = expectedChampionCards - player.championCards;
        for (let i = 0; i < missing; i++) {
          onAddChampionCard(player.id);
        }
      }
    });
  }, [players, onAddChampionCard]);

  // Couleurs selon le type de case
  const getCaseColor = (type: BoardCase['type']) => {
    switch (type) {
      case 'start': return 'bg-yellow-500 border-yellow-400';
      case 'ordinary': return 'bg-gray-500 border-gray-400';
      case 'bonus': return 'bg-green-500 border-green-400';
      case 'malus': return 'bg-red-500 border-red-400';
      default: return 'bg-gray-500 border-gray-400';
    }
  };

  const currentPlayer = players[currentPlayerIndex];

  if (!gameStarted) {
    return (
      <div className="card-gaming p-8 text-center">
        <p className="text-white text-lg">Le plateau apparaîtra une fois la partie démarrée.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Zone d'événements */}
      {currentEvent && (
        <div className="card-gaming p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/50 rounded-xl animate-pulse">
          <p className="text-white font-bold text-center text-lg">{currentEvent}</p>
        </div>
      )}

      {/* Informations du joueur actuel */}
      {currentPlayer && (
        <div className="card-gaming p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-purple-300 mb-1">Joueur</div>
              <div className="text-lg font-bold text-white">{currentPlayer.name}</div>
            </div>
            <div>
              <div className="text-xs text-purple-300 mb-1">Position</div>
              <div className="text-lg font-bold text-cyan-400">
                Case {getPlayerPosition(currentPlayer.id)}
              </div>
            </div>
            <div>
              <div className="text-xs text-purple-300 mb-1">Score</div>
              <div className="text-lg font-bold text-green-400">
                {currentPlayer.score.toLocaleString()} pts
              </div>
            </div>
            <div>
              <div className="text-xs text-purple-300 mb-1">Souvenirs</div>
              <div className="text-lg font-bold text-purple-400">
                💳 {currentPlayer.souvenirCards.length} | 🏆 {currentPlayer.championCards}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contrôles de jeu - Dé de déplacement */}
      {isMyTurn && currentPlayer && !hasMovedThisTurn && (
        <div className="card-gaming p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Tour de {currentPlayer.name} - Étape 1 : Lancer le dé de déplacement
          </h3>

          {/* Dé de déplacement */}
          <div className="flex flex-col items-center space-y-4">
            {moveDice !== null && !isRollingMoveDice && !showStealChoice && (
              <div className="text-2xl font-bold text-white mb-4">
                Résultat : <span className="text-cyan-400">{moveDice}</span>
              </div>
            )}

            {!isRollingMoveDice && moveDice === null && (
              <button
                onClick={rollMoveDice}
                className="btn-gaming px-8 py-4 text-white rounded-xl font-bold text-xl transition-all shadow-2xl hover:scale-105"
              >
                🎲 Lancer le dé de déplacement (d6)
              </button>
            )}

            {isRollingMoveDice && (
              <div className="flex flex-col items-center space-y-4">
                <Dice value={moveDice || 6} isRolling={true} size="lg" type="d6" />
                <p className="text-white font-semibold animate-pulse">Lancement en cours...</p>
              </div>
            )}

            {/* Choix vol vs avancer */}
            {showStealChoice && moveDice === 6 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border-2 border-orange-500/50">
                <p className="text-white font-bold mb-4 text-center">
                  🎲 Vous avez fait 6 ! Choisissez :
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleStealChoice('steal')}
                    className="btn-gaming px-6 py-3 text-white rounded-lg font-bold transition-all hover:scale-105"
                  >
                    🎴 Tenter un vol
                  </button>
                  <button
                    onClick={() => handleStealChoice('move')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-bold transition-all hover:scale-105"
                  >
                    ➡️ Avancer de 6
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {hasMovedThisTurn && (
            <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border-2 border-green-500/50">
              <p className="text-white font-bold text-center">
                ✅ Déplacement effectué ! Vous pouvez maintenant lancer les dés pour le quiz.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Informations sur la case actuelle */}
      {isMyTurn && currentPlayer && hasMovedThisTurn && currentCaseIndex !== null && (
        <div className="card-gaming p-4">
          {(() => {
            const caseData = boardCases[currentCaseIndex];
            if (!caseData) return null;

            if (caseData.type === 'ordinary') {
              return (
                <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-2 border-gray-500/50 rounded-xl p-4">
                  {moveDice !== null && (
                    <div className="mb-3 pb-3 border-b border-gray-500/30">
                      <p className="text-white font-semibold text-center text-sm mb-1">
                        🎲 Dé de déplacement : <span className="text-cyan-400 font-bold text-lg">{moveDice}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-white font-bold text-center mb-2">
                    📍 Case ordinaire : {caseData.label}
                  </p>
                  <p className="text-gray-300 text-sm text-center mb-3">
                    Vous pouvez maintenant lancer les dés de composition quand vous êtes prêt.
                  </p>
                </div>
              );
            }

            if (caseData.type === 'bonus') {
              return (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-4">
                  {moveDice !== null && (
                    <div className="mb-3 pb-3 border-b border-green-500/30">
                      <p className="text-white font-semibold text-center text-sm mb-1">
                        🎲 Dé de déplacement : <span className="text-cyan-400 font-bold text-lg">{moveDice}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-white font-bold text-center mb-2">
                    ✅ Bonus appliqué : {caseData.label}
                  </p>
                  {caseData.effect?.points && (
                    <p className="text-green-300 text-center font-semibold mb-3">
                      +{caseData.effect.points.toLocaleString()} points
                    </p>
                  )}
                  <button
                    onClick={onPassTurn}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-bold transition-all shadow-lg hover:scale-105"
                  >
                    ⏭️ Passer au tour suivant
                  </button>
                </div>
              );
            }

            if (caseData.type === 'malus') {
              return (
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-4">
                  {moveDice !== null && (
                    <div className="mb-3 pb-3 border-b border-red-500/30">
                      <p className="text-white font-semibold text-center text-sm mb-1">
                        🎲 Dé de déplacement : <span className="text-cyan-400 font-bold text-lg">{moveDice}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-white font-bold text-center mb-2">
                    ❌ Malus appliqué : {caseData.label}
                  </p>
                  {caseData.effect?.points && (
                    <p className="text-red-300 text-center font-semibold mb-3">
                      {caseData.effect.points.toLocaleString()} points
                    </p>
                  )}
                  {caseData.effect?.loseSouvenir && (
                    <p className="text-red-300 text-center font-semibold mb-3">
                      -{caseData.effect.loseSouvenir} souvenir(s)
                    </p>
                  )}
                  <button
                    onClick={onPassTurn}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-bold transition-all shadow-lg hover:scale-105"
                  >
                    ⏭️ Passer au tour suivant
                  </button>
                </div>
              );
            }

            if (caseData.type === 'start') {
              return (
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-4">
                  {moveDice !== null && (
                    <div className="mb-3 pb-3 border-b border-yellow-500/30">
                      <p className="text-white font-semibold text-center text-sm mb-1">
                        🎲 Dé de déplacement : <span className="text-cyan-400 font-bold text-lg">{moveDice}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-white font-bold text-center">
                    📍 Case départ - Aucun effet à appliquer
                  </p>
                </div>
              );
            }

            return null;
          })()}
        </div>
      )}

      {isMyTurn && currentPlayer && hasMovedThisTurn && currentCaseIndex === null && (
        <div className="card-gaming p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50">
          {moveDice !== null && (
            <p className="text-white font-semibold text-center mb-2">
              🎲 Dé de déplacement : <span className="text-cyan-400 font-bold text-lg">{moveDice}</span>
            </p>
          )}
          <p className="text-white font-bold text-center">
            ✅ Déplacement terminé ! Vous pouvez maintenant utiliser les dés de composition ci-dessous.
          </p>
        </div>
      )}

      {/* Plateau rectangulaire en serpent */}
      <div className="card-gaming p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Plateau de jeu</h3>
        
        <div className="flex justify-center">
          <div className="relative" style={{ width: '520px', minHeight: '400px' }}>
            {/* Layer 1: Cases uniquement - Disposition en grille 6x4 avec positions absolues */}
            {boardCases.map((caseData, index) => {
              const { row, col } = getCasePosition(index);
              const caseSize = 80;
              const gap = 8;
              const left = col * (caseSize + gap);
              const top = row * (caseSize + gap);

              return (
                <div
                  key={`case-${caseData.id}`}
                  className="absolute"
                  style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${caseSize}px`,
                    height: `${caseSize}px`,
                    zIndex: 10,
                  }}
                >
                  {/* Case */}
                  <div
                    className={`
                      w-full h-full rounded-lg border-2 flex flex-col items-center justify-between
                      ${getCaseColor(caseData.type)}
                      transition-all hover:scale-110
                      shadow-lg
                      p-1 relative
                    `}
                    title={`${caseData.label} - ${caseData.lore}`}
                  >
                    {/* Zone pour les pions en haut/centre */}
                    <div className="w-full flex-1 flex items-center justify-center"></div>
                    
                    {/* Numéro de la case en bas */}
                    <span className="text-white font-bold text-sm text-center flex-shrink-0 z-10 relative bg-black/30 px-1 rounded">
                      {caseData.id}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Layer 2: Pions uniquement - au-dessus de tout */}
            {boardCases.map((caseData, index) => {
              const playersOnCase = players.filter(
                p => getPlayerPosition(p.id) === index
              );

              if (playersOnCase.length === 0) return null;

              const { row, col } = getCasePosition(index);
              const caseSize = 80;
              const gap = 8;
              const caseLeft = col * (caseSize + gap);
              const caseTop = row * (caseSize + gap);
              
              // Calculer la taille des pions selon l'espace disponible
              const pawnCount = playersOnCase.length;
              const basePawnSize = 28; // Taille de base (w-7 = 28px)
              const minPawnSize = 16; // Taille minimale
              
              // Padding pour éviter que les pions touchent les bords
              const padding = 6; // 3px de chaque côté
              const availableWidth = caseSize - (padding * 2);
              const availableHeight = caseSize - (padding * 2);
              
              // Espacement minimal entre les pions
              const minGap = 3;
              
              // Calculer la taille optimale
              let pawnSize = basePawnSize;
              let gapBetween = minGap;
              
              // Calculer la largeur totale nécessaire avec la taille de base
              const totalWidthNeeded = (pawnCount * basePawnSize) + ((pawnCount - 1) * minGap);
              
              // Si les pions dépassent ou touchent les bords, réduire
              if (totalWidthNeeded > availableWidth || pawnCount > 2) {
                // Calculer la taille maximale possible
                const maxWidthForPawns = availableWidth - ((pawnCount - 1) * minGap);
                const calculatedSize = Math.max(minPawnSize, Math.floor(maxWidthForPawns / pawnCount));
                pawnSize = calculatedSize;
                
                // Ajuster l'espacement pour centrer
                const remainingSpace = availableWidth - (pawnCount * pawnSize);
                gapBetween = pawnCount > 1 ? Math.max(minGap, Math.floor(remainingSpace / (pawnCount - 1))) : 0;
              }
              
              // Vérifier aussi la hauteur (un seul pion ne devrait pas toucher le haut/bas)
              if (pawnCount === 1 && pawnSize > availableHeight) {
                pawnSize = Math.min(pawnSize, availableHeight);
              }
              
              // Positionner les pions au centre vertical et horizontal de la case
              // Le numéro est en bas donc les pions ne le masquent pas
              const totalPawnsWidth = (pawnCount * pawnSize) + ((pawnCount - 1) * gapBetween);
              const startLeft = caseLeft + (caseSize - totalPawnsWidth) / 2;
              // Centrer verticalement mais laisser de l'espace en bas pour le numéro (environ 20px)
              const startTop = caseTop + (caseSize - pawnSize - 20) / 2;

              return (
                <div
                  key={`pawns-${caseData.id}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${startLeft}px`,
                    top: `${startTop}px`,
                    zIndex: 100,
                  }}
                >
                  <div 
                    className="flex pointer-events-auto"
                    style={{ gap: `${gapBetween}px` }}
                  >
                    {playersOnCase.map((player, idx) => {
                      return (
                        <div
                          key={player.id}
                          className={`
                            rounded-full border-2 border-white
                            ${getPlayerColor(player.id)}
                            transition-all duration-300 ease-in-out
                            shadow-lg
                            hover:scale-110
                            cursor-pointer
                          `}
                          style={{ 
                            width: `${pawnSize}px`,
                            height: `${pawnSize}px`,
                            zIndex: 100 + idx,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                          }}
                          title={`${player.name} - Case ${caseData.id}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Légende */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/50">
            <div className="text-xs text-yellow-300 mb-1">Départ</div>
            <div className="text-xs text-white">+10k pts</div>
          </div>
          <div className="p-3 bg-gray-500/20 rounded-lg border border-gray-500/50">
            <div className="text-xs text-gray-300 mb-1">Ordinaire</div>
            <div className="text-xs text-white">Dés de composition</div>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/50">
            <div className="text-xs text-green-300 mb-1">Bonus</div>
            <div className="text-xs text-white">Gain de points</div>
          </div>
          <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/50">
            <div className="text-xs text-red-300 mb-1">Malus</div>
            <div className="text-xs text-white">Perte points/souvenirs</div>
          </div>
        </div>
      </div>

      {/* Version linéaire responsive (mobile) */}
      <div className="block md:hidden card-gaming p-4">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Plateau (vue mobile)</h3>
        <div className="grid grid-cols-4 gap-2">
          {boardCases.map((caseData) => {
            const playersOnCase = players.filter(
              p => getPlayerPosition(p.id) === caseData.id
            );
            return (
              <div
                key={caseData.id}
                className={`
                  aspect-square rounded-lg border-2 flex flex-col items-center justify-center
                  ${getCaseColor(caseData.type)}
                  relative p-1
                `}
                title={caseData.lore}
              >
                <span className="text-white font-bold text-xs">
                  {caseData.id}
                </span>
                {playersOnCase.length > 0 && (
                  <div 
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex z-20"
                    style={{ 
                      zIndex: 20,
                      gap: playersOnCase.length > 2 ? '2px' : '3px',
                    }}
                  >
                    {playersOnCase.map((player, idx) => {
                      // Taille adaptative pour mobile
                      const mobileSize = playersOnCase.length > 2 ? 6 : 8;
                      return (
                        <div
                          key={player.id}
                          className={`rounded-full border border-white ${getPlayerColor(player.id)} relative`}
                          style={{ 
                            zIndex: 30 + idx,
                            width: `${mobileSize}px`,
                            height: `${mobileSize}px`,
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
