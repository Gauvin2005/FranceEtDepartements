import React, { useState, useMemo } from 'react';
import { Maximize2, Minimize2, X, Search } from 'lucide-react';
import styles from './FranceMapStyled.module.css';
import { departments as allDepartments } from '../data/departments';
import { departmentsPaths } from '../data/departmentsPaths';

interface FranceMapStyledProps {
  currentDepartmentNumber?: string;
  highlightedDepartments?: string[];
  compact?: boolean;
  showControls?: boolean;
}

export const FranceMapStyled: React.FC<FranceMapStyledProps> = ({ 
  currentDepartmentNumber, 
  highlightedDepartments = [],
  compact = false,
  showControls = true
}) => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Trouver le département correspondant à la recherche
  const searchedDept = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.toLowerCase().trim();
    return allDepartments.find(dept => 
      dept.name.toLowerCase().includes(term) || 
      dept.numero.toLowerCase().includes(term) ||
      dept.prefecture.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Regrouper les départements par couleur de région (couleurs distinctes pour régions adjacentes)
  const departmentsByRegion: { [key: string]: { color: string; nums: string[] } } = {
    "Nord-Pas-de-Calais": { color: "#FF4444", nums: ["59", "62"] },
    "Picardie": { color: "#44D9E8", nums: ["02", "60", "80"] },
    "Haute-Normandie": { color: "#FFA500", nums: ["27", "76"] },
    "Basse-Normandie": { color: "#FF69B4", nums: ["14", "50", "61"] },
    "Bretagne": { color: "#FFD700", nums: ["22", "29", "35", "56"] },
    "Pays de la Loire": { color: "#32CD32", nums: ["44", "49", "53", "72", "85"] },
    "Centre": { color: "#FF8C69", nums: ["18", "28", "36", "37", "41", "45"] },
    "Bourgogne": { color: "#DC143C", nums: ["21", "58", "71", "89"] },
    "Franche-Comté": { color: "#FF1493", nums: ["25", "39", "70", "90"] },
    "Champagne-Ardenne": { color: "#87CEEB", nums: ["08", "10", "51", "52"] },
    "Lorraine": { color: "#9370DB", nums: ["54", "55", "57", "88"] },
    "Alsace": { color: "#FF6347", nums: ["67", "68"] },
    "Poitou-Charentes": { color: "#DDA0DD", nums: ["16", "17", "79", "86"] },
    "Limousin": { color: "#FF00FF", nums: ["19", "23", "87"] },
    "Aquitaine": { color: "#90EE90", nums: ["24", "33", "40", "47", "64"] },
    "Midi-Pyrénées": { color: "#DDA0FF", nums: ["09", "12", "31", "32", "46", "65", "81", "82"] },
    "Auvergne": { color: "#D2691E", nums: ["03", "15", "43", "63"] },
    "Rhône-Alpes": { color: "#4169E1", nums: ["01", "07", "26", "38", "42", "69", "73", "74"] },
    "Languedoc-Roussillon": { color: "#BA55D3", nums: ["11", "30", "34", "48", "66"] },
    "PACA": { color: "#00CED1", nums: ["04", "05", "06", "13", "83", "84"] },
  };

  // Fonction pour obtenir la couleur d'un département
  const getDepartmentColor = (num: string): string => {
    for (const region of Object.values(departmentsByRegion)) {
      if (region.nums.includes(num)) {
        return region.color;
      }
    }
    return "#8b5cf6"; // Couleur par défaut
  };

  // Fonction pour trouver le nom de la région d'un département
  const getRegionNameByDeptNum = (num: string): string | null => {
    for (const [regionName, data] of Object.entries(departmentsByRegion)) {
      if (data.nums.includes(num)) {
        return regionName;
      }
    }
    // Vérifier les régions spéciales
    if (["2A", "2B"].includes(num)) return "Corse";
    if (["75", "77", "78", "91", "92", "93", "94", "95"].includes(num)) return "Île-de-France";
    if (["971", "972", "973", "974", "976"].includes(num)) return "DOM-TOM";
    return null;
  };

  // Handler pour le clic sur un département
  const handleDepartmentClick = (deptNum: string) => {
    const regionName = getRegionNameByDeptNum(deptNum);
    if (regionName) {
      // Toggle : si la région est déjà sélectionnée, on la désélectionne
      setSelectedRegion(selectedRegion === regionName ? null : regionName);
    }
  };


  if (isMinimized) {
    return (
      <div className={styles.minimizedButton}>
        <button
          onClick={() => setIsMinimized(false)}
          className={styles.restoreButton}
        >
          🗺️ Afficher la carte
        </button>
      </div>
    );
  }

  const mapContent = (
    <>
      <svg viewBox="-50 0 750 550" className={styles.svg} style={{ minHeight: isExpanded ? '80vh' : '600px' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Cadre Corse */}
        <rect x="460" y="430" width="60" height="80" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
        
        {/* Cadre Île-de-France */}
        <rect x="495" y="50" width="120" height="120" fill="none" stroke="#d946ef" strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
        
        {/* Cadre DOM-TOM */}
        <rect x="505" y="190" width="140" height="85" fill="none" stroke="#c026d3" strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>

        {/* Tous les départements */}
        {departmentsPaths.map((dept) => {
          let regionColor = getDepartmentColor(dept.num);
          
          // Couleurs spécifiques pour Corse, IDF et DOM-TOM
          if (["2A", "2B"].includes(dept.num)) regionColor = "#8b5cf6";
          if (["75", "77", "78", "91", "92", "93", "94", "95"].includes(dept.num)) regionColor = "#d946ef";
          if (["971", "972", "973", "974", "976"].includes(dept.num)) regionColor = "#c026d3";
          
          const isHovered = hoveredDept === dept.num;
          const isCurrent = currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num;
          const isHighlighted = highlightedDepartments.includes(dept.num);
          
          // Vérifier si ce département fait partie de la région sélectionnée
          const isInSelectedRegion = selectedRegion ? (
            departmentsByRegion[selectedRegion]?.nums.includes(dept.num) ||
            (selectedRegion === "Corse" && ["2A", "2B"].includes(dept.num)) ||
            (selectedRegion === "Île-de-France" && ["75", "77", "78", "91", "92", "93", "94", "95"].includes(dept.num)) ||
            (selectedRegion === "DOM-TOM" && ["971", "972", "973", "974", "976"].includes(dept.num))
          ) : false;
          
          return (
            <g
              key={dept.num}
              onMouseEnter={() => setHoveredDept(dept.num)}
              onMouseLeave={() => setHoveredDept(null)}
            >
              <path
                d={dept.path}
                className={`${styles.deptBox} ${isHovered ? styles.hovered : ''} ${isCurrent ? styles.current : ''} ${isHighlighted ? styles.highlighted : ''} ${isInSelectedRegion ? styles.regionSelected : ''}`}
                stroke={isCurrent ? '#06b6d4' : isHighlighted ? '#22c55e' : isInSelectedRegion ? '#fbbf24' : regionColor}
                fill={isCurrent ? 'rgba(6, 182, 212, 0.2)' : isHighlighted ? 'rgba(34, 197, 94, 0.2)' : isInSelectedRegion ? 'rgba(251, 191, 36, 0.3)' : 'rgba(0,0,0,0.8)'}
                filter={isHovered || isCurrent || isInSelectedRegion ? "url(#glowStrong)" : "url(#glow)"}
                onClick={() => handleDepartmentClick(dept.num)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={dept.labelX}
                y={dept.labelY + 4}
                className={styles.deptNum}
                fill="#ffffff"
                fontSize={`${12 * (dept.scale || 1)}px`}
                style={{ pointerEvents: 'none' }}
              >
                {dept.num}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredDept && (
        <div className={styles.tooltip}>
          Département {hoveredDept}
        </div>
      )}

      <div className={styles.legendSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher un département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={styles.clearButton}
                title="Effacer"
              >
                <X className={styles.clearIcon} />
              </button>
            )}
          </div>
          {searchedDept && (
            <div className={styles.searchResult}>
              <span className={styles.searchResultNum}>{searchedDept.numero}</span>
              <span className={styles.searchResultName}>Trouvé ✓</span>
            </div>
          )}
          {searchTerm && !searchedDept && (
            <div className={styles.searchResultEmpty}>
              Aucun département trouvé
            </div>
          )}
        </div>
      </div>

      <div className={styles.regionsLegend}>
        <h4 className={styles.legendTitle}>ANCIENNES RÉGIONS</h4>
        <p className={styles.legendSubtitle}>Cliquez sur une région ou un département pour localiser tous les départements de la région</p>
        <div className={styles.regionsGrid}>
          {Object.entries(departmentsByRegion).map(([name, data]) => (
            <div 
              key={name} 
              className={`${styles.regionLegendItem} ${selectedRegion === name ? styles.regionLegendItemActive : ''}`}
              onClick={() => setSelectedRegion(selectedRegion === name ? null : name)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.regionColorBox} style={{ backgroundColor: data.color, boxShadow: `0 0 10px ${data.color}` }}></div>
              <span className={styles.regionLegendName}>{name}</span>
            </div>
          ))}
          <div 
            className={`${styles.regionLegendItem} ${selectedRegion === 'Corse' ? styles.regionLegendItemActive : ''}`}
            onClick={() => setSelectedRegion(selectedRegion === 'Corse' ? null : 'Corse')}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.regionColorBox} style={{ backgroundColor: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6' }}></div>
            <span className={styles.regionLegendName}>Corse</span>
          </div>
          <div 
            className={`${styles.regionLegendItem} ${selectedRegion === 'Île-de-France' ? styles.regionLegendItemActive : ''}`}
            onClick={() => setSelectedRegion(selectedRegion === 'Île-de-France' ? null : 'Île-de-France')}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.regionColorBox} style={{ backgroundColor: '#d946ef', boxShadow: '0 0 10px #d946ef' }}></div>
            <span className={styles.regionLegendName}>Île-de-France</span>
          </div>
          <div 
            className={`${styles.regionLegendItem} ${selectedRegion === 'DOM-TOM' ? styles.regionLegendItemActive : ''}`}
            onClick={() => setSelectedRegion(selectedRegion === 'DOM-TOM' ? null : 'DOM-TOM')}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.regionColorBox} style={{ backgroundColor: '#c026d3', boxShadow: '0 0 10px #c026d3' }}></div>
            <span className={styles.regionLegendName}>DOM-TOM</span>
          </div>
        </div>
      </div>
    </>
  );

  if (isExpanded) {
    return (
      <div className={styles.fullscreenOverlay} onClick={() => setIsExpanded(false)}>
        <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
          {showControls && (
            <div className={styles.controls}>
              <h3 className={styles.title}>🗺️ CARTE DE FRANCE</h3>
              <div className={styles.controlButtons}>
                <button
                  onClick={() => setIsExpanded(false)}
                  className={styles.controlButton}
                  title="Réduire"
                >
                  <Minimize2 className={styles.icon} />
                </button>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setIsMinimized(true);
                  }}
                  className={styles.controlButtonClose}
                  title="Minimiser"
                >
                  <X className={styles.icon} />
                </button>
              </div>
            </div>
          )}
          <div className={styles.containerFullscreen}>
            {mapContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerWrapper}>
      {showControls && (
        <div className={styles.controls}>
          <h3 className={styles.title}>🗺️ CARTE DE FRANCE</h3>
          <div className={styles.controlButtons}>
            <button
              onClick={() => setIsExpanded(true)}
              className={styles.controlButton}
              title="Agrandir en plein écran"
            >
              <Maximize2 className={styles.icon} />
            </button>
          </div>
        </div>
      )}
      <div className={styles.container}>
        {mapContent}
      </div>
    </div>
  );
};

export default FranceMapStyled;

