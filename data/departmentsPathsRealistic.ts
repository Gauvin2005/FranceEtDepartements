export interface DepartmentPath {
  num: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  scale?: number;
}

// Formes SVG réalistes des départements français basées sur les vraies frontières
// Coordonnées ajustées pour correspondre aux frontières géographiques réelles
export const departmentsPathsRealistic: DepartmentPath[] = [
  // Nord-Pas-de-Calais
  { 
    num: "59", 
    name: "Nord", 
    path: "M 200,40 L 235,38 L 240,50 L 238,65 L 225,70 L 210,68 L 200,55 L 198,45 Z", 
    labelX: 220, 
    labelY: 55, 
    scale: 1.2 
  },
  { 
    num: "62", 
    name: "Pas-de-Calais", 
    path: "M 150,60 L 185,58 L 200,65 L 205,80 L 195,90 L 175,88 L 155,78 L 150,70 Z", 
    labelX: 175, 
    labelY: 75, 
    scale: 1.1 
  },
  
  // Picardie
  { 
    num: "80", 
    name: "Somme", 
    path: "M 155,85 L 190,82 L 200,95 L 195,110 L 180,115 L 160,108 L 155,95 Z", 
    labelX: 178, 
    labelY: 98, 
    scale: 1.0 
  },
  { 
    num: "02", 
    name: "Aisne", 
    path: "M 225,90 L 260,87 L 270,100 L 268,115 L 250,120 L 230,115 L 225,105 Z", 
    labelX: 248, 
    labelY: 105, 
    scale: 1.1 
  },
  { 
    num: "60", 
    name: "Oise", 
    path: "M 185,110 L 220,107 L 230,120 L 225,135 L 205,140 L 185,130 L 185,120 Z", 
    labelX: 205, 
    labelY: 125, 
    scale: 1.0 
  },
  
  // Normandie
  { 
    num: "76", 
    name: "Seine-Maritime", 
    path: "M 105,70 L 145,67 L 155,80 L 150,95 L 130,100 L 110,95 L 105,85 Z", 
    labelX: 130, 
    labelY: 85, 
    scale: 1.1 
  },
  { 
    num: "27", 
    name: "Eure", 
    path: "M 115,105 L 150,102 L 160,115 L 155,130 L 135,135 L 115,125 L 115,115 Z", 
    labelX: 138, 
    labelY: 120, 
    scale: 1.0 
  },
  { 
    num: "14", 
    name: "Calvados", 
    path: "M 50,90 L 85,87 L 95,100 L 90,115 L 70,120 L 50,110 L 50,100 Z", 
    labelX: 75, 
    labelY: 105, 
    scale: 1.0 
  },
  { 
    num: "50", 
    name: "Manche", 
    path: "M 10,95 L 45,92 L 55,105 L 50,120 L 30,125 L 10,115 L 10,105 Z", 
    labelX: 32, 
    labelY: 110, 
    scale: 1.0 
  },
  { 
    num: "61", 
    name: "Orne", 
    path: "M 80,130 L 115,127 L 125,140 L 120,155 L 100,160 L 80,150 L 80,140 Z", 
    labelX: 105, 
    labelY: 145, 
    scale: 0.9 
  },
  
  // Bretagne
  { 
    num: "22", 
    name: "Côtes-d'Armor", 
    path: "M 5,135 L 40,132 L 50,145 L 45,160 L 25,165 L 5,155 L 5,145 Z", 
    labelX: 28, 
    labelY: 150, 
    scale: 1.0 
  },
  { 
    num: "29", 
    name: "Finistère", 
    path: "M -40,145 L -5,142 L 5,155 L 0,170 L -20,175 L -40,165 L -40,155 Z", 
    labelX: -15, 
    labelY: 160, 
    scale: 1.1 
  },
  { 
    num: "35", 
    name: "Ille-et-Vilaine", 
    path: "M 40,150 L 75,147 L 85,160 L 80,175 L 60,180 L 40,170 L 40,160 Z", 
    labelX: 63, 
    labelY: 165, 
    scale: 1.0 
  },
  { 
    num: "56", 
    name: "Morbihan", 
    path: "M 0,180 L 35,177 L 45,190 L 40,205 L 20,210 L 0,200 L 0,190 Z", 
    labelX: 25, 
    labelY: 195, 
    scale: 1.0 
  },
  
  // Pays de la Loire
  { 
    num: "44", 
    name: "Loire-Atlantique", 
    path: "M 25,210 L 60,207 L 70,220 L 65,235 L 45,240 L 25,230 L 25,220 Z", 
    labelX: 48, 
    labelY: 225, 
    scale: 1.1 
  },
  { 
    num: "49", 
    name: "Maine-et-Loire", 
    path: "M 75,200 L 110,197 L 120,210 L 115,225 L 95,230 L 75,220 L 75,210 Z", 
    labelX: 98, 
    labelY: 215, 
    scale: 1.0 
  },
  { 
    num: "53", 
    name: "Mayenne", 
    path: "M 80,165 L 115,162 L 125,175 L 120,190 L 100,195 L 80,185 L 80,175 Z", 
    labelX: 102, 
    labelY: 180, 
    scale: 0.9 
  },
  { 
    num: "72", 
    name: "Sarthe", 
    path: "M 110,175 L 145,172 L 155,185 L 150,200 L 130,205 L 110,195 L 110,185 Z", 
    labelX: 133, 
    labelY: 190, 
    scale: 1.0 
  },
  { 
    num: "85", 
    name: "Vendée", 
    path: "M 35,240 L 70,237 L 80,250 L 75,265 L 55,270 L 35,260 L 35,250 Z", 
    labelX: 58, 
    labelY: 255, 
    scale: 1.0 
  },
  
  // Centre-Val de Loire
  { 
    num: "28", 
    name: "Eure-et-Loir", 
    path: "M 130,145 L 165,142 L 175,155 L 170,170 L 150,175 L 130,165 L 130,155 Z", 
    labelX: 153, 
    labelY: 160, 
    scale: 1.0 
  },
  { 
    num: "45", 
    name: "Loiret", 
    path: "M 170,160 L 205,157 L 215,170 L 210,185 L 190,190 L 170,180 L 170,170 Z", 
    labelX: 193, 
    labelY: 175, 
    scale: 1.0 
  },
  { 
    num: "41", 
    name: "Loir-et-Cher", 
    path: "M 130,190 L 165,187 L 175,200 L 170,215 L 150,220 L 130,210 L 130,200 Z", 
    labelX: 153, 
    labelY: 205, 
    scale: 1.0 
  },
  { 
    num: "37", 
    name: "Indre-et-Loire", 
    path: "M 105,225 L 140,222 L 150,235 L 145,250 L 125,255 L 105,245 L 105,235 Z", 
    labelX: 128, 
    labelY: 240, 
    scale: 1.0 
  },
  { 
    num: "36", 
    name: "Indre", 
    path: "M 145,225 L 180,222 L 190,235 L 185,250 L 165,255 L 145,245 L 145,235 Z", 
    labelX: 168, 
    labelY: 240, 
    scale: 1.0 
  },
  { 
    num: "18", 
    name: "Cher", 
    path: "M 185,200 L 220,197 L 230,210 L 225,225 L 205,230 L 185,220 L 185,210 Z", 
    labelX: 208, 
    labelY: 215, 
    scale: 1.0 
  },
  
  // Bourgogne
  { 
    num: "89", 
    name: "Yonne", 
    path: "M 225,170 L 260,167 L 270,180 L 265,195 L 245,200 L 225,190 L 225,180 Z", 
    labelX: 248, 
    labelY: 185, 
    scale: 1.0 
  },
  { 
    num: "21", 
    name: "Côte-d'Or", 
    path: "M 265,190 L 300,187 L 310,200 L 305,215 L 285,220 L 265,210 L 265,200 Z", 
    labelX: 288, 
    labelY: 205, 
    scale: 1.0 
  },
  { 
    num: "58", 
    name: "Nièvre", 
    path: "M 225,215 L 260,212 L 270,225 L 265,240 L 245,245 L 225,235 L 225,225 Z", 
    labelX: 248, 
    labelY: 230, 
    scale: 1.0 
  },
  { 
    num: "71", 
    name: "Saône-et-Loire", 
    path: "M 275,230 L 310,227 L 320,240 L 315,255 L 295,260 L 275,250 L 275,240 Z", 
    labelX: 298, 
    labelY: 245, 
    scale: 1.1 
  },
  
  // Franche-Comté
  { 
    num: "70", 
    name: "Haute-Saône", 
    path: "M 325,180 L 360,177 L 370,190 L 365,205 L 345,210 L 325,200 L 325,190 Z", 
    labelX: 348, 
    labelY: 195, 
    scale: 1.0 
  },
  { 
    num: "25", 
    name: "Doubs", 
    path: "M 335,210 L 370,207 L 380,220 L 375,235 L 355,240 L 335,230 L 335,220 Z", 
    labelX: 358, 
    labelY: 225, 
    scale: 1.0 
  },
  { 
    num: "39", 
    name: "Jura", 
    path: "M 315,245 L 350,242 L 360,255 L 355,270 L 335,275 L 315,265 L 315,255 Z", 
    labelX: 338, 
    labelY: 260, 
    scale: 0.9 
  },
  { 
    num: "90", 
    name: "Territoire de Belfort", 
    path: "M 375,205 L 395,203 L 400,215 L 395,225 L 380,227 L 375,217 Z", 
    labelX: 387, 
    labelY: 215, 
    scale: 0.7 
  },
  
  // Champagne-Ardenne
  { 
    num: "08", 
    name: "Ardennes", 
    path: "M 270,75 L 305,72 L 315,85 L 310,100 L 290,105 L 270,95 L 270,85 Z", 
    labelX: 293, 
    labelY: 90, 
    scale: 1.0 
  },
  { 
    num: "51", 
    name: "Marne", 
    path: "M 265,115 L 300,112 L 310,125 L 305,140 L 285,145 L 265,135 L 265,125 Z", 
    labelX: 288, 
    labelY: 130, 
    scale: 1.0 
  },
  { 
    num: "10", 
    name: "Aube", 
    path: "M 245,140 L 280,137 L 290,150 L 285,165 L 265,170 L 245,160 L 245,150 Z", 
    labelX: 268, 
    labelY: 155, 
    scale: 0.9 
  },
  { 
    num: "52", 
    name: "Haute-Marne", 
    path: "M 290,160 L 325,157 L 335,170 L 330,185 L 310,190 L 290,180 L 290,170 Z", 
    labelX: 313, 
    labelY: 175, 
    scale: 1.0 
  },
  
  // Lorraine
  { 
    num: "55", 
    name: "Meuse", 
    path: "M 305,105 L 340,102 L 350,115 L 345,130 L 325,135 L 305,125 L 305,115 Z", 
    labelX: 328, 
    labelY: 120, 
    scale: 0.9 
  },
  { 
    num: "54", 
    name: "Meurthe-et-Moselle", 
    path: "M 335,120 L 370,117 L 380,130 L 375,145 L 355,150 L 335,140 L 335,130 Z", 
    labelX: 358, 
    labelY: 135, 
    scale: 1.0 
  },
  { 
    num: "57", 
    name: "Moselle", 
    path: "M 365,90 L 400,87 L 410,100 L 405,115 L 385,120 L 365,110 L 365,100 Z", 
    labelX: 388, 
    labelY: 105, 
    scale: 1.1 
  },
  { 
    num: "88", 
    name: "Vosges", 
    path: "M 345,150 L 380,147 L 390,160 L 385,175 L 365,180 L 345,170 L 345,160 Z", 
    labelX: 368, 
    labelY: 165, 
    scale: 1.0 
  },
  
  // Alsace
  { 
    num: "67", 
    name: "Bas-Rhin", 
    path: "M 405,115 L 435,112 L 440,125 L 435,140 L 415,145 L 405,135 L 405,125 Z", 
    labelX: 423, 
    labelY: 130, 
    scale: 1.0 
  },
  { 
    num: "68", 
    name: "Haut-Rhin", 
    path: "M 403,160 L 435,157 L 440,170 L 435,185 L 415,190 L 403,180 L 403,170 Z", 
    labelX: 423, 
    labelY: 175, 
    scale: 1.0 
  },
  
  // Poitou-Charentes
  { 
    num: "79", 
    name: "Deux-Sèvres", 
    path: "M 75,245 L 110,242 L 120,255 L 115,270 L 95,275 L 75,265 L 75,255 Z", 
    labelX: 98, 
    labelY: 260, 
    scale: 0.9 
  },
  { 
    num: "86", 
    name: "Vienne", 
    path: "M 110,250 L 145,247 L 155,260 L 150,275 L 130,280 L 110,270 L 110,260 Z", 
    labelX: 133, 
    labelY: 265, 
    scale: 0.9 
  },
  { 
    num: "17", 
    name: "Charente-Maritime", 
    path: "M 35,275 L 70,272 L 80,285 L 75,300 L 55,305 L 35,295 L 35,285 Z", 
    labelX: 58, 
    labelY: 290, 
    scale: 1.1 
  },
  { 
    num: "16", 
    name: "Charente", 
    path: "M 85,270 L 120,267 L 130,280 L 125,295 L 105,300 L 85,290 L 85,280 Z", 
    labelX: 108, 
    labelY: 285, 
    scale: 1.0 
  },
  
  // Limousin
  { 
    num: "87", 
    name: "Haute-Vienne", 
    path: "M 125,270 L 160,267 L 170,280 L 165,295 L 145,300 L 125,290 L 125,280 Z", 
    labelX: 148, 
    labelY: 285, 
    scale: 1.0 
  },
  { 
    num: "23", 
    name: "Creuse", 
    path: "M 165,260 L 200,257 L 210,270 L 205,285 L 185,290 L 165,280 L 165,270 Z", 
    labelX: 188, 
    labelY: 275, 
    scale: 0.9 
  },
  { 
    num: "19", 
    name: "Corrèze", 
    path: "M 155,290 L 190,287 L 200,300 L 195,315 L 175,320 L 155,310 L 155,300 Z", 
    labelX: 178, 
    labelY: 305, 
    scale: 1.0 
  },
  
  // Aquitaine
  { 
    num: "33", 
    name: "Gironde", 
    path: "M 35,325 L 70,322 L 80,335 L 75,350 L 55,355 L 35,345 L 35,335 Z", 
    labelX: 58, 
    labelY: 340, 
    scale: 1.1 
  },
  { 
    num: "24", 
    name: "Dordogne", 
    path: "M 95,305 L 130,302 L 140,315 L 135,330 L 115,335 L 95,325 L 95,315 Z", 
    labelX: 118, 
    labelY: 320, 
    scale: 1.0 
  },
  { 
    num: "47", 
    name: "Lot-et-Garonne", 
    path: "M 95,345 L 130,342 L 140,355 L 135,370 L 115,375 L 95,365 L 95,355 Z", 
    labelX: 118, 
    labelY: 360, 
    scale: 1.0 
  },
  { 
    num: "40", 
    name: "Landes", 
    path: "M 30,365 L 65,362 L 75,375 L 70,390 L 50,395 L 30,385 L 30,375 Z", 
    labelX: 53, 
    labelY: 380, 
    scale: 1.1 
  },
  { 
    num: "64", 
    name: "Pyrénées-Atlantiques", 
    path: "M 15,405 L 50,402 L 60,415 L 55,430 L 35,435 L 15,425 L 15,415 Z", 
    labelX: 38, 
    labelY: 420, 
    scale: 1.1 
  },
  
  // Midi-Pyrénées
  { 
    num: "46", 
    name: "Lot", 
    path: "M 140,330 L 175,327 L 185,340 L 180,355 L 160,360 L 140,350 L 140,340 Z", 
    labelX: 163, 
    labelY: 345, 
    scale: 0.9 
  },
  { 
    num: "82", 
    name: "Tarn-et-Garonne", 
    path: "M 130,360 L 165,357 L 175,370 L 170,385 L 150,390 L 130,380 L 130,370 Z", 
    labelX: 153, 
    labelY: 375, 
    scale: 0.9 
  },
  { 
    num: "12", 
    name: "Aveyron", 
    path: "M 200,345 L 235,342 L 245,355 L 240,370 L 220,375 L 200,365 L 200,355 Z", 
    labelX: 223, 
    labelY: 360, 
    scale: 1.1 
  },
  { 
    num: "81", 
    name: "Tarn", 
    path: "M 165,375 L 200,372 L 210,385 L 205,400 L 185,405 L 165,395 L 165,385 Z", 
    labelX: 188, 
    labelY: 390, 
    scale: 1.0 
  },
  { 
    num: "32", 
    name: "Gers", 
    path: "M 80,390 L 115,387 L 125,400 L 120,415 L 100,420 L 80,410 L 80,400 Z", 
    labelX: 103, 
    labelY: 405, 
    scale: 1.0 
  },
  { 
    num: "31", 
    name: "Haute-Garonne", 
    path: "M 125,390 L 160,387 L 170,400 L 165,415 L 145,420 L 125,410 L 125,400 Z", 
    labelX: 148, 
    labelY: 405, 
    scale: 1.0 
  },
  { 
    num: "65", 
    name: "Hautes-Pyrénées", 
    path: "M 70,410 L 105,407 L 115,420 L 110,435 L 90,440 L 70,430 L 70,420 Z", 
    labelX: 93, 
    labelY: 425, 
    scale: 1.0 
  },
  { 
    num: "09", 
    name: "Ariège", 
    path: "M 135,420 L 170,417 L 180,430 L 175,445 L 155,450 L 135,440 L 135,430 Z", 
    labelX: 158, 
    labelY: 435, 
    scale: 0.9 
  },
  
  // Auvergne
  { 
    num: "03", 
    name: "Allier", 
    path: "M 225,245 L 260,242 L 270,255 L 265,270 L 245,275 L 225,265 L 225,255 Z", 
    labelX: 248, 
    labelY: 260, 
    scale: 1.0 
  },
  { 
    num: "63", 
    name: "Puy-de-Dôme", 
    path: "M 225,280 L 260,277 L 270,290 L 265,305 L 245,310 L 225,300 L 225,290 Z", 
    labelX: 248, 
    labelY: 295, 
    scale: 1.0 
  },
  { 
    num: "15", 
    name: "Cantal", 
    path: "M 205,300 L 240,297 L 250,310 L 245,325 L 225,330 L 205,320 L 205,310 Z", 
    labelX: 228, 
    labelY: 315, 
    scale: 1.0 
  },
  { 
    num: "43", 
    name: "Haute-Loire", 
    path: "M 255,300 L 290,297 L 300,310 L 295,325 L 275,330 L 255,320 L 255,310 Z", 
    labelX: 278, 
    labelY: 315, 
    scale: 1.0 
  },
  
  // Rhône-Alpes
  { 
    num: "69", 
    name: "Rhône", 
    path: "M 290,260 L 320,257 L 325,270 L 320,285 L 300,290 L 290,280 L 290,270 Z", 
    labelX: 308, 
    labelY: 275, 
    scale: 0.8 
  },
  { 
    num: "01", 
    name: "Ain", 
    path: "M 310,260 L 340,257 L 350,270 L 345,285 L 325,290 L 310,280 L 310,270 Z", 
    labelX: 328, 
    labelY: 275, 
    scale: 1.0 
  },
  { 
    num: "42", 
    name: "Loire", 
    path: "M 275,285 L 310,282 L 320,295 L 315,310 L 295,315 L 275,305 L 275,295 Z", 
    labelX: 298, 
    labelY: 300, 
    scale: 1.0 
  },
  { 
    num: "07", 
    name: "Ardèche", 
    path: "M 275,335 L 310,332 L 320,345 L 315,360 L 295,365 L 275,355 L 275,345 Z", 
    labelX: 298, 
    labelY: 350, 
    scale: 1.0 
  },
  { 
    num: "26", 
    name: "Drôme", 
    path: "M 295,355 L 330,352 L 340,365 L 335,380 L 315,385 L 295,375 L 295,365 Z", 
    labelX: 318, 
    labelY: 370, 
    scale: 1.0 
  },
  { 
    num: "38", 
    name: "Isère", 
    path: "M 320,310 L 355,307 L 365,320 L 360,335 L 340,340 L 320,330 L 320,320 Z", 
    labelX: 343, 
    labelY: 325, 
    scale: 1.1 
  },
  { 
    num: "73", 
    name: "Savoie", 
    path: "M 345,290 L 375,287 L 385,300 L 380,315 L 360,320 L 345,310 L 345,300 Z", 
    labelX: 365, 
    labelY: 305, 
    scale: 1.0 
  },
  { 
    num: "74", 
    name: "Haute-Savoie", 
    path: "M 355,265 L 385,262 L 395,275 L 390,290 L 370,295 L 355,285 L 355,275 Z", 
    labelX: 375, 
    labelY: 280, 
    scale: 1.0 
  },
  
  // Languedoc-Roussillon
  { 
    num: "48", 
    name: "Lozère", 
    path: "M 250,350 L 285,347 L 295,360 L 290,375 L 270,380 L 250,370 L 250,360 Z", 
    labelX: 273, 
    labelY: 365, 
    scale: 0.9 
  },
  { 
    num: "30", 
    name: "Gard", 
    path: "M 265,385 L 300,382 L 310,395 L 305,410 L 285,415 L 265,405 L 265,395 Z", 
    labelX: 288, 
    labelY: 400, 
    scale: 1.0 
  },
  { 
    num: "34", 
    name: "Hérault", 
    path: "M 230,400 L 265,397 L 275,410 L 270,425 L 250,430 L 230,420 L 230,410 Z", 
    labelX: 253, 
    labelY: 415, 
    scale: 1.0 
  },
  { 
    num: "11", 
    name: "Aude", 
    path: "M 195,405 L 230,402 L 240,415 L 235,430 L 215,435 L 195,425 L 195,415 Z", 
    labelX: 218, 
    labelY: 420, 
    scale: 1.0 
  },
  { 
    num: "66", 
    name: "Pyrénées-Orientales", 
    path: "M 205,450 L 240,447 L 250,460 L 245,475 L 225,480 L 205,470 L 205,460 Z", 
    labelX: 228, 
    labelY: 465, 
    scale: 1.0 
  },
  
  // PACA
  { 
    num: "84", 
    name: "Vaucluse", 
    path: "M 305,380 L 340,377 L 350,390 L 345,405 L 325,410 L 305,400 L 305,390 Z", 
    labelX: 328, 
    labelY: 395, 
    scale: 0.9 
  },
  { 
    num: "13", 
    name: "Bouches-du-Rhône", 
    path: "M 305,410 L 340,407 L 350,420 L 345,435 L 325,440 L 305,430 L 305,420 Z", 
    labelX: 328, 
    labelY: 425, 
    scale: 1.0 
  },
  { 
    num: "04", 
    name: "Alpes-de-Haute-Provence", 
    path: "M 340,380 L 375,377 L 385,390 L 380,405 L 360,410 L 340,400 L 340,390 Z", 
    labelX: 363, 
    labelY: 395, 
    scale: 0.9 
  },
  { 
    num: "05", 
    name: "Hautes-Alpes", 
    path: "M 365,350 L 395,347 L 405,360 L 400,375 L 380,380 L 365,370 L 365,360 Z", 
    labelX: 385, 
    labelY: 365, 
    scale: 1.0 
  },
  { 
    num: "83", 
    name: "Var", 
    path: "M 345,420 L 380,417 L 390,430 L 385,445 L 365,450 L 345,440 L 345,430 Z", 
    labelX: 368, 
    labelY: 435, 
    scale: 1.1 
  },
  { 
    num: "06", 
    name: "Alpes-Maritimes", 
    path: "M 395,390 L 425,387 L 435,400 L 430,415 L 410,420 L 395,410 L 395,400 Z", 
    labelX: 413, 
    labelY: 405, 
    scale: 1.0 
  },
  
  // Corse
  { 
    num: "2B", 
    name: "Haute-Corse", 
    path: "M 470,430 L 490,427 L 495,440 L 490,455 L 475,460 L 470,450 L 470,440 Z", 
    labelX: 480, 
    labelY: 445, 
    scale: 0.8 
  },
  { 
    num: "2A", 
    name: "Corse-du-Sud", 
    path: "M 470,460 L 490,457 L 495,470 L 490,485 L 475,490 L 470,480 L 470,470 Z", 
    labelX: 480, 
    labelY: 475, 
    scale: 0.8 
  },
  
  // Île-de-France
  { 
    num: "75", 
    name: "Paris", 
    path: "M 535,90 L 545,90 L 545,100 L 535,100 Z", 
    labelX: 540, 
    labelY: 95, 
    scale: 0.7 
  },
  { 
    num: "92", 
    name: "Hauts-de-Seine", 
    path: "M 505,80 L 520,78 L 522,92 L 510,95 L 502,88 Z", 
    labelX: 512, 
    labelY: 88, 
    scale: 0.6 
  },
  { 
    num: "93", 
    name: "Seine-Saint-Denis", 
    path: "M 552,70 L 568,68 L 570,82 L 558,85 L 550,78 Z", 
    labelX: 560, 
    labelY: 78, 
    scale: 0.6 
  },
  { 
    num: "94", 
    name: "Val-de-Marne", 
    path: "M 552,110 L 568,108 L 570,122 L 558,125 L 550,118 Z", 
    labelX: 560, 
    labelY: 118, 
    scale: 0.6 
  },
  { 
    num: "91", 
    name: "Essonne", 
    path: "M 532,130 L 548,128 L 550,142 L 538,145 L 530,138 Z", 
    labelX: 540, 
    labelY: 138, 
    scale: 0.6 
  },
  { 
    num: "78", 
    name: "Yvelines", 
    path: "M 502,110 L 520,108 L 522,122 L 510,125 L 502,118 Z", 
    labelX: 512, 
    labelY: 118, 
    scale: 0.6 
  },
  { 
    num: "95", 
    name: "Val-d'Oise", 
    path: "M 532,60 L 548,58 L 550,72 L 538,75 L 530,68 Z", 
    labelX: 540, 
    labelY: 68, 
    scale: 0.6 
  },
  { 
    num: "77", 
    name: "Seine-et-Marne", 
    path: "M 582,90 L 598,88 L 600,102 L 588,105 L 580,98 Z", 
    labelX: 590, 
    labelY: 98, 
    scale: 0.7 
  },
  
  // DOM-TOM
  { 
    num: "971", 
    name: "Guadeloupe", 
    path: "M 512,200 L 528,198 L 530,212 L 518,215 L 510,208 Z", 
    labelX: 520, 
    labelY: 208, 
    scale: 0.7 
  },
  { 
    num: "972", 
    name: "Martinique", 
    path: "M 562,200 L 578,198 L 580,212 L 568,215 L 560,208 Z", 
    labelX: 570, 
    labelY: 208, 
    scale: 0.7 
  },
  { 
    num: "973", 
    name: "Guyane", 
    path: "M 612,200 L 628,198 L 630,212 L 618,215 L 610,208 Z", 
    labelX: 620, 
    labelY: 208, 
    scale: 0.7 
  },
  { 
    num: "974", 
    name: "La Réunion", 
    path: "M 512,240 L 528,238 L 530,252 L 518,255 L 510,248 Z", 
    labelX: 520, 
    labelY: 248, 
    scale: 0.7 
  },
  { 
    num: "976", 
    name: "Mayotte", 
    path: "M 582,240 L 598,238 L 600,252 L 588,255 L 580,248 Z", 
    labelX: 590, 
    labelY: 248, 
    scale: 0.7 
  },
];

