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
      <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">
          Lancez les dés pour voir les compositions possibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Compositions possibles
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
                p-4 rounded-lg border-2 transition-all duration-200
                ${isAvailable 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' 
                  : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
                }
                ${disabled || !isAvailable 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'cursor-pointer hover:scale-105'
                }
              `}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {composition}
                </div>
                {!isAvailable && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">
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
