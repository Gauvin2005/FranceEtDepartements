import React from 'react';

interface CompositionChoicesProps {
  compositions: string[];
  availableDepartments: string[];
  onSelectComposition: (numero: string) => void;
  disabled?: boolean;
}

export const CompositionChoices: React.FC<CompositionChoicesProps> = ({
  compositions,
  availableDepartments,
  onSelectComposition,
  disabled = false
}) => {
  // Filtrer les compositions disponibles
  const availableCompositions = compositions.filter(comp => 
    availableDepartments.includes(comp)
  );

  const handleSelectComposition = (numero: string) => {
    if (!disabled) {
      onSelectComposition(numero);
    }
  };

  if (compositions.length === 0) {
    return (
      <div className="text-center p-8 card-gaming">
        <p className="text-purple-300/80 text-lg">
          🎲 Lancez les dés pour voir les compositions possibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        🎯 Compositions possibles
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableCompositions.map((composition) => {
          const isAvailable = availableDepartments.includes(composition);
          
          return (
            <button
              key={composition}
              onClick={() => handleSelectComposition(composition)}
              disabled={disabled || !isAvailable}
              className={`
                relative p-5 rounded-xl border-2 transition-all duration-300 group overflow-hidden
                ${isAvailable 
                  ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/30' 
                  : 'border-red-500/30 bg-gray-800/50 opacity-50'
                }
                ${disabled || !isAvailable 
                  ? 'cursor-not-allowed' 
                  : 'cursor-pointer hover:scale-110 hover:-translate-y-1'
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/20 group-hover:to-cyan-600/20 transition-all duration-300"></div>
              <div className="text-center relative z-10">
                <div className={`text-3xl font-black ${isAvailable ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300' : 'text-red-500'}`}>
                  {composition}
                </div>
                {!isAvailable && (
                  <div className="text-xs text-red-400 font-semibold mt-1">
                    Déjà pris
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {availableCompositions.length === 0 && compositions.length > 0 && (
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            Aucune composition disponible. Tous les départements correspondants ont déjà été pris.
          </p>
        </div>
      )}

      {compositions.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {availableCompositions.length} composition(s) disponible(s) sur {compositions.length} possible(s)
        </div>
      )}
    </div>
  );
};

export default CompositionChoices;
