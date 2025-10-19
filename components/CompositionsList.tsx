import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Composition } from '@/types';

interface CompositionsListProps {
  compositions: Composition[];
  onSelect: (value: number) => void;
  disabled?: boolean;
}

export function CompositionsList({ compositions, onSelect, disabled = false }: CompositionsListProps) {
  if (compositions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Lancez les dés pour voir les compositions possibles
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4">Compositions possibles ({compositions.length})</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
        {compositions.map((comp, index) => (
          <motion.div
            key={`${comp.value}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant="outline"
              className="w-full flex flex-col items-center justify-center h-auto py-3 hover:bg-blue-50"
              onClick={() => onSelect(comp.value)}
              disabled={disabled}
            >
              <div className="text-2xl font-bold text-blue-600">{comp.value}</div>
              <div className="text-xs text-gray-600 mt-1">{comp.formula}</div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

