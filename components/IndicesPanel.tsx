import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import type { Department } from '@/types';

interface IndicesPanelProps {
  department: Department | null;
  revealedIndices: number[];
  onRevealIndex: (index: number) => void;
  disabled?: boolean;
}

export function IndicesPanel({
  department,
  revealedIndices,
  onRevealIndex,
  disabled = false,
}: IndicesPanelProps) {
  if (!department) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Indices</h3>
        <p className="text-gray-500 text-sm">Choisissez un nombre pour voir les indices</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Indices disponibles</h3>
      <div className="space-y-3">
        {department.indices.map((indice, index) => {
          const isRevealed = revealedIndices.includes(index);

          return (
            <div
              key={index}
              className={`p-3 rounded border ${
                isRevealed ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">Indice {index + 1}</div>
                  {isRevealed ? (
                    <p className="text-sm">{indice}</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Cliquez pour révéler</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={isRevealed ? 'ghost' : 'outline'}
                  onClick={() => onRevealIndex(index)}
                  disabled={disabled || isRevealed}
                >
                  {isRevealed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
        <p className="text-xs text-yellow-800">
          <strong>Barème:</strong> 0 indice = 1000pts | 1 indice = 500pts | 2 indices = 250pts | 3
          indices = 100pts
        </p>
      </div>
    </div>
  );
}

