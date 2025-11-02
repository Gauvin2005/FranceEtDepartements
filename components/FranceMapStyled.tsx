import React, { useState, useMemo } from 'react';
import { Maximize2, Minimize2, X, Search, ZoomIn } from 'lucide-react';
import styles from './FranceMapStyled.module.css';
import { departments as allDepartments } from '../data/departments';
import { departmentsPaths as departmentsPathsRealistic } from '../data/departmentsPathsRealistic';
import { useThemeStore } from '../stores/themeStore';

interface FranceMapStyledProps {
  currentDepartmentNumber?: string;
  highlightedDepartments?: string[]; // Départements gagnés par le joueur actuel (vert)
  departmentsByPlayer?: Record<number, string[]>; // { playerId: [numero1, numero2, ...] } - départements gagnés par chaque joueur
  currentPlayerId?: number; // ID du joueur actuel (pour savoir ce qui est "sien")
  searchedDepartments?: string[]; // Liste des départements recherchés (compositions) format: ["01", "02", "2A", etc.]
  compact?: boolean;
  showControls?: boolean;
  // Timer
  timeRemaining?: number;
  timerActive?: boolean;
}

export const FranceMapStyled: React.FC<FranceMapStyledProps> = ({ 
  currentDepartmentNumber, 
  highlightedDepartments = [],
  departmentsByPlayer = {},
  currentPlayerId,
  searchedDepartments = [],
  compact = false,
  showControls = true,
  timeRemaining = 0,
  timerActive = false
}) => {
  const { theme } = useThemeStore();
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [magnifierPosition, setMagnifierPosition] = useState<{ x: number; y: number } | null>(null);
  const [magnifierActive, setMagnifierActive] = useState(false);
  const [magnifierEnabled, setMagnifierEnabled] = useState(true);

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

  // Fonction pour déterminer qui a gagné ce département
  const getDepartmentOwner = (deptNum: string): number | null => {
    for (const [playerId, depts] of Object.entries(departmentsByPlayer)) {
      if (depts.includes(deptNum)) {
        return parseInt(playerId);
      }
    }
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

  // Gestionnaire pour la position de la souris (loupe)
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!magnifierEnabled) return;
    
    const svg = e.currentTarget;
    const ctm = svg.getScreenCTM();
    
    if (!ctm) return;
    
    // Utiliser createSVGPoint pour obtenir les coordonnées SVG correctes
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    
    // Conversion du point client vers les coordonnées SVG
    const svgPoint = point.matrixTransform(ctm.inverse());
    
    setMagnifierPosition({ x: svgPoint.x, y: svgPoint.y });
  };

  const handleMouseEnter = () => {
    if (magnifierEnabled) {
      setMagnifierActive(true);
    }
  };

  const handleMouseLeave = () => {
    setMagnifierActive(false);
    setMagnifierPosition(null);
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

  // Créer un ensemble de tous les départements déjà gagnés par n'importe quel joueur
  const allWonDepartments = new Set<string>();
  Object.values(departmentsByPlayer).forEach(depts => {
    depts.forEach(dept => allWonDepartments.add(dept));
  });

  // Filtrer les départements recherchés pour exclure la réponse actuelle ET les départements déjà gagnés
  const filteredSearchedDepartments = searchedDepartments.filter(
    dept => dept !== currentDepartmentNumber && !allWonDepartments.has(dept)
  );

  const mapContent = (
    <>
      {/* Liste des départements recherchés (visible en mode agrandi) */}
      {isExpanded && filteredSearchedDepartments.length > 0 && (
        <div style={{
          marginBottom: '20px',
          padding: '12px',
          background: theme === 'space' 
            ? 'linear-gradient(135deg, rgba(61, 59, 255, 0.2), rgba(0, 247, 255, 0.2))'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))',
          border: theme === 'space'
            ? '2px solid rgba(0, 247, 255, 0.5)'
            : '2px solid rgba(59, 130, 246, 0.5)',
          borderRadius: '12px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 900,
            marginBottom: '10px',
            color: '#3b82f6',
            textAlign: 'center',
            letterSpacing: '1px',
            fontFamily: 'Share Tech Mono, Courier New, monospace'
          }}>
            DEPARTEMENTS RECHERCHES ({filteredSearchedDepartments.length})
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
            gap: '6px'
          }}>
            {filteredSearchedDepartments.map((deptNum, idx) => (
              <div
                key={idx}
                style={{
                  padding: '6px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '2px solid rgba(59, 130, 246, 0.6)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: 900,
                  color: '#3b82f6',
                  fontFamily: 'Share Tech Mono, Courier New, monospace',
                  textShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                }}>
                  {deptNum}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <svg 
        viewBox="0 0 1000 1000" 
        className={styles.svg} 
        style={{ minHeight: isExpanded ? '80vh' : '37.5rem' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {/* Optimisation des filtres SVG pour performance avec zoom natif */}
          <filter id="glow" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glowStrong" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {theme === 'space' && (
            <>
              <pattern id="clouds" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="30" r="15" fill="rgba(255, 255, 255, 0.15)" />
                <circle cx="40" cy="30" r="18" fill="rgba(255, 255, 255, 0.12)" />
                <circle cx="30" cy="25" r="12" fill="rgba(255, 255, 255, 0.1)" />
                <circle cx="60" cy="50" r="12" fill="rgba(255, 255, 255, 0.1)" />
                <circle cx="75" cy="50" r="15" fill="rgba(255, 255, 255, 0.12)" />
                <circle cx="85" cy="45" r="10" fill="rgba(255, 255, 255, 0.08)" />
              </pattern>
              <radialGradient id="earthGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#0b0f26" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#1a1f3a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0b0f26" stopOpacity="0.9" />
              </radialGradient>
            </>
          )}
          {magnifierEnabled && magnifierActive && magnifierPosition && (
            <>
              <clipPath id="magnifier-clip">
                <circle 
                  cx={magnifierPosition.x} 
                  cy={magnifierPosition.y} 
                  r="120"
                />
              </clipPath>
              <filter id="magnifier-shadow" colorInterpolationFilters="sRGB">
                <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="rgba(139, 92, 246, 0.6)"/>
              </filter>
            </>
          )}
        </defs>

        {/* Fond spatial avec nuages */}
        {theme === 'space' && (
          <>
            <rect x="0" y="0" width="1000" height="1000" fill="url(#earthGradient)" />
            <rect x="0" y="0" width="1000" height="1000" fill="url(#clouds)" opacity="0.6" />
            <circle cx="500" cy="500" r="450" fill="none" stroke="rgba(0, 247, 255, 0.2)" strokeWidth="2" />
            <circle cx="500" cy="500" r="460" fill="none" stroke="rgba(61, 59, 255, 0.15)" strokeWidth="1" />
          </>
        )}

        {/* Cadre Corse */}
        <rect x="800" y="200" width="120" height="150" fill="none" stroke={theme === 'space' ? 'rgba(0, 247, 255, 0.5)' : '#8b5cf6'} strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
        
        {/* Cadre Île-de-France */}
        <rect x="400" y="300" width="200" height="200" fill="none" stroke={theme === 'space' ? 'rgba(0, 247, 255, 0.5)' : '#d946ef'} strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
        
        {/* Cadre DOM-TOM */}
        <rect x="50" y="50" width="200" height="150" fill="none" stroke={theme === 'space' ? 'rgba(0, 247, 255, 0.5)' : '#c026d3'} strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>

        {/* Tous les départements */}
        {departmentsPathsRealistic.map((dept) => {
          let regionColor = getDepartmentColor(dept.num);
          
          // Couleurs spécifiques pour Corse, IDF et DOM-TOM
          if (["2A", "2B"].includes(dept.num)) regionColor = "#8b5cf6";
          if (["75", "77", "78", "91", "92", "93", "94", "95"].includes(dept.num)) regionColor = "#d946ef";
          if (["971", "972", "973", "974", "976"].includes(dept.num)) regionColor = "#c026d3";
          
          const isHovered = hoveredDept === dept.num;
          const isCurrent = currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num;
          const isHighlighted = highlightedDepartments.includes(dept.num);
          // Vérifier si le département est recherché (disponible et pas déjà gagné)
          const isSearched = filteredSearchedDepartments.includes(dept.num);
          
          // Déterminer le propriétaire du département
          const departmentOwner = getDepartmentOwner(dept.num);
          const isOwnDepartment = currentPlayerId !== undefined && departmentOwner === currentPlayerId;
          const isOtherPlayerDepartment = departmentOwner !== null && departmentOwner !== currentPlayerId;
          
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
                className={`${styles.deptBox} ${isHovered ? styles.hovered : ''} ${isCurrent ? styles.current : ''} ${isHighlighted ? styles.highlighted : ''} ${isInSelectedRegion ? styles.regionSelected : ''} ${isSearched ? styles.searched : ''}`}
                stroke={
                  isCurrent ? '#06b6d4' : 
                  isOwnDepartment ? '#22c55e' : 
                  isOtherPlayerDepartment ? '#a0a0a0' : 
                  isHighlighted ? '#22c55e' : 
                  isSearched ? '#3b82f6' : 
                  isInSelectedRegion ? '#fbbf24' : 
                  regionColor
                }
                fill={
                  isCurrent ? 'rgba(6, 182, 212, 0.2)' : 
                  isOwnDepartment ? 'rgba(34, 197, 94, 0.2)' : 
                  isOtherPlayerDepartment ? 'rgba(160, 160, 160, 0.2)' : 
                  isHighlighted ? 'rgba(34, 197, 94, 0.2)' : 
                  isSearched ? 'rgba(59, 130, 246, 0.3)' : 
                  isInSelectedRegion ? 'rgba(251, 191, 36, 0.3)' : 
                  'rgba(0,0,0,0.8)'
                }
                filter={isHovered || isCurrent || isSearched || isInSelectedRegion ? "url(#glowStrong)" : "url(#glow)"}
                onClick={() => handleDepartmentClick(dept.num)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={dept.labelX}
                y={dept.labelY + 4}
                className={styles.deptNum}
                fill="#ffffff"
                fontSize={`${0.75 * (dept.scale || 1)}rem`}
                style={{ pointerEvents: 'none' }}
              >
                {dept.num}
              </text>
            </g>
          );
        })}
        
        {magnifierEnabled && magnifierActive && magnifierPosition && (
          <>
            <circle
              cx={magnifierPosition.x}
              cy={magnifierPosition.y}
              r="155"
              fill="rgba(0, 0, 0, 0.3)"
              pointerEvents="none"
            />
            <g clipPath="url(#magnifier-clip)">
              <g transform={`translate(${magnifierPosition.x}, ${magnifierPosition.y}) scale(3.0) translate(${-magnifierPosition.x}, ${-magnifierPosition.y})`}>
              {departmentsPathsRealistic.map((dept) => {
                let regionColor = getDepartmentColor(dept.num);
                
                if (["2A", "2B"].includes(dept.num)) regionColor = "#8b5cf6";
                if (["75", "77", "78", "91", "92", "93", "94", "95"].includes(dept.num)) regionColor = "#d946ef";
                if (["971", "972", "973", "974", "976"].includes(dept.num)) regionColor = "#c026d3";
                
                const isCurrent = currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num;
                const isHighlighted = highlightedDepartments.includes(dept.num);
                const isSearched = filteredSearchedDepartments.includes(dept.num);
                const departmentOwner = getDepartmentOwner(dept.num);
                const isOwnDepartment = currentPlayerId !== undefined && departmentOwner === currentPlayerId;
                const isOtherPlayerDepartment = departmentOwner !== null && departmentOwner !== currentPlayerId;
                const isInSelectedRegion = selectedRegion ? (
                  departmentsByRegion[selectedRegion]?.nums.includes(dept.num) ||
                  (selectedRegion === "Corse" && ["2A", "2B"].includes(dept.num)) ||
                  (selectedRegion === "Île-de-France" && ["75", "77", "78", "91", "92", "93", "94", "95"].includes(dept.num)) ||
                  (selectedRegion === "DOM-TOM" && ["971", "972", "973", "974", "976"].includes(dept.num))
                ) : false;
                
                return (
                  <g key={`magnifier-${dept.num}`}>
                    <path
                      d={dept.path}
                      stroke={
                        isCurrent ? '#06b6d4' : 
                        isOwnDepartment ? '#22c55e' : 
                        isOtherPlayerDepartment ? '#a0a0a0' : 
                        isHighlighted ? '#22c55e' : 
                        isSearched ? '#3b82f6' : 
                        isInSelectedRegion ? '#fbbf24' : 
                        regionColor
                      }
                      fill={
                        isCurrent ? 'rgba(6, 182, 212, 0.2)' : 
                        isOwnDepartment ? 'rgba(34, 197, 94, 0.2)' : 
                        isOtherPlayerDepartment ? 'rgba(160, 160, 160, 0.2)' : 
                        isHighlighted ? 'rgba(34, 197, 94, 0.2)' : 
                        isSearched ? 'rgba(59, 130, 246, 0.3)' : 
                        isInSelectedRegion ? 'rgba(251, 191, 36, 0.3)' : 
                        'rgba(0,0,0,0.8)'
                      }
                      strokeWidth="1.5"
                      opacity="0.98"
                    />
                    <text
                      x={dept.labelX}
                      y={dept.labelY + 4}
                      fill="#ffffff"
                      fontSize={`${1 * (dept.scale || 1)}rem`}
                    >
                      {dept.num}
                    </text>
                  </g>
                );
              })}
              </g>
            </g>
            <circle
              cx={magnifierPosition.x}
              cy={magnifierPosition.y}
              r="120"
              fill="none"
              stroke="rgba(139, 92, 246, 0.7)"
              strokeWidth="2"
              filter="url(#magnifier-shadow)"
              pointerEvents="none"
            />
          </>
        )}
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
                {/* Timer */}
                {timerActive && (
                  <div className={`${styles.timer} ${
                    timeRemaining <= 30 
                      ? styles.timerRed
                      : timeRemaining <= 60 
                      ? styles.timerOrange
                      : styles.timerGreen
                  }`}>
                    ⏰ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </div>
                )}
                <button
                  onClick={() => setMagnifierEnabled(!magnifierEnabled)}
                  className={styles.controlButton}
                  title={magnifierEnabled ? "Désactiver la loupe" : "Activer la loupe"}
                  style={{
                    backgroundColor: magnifierEnabled ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.2)',
                    borderColor: magnifierEnabled ? 'rgba(139, 92, 246, 0.7)' : 'rgba(139, 92, 246, 0.5)'
                  }}
                >
                  <ZoomIn className={styles.icon} />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className={styles.controlButton}
                  title="Réduire"
                >
                  <Minimize2 className={styles.icon} />
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
            {/* Timer */}
            {timerActive && (
              <div className={`${styles.timer} ${
                timeRemaining <= 30 
                  ? styles.timerRed
                  : timeRemaining <= 60 
                  ? styles.timerOrange
                  : styles.timerGreen
              }`}>
                ⏰ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </div>
            )}
            <button
              onClick={() => setMagnifierEnabled(!magnifierEnabled)}
              className={styles.controlButton}
              title={magnifierEnabled ? "Désactiver la loupe" : "Activer la loupe"}
              style={{
                backgroundColor: magnifierEnabled ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.2)',
                borderColor: magnifierEnabled ? 'rgba(139, 92, 246, 0.7)' : 'rgba(139, 92, 246, 0.5)'
              }}
            >
              <ZoomIn className={styles.icon} />
            </button>
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

