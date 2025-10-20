export interface DepartmentPath {
  num: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  scale?: number; // Pour ajuster la taille du texte
}

// Formes SVG simplifiées des départements français
// Coordonnées approximatives basées sur la géographie réelle
export const departmentsPaths: DepartmentPath[] = [
  // Nord-Pas-de-Calais
  { num: "59", name: "Nord", path: "M 205,45 L 230,45 L 235,55 L 230,70 L 215,72 L 200,68 L 198,55 Z", labelX: 215, labelY: 58, scale: 1.2 },
  { num: "62", name: "Pas-de-Calais", path: "M 155,65 L 180,63 L 195,70 L 198,85 L 185,95 L 165,92 L 152,82 Z", labelX: 175, labelY: 78, scale: 1.1 },
  
  // Picardie
  { num: "80", name: "Somme", path: "M 160,88 L 185,85 L 195,95 L 190,110 L 175,112 L 162,105 Z", labelX: 178, labelY: 98, scale: 1.0 },
  { num: "02", name: "Aisne", path: "M 230,95 L 260,92 L 268,105 L 265,120 L 245,125 L 232,115 Z", labelX: 248, labelY: 108, scale: 1.1 },
  { num: "60", name: "Oise", path: "M 190,115 L 215,110 L 228,120 L 220,135 L 200,138 L 185,130 Z", labelX: 205, labelY: 125, scale: 1.0 },
  
  // Normandie
  { num: "76", name: "Seine-Maritime", path: "M 110,75 L 145,72 L 155,85 L 148,100 L 125,102 L 108,95 Z", labelX: 130, labelY: 88, scale: 1.1 },
  { num: "27", name: "Eure", path: "M 120,110 L 150,108 L 158,120 L 152,138 L 130,142 L 115,130 Z", labelX: 138, labelY: 125, scale: 1.0 },
  { num: "14", name: "Calvados", path: "M 55,95 L 85,92 L 98,102 L 95,118 L 75,120 L 52,112 Z", labelX: 75, labelY: 108, scale: 1.0 },
  { num: "50", name: "Manche", path: "M 15,100 L 45,98 L 52,115 L 48,130 L 30,132 L 12,120 Z", labelX: 32, labelY: 115, scale: 1.0 },
  { num: "61", name: "Orne", path: "M 85,135 L 115,132 L 125,145 L 118,160 L 95,162 L 80,150 Z", labelX: 105, labelY: 147, scale: 0.9 },
  
  // Bretagne
  { num: "22", name: "Côtes-d'Armor", path: "M 8,140 L 38,138 L 48,150 L 42,165 L 20,168 L 5,158 Z", labelX: 28, labelY: 153, scale: 1.0 },
  { num: "29", name: "Finistère", path: "M -35,152 L -5,150 L 8,162 L 2,178 L -20,182 L -38,170 Z", labelX: -15, labelY: 166, scale: 1.1 },
  { num: "35", name: "Ille-et-Vilaine", path: "M 45,155 L 75,152 L 85,165 L 78,180 L 55,183 L 42,170 Z", labelX: 63, labelY: 167, scale: 1.0 },
  { num: "56", name: "Morbihan", path: "M 5,185 L 35,182 L 45,195 L 38,210 L 15,213 L 2,200 Z", labelX: 25, labelY: 197, scale: 1.0 },
  
  // Pays de la Loire
  { num: "44", name: "Loire-Atlantique", path: "M 30,215 L 60,212 L 70,225 L 63,242 L 40,245 L 27,232 Z", labelX: 48, labelY: 228, scale: 1.1 },
  { num: "49", name: "Maine-et-Loire", path: "M 78,205 L 110,202 L 120,215 L 113,230 L 88,233 L 75,220 Z", labelX: 98, labelY: 218, scale: 1.0 },
  { num: "53", name: "Mayenne", path: "M 85,172 L 112,170 L 122,182 L 115,195 L 92,198 L 80,185 Z", labelX: 102, labelY: 183, scale: 0.9 },
  { num: "72", name: "Sarthe", path: "M 115,182 L 145,180 L 155,192 L 148,208 L 123,210 L 112,197 Z", labelX: 133, labelY: 195, scale: 1.0 },
  { num: "85", name: "Vendée", path: "M 40,248 L 70,245 L 80,258 L 73,272 L 48,275 L 35,262 Z", labelX: 58, labelY: 260, scale: 1.0 },
  
  // Centre-Val de Loire
  { num: "28", name: "Eure-et-Loir", path: "M 135,150 L 165,148 L 175,160 L 168,175 L 143,177 L 130,165 Z", labelX: 153, labelY: 163, scale: 1.0 },
  { num: "45", name: "Loiret", path: "M 175,165 L 205,162 L 215,175 L 208,190 L 183,192 L 170,180 Z", labelX: 193, labelY: 177, scale: 1.0 },
  { num: "41", name: "Loir-et-Cher", path: "M 135,195 L 165,192 L 175,205 L 168,218 L 143,220 L 130,208 Z", labelX: 153, labelY: 207, scale: 1.0 },
  { num: "37", name: "Indre-et-Loire", path: "M 110,230 L 140,227 L 150,240 L 143,253 L 118,255 L 105,243 Z", labelX: 128, labelY: 242, scale: 1.0 },
  { num: "36", name: "Indre", path: "M 150,230 L 180,227 L 190,240 L 183,255 L 158,257 L 145,245 Z", labelX: 168, labelY: 242, scale: 1.0 },
  { num: "18", name: "Cher", path: "M 190,205 L 220,202 L 230,215 L 223,228 L 198,230 L 185,218 Z", labelX: 208, labelY: 217, scale: 1.0 },
  
  // Bourgogne
  { num: "89", name: "Yonne", path: "M 230,175 L 260,172 L 270,185 L 263,198 L 238,200 L 225,188 Z", labelX: 248, labelY: 187, scale: 1.0 },
  { num: "21", name: "Côte-d'Or", path: "M 270,195 L 300,192 L 310,205 L 303,218 L 278,220 L 265,208 Z", labelX: 288, labelY: 207, scale: 1.0 },
  { num: "58", name: "Nièvre", path: "M 230,220 L 260,217 L 270,230 L 263,243 L 238,245 L 225,233 Z", labelX: 248, labelY: 232, scale: 1.0 },
  { num: "71", name: "Saône-et-Loire", path: "M 280,235 L 310,232 L 320,245 L 313,260 L 288,262 L 275,250 Z", labelX: 298, labelY: 247, scale: 1.1 },
  
  // Franche-Comté
  { num: "70", name: "Haute-Saône", path: "M 330,185 L 360,182 L 370,195 L 363,208 L 338,210 L 325,198 Z", labelX: 348, labelY: 197, scale: 1.0 },
  { num: "25", name: "Doubs", path: "M 340,215 L 370,212 L 380,225 L 373,238 L 348,240 L 335,228 Z", labelX: 358, labelY: 227, scale: 1.0 },
  { num: "39", name: "Jura", path: "M 320,250 L 350,247 L 360,260 L 353,273 L 328,275 L 315,263 Z", labelX: 338, labelY: 262, scale: 0.9 },
  { num: "90", name: "Territoire de Belfort", path: "M 378,208 L 395,206 L 400,215 L 395,224 L 383,225 L 375,217 Z", labelX: 387, labelY: 216, scale: 0.7 },
  
  // Champagne-Ardenne
  { num: "08", name: "Ardennes", path: "M 275,80 L 305,77 L 315,90 L 308,103 L 283,105 L 270,93 Z", labelX: 293, labelY: 92, scale: 1.0 },
  { num: "51", name: "Marne", path: "M 270,120 L 300,117 L 310,130 L 303,143 L 278,145 L 265,133 Z", labelX: 288, labelY: 132, scale: 1.0 },
  { num: "10", name: "Aube", path: "M 250,145 L 280,142 L 290,155 L 283,168 L 258,170 L 245,158 Z", labelX: 268, labelY: 157, scale: 0.9 },
  { num: "52", name: "Haute-Marne", path: "M 295,165 L 325,162 L 335,175 L 328,188 L 303,190 L 290,178 Z", labelX: 313, labelY: 177, scale: 1.0 },
  
  // Lorraine
  { num: "55", name: "Meuse", path: "M 310,110 L 340,107 L 350,120 L 343,133 L 318,135 L 305,123 Z", labelX: 328, labelY: 122, scale: 0.9 },
  { num: "54", name: "Meurthe-et-Moselle", path: "M 340,125 L 370,122 L 380,135 L 373,148 L 348,150 L 335,138 Z", labelX: 358, labelY: 137, scale: 1.0 },
  { num: "57", name: "Moselle", path: "M 370,95 L 400,92 L 410,105 L 403,118 L 378,120 L 365,108 Z", labelX: 388, labelY: 107, scale: 1.1 },
  { num: "88", name: "Vosges", path: "M 350,155 L 380,152 L 390,165 L 383,178 L 358,180 L 345,168 Z", labelX: 368, labelY: 167, scale: 1.0 },
  
  // Alsace
  { num: "67", name: "Bas-Rhin", path: "M 410,120 L 433,118 L 440,130 L 433,143 L 415,145 L 405,133 Z", labelX: 423, labelY: 132, scale: 1.0 },
  { num: "68", name: "Haut-Rhin", path: "M 408,165 L 433,162 L 440,175 L 433,188 L 415,190 L 403,178 Z", labelX: 423, labelY: 177, scale: 1.0 },
  
  // Poitou-Charentes
  { num: "79", name: "Deux-Sèvres", path: "M 80,252 L 110,249 L 120,262 L 113,275 L 88,277 L 75,265 Z", labelX: 98, labelY: 264, scale: 0.9 },
  { num: "86", name: "Vienne", path: "M 115,258 L 145,255 L 155,268 L 148,281 L 123,283 L 110,271 Z", labelX: 133, labelY: 270, scale: 0.9 },
  { num: "17", name: "Charente-Maritime", path: "M 40,282 L 70,279 L 80,292 L 73,308 L 48,310 L 35,298 Z", labelX: 58, labelY: 295, scale: 1.1 },
  { num: "16", name: "Charente", path: "M 90,278 L 120,275 L 130,288 L 123,301 L 98,303 L 85,291 Z", labelX: 108, labelY: 290, scale: 1.0 },
  
  // Limousin
  { num: "87", name: "Haute-Vienne", path: "M 130,280 L 160,277 L 170,290 L 163,303 L 138,305 L 125,293 Z", labelX: 148, labelY: 292, scale: 1.0 },
  { num: "23", name: "Creuse", path: "M 170,268 L 200,265 L 210,278 L 203,291 L 178,293 L 165,281 Z", labelX: 188, labelY: 280, scale: 0.9 },
  { num: "19", name: "Corrèze", path: "M 160,298 L 190,295 L 200,308 L 193,321 L 168,323 L 155,311 Z", labelX: 178, labelY: 310, scale: 1.0 },
  
  // Aquitaine
  { num: "33", name: "Gironde", path: "M 40,335 L 70,332 L 80,345 L 73,360 L 48,362 L 35,350 Z", labelX: 58, labelY: 347, scale: 1.1 },
  { num: "24", name: "Dordogne", path: "M 100,315 L 130,312 L 140,325 L 133,340 L 108,342 L 95,330 Z", labelX: 118, labelY: 327, scale: 1.0 },
  { num: "47", name: "Lot-et-Garonne", path: "M 100,355 L 130,352 L 140,365 L 133,378 L 108,380 L 95,368 Z", labelX: 118, labelY: 367, scale: 1.0 },
  { num: "40", name: "Landes", path: "M 35,375 L 65,372 L 75,385 L 68,400 L 43,402 L 30,390 Z", labelX: 53, labelY: 387, scale: 1.1 },
  { num: "64", name: "Pyrénées-Atlantiques", path: "M 20,415 L 50,412 L 60,425 L 53,440 L 28,442 L 15,430 Z", labelX: 38, labelY: 427, scale: 1.1 },
  
  // Midi-Pyrénées
  { num: "46", name: "Lot", path: "M 145,340 L 175,337 L 185,350 L 178,363 L 153,365 L 140,353 Z", labelX: 163, labelY: 352, scale: 0.9 },
  { num: "82", name: "Tarn-et-Garonne", path: "M 135,373 L 165,370 L 175,383 L 168,396 L 143,398 L 130,386 Z", labelX: 153, labelY: 385, scale: 0.9 },
  { num: "12", name: "Aveyron", path: "M 205,355 L 235,352 L 245,365 L 238,380 L 213,382 L 200,370 Z", labelX: 223, labelY: 367, scale: 1.1 },
  { num: "81", name: "Tarn", path: "M 170,388 L 200,385 L 210,398 L 203,411 L 178,413 L 165,401 Z", labelX: 188, labelY: 400, scale: 1.0 },
  { num: "32", name: "Gers", path: "M 85,405 L 115,402 L 125,415 L 118,428 L 93,430 L 80,418 Z", labelX: 103, labelY: 417, scale: 1.0 },
  { num: "31", name: "Haute-Garonne", path: "M 130,408 L 160,405 L 170,418 L 163,431 L 138,433 L 125,421 Z", labelX: 148, labelY: 420, scale: 1.0 },
  { num: "65", name: "Hautes-Pyrénées", path: "M 75,428 L 105,425 L 115,438 L 108,451 L 83,453 L 70,441 Z", labelX: 93, labelY: 440, scale: 1.0 },
  { num: "09", name: "Ariège", path: "M 140,438 L 170,435 L 180,448 L 173,461 L 148,463 L 135,451 Z", labelX: 158, labelY: 450, scale: 0.9 },
  
  // Auvergne
  { num: "03", name: "Allier", path: "M 230,255 L 260,252 L 270,265 L 263,278 L 238,280 L 225,268 Z", labelX: 248, labelY: 267, scale: 1.0 },
  { num: "63", name: "Puy-de-Dôme", path: "M 230,290 L 260,287 L 270,300 L 263,313 L 238,315 L 225,303 Z", labelX: 248, labelY: 302, scale: 1.0 },
  { num: "15", name: "Cantal", path: "M 210,315 L 240,312 L 250,325 L 243,338 L 218,340 L 205,328 Z", labelX: 228, labelY: 327, scale: 1.0 },
  { num: "43", name: "Haute-Loire", path: "M 260,315 L 290,312 L 300,325 L 293,338 L 268,340 L 255,328 Z", labelX: 278, labelY: 327, scale: 1.0 },
  
  // Rhône-Alpes
  { num: "69", name: "Rhône", path: "M 295,272 L 318,270 L 325,280 L 320,290 L 300,292 L 290,282 Z", labelX: 308, labelY: 281, scale: 0.8 },
  { num: "01", name: "Ain", path: "M 315,270 L 340,267 L 350,280 L 343,293 L 318,295 L 305,283 Z", labelX: 328, labelY: 282, scale: 1.0 },
  { num: "42", name: "Loire", path: "M 280,297 L 310,294 L 320,307 L 313,320 L 288,322 L 275,310 Z", labelX: 298, labelY: 309, scale: 1.0 },
  { num: "07", name: "Ardèche", path: "M 280,347 L 310,344 L 320,357 L 313,370 L 288,372 L 275,360 Z", labelX: 298, labelY: 359, scale: 1.0 },
  { num: "26", name: "Drôme", path: "M 300,368 L 330,365 L 340,378 L 333,391 L 308,393 L 295,381 Z", labelX: 318, labelY: 380, scale: 1.0 },
  { num: "38", name: "Isère", path: "M 325,325 L 355,322 L 365,335 L 358,348 L 333,350 L 320,338 Z", labelX: 343, labelY: 337, scale: 1.1 },
  { num: "73", name: "Savoie", path: "M 350,305 L 375,302 L 383,315 L 378,328 L 355,330 L 345,318 Z", labelX: 365, labelY: 317, scale: 1.0 },
  { num: "74", name: "Haute-Savoie", path: "M 360,278 L 385,275 L 393,288 L 388,300 L 365,302 L 355,290 Z", labelX: 375, labelY: 290, scale: 1.0 },
  
  // Languedoc-Roussillon
  { num: "48", name: "Lozère", path: "M 255,363 L 285,360 L 295,373 L 288,386 L 263,388 L 250,376 Z", labelX: 273, labelY: 375, scale: 0.9 },
  { num: "30", name: "Gard", path: "M 270,398 L 300,395 L 310,408 L 303,421 L 278,423 L 265,411 Z", labelX: 288, labelY: 410, scale: 1.0 },
  { num: "34", name: "Hérault", path: "M 235,415 L 265,412 L 275,425 L 268,438 L 243,440 L 230,428 Z", labelX: 253, labelY: 427, scale: 1.0 },
  { num: "11", name: "Aude", path: "M 200,423 L 230,420 L 240,433 L 233,446 L 208,448 L 195,436 Z", labelX: 218, labelY: 435, scale: 1.0 },
  { num: "66", name: "Pyrénées-Orientales", path: "M 210,468 L 240,465 L 250,478 L 243,491 L 218,493 L 205,481 Z", labelX: 228, labelY: 480, scale: 1.0 },
  
  // PACA
  { num: "84", name: "Vaucluse", path: "M 310,395 L 340,392 L 350,405 L 343,418 L 318,420 L 305,408 Z", labelX: 328, labelY: 407, scale: 0.9 },
  { num: "13", name: "Bouches-du-Rhône", path: "M 310,428 L 340,425 L 350,438 L 343,451 L 318,453 L 305,441 Z", labelX: 328, labelY: 440, scale: 1.0 },
  { num: "04", name: "Alpes-de-Haute-Provence", path: "M 345,398 L 375,395 L 385,408 L 378,421 L 353,423 L 340,411 Z", labelX: 363, labelY: 410, scale: 0.9 },
  { num: "05", name: "Hautes-Alpes", path: "M 370,365 L 395,362 L 403,375 L 398,388 L 375,390 L 365,378 Z", labelX: 385, labelY: 377, scale: 1.0 },
  { num: "83", name: "Var", path: "M 350,438 L 380,435 L 390,448 L 383,461 L 358,463 L 345,451 Z", labelX: 368, labelY: 450, scale: 1.1 },
  { num: "06", name: "Alpes-Maritimes", path: "M 398,408 L 425,405 L 433,418 L 428,431 L 405,433 L 393,421 Z", labelX: 413, labelY: 420, scale: 1.0 },
  
  // Corse
  { num: "2B", name: "Haute-Corse", path: "M 472,445 L 488,443 L 493,455 L 488,467 L 475,469 L 468,457 Z", labelX: 480, labelY: 457, scale: 0.8 },
  { num: "2A", name: "Corse-du-Sud", path: "M 472,473 L 488,471 L 493,483 L 488,495 L 475,497 L 468,485 Z", labelX: 480, labelY: 485, scale: 0.8 },
  
  // Île-de-France
  { num: "75", name: "Paris", path: "M 535,96 L 545,96 L 545,106 L 535,106 Z", labelX: 540, labelY: 101, scale: 0.7 },
  { num: "92", name: "Hauts-de-Seine", path: "M 505,86 L 520,85 L 522,97 L 510,99 L 502,92 Z", labelX: 512, labelY: 92, scale: 0.6 },
  { num: "93", name: "Seine-Saint-Denis", path: "M 552,76 L 568,75 L 570,87 L 558,89 L 550,82 Z", labelX: 560, labelY: 82, scale: 0.6 },
  { num: "94", name: "Val-de-Marne", path: "M 552,116 L 568,115 L 570,127 L 558,129 L 550,122 Z", labelX: 560, labelY: 122, scale: 0.6 },
  { num: "91", name: "Essonne", path: "M 532,136 L 548,135 L 550,147 L 538,149 L 530,142 Z", labelX: 540, labelY: 142, scale: 0.6 },
  { num: "78", name: "Yvelines", path: "M 502,116 L 520,115 L 522,127 L 510,129 L 502,122 Z", labelX: 512, labelY: 122, scale: 0.6 },
  { num: "95", name: "Val-d'Oise", path: "M 532,66 L 548,65 L 550,77 L 538,79 L 530,72 Z", labelX: 540, labelY: 72, scale: 0.6 },
  { num: "77", name: "Seine-et-Marne", path: "M 582,96 L 598,95 L 600,107 L 588,109 L 580,102 Z", labelX: 590, labelY: 102, scale: 0.7 },
  
  // DOM-TOM
  { num: "971", name: "Guadeloupe", path: "M 512,206 L 528,205 L 530,217 L 518,219 L 510,212 Z", labelX: 520, labelY: 212, scale: 0.7 },
  { num: "972", name: "Martinique", path: "M 562,206 L 578,205 L 580,217 L 568,219 L 560,212 Z", labelX: 570, labelY: 212, scale: 0.7 },
  { num: "973", name: "Guyane", path: "M 612,206 L 628,205 L 630,217 L 618,219 L 610,212 Z", labelX: 620, labelY: 212, scale: 0.7 },
  { num: "974", name: "La Réunion", path: "M 512,246 L 528,245 L 530,257 L 518,259 L 510,252 Z", labelX: 520, labelY: 252, scale: 0.7 },
  { num: "976", name: "Mayotte", path: "M 582,246 L 598,245 L 600,257 L 588,259 L 580,252 Z", labelX: 590, labelY: 252, scale: 0.7 },
];

