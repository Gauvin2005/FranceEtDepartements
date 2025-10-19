import { motion } from 'framer-motion';
import { User, Trophy, Coins } from 'lucide-react';
import { formatMoney } from '@/lib/utils';
import type { GamePlayer } from '@/types';

interface PlayersPanelProps {
  players: GamePlayer[];
  currentPlayerId: number;
}

export function PlayersPanel({ players, currentPlayerId }: PlayersPanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">Joueurs</h3>
      {players.map((player, index) => {
        const isCurrentPlayer = player.id === currentPlayerId;
        const displayName = player.user?.pseudo || player.guestPseudo || `Joueur ${index + 1}`;

        return (
          <motion.div
            key={player.id}
            className={`p-4 rounded-lg border-2 transition-colors ${
              isCurrentPlayer
                ? 'border-blue-500 bg-blue-50'
                : player.isEliminated
                ? 'border-red-300 bg-red-50 opacity-60'
                : 'border-gray-300 bg-white'
            }`}
            animate={isCurrentPlayer ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-semibold">{displayName}</span>
                {isCurrentPlayer && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    En jeu
                  </span>
                )}
                {player.isEliminated && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    Eliminé
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span>{formatMoney(player.money)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span>Position: {player.position}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  Cartes: {player.ownedCards?.length || 0}
                </span>
              </div>
            </div>

            {player.ownedCards && player.ownedCards.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <div className="text-xs text-gray-600">
                  Souvenirs:{' '}
                  {player.ownedCards.filter((c) => c.card.type === 'souvenir').length} |
                  Champions:{' '}
                  {player.ownedCards.filter((c) => c.card.type === 'champion').length}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

