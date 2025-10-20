import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface FranceMapProps {
  currentDepartmentNumber?: string;
  highlightedDepartments?: string[];
}

export const FranceMap: React.FC<FranceMapProps> = ({ 
  currentDepartmentNumber, 
  highlightedDepartments = [] 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="btn-gaming px-4 py-3 text-white rounded-xl font-bold transition-all shadow-2xl animate-glow-pulse flex items-center gap-2"
        >
          🗺️ Carte de France
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`${
        isExpanded 
          ? 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in' 
          : 'card-gaming p-6 shadow-2xl animate-slide-in-right'
      }`}>
        {isExpanded && (
          <div className="absolute inset-0" onClick={() => setIsExpanded(false)} />
        )}
        
        <div className={`${
          isExpanded 
            ? 'card-gaming p-8 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative z-10' 
            : 'relative'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent glow-text flex items-center gap-2">
              🗺️ CARTE DE FRANCE
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-purple-400 hover:text-purple-300 transition-colors p-2"
                title={isExpanded ? "Réduire" : "Agrandir"}
              >
                {isExpanded ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
                title="Minimiser"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {currentDepartmentNumber && (
            <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border-2 border-cyan-500/50 animate-glow-pulse">
              <p className="text-white font-bold text-center">
                Département recherché : <span className="text-3xl text-cyan-300">{currentDepartmentNumber}</span>
              </p>
            </div>
          )}

          {highlightedDepartments.length > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border-2 border-purple-500/50">
              <p className="text-purple-300 font-bold text-sm">
                💳 Départements gagnés : {highlightedDepartments.join(', ')}
              </p>
            </div>
          )}

          <div className="relative bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border-2 border-purple-500/30 p-4 overflow-auto custom-scrollbar">
            {/* Conteneur pour l'image de la carte */}
            <div className="relative min-h-[400px] flex items-center justify-center w-full">
              <div className="relative w-full h-full min-h-[400px]">
                <Image
                  src="/assets/images/carte-france-departements.png"
                  alt="Carte de France avec numéros des départements par région"
                  fill
                  className="object-contain"
                  onError={() => {
                    // Placeholder sera affiché si l'image n'existe pas
                  }}
                />
              </div>
            </div>

            {/* Légende des régions - Affichée uniquement en mode agrandi */}
            {isExpanded && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#D896D8' }}></div>
                  <span className="text-white text-xs font-bold">Île-de-France</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#5DD5F5' }}></div>
                  <span className="text-white text-xs font-bold">Hauts-de-France</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4CAF50' }}></div>
                  <span className="text-white text-xs font-bold">Grand Est</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2E8B57' }}></div>
                  <span className="text-white text-xs font-bold">Normandie</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2C5F4F' }}></div>
                  <span className="text-white text-xs font-bold">Bretagne</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#C89AD8' }}></div>
                  <span className="text-white text-xs font-bold">Pays de la Loire</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3D5A4C' }}></div>
                  <span className="text-white text-xs font-bold">Centre-Val de Loire</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#6CB4E8' }}></div>
                  <span className="text-white text-xs font-bold">Bourgogne-Franche-Comté</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2F5D50' }}></div>
                  <span className="text-white text-xs font-bold">Nouvelle-Aquitaine</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3A5F52' }}></div>
                  <span className="text-white text-xs font-bold">Auvergne-Rhône-Alpes</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#5DD5F5' }}></div>
                  <span className="text-white text-xs font-bold">Occitanie</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4CAF50' }}></div>
                  <span className="text-white text-xs font-bold">Provence-Alpes-Côte d&apos;Azur</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3A5F52' }}></div>
                  <span className="text-white text-xs font-bold">Corse</span>
                </div>
              </div>
            )}

            {/* Astuce - Affichée uniquement en mode réduit */}
            {!isExpanded && (
              <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/50">
                <p className="text-yellow-300 text-xs font-bold text-center">
                  💡 Astuce : Cliquez sur <Maximize2 className="w-3 h-3 inline" /> pour voir la carte en grand écran !
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FranceMap;

