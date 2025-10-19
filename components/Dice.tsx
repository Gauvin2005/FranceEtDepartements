import { motion } from 'framer-motion';
import type { DiceRoll } from '@/types';

interface DiceProps {
  dice: DiceRoll | null;
  isRolling?: boolean;
}

export function Dice({ dice, isRolling = false }: DiceProps) {
  if (!dice) {
    return (
      <div className="flex gap-4 items-center justify-center">
        <div className="w-16 h-16 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center text-2xl font-bold text-gray-400">
          ?
        </div>
        <div className="w-16 h-16 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center text-2xl font-bold text-gray-400">
          ?
        </div>
        <div className="w-16 h-16 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center text-2xl font-bold text-gray-400">
          ?
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <motion.div
        initial={isRolling ? { rotate: 0 } : false}
        animate={isRolling ? { rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-16 h-16 rounded-lg border-2 border-blue-500 bg-blue-100 flex flex-col items-center justify-center shadow-lg"
      >
        <div className="text-xs text-blue-700 font-semibold">D10</div>
        <div className="text-2xl font-bold text-blue-900">{dice.d10a}</div>
      </motion.div>

      <motion.div
        initial={isRolling ? { rotate: 0 } : false}
        animate={isRolling ? { rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="w-16 h-16 rounded-lg border-2 border-green-500 bg-green-100 flex flex-col items-center justify-center shadow-lg"
      >
        <div className="text-xs text-green-700 font-semibold">D10</div>
        <div className="text-2xl font-bold text-green-900">{dice.d10b}</div>
      </motion.div>

      <motion.div
        initial={isRolling ? { rotate: 0 } : false}
        animate={isRolling ? { rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="w-16 h-16 rounded-lg border-2 border-red-500 bg-red-100 flex flex-col items-center justify-center shadow-lg"
      >
        <div className="text-xs text-red-700 font-semibold">D6</div>
        <div className="text-2xl font-bold text-red-900">{dice.d6}</div>
      </motion.div>
    </div>
  );
}

