import React, { useState, useMemo } from 'react';
import { Maximize2, Minimize2, X, Search } from 'lucide-react';
import styles from './FranceMapStyled.module.css';
import { departments as allDepartments } from '../data/departments';

interface Department {
  num: string;
  name: string;
  x: number;
  y: number;
}

interface Region {
  name: string;
  color: string;
  departments: Department[];
  labelX: number;
  labelY: number;
}

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

  const oldRegions: Region[] = [
    {
      name: "NORD-PAS-DE-CALAIS",
      color: "#8b5cf6",
      labelX: 220, labelY: 80,
      departments: [
        { num: "59", name: "Nord", x: 210, y: 60 },
        { num: "62", name: "Pas-de-Calais", x: 170, y: 70 },
      ]
    },
    {
      name: "PICARDIE",
      color: "#a78bfa",
      labelX: 220, labelY: 130,
      departments: [
        { num: "02", name: "Aisne", x: 240, y: 110 },
        { num: "60", name: "Oise", x: 200, y: 120 },
        { num: "80", name: "Somme", x: 180, y: 90 },
      ]
    },
    {
      name: "HAUTE-NORMANDIE",
      color: "#c084fc",
      labelX: 130, labelY: 110,
      departments: [
        { num: "27", name: "Eure", x: 130, y: 120 },
        { num: "76", name: "Seine-Maritime", x: 130, y: 80 },
      ]
    },
    {
      name: "BASSE-NORMANDIE",
      color: "#d8b4fe",
      labelX: 70, labelY: 130,
      departments: [
        { num: "14", name: "Calvados", x: 70, y: 100 },
        { num: "50", name: "Manche", x: 30, y: 110 },
        { num: "61", name: "Orne", x: 90, y: 140 },
      ]
    },
    {
      name: "BRETAGNE",
      color: "#e9d5ff",
      labelX: 30, labelY: 180,
      departments: [
        { num: "22", name: "Côtes-d'Armor", x: 20, y: 150 },
        { num: "29", name: "Finistère", x: -20, y: 160 },
        { num: "35", name: "Ille-et-Vilaine", x: 50, y: 160 },
        { num: "56", name: "Morbihan", x: 20, y: 190 },
      ]
    },
    {
      name: "PAYS DE LA LOIRE",
      color: "#f3e8ff",
      labelX: 80, labelY: 220,
      departments: [
        { num: "44", name: "Loire-Atlantique", x: 50, y: 220 },
        { num: "49", name: "Maine-et-Loire", x: 90, y: 210 },
        { num: "53", name: "Mayenne", x: 90, y: 180 },
        { num: "72", name: "Sarthe", x: 120, y: 190 },
        { num: "85", name: "Vendée", x: 60, y: 250 },
      ]
    },
    {
      name: "CENTRE",
      color: "#ddd6fe",
      labelX: 170, labelY: 200,
      departments: [
        { num: "18", name: "Cher", x: 200, y: 210 },
        { num: "28", name: "Eure-et-Loir", x: 140, y: 160 },
        { num: "36", name: "Indre", x: 160, y: 230 },
        { num: "37", name: "Indre-et-Loire", x: 120, y: 230 },
        { num: "41", name: "Loir-et-Cher", x: 140, y: 200 },
        { num: "45", name: "Loiret", x: 180, y: 170 },
      ]
    },
    {
      name: "BOURGOGNE",
      color: "#c4b5fd",
      labelX: 270, labelY: 210,
      departments: [
        { num: "21", name: "Côte-d'Or", x: 280, y: 200 },
        { num: "58", name: "Nièvre", x: 240, y: 220 },
        { num: "71", name: "Saône-et-Loire", x: 290, y: 240 },
        { num: "89", name: "Yonne", x: 240, y: 180 },
      ]
    },
    {
      name: "FRANCHE-COMTÉ",
      color: "#a78bfa",
      labelX: 340, labelY: 230,
      departments: [
        { num: "25", name: "Doubs", x: 350, y: 220 },
        { num: "39", name: "Jura", x: 330, y: 250 },
        { num: "70", name: "Haute-Saône", x: 340, y: 190 },
        { num: "90", name: "Territoire de Belfort", x: 370, y: 210 },
      ]
    },
    {
      name: "CHAMPAGNE-ARDENNE",
      color: "#8b5cf6",
      labelX: 280, labelY: 130,
      departments: [
        { num: "08", name: "Ardennes", x: 280, y: 90 },
        { num: "10", name: "Aube", x: 260, y: 150 },
        { num: "51", name: "Marne", x: 280, y: 130 },
        { num: "52", name: "Haute-Marne", x: 300, y: 170 },
      ]
    },
    {
      name: "LORRAINE",
      color: "#7c3aed",
      labelX: 360, labelY: 130,
      departments: [
        { num: "54", name: "Meurthe-et-Moselle", x: 350, y: 130 },
        { num: "55", name: "Meuse", x: 320, y: 120 },
        { num: "57", name: "Moselle", x: 370, y: 100 },
        { num: "88", name: "Vosges", x: 360, y: 160 },
      ]
    },
    {
      name: "ALSACE",
      color: "#6d28d9",
      labelX: 410, labelY: 150,
      departments: [
        { num: "67", name: "Bas-Rhin", x: 410, y: 130 },
        { num: "68", name: "Haut-Rhin", x: 410, y: 170 },
      ]
    },
    {
      name: "POITOU-CHARENTES",
      color: "#f0abfc",
      labelX: 90, labelY: 290,
      departments: [
        { num: "16", name: "Charente", x: 100, y: 280 },
        { num: "17", name: "Charente-Maritime", x: 60, y: 290 },
        { num: "79", name: "Deux-Sèvres", x: 90, y: 250 },
        { num: "86", name: "Vienne", x: 120, y: 260 },
      ]
    },
    {
      name: "LIMOUSIN",
      color: "#e879f9",
      labelX: 160, labelY: 290,
      departments: [
        { num: "19", name: "Corrèze", x: 170, y: 300 },
        { num: "23", name: "Creuse", x: 180, y: 270 },
        { num: "87", name: "Haute-Vienne", x: 140, y: 280 },
      ]
    },
    {
      name: "AQUITAINE",
      color: "#d946ef",
      labelX: 70, labelY: 370,
      departments: [
        { num: "24", name: "Dordogne", x: 110, y: 320 },
        { num: "33", name: "Gironde", x: 60, y: 340 },
        { num: "40", name: "Landes", x: 50, y: 380 },
        { num: "47", name: "Lot-et-Garonne", x: 110, y: 360 },
        { num: "64", name: "Pyrénées-Atlantiques", x: 40, y: 420 },
      ]
    },
    {
      name: "MIDI-PYRÉNÉES",
      color: "#c026d3",
      labelX: 150, labelY: 400,
      departments: [
        { num: "09", name: "Ariège", x: 150, y: 440 },
        { num: "12", name: "Aveyron", x: 210, y: 360 },
        { num: "31", name: "Haute-Garonne", x: 140, y: 410 },
        { num: "32", name: "Gers", x: 100, y: 410 },
        { num: "46", name: "Lot", x: 150, y: 360 },
        { num: "65", name: "Hautes-Pyrénées", x: 90, y: 430 },
        { num: "81", name: "Tarn", x: 180, y: 400 },
        { num: "82", name: "Tarn-et-Garonne", x: 140, y: 380 },
      ]
    },
    {
      name: "AUVERGNE",
      color: "#a855f7",
      labelX: 240, labelY: 300,
      departments: [
        { num: "03", name: "Allier", x: 240, y: 260 },
        { num: "15", name: "Cantal", x: 220, y: 320 },
        { num: "43", name: "Haute-Loire", x: 270, y: 320 },
        { num: "63", name: "Puy-de-Dôme", x: 240, y: 300 },
      ]
    },
    {
      name: "RHÔNE-ALPES",
      color: "#9333ea",
      labelX: 330, labelY: 320,
      departments: [
        { num: "01", name: "Ain", x: 320, y: 280 },
        { num: "07", name: "Ardèche", x: 290, y: 350 },
        { num: "26", name: "Drôme", x: 310, y: 370 },
        { num: "38", name: "Isère", x: 330, y: 330 },
        { num: "42", name: "Loire", x: 290, y: 300 },
        { num: "69", name: "Rhône", x: 300, y: 280 },
        { num: "73", name: "Savoie", x: 350, y: 310 },
        { num: "74", name: "Haute-Savoie", x: 360, y: 280 },
      ]
    },
    {
      name: "LANGUEDOC-ROUSSILLON",
      color: "#7e22ce",
      labelX: 250, labelY: 430,
      departments: [
        { num: "11", name: "Aude", x: 210, y: 430 },
        { num: "30", name: "Gard", x: 280, y: 400 },
        { num: "34", name: "Hérault", x: 250, y: 420 },
        { num: "48", name: "Lozère", x: 260, y: 370 },
        { num: "66", name: "Pyrénées-Orientales", x: 220, y: 470 },
      ]
    },
    {
      name: "PROVENCE-ALPES-CÔTE D'AZUR",
      color: "#6b21a8",
      labelX: 360, labelY: 420,
      departments: [
        { num: "04", name: "Alpes-de-Haute-Provence", x: 350, y: 400 },
        { num: "05", name: "Hautes-Alpes", x: 370, y: 370 },
        { num: "06", name: "Alpes-Maritimes", x: 400, y: 410 },
        { num: "13", name: "Bouches-du-Rhône", x: 320, y: 430 },
        { num: "83", name: "Var", x: 360, y: 440 },
        { num: "84", name: "Vaucluse", x: 320, y: 400 },
      ]
    },
  ];

  const corseDepts: Department[] = [
    { num: "2A", name: "Corse-du-Sud", x: 480, y: 480 },
    { num: "2B", name: "Haute-Corse", x: 480, y: 450 },
  ];

  const idfDepts: Department[] = [
    { num: "75", name: "Paris", x: 540, y: 100 },
    { num: "77", name: "Seine-et-Marne", x: 590, y: 100 },
    { num: "78", name: "Yvelines", x: 510, y: 120 },
    { num: "91", name: "Essonne", x: 540, y: 140 },
    { num: "92", name: "Hauts-de-Seine", x: 510, y: 90 },
    { num: "93", name: "Seine-Saint-Denis", x: 560, y: 80 },
    { num: "94", name: "Val-de-Marne", x: 560, y: 120 },
    { num: "95", name: "Val-d'Oise", x: 540, y: 70 },
  ];

  const domTom: Department[] = [
    { num: "971", name: "Guadeloupe", x: 520, y: 210 },
    { num: "972", name: "Martinique", x: 570, y: 210 },
    { num: "973", name: "Guyane", x: 620, y: 210 },
    { num: "974", name: "La Réunion", x: 520, y: 250 },
    { num: "976", name: "Mayotte", x: 590, y: 250 },
  ];

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
      <svg viewBox="0 0 700 550" className={styles.svg} style={{ minHeight: isExpanded ? '80vh' : '600px' }}>
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

        {oldRegions.map((region, idx) => (
          <g key={idx} className={styles.region}>
            {region.departments.map((dept) => (
              <g
                key={dept.num}
                onMouseEnter={() => setHoveredDept(dept.num)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                <rect
                  x={dept.x - 18}
                  y={dept.y - 14}
                  width="36"
                  height="28"
                  className={`${styles.deptBox} ${hoveredDept === dept.num ? styles.hovered : ''} ${currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? styles.current : ''} ${highlightedDepartments.includes(dept.num) ? styles.highlighted : ''}`}
                  stroke={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? '#06b6d4' : highlightedDepartments.includes(dept.num) ? '#22c55e' : region.color}
                  fill={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? 'rgba(6, 182, 212, 0.2)' : highlightedDepartments.includes(dept.num) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.8)'}
                  filter={hoveredDept === dept.num || currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? "url(#glowStrong)" : "url(#glow)"}
                />
                <text
                  x={dept.x}
                  y={dept.y + 4}
                  className={styles.deptNum}
                  fill="#ffffff"
                >
                  {dept.num}
                </text>
              </g>
            ))}
            <text
              x={region.labelX}
              y={region.labelY}
              className={styles.regionLabel}
              fill={region.color}
            >
              {region.name}
            </text>
          </g>
        ))}

        <g className={styles.island}>
          <rect x="460" y="430" width="60" height="80" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
          <text x="490" y="420" className={styles.islandLabel} fill="#a78bfa">CORSE</text>
          {corseDepts.map((dept) => (
            <g
              key={dept.num}
              onMouseEnter={() => setHoveredDept(dept.num)}
              onMouseLeave={() => setHoveredDept(null)}
            >
              <rect
                x={dept.x - 18}
                y={dept.y - 14}
                width="36"
                height="28"
                className={`${styles.deptBox} ${hoveredDept === dept.num ? styles.hovered : ''} ${currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? styles.current : ''} ${highlightedDepartments.includes(dept.num) ? styles.highlighted : ''}`}
                stroke={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? '#06b6d4' : highlightedDepartments.includes(dept.num) ? '#22c55e' : '#8b5cf6'}
                fill={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? 'rgba(6, 182, 212, 0.2)' : highlightedDepartments.includes(dept.num) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.8)'}
                filter={hoveredDept === dept.num || currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? "url(#glowStrong)" : "url(#glow)"}
              />
              <text
                x={dept.x}
                y={dept.y + 4}
                className={styles.deptNum}
                fill="#ffffff"
              >
                {dept.num}
              </text>
            </g>
          ))}
        </g>

        <g className={styles.island}>
          <rect x="495" y="50" width="120" height="120" fill="none" stroke="#d946ef" strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
          <text x="555" y="45" className={styles.islandLabel} fill="#e879f9">ÎLE-DE-FRANCE</text>
          {idfDepts.map((dept) => (
            <g
              key={dept.num}
              onMouseEnter={() => setHoveredDept(dept.num)}
              onMouseLeave={() => setHoveredDept(null)}
            >
              <circle
                cx={dept.x}
                cy={dept.y}
                r="16"
                className={`${styles.deptBox} ${hoveredDept === dept.num ? styles.hovered : ''} ${currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? styles.current : ''} ${highlightedDepartments.includes(dept.num) ? styles.highlighted : ''}`}
                stroke={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? '#06b6d4' : highlightedDepartments.includes(dept.num) ? '#22c55e' : '#d946ef'}
                fill={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? 'rgba(6, 182, 212, 0.2)' : highlightedDepartments.includes(dept.num) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.8)'}
                filter={hoveredDept === dept.num || currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? "url(#glowStrong)" : "url(#glow)"}
              />
              <text
                x={dept.x}
                y={dept.y + 4}
                className={styles.deptNum}
                fill="#ffffff"
                fontSize="10"
              >
                {dept.num}
              </text>
            </g>
          ))}
        </g>

        <g className={styles.island}>
          <rect x="505" y="190" width="140" height="85" fill="none" stroke="#c026d3" strokeWidth="2" strokeDasharray="4" opacity="0.5" rx="5"/>
          <text x="575" y="185" className={styles.islandLabel} fill="#d946ef">DOM-TOM</text>
          {domTom.map((dept) => (
            <g
              key={dept.num}
              onMouseEnter={() => setHoveredDept(dept.num)}
              onMouseLeave={() => setHoveredDept(null)}
            >
              <rect
                x={dept.x - 20}
                y={dept.y - 14}
                width="40"
                height="28"
                className={`${styles.deptBox} ${hoveredDept === dept.num ? styles.hovered : ''} ${currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? styles.current : ''} ${highlightedDepartments.includes(dept.num) ? styles.highlighted : ''}`}
                stroke={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? '#06b6d4' : highlightedDepartments.includes(dept.num) ? '#22c55e' : '#c026d3'}
                fill={currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? 'rgba(6, 182, 212, 0.2)' : highlightedDepartments.includes(dept.num) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.8)'}
                filter={hoveredDept === dept.num || currentDepartmentNumber === dept.num || searchedDept?.numero === dept.num ? "url(#glowStrong)" : "url(#glow)"}
              />
              <text
                x={dept.x}
                y={dept.y + 4}
                className={styles.deptNum}
                fill="#ffffff"
                fontSize="10"
              >
                {dept.num}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {hoveredDept && (
        <div className={styles.tooltip}>
          Département {hoveredDept}
        </div>
      )}

      <div className={styles.legend}>
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
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></div>
          <span>Gagnés</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6' }}></div>
          <span>Disponibles</span>
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

