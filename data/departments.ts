export interface Department {
  id: number;
  numero: string;
  name: string;
  prefecture: string;
  hints: string[];
  blason: string;
}

export const departments: Department[] = [
  { id: 1, numero: "01", name: "Ain", prefecture: "Bourg-en-Bresse", hints: ["Début de la liste", "Frontière suisse", "Commence par A"], blason: "01.png" },
  { id: 2, numero: "02", name: "Aisne", prefecture: "Laon", hints: ["Nord de la France", "Région Hauts-de-France", "Commence par A"], blason: "02.png" },
  { id: 3, numero: "03", name: "Allier", prefecture: "Moulins", hints: ["Centre de la France", "Région Auvergne-Rhône-Alpes", "Commence par A"], blason: "03.png" },
  { id: 4, numero: "04", name: "Alpes-de-Haute-Provence", prefecture: "Digne-les-Bains", hints: ["Sud de la France", "Région Provence-Alpes-Côte d'Azur", "Commence par A"], blason: "04.png" },
  { id: 5, numero: "05", name: "Hautes-Alpes", prefecture: "Gap", hints: ["Sud de la France", "Région Provence-Alpes-Côte d'Azur", "Commence par H"], blason: "05.png" },
  { id: 6, numero: "06", name: "Alpes-Maritimes", prefecture: "Nice", hints: ["Sud de la France", "Région Provence-Alpes-Côte d'Azur", "Commence par A"], blason: "06.png" },
  { id: 7, numero: "07", name: "Ardèche", prefecture: "Privas", hints: ["Sud de la France", "Région Auvergne-Rhône-Alpes", "Commence par A"], blason: "07.png" },
  { id: 8, numero: "08", name: "Ardennes", prefecture: "Charleville-Mézières", hints: ["Nord de la France", "Région Grand Est", "Commence par A"], blason: "08.png" },
  { id: 9, numero: "09", name: "Ariège", prefecture: "Foix", hints: ["Sud de la France", "Région Occitanie", "Commence par A"], blason: "09.png" },
  { id: 10, numero: "10", name: "Aube", prefecture: "Troyes", hints: ["Nord de la France", "Région Grand Est", "Commence par A"], blason: "10.png" },
  { id: 11, numero: "11", name: "Aude", prefecture: "Carcassonne", hints: ["Sud de la France", "Région Occitanie", "Commence par A"], blason: "11.png" },
  { id: 12, numero: "12", name: "Aveyron", prefecture: "Rodez", hints: ["Sud de la France", "Région Occitanie", "Commence par A"], blason: "12.png" },
  { id: 13, numero: "13", name: "Bouches-du-Rhône", prefecture: "Marseille", hints: ["Sud de la France", "Région Provence-Alpes-Côte d'Azur", "Commence par B"], blason: "13.png" },
  { id: 14, numero: "14", name: "Calvados", prefecture: "Caen", hints: ["Nord de la France", "Région Normandie", "Commence par C"], blason: "14.png" },
  { id: 15, numero: "15", name: "Cantal", prefecture: "Aurillac", hints: ["Centre de la France", "Région Auvergne-Rhône-Alpes", "Commence par C"], blason: "15.png" },
  { id: 16, numero: "16", name: "Charente", prefecture: "Angoulême", hints: ["Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par C"], blason: "16.png" },
  { id: 17, numero: "17", name: "Charente-Maritime", prefecture: "La Rochelle", hints: ["Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par C"], blason: "17.png" },
  { id: 18, numero: "18", name: "Cher", prefecture: "Bourges", hints: ["Centre de la France", "Région Centre-Val de Loire", "Commence par C"], blason: "18.png" },
  { id: 19, numero: "19", name: "Corrèze", prefecture: "Tulle", hints: ["Centre de la France", "Région Nouvelle-Aquitaine", "Commence par C"], blason: "19.png" },
  { id: 20, numero: "2A", name: "Corse-du-Sud", prefecture: "Ajaccio", hints: ["Île de Corse", "Région Corse", "Commence par C"], blason: "2A.png" },
  { id: 21, numero: "2B", name: "Haute-Corse", prefecture: "Bastia", hints: ["Île de Corse", "Région Corse", "Commence par H"], blason: "2B.png" },
  { id: 22, numero: "21", name: "Côte-d'Or", prefecture: "Dijon", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par C"], blason: "21.png" },
  { id: 23, numero: "22", name: "Côtes-d'Armor", prefecture: "Saint-Brieuc", hints: ["Ouest de la France", "Région Bretagne", "Commence par C"], blason: "22.png" },
  { id: 24, numero: "23", name: "Creuse", prefecture: "Guéret", hints: ["Centre de la France", "Région Nouvelle-Aquitaine", "Commence par C"], blason: "23.png" },
  { id: 25, numero: "24", name: "Dordogne", prefecture: "Périgueux", hints: ["Sud-Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par D"], blason: "24.png" },
  { id: 26, numero: "25", name: "Doubs", prefecture: "Besançon", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par D"], blason: "25.png" },
  { id: 27, numero: "26", name: "Drôme", prefecture: "Valence", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par D"], blason: "26.png" },
  { id: 28, numero: "27", name: "Eure", prefecture: "Évreux", hints: ["Nord de la France", "Région Normandie", "Commence par E"], blason: "27.png" },
  { id: 29, numero: "28", name: "Eure-et-Loir", prefecture: "Chartres", hints: ["Centre de la France", "Région Centre-Val de Loire", "Commence par E"], blason: "28.png" },
  { id: 30, numero: "29", name: "Finistère", prefecture: "Quimper", hints: ["Ouest de la France", "Région Bretagne", "Commence par F"], blason: "29.png" },
  { id: 31, numero: "30", name: "Gard", prefecture: "Nîmes", hints: ["Sud de la France", "Région Occitanie", "Commence par G"], blason: "30.png" },
  { id: 32, numero: "31", name: "Haute-Garonne", prefecture: "Toulouse", hints: ["Sud de la France", "Région Occitanie", "Commence par H"], blason: "31.png" },
  { id: 33, numero: "32", name: "Gers", prefecture: "Auch", hints: ["Sud de la France", "Région Occitanie", "Commence par G"], blason: "32.png" },
  { id: 34, numero: "33", name: "Gironde", prefecture: "Bordeaux", hints: ["Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par G"], blason: "33.png" },
  { id: 35, numero: "34", name: "Hérault", prefecture: "Montpellier", hints: ["Sud de la France", "Région Occitanie", "Commence par H"], blason: "34.png" },
  { id: 36, numero: "35", name: "Ille-et-Vilaine", prefecture: "Rennes", hints: ["Ouest de la France", "Région Bretagne", "Commence par I"], blason: "35.png" },
  { id: 37, numero: "36", name: "Indre", prefecture: "Châteauroux", hints: ["Centre de la France", "Région Centre-Val de Loire", "Commence par I"], blason: "36.png" },
  { id: 38, numero: "37", name: "Indre-et-Loire", prefecture: "Tours", hints: ["Centre de la France", "Région Centre-Val de Loire", "Commence par I"], blason: "37.png" },
  { id: 39, numero: "38", name: "Isère", prefecture: "Grenoble", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par I"], blason: "38.png" },
  { id: 40, numero: "39", name: "Jura", prefecture: "Lons-le-Saunier", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par J"], blason: "39.png" },
  { id: 41, numero: "40", name: "Landes", prefecture: "Mont-de-Marsan", hints: ["Sud-Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par L"], blason: "40.png" },
  { id: 42, numero: "41", name: "Loir-et-Cher", prefecture: "Blois", hints: ["Centre de la France", "Région Centre-Val de Loire", "Commence par L"], blason: "41.png" },
  { id: 43, numero: "42", name: "Loire", prefecture: "Saint-Étienne", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par L"], blason: "42.png" },
  { id: 44, numero: "43", name: "Haute-Loire", prefecture: "Le Puy-en-Velay", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par H"], blason: "43.png" },
  { id: 45, numero: "44", name: "Loire-Atlantique", prefecture: "Nantes", hints: ["Ouest de la France", "Région Pays de la Loire", "Commence par L"], blason: "44.png" },
  { id: 46, numero: "45", name: "Loiret", prefecture: "Orléans", hints: ["Centre de la France", "Région Centre-Val de Loire", "Commence par L"], blason: "45.png" },
  { id: 47, numero: "46", name: "Lot", prefecture: "Cahors", hints: ["Sud de la France", "Région Occitanie", "Commence par L"], blason: "46.png" },
  { id: 48, numero: "47", name: "Lot-et-Garonne", prefecture: "Agen", hints: ["Sud-Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par L"], blason: "47.png" },
  { id: 49, numero: "48", name: "Lozère", prefecture: "Mende", hints: ["Sud de la France", "Région Occitanie", "Commence par L"], blason: "48.png" },
  { id: 50, numero: "49", name: "Maine-et-Loire", prefecture: "Angers", hints: ["Ouest de la France", "Région Pays de la Loire", "Commence par M"], blason: "49.png" },
  { id: 51, numero: "50", name: "Manche", prefecture: "Saint-Lô", hints: ["Nord de la France", "Région Normandie", "Commence par M"], blason: "50.png" },
  { id: 52, numero: "51", name: "Marne", prefecture: "Châlons-en-Champagne", hints: ["Nord de la France", "Région Grand Est", "Commence par M"], blason: "51.png" },
  { id: 53, numero: "52", name: "Haute-Marne", prefecture: "Chaumont", hints: ["Nord de la France", "Région Grand Est", "Commence par H"], blason: "52.png" },
  { id: 54, numero: "53", name: "Mayenne", prefecture: "Laval", hints: ["Ouest de la France", "Région Pays de la Loire", "Commence par M"], blason: "53.png" },
  { id: 55, numero: "54", name: "Meurthe-et-Moselle", prefecture: "Nancy", hints: ["Est de la France", "Région Grand Est", "Commence par M"], blason: "54.png" },
  { id: 56, numero: "55", name: "Meuse", prefecture: "Bar-le-Duc", hints: ["Est de la France", "Région Grand Est", "Commence par M"], blason: "55.png" },
  { id: 57, numero: "56", name: "Morbihan", prefecture: "Vannes", hints: ["Ouest de la France", "Région Bretagne", "Commence par M"], blason: "56.png" },
  { id: 58, numero: "57", name: "Moselle", prefecture: "Metz", hints: ["Est de la France", "Région Grand Est", "Commence par M"], blason: "57.png" },
  { id: 59, numero: "58", name: "Nièvre", prefecture: "Nevers", hints: ["Centre de la France", "Région Bourgogne-Franche-Comté", "Commence par N"], blason: "58.png" },
  { id: 60, numero: "59", name: "Nord", prefecture: "Lille", hints: ["Nord de la France", "Région Hauts-de-France", "Commence par N"], blason: "59.png" },
  { id: 61, numero: "60", name: "Oise", prefecture: "Beauvais", hints: ["Nord de la France", "Région Hauts-de-France", "Commence par O"], blason: "60.png" },
  { id: 62, numero: "61", name: "Orne", prefecture: "Alençon", hints: ["Nord de la France", "Région Normandie", "Commence par O"], blason: "61.png" },
  { id: 63, numero: "62", name: "Pas-de-Calais", prefecture: "Arras", hints: ["Nord de la France", "Région Hauts-de-France", "Commence par P"], blason: "62.png" },
  { id: 64, numero: "63", name: "Puy-de-Dôme", prefecture: "Clermont-Ferrand", hints: ["Centre de la France", "Région Auvergne-Rhône-Alpes", "Commence par P"], blason: "63.png" },
  { id: 65, numero: "64", name: "Pyrénées-Atlantiques", prefecture: "Pau", hints: ["Sud-Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par P"], blason: "64.png" },
  { id: 66, numero: "65", name: "Hautes-Pyrénées", prefecture: "Tarbes", hints: ["Sud de la France", "Région Occitanie", "Commence par H"], blason: "65.png" },
  { id: 67, numero: "66", name: "Pyrénées-Orientales", prefecture: "Perpignan", hints: ["Sud de la France", "Région Occitanie", "Commence par P"], blason: "66.png" },
  { id: 68, numero: "67", name: "Bas-Rhin", prefecture: "Strasbourg", hints: ["Est de la France", "Région Grand Est", "Commence par B"], blason: "67.png" },
  { id: 69, numero: "68", name: "Haut-Rhin", prefecture: "Colmar", hints: ["Est de la France", "Région Grand Est", "Commence par H"], blason: "68.png" },
  { id: 70, numero: "69", name: "Rhône", prefecture: "Lyon", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par R"], blason: "69.png" },
  { id: 71, numero: "70", name: "Haute-Saône", prefecture: "Vesoul", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par H"], blason: "70.png" },
  { id: 72, numero: "71", name: "Saône-et-Loire", prefecture: "Mâcon", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par S"], blason: "71.png" },
  { id: 73, numero: "72", name: "Sarthe", prefecture: "Le Mans", hints: ["Ouest de la France", "Région Pays de la Loire", "Commence par S"], blason: "72.png" },
  { id: 74, numero: "73", name: "Savoie", prefecture: "Chambéry", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par S"], blason: "73.png" },
  { id: 75, numero: "74", name: "Haute-Savoie", prefecture: "Annecy", hints: ["Sud-Est de la France", "Région Auvergne-Rhône-Alpes", "Commence par H"], blason: "74.png" },
  { id: 76, numero: "75", name: "Paris", prefecture: "Paris", hints: ["Île-de-France", "Capitale de la France", "Commence par P"], blason: "75.png" },
  { id: 77, numero: "76", name: "Seine-Maritime", prefecture: "Rouen", hints: ["Nord de la France", "Région Normandie", "Commence par S"], blason: "76.png" },
  { id: 78, numero: "77", name: "Seine-et-Marne", prefecture: "Melun", hints: ["Île-de-France", "Région Île-de-France", "Commence par S"], blason: "77.png" },
  { id: 79, numero: "78", name: "Yvelines", prefecture: "Versailles", hints: ["Île-de-France", "Région Île-de-France", "Commence par Y"], blason: "78.png" },
  { id: 80, numero: "79", name: "Deux-Sèvres", prefecture: "Niort", hints: ["Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par D"], blason: "79.png" },
  { id: 81, numero: "80", name: "Somme", prefecture: "Amiens", hints: ["Nord de la France", "Région Hauts-de-France", "Commence par S"], blason: "80.png" },
  { id: 82, numero: "81", name: "Tarn", prefecture: "Albi", hints: ["Sud de la France", "Région Occitanie", "Commence par T"], blason: "81.png" },
  { id: 83, numero: "82", name: "Tarn-et-Garonne", prefecture: "Montauban", hints: ["Sud de la France", "Région Occitanie", "Commence par T"], blason: "82.png" },
  { id: 84, numero: "83", name: "Var", prefecture: "Toulon", hints: ["Sud de la France", "Région Provence-Alpes-Côte d'Azur", "Commence par V"], blason: "83.png" },
  { id: 85, numero: "84", name: "Vaucluse", prefecture: "Avignon", hints: ["Sud de la France", "Région Provence-Alpes-Côte d'Azur", "Commence par V"], blason: "84.png" },
  { id: 86, numero: "85", name: "Vendée", prefecture: "La Roche-sur-Yon", hints: ["Ouest de la France", "Région Pays de la Loire", "Commence par V"], blason: "85.png" },
  { id: 87, numero: "86", name: "Vienne", prefecture: "Poitiers", hints: ["Ouest de la France", "Région Nouvelle-Aquitaine", "Commence par V"], blason: "86.png" },
  { id: 88, numero: "87", name: "Haute-Vienne", prefecture: "Limoges", hints: ["Centre de la France", "Région Nouvelle-Aquitaine", "Commence par H"], blason: "87.png" },
  { id: 89, numero: "88", name: "Vosges", prefecture: "Épinal", hints: ["Est de la France", "Région Grand Est", "Commence par V"], blason: "88.png" },
  { id: 90, numero: "89", name: "Yonne", prefecture: "Auxerre", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par Y"], blason: "89.png" },
  { id: 91, numero: "90", name: "Territoire de Belfort", prefecture: "Belfort", hints: ["Est de la France", "Région Bourgogne-Franche-Comté", "Commence par T"], blason: "90.png" },
  { id: 92, numero: "91", name: "Essonne", prefecture: "Évry", hints: ["Île-de-France", "Région Île-de-France", "Commence par E"], blason: "91.png" },
  { id: 93, numero: "92", name: "Hauts-de-Seine", prefecture: "Nanterre", hints: ["Île-de-France", "Région Île-de-France", "Commence par H"], blason: "92.png" },
  { id: 94, numero: "93", name: "Seine-Saint-Denis", prefecture: "Bobigny", hints: ["Île-de-France", "Région Île-de-France", "Commence par S"], blason: "93.png" },
  { id: 95, numero: "94", name: "Val-de-Marne", prefecture: "Créteil", hints: ["Île-de-France", "Région Île-de-France", "Commence par V"], blason: "94.png" },
  { id: 96, numero: "95", name: "Val-d'Oise", prefecture: "Pontoise", hints: ["Île-de-France", "Région Île-de-France", "Commence par V"], blason: "95.png" },
  { id: 97, numero: "971", name: "Guadeloupe", prefecture: "Basse-Terre", hints: ["Antilles françaises", "Département d'outre-mer", "Commence par G"], blason: "971.png" },
  { id: 98, numero: "972", name: "Martinique", prefecture: "Fort-de-France", hints: ["Antilles françaises", "Département d'outre-mer", "Commence par M"], blason: "972.png" },
  { id: 99, numero: "973", name: "Guyane", prefecture: "Cayenne", hints: ["Amérique du Sud", "Département d'outre-mer", "Commence par G"], blason: "973.png" },
  { id: 100, numero: "974", name: "La Réunion", prefecture: "Saint-Denis", hints: ["Océan Indien", "Département d'outre-mer", "Commence par L"], blason: "974.png" },
  { id: 101, numero: "976", name: "Mayotte", prefecture: "Mamoudzou", hints: ["Océan Indien", "Département d'outre-mer", "Commence par M"], blason: "976.png" }
];

// Fonction pour obtenir un département par son ID
export const getDepartmentById = (id: number): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

// Fonction pour obtenir un département par son numero
export const getDepartmentByNumero = (numero: string): Department | undefined => {
  return departments.find(dept => dept.numero === numero);
};

// Fonction pour obtenir un département par son nom (avec tolérance)
export const getDepartmentByName = (name: string): Department | undefined => {
  const normalizedName = name.toLowerCase().trim();
  return departments.find(dept => 
    dept.name.toLowerCase() === normalizedName ||
    dept.name.toLowerCase().replace(/[àâäéèêëïîôöùûüÿç]/g, (match) => {
      const accents: { [key: string]: string } = {
        'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'ï': 'i', 'î': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ÿ': 'y', 'ç': 'c'
      };
      return accents[match] || match;
    }) === normalizedName
  );
};
