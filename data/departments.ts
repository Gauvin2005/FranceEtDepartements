export interface Department {
  id: number;
  numero: string;
  name: string;
  prefecture: string;
  hints: string[];
  blason: string;
}

export const departments: Department[] = [
  { id: 1, numero: "01", name: "Ain", prefecture: "Bourg-en-Bresse", hints: ["D\u00e9partement limitrophe de la Suisse", "C\u00e9l\u00e8bre pour ses volailles et son fromage bleu", "Abrite le monast\u00e8re de Brou"], blason: "01.png" },
  { id: 2, numero: "02", name: "Aisne", prefecture: "Laon", hints: ["D\u00e9partement des Hauts-de-France", "Marqu\u00e9 par la bataille du Chemin des Dames", "Capitale perch\u00e9e sur une colline fortifi\u00e9e"], blason: "02.png" },
  { id: 3, numero: "03", name: "Allier", prefecture: "Moulins", hints: ["Au c\u0153ur de l'Auvergne", "Station thermale de Vichy c\u00e9l\u00e8bre", "For\u00eat de Tron\u00e7ais r\u00e9put\u00e9e"], blason: "03.png" },
  { id: 4, numero: "04", name: "Alpes-de-Haute-Provence", prefecture: "Digne-les-Bains", hints: ["Champs de lavande \u00e0 perte de vue", "Route Napol\u00e9on traverse ce d\u00e9partement", "G\u00e9ologie exceptionnelle avec r\u00e9serve UNESCO"], blason: "04.png" },
  { id: 5, numero: "05", name: "Hautes-Alpes", prefecture: "Gap", hints: ["D\u00e9partement le plus \u00e9lev\u00e9 de France", "Parc national des \u00c9crins", "Brian\u00e7on, ville fortifi\u00e9e par Vauban"], blason: "05.png" },
  { id: 6, numero: "06", name: "Alpes-Maritimes", prefecture: "Nice", hints: ["C\u00f4te d'Azur et Promenade des Anglais", "Festival de Cannes mondialement connu", "Arri\u00e8re-pays montagneux avec le Mercantour"], blason: "06.png" },
  { id: 7, numero: "07", name: "Ardèche", prefecture: "Privas", hints: ["Gorges spectaculaires et Pont d'Arc", "Grotte Chauvet, art pr\u00e9historique", "Ch\u00e2taignes et marrons embl\u00e9matiques"], blason: "07.png" },
  { id: 8, numero: "08", name: "Ardennes", prefecture: "Charleville-Mézières", hints: ["Berceau du po\u00e8te Rimbaud", "For\u00eat mythique et l\u00e9gendaire", "Fronti\u00e8re avec la Belgique"], blason: "08.png" },
  { id: 9, numero: "09", name: "Ariège", prefecture: "Foix", hints: ["Pyr\u00e9n\u00e9es ari\u00e9geoises", "Ch\u00e2teau cathare sur un piton rocheux", "Grottes pr\u00e9historiques de Niaux"], blason: "09.png" },
  { id: 10, numero: "10", name: "Aube", prefecture: "Troyes", hints: ["Capitale historique de la bonneterie", "C\u0153ur de ville en forme de bouchon de champagne", "Lacs de la for\u00eat d'Orient"], blason: "10.png" },
  { id: 11, numero: "11", name: "Aude", prefecture: "Carcassonne", hints: ["Cit\u00e9 m\u00e9di\u00e9vale fortifi\u00e9e class\u00e9e UNESCO", "Canal du Midi traverse le d\u00e9partement", "Vignobles du Languedoc"], blason: "11.png" },
  { id: 12, numero: "12", name: "Aveyron", prefecture: "Rodez", hints: ["Viaduc de Millau, pont le plus haut du monde", "Roquefort, fromage mondialement c\u00e9l\u00e8bre", "Villages de pierre caussenards"], blason: "12.png" },
  { id: 13, numero: "13", name: "Bouches-du-Rhône", prefecture: "Marseille", hints: ["Plus ancienne ville de France", "Calanques spectaculaires", "Camargue et chevaux sauvages"], blason: "13.png" },
  { id: 14, numero: "14", name: "Calvados", prefecture: "Caen", hints: ["Plages du D\u00e9barquement de 1944", "Pommeraies et cidre r\u00e9put\u00e9", "Tapisserie de Bayeux"], blason: "14.png" },
  { id: 15, numero: "15", name: "Cantal", prefecture: "Aurillac", hints: ["Plus grand volcan d'Europe", "Fromages AOP c\u00e9l\u00e8bres", "Vaches Salers en estive"], blason: "15.png" },
  { id: 16, numero: "16", name: "Charente", prefecture: "Angoulême", hints: ["Festival international de la bande dessin\u00e9e", "Cognac produit dans la r\u00e9gion", "Ville perch\u00e9e sur un promontoire"], blason: "16.png" },
  { id: 17, numero: "17", name: "Charente-Maritime", prefecture: "La Rochelle", hints: ["Port historique avec tours m\u00e9di\u00e9vales", "\u00cele de R\u00e9 reli\u00e9e par un pont", "Hu\u00eetres de Marennes-Ol\u00e9ron"], blason: "17.png" },
  { id: 18, numero: "18", name: "Cher", prefecture: "Bourges", hints: ["Cath\u00e9drale gothique class\u00e9e UNESCO", "Route Jacques C\u0153ur", "Vignobles de Sancerre et Menetou-Salon"], blason: "18.png" },
  { id: 19, numero: "19", name: "Corrèze", prefecture: "Tulle", hints: ["Brive-la-Gaillarde, ville principale", "Plateau de Millevaches", "Manufacture d'armes et dentelle"], blason: "19.png" },
  { id: 20, numero: "2A", name: "Corse-du-Sud", prefecture: "Ajaccio", hints: ["Ville natale de Napol\u00e9on Bonaparte", "\u00celes Sanguinaires face \u00e0 la ville", "GR20 traverse le d\u00e9partement"], blason: "2A.png" },
  { id: 21, numero: "2B", name: "Haute-Corse", prefecture: "Bastia", hints: ["Port principal de l'\u00eele", "Cap Corse et ses villages perch\u00e9s", "D\u00e9sert des Agriates"], blason: "2B.png" },
  { id: 22, numero: "21", name: "Côte-d'Or", prefecture: "Dijon", hints: ["Capitale des Ducs de Bourgogne", "Route des Grands Crus", "Moutarde c\u00e9l\u00e8bre dans le monde entier"], blason: "21.png" },
  { id: 23, numero: "22", name: "Côtes-d'Armor", prefecture: "Saint-Brieuc", hints: ["C\u00f4te de Granit Rose unique", "Cap Fr\u00e9hel et Fort La Latte", "Festival de Perros-Guirec"], blason: "22.png" },
  { id: 24, numero: "23", name: "Creuse", prefecture: "Guéret", hints: ["D\u00e9partement le moins peupl\u00e9 de France m\u00e9tropolitaine", "Tapisseries d'Aubusson", "Paysages bocagers pr\u00e9serv\u00e9s"], blason: "23.png" },
  { id: 25, numero: "24", name: "Dordogne", prefecture: "Périgueux", hints: ["P\u00e9rigord et gastronomie du foie gras", "Grottes de Lascaux", "Ch\u00e2teaux m\u00e9di\u00e9vaux et bastides"], blason: "24.png" },
  { id: 26, numero: "25", name: "Doubs", prefecture: "Besançon", hints: ["Citadelle Vauban dominant la ville", "Horlogerie et microtechnique", "Rivi\u00e8re en forme de fer \u00e0 cheval"], blason: "25.png" },
  { id: 27, numero: "26", name: "Drôme", prefecture: "Valence", hints: ["Nougat de Mont\u00e9limar", "Vercors et ses gorges", "Lavande de la Dr\u00f4me proven\u00e7ale"], blason: "26.png" },
  { id: 28, numero: "27", name: "Eure", prefecture: "Évreux", hints: ["Giverny et les jardins de Monet", "Ch\u00e2teau Gaillard des Andelys", "Normandie verdoyante"], blason: "27.png" },
  { id: 29, numero: "28", name: "Eure-et-Loir", prefecture: "Chartres", hints: ["Cath\u00e9drale aux vitraux exceptionnels", "Plaine de Beauce, grenier \u00e0 bl\u00e9", "P\u00e8lerinage m\u00e9di\u00e9val c\u00e9l\u00e8bre"], blason: "28.png" },
  { id: 30, numero: "29", name: "Finistère", prefecture: "Quimper", hints: ["Bout du monde en breton", "Pointe du Raz et phares mythiques", "Fa\u00efencerie traditionnelle"], blason: "29.png" },
  { id: 31, numero: "30", name: "Gard", prefecture: "Nîmes", hints: ["Pont du Gard, aqueduc romain", "Ar\u00e8nes romaines encore utilis\u00e9es", "Camargue gardoise"], blason: "30.png" },
  { id: 32, numero: "31", name: "Haute-Garonne", prefecture: "Toulouse", hints: ["Ville rose et capitale a\u00e9ronautique", "Airbus et Cit\u00e9 de l'Espace", "Canal du Midi commence ici"], blason: "31.png" },
  { id: 33, numero: "32", name: "Gers", prefecture: "Auch", hints: ["Patrie de d'Artagnan", "Armagnac et foie gras", "Bastides et villages gascons"], blason: "32.png" },
  { id: 34, numero: "33", name: "Gironde", prefecture: "Bordeaux", hints: ["Capitale mondiale du vin", "Dune du Pilat, plus haute d'Europe", "Place de la Bourse et miroir d'eau"], blason: "33.png" },
  { id: 35, numero: "34", name: "Hérault", prefecture: "Montpellier", hints: ["Plus ancienne facult\u00e9 de m\u00e9decine", "Station baln\u00e9aire du Cap d'Agde", "Canal du Midi et \u00e9tang de Thau"], blason: "34.png" },
  { id: 36, numero: "35", name: "Ille-et-Vilaine", prefecture: "Rennes", hints: ["Capitale de la Bretagne", "Saint-Malo, cit\u00e9 corsaire", "Mont-Saint-Michel \u00e0 la fronti\u00e8re"], blason: "35.png" },
  { id: 37, numero: "36", name: "Indre", prefecture: "Châteauroux", hints: ["Berry m\u00e9ridional", "George Sand \u00e0 Nohant", "Vall\u00e9e de la Creuse pittoresque"], blason: "36.png" },
  { id: 38, numero: "37", name: "Indre-et-Loire", prefecture: "Tours", hints: ["Jardin de la France", "Ch\u00e2teaux de la Loire majestueux", "Amboise, Chenonceau, Villandry"], blason: "37.png" },
  { id: 39, numero: "38", name: "Isère", prefecture: "Grenoble", hints: ["Capitale des Alpes", "T\u00e9l\u00e9ph\u00e9rique vers la Bastille", "JO d'hiver 1968"], blason: "38.png" },
  { id: 40, numero: "39", name: "Jura", prefecture: "Lons-le-Saunier", hints: ["Comt\u00e9 et vin jaune", "Cascades du H\u00e9risson", "Salines royales d'Arc-et-Senans"], blason: "39.png" },
  { id: 41, numero: "40", name: "Landes", prefecture: "Mont-de-Marsan", hints: ["Plus grande for\u00eat artificielle d'Europe", "Hossegor et surf atlantique", "Courses landaises traditionnelles"], blason: "40.png" },
  { id: 42, numero: "41", name: "Loir-et-Cher", prefecture: "Blois", hints: ["Ch\u00e2teau royal avec escalier Fran\u00e7ois Ier", "Chambord, le plus grand des ch\u00e2teaux", "Sologne et chasse"], blason: "41.png" },
  { id: 43, numero: "42", name: "Loire", prefecture: "Saint-Étienne", hints: ["Manufacture d'armes et cycles", "Gorges de la Loire sauvages", "Stade Geoffroy-Guichard mythique"], blason: "42.png" },
  { id: 44, numero: "43", name: "Haute-Loire", prefecture: "Le Puy-en-Velay", hints: ["Point de d\u00e9part de Saint-Jacques", "Rocher et chapelle Saint-Michel", "Lentilles vertes AOP"], blason: "43.png" },
  { id: 45, numero: "44", name: "Loire-Atlantique", prefecture: "Nantes", hints: ["Machines de l'\u00eele et \u00e9l\u00e9phant", "Ch\u00e2teau des ducs de Bretagne", "Vignoble du Muscadet"], blason: "44.png" },
  { id: 46, numero: "45", name: "Loiret", prefecture: "Orléans", hints: ["Jeanne d'Arc lib\u00e9ratrice", "Loire sauvage class\u00e9e UNESCO", "Cath\u00e9drale Sainte-Croix"], blason: "45.png" },
  { id: 47, numero: "46", name: "Lot", prefecture: "Cahors", hints: ["Vin noir de Malbec", "Pont Valentr\u00e9 m\u00e9di\u00e9val", "Rocamadour, cit\u00e9 sacr\u00e9e"], blason: "46.png" },
  { id: 48, numero: "47", name: "Lot-et-Garonne", prefecture: "Agen", hints: ["Pruneaux d'Agen r\u00e9put\u00e9s", "Bastides du Sud-Ouest", "Confluence entre Lot et Garonne"], blason: "47.png" },
  { id: 49, numero: "48", name: "Lozère", prefecture: "Mende", hints: ["D\u00e9partement le moins peupl\u00e9", "Aubrac et Margeride", "B\u00eate du G\u00e9vaudan l\u00e9gendaire"], blason: "48.png" },
  { id: 50, numero: "49", name: "Maine-et-Loire", prefecture: "Angers", hints: ["Tapisserie de l'Apocalypse", "Ch\u00e2teau et forteresse m\u00e9di\u00e9vale", "Vignobles d'Anjou et Saumur"], blason: "49.png" },
  { id: 51, numero: "50", name: "Manche", prefecture: "Saint-Lô", hints: ["Mont-Saint-Michel merveille", "Cotentin et Cherbourg", "D\u00e9barquement d'Utah Beach"], blason: "50.png" },
  { id: 52, numero: "51", name: "Marne", prefecture: "Châlons-en-Champagne", hints: ["Champagne et grandes maisons", "Cath\u00e9drale de Reims pour sacres", "Batailles de la Grande Guerre"], blason: "51.png" },
  { id: 53, numero: "52", name: "Haute-Marne", prefecture: "Chaumont", hints: ["Sources de la Marne", "Cutellerie et m\u00e9tallurgie", "Lac du Der-Chantecoq"], blason: "52.png" },
  { id: 54, numero: "53", name: "Mayenne", prefecture: "Laval", hints: ["Vieux-Ch\u00e2teau m\u00e9di\u00e9val", "Bocage mayennais verdoyant", "Grottes de Saulges pr\u00e9historiques"], blason: "53.png" },
  { id: 55, numero: "54", name: "Meurthe-et-Moselle", prefecture: "Nancy", hints: ["Place Stanislas class\u00e9e UNESCO", "\u00c9cole de Nancy Art Nouveau", "Mirabelles et quiche lorraine"], blason: "54.png" },
  { id: 56, numero: "55", name: "Meuse", prefecture: "Bar-le-Duc", hints: ["Verdun et m\u00e9moire 14-18", "Voie sacr\u00e9e historique", "Drag\u00e9es r\u00e9put\u00e9es"], blason: "55.png" },
  { id: 57, numero: "56", name: "Morbihan", prefecture: "Vannes", hints: ["Golfe parsem\u00e9 d'\u00eeles", "Alignements de Carnac", "Belle-\u00cele-en-Mer"], blason: "56.png" },
  { id: 58, numero: "57", name: "Moselle", prefecture: "Metz", hints: ["Cath\u00e9drale gothique lumineuse", "Centre Pompidou-Metz", "Histoire franco-allemande"], blason: "57.png" },
  { id: 59, numero: "58", name: "Nièvre", prefecture: "Nevers", hints: ["Fa\u00efences artistiques", "Circuit de Nevers Magny-Cours", "Morvan et lacs"], blason: "58.png" },
  { id: 60, numero: "59", name: "Nord", prefecture: "Lille", hints: ["Beffrois flamands", "Braderie la plus c\u00e9l\u00e8bre", "Moules-frites traditionnelles"], blason: "59.png" },
  { id: 61, numero: "60", name: "Oise", prefecture: "Beauvais", hints: ["Cath\u00e9drale au ch\u0153ur le plus haut", "Chantilly et son ch\u00e2teau", "For\u00eat de Compi\u00e8gne historique"], blason: "60.png" },
  { id: 62, numero: "61", name: "Orne", prefecture: "Alençon", hints: ["Dentelle au point d'Alen\u00e7on", "Haras du Pin prestigieux", "Camembert de Normandie"], blason: "61.png" },
  { id: 63, numero: "62", name: "Pas-de-Calais", prefecture: "Arras", hints: ["Beffroi et Grand-Place", "Cap Blanc-Nez et Gris-Nez", "Plus proche de l'Angleterre"], blason: "62.png" },
  { id: 64, numero: "63", name: "Puy-de-Dôme", prefecture: "Clermont-Ferrand", hints: ["Volcan embl\u00e9matique culminant", "Capitale du pneumatique", "Cha\u00eene des Puys class\u00e9e"], blason: "63.png" },
  { id: 65, numero: "64", name: "Pyrénées-Atlantiques", prefecture: "Pau", hints: ["Berceau d'Henri IV", "Biarritz et surf basque", "Fromage Ossau-Iraty"], blason: "64.png" },
  { id: 66, numero: "65", name: "Hautes-Pyrénées", prefecture: "Tarbes", hints: ["Lourdes, lieu de p\u00e8lerinage", "Pic du Midi observatoire", "Cirque de Gavarnie majestueux"], blason: "65.png" },
  { id: 67, numero: "66", name: "Pyrénées-Orientales", prefecture: "Perpignan", hints: ["Catalogne fran\u00e7aise", "Canigou montagne sacr\u00e9e", "C\u00f4te Vermeille et Collioure"], blason: "66.png" },
  { id: 68, numero: "67", name: "Bas-Rhin", prefecture: "Strasbourg", hints: ["Capitale europ\u00e9enne", "Cath\u00e9drale de gr\u00e8s rose", "March\u00e9 de No\u00ebl c\u00e9l\u00e8bre"], blason: "67.png" },
  { id: 69, numero: "68", name: "Haut-Rhin", prefecture: "Colmar", hints: ["Petite Venise alsacienne", "Route des vins pittoresque", "Mus\u00e9e Unterlinden"], blason: "68.png" },
  { id: 70, numero: "69", name: "Rhône", prefecture: "Lyon", hints: ["Capitale de la gastronomie", "Confluence Rh\u00f4ne et Sa\u00f4ne", "F\u00eate des Lumi\u00e8res"], blason: "69.png" },
  { id: 71, numero: "70", name: "Haute-Saône", prefecture: "Vesoul", hints: ["Chanson de Jacques Brel", "Chapelle Notre-Dame de la Motte", "Forges et ferronnerie"], blason: "70.png" },
  { id: 72, numero: "71", name: "Saône-et-Loire", prefecture: "Mâcon", hints: ["Vignobles bourguignons sud", "Cluny abbaye b\u00e9n\u00e9dictine", "Charolais et \u00e9levage bovin"], blason: "71.png" },
  { id: 73, numero: "72", name: "Sarthe", prefecture: "Le Mans", hints: ["24 Heures mythiques", "Rillettes r\u00e9put\u00e9es", "Cit\u00e9 Plantagen\u00eat m\u00e9di\u00e9vale"], blason: "72.png" },
  { id: 74, numero: "73", name: "Savoie", prefecture: "Chambéry", hints: ["Lacs d'Annecy et du Bourget", "Stations de ski olympiques", "Fromages Beaufort et Reblochon"], blason: "73.png" },
  { id: 75, numero: "74", name: "Haute-Savoie", prefecture: "Annecy", hints: ["Venise des Alpes", "Mont-Blanc point culminant", "Chamonix et alpinisme"], blason: "74.png" },
  { id: 76, numero: "75", name: "Paris", prefecture: "Paris", hints: ["Capitale de la France", "Tour Eiffel embl\u00e9matique", "Ville Lumi\u00e8re"], blason: "75.png" },
  { id: 77, numero: "76", name: "Seine-Maritime", prefecture: "Rouen", hints: ["Jeanne d'Arc martyris\u00e9e", "Falaises d'\u00c9tretat", "Port du Havre"], blason: "76.png" },
  { id: 78, numero: "77", name: "Seine-et-Marne", prefecture: "Melun", hints: ["Disneyland Paris", "For\u00eat de Fontainebleau", "Ch\u00e2teau Renaissance"], blason: "77.png" },
  { id: 79, numero: "78", name: "Yvelines", prefecture: "Versailles", hints: ["Ch\u00e2teau du Roi Soleil", "Galerie des Glaces", "Jardins \u00e0 la fran\u00e7aise"], blason: "78.png" },
  { id: 80, numero: "79", name: "Deux-Sèvres", prefecture: "Niort", hints: ["Marais Poitevin vert", "Mutualit\u00e9 et assurances", "Ang\u00e9lique de Niort"], blason: "79.png" },
  { id: 81, numero: "80", name: "Somme", prefecture: "Amiens", hints: ["Plus vaste cath\u00e9drale de France", "Jules Verne r\u00e9sidant", "Batailles de la Grande Guerre"], blason: "80.png" },
  { id: 82, numero: "81", name: "Tarn", prefecture: "Albi", hints: ["Cath\u00e9drale fortifi\u00e9e unique", "Toulouse-Lautrec natif", "Bastides m\u00e9di\u00e9vales"], blason: "81.png" },
  { id: 83, numero: "82", name: "Tarn-et-Garonne", prefecture: "Montauban", hints: ["Briques roses omnipr\u00e9sentes", "Ingres peintre c\u00e9l\u00e8bre", "Chasselas de Moissac"], blason: "82.png" },
  { id: 84, numero: "83", name: "Var", prefecture: "Toulon", hints: ["Base navale importante", "\u00celes d'Hy\u00e8res paradisiaques", "Gorges du Verdon spectaculaires"], blason: "83.png" },
  { id: 85, numero: "84", name: "Vaucluse", prefecture: "Avignon", hints: ["Palais des Papes", "Pont Saint-B\u00e9n\u00e9zet incomplet", "Mont Ventoux g\u00e9ant de Provence"], blason: "84.png" },
  { id: 86, numero: "85", name: "Vendée", prefecture: "La Roche-sur-Yon", hints: ["Puy du Fou parc historique", "Guerres de Vend\u00e9e", "\u00cele de Noirmoutier"], blason: "85.png" },
  { id: 87, numero: "86", name: "Vienne", prefecture: "Poitiers", hints: ["Bataille de 732 d\u00e9cisive", "Futuroscope parc d'attractions", "\u00c9glises romanes nombreuses"], blason: "86.png" },
  { id: 88, numero: "87", name: "Haute-Vienne", prefecture: "Limoges", hints: ["Porcelaine mondialement connue", "\u00c9mail sur cuivre", "Oradour-sur-Glane martyre"], blason: "87.png" },
  { id: 89, numero: "88", name: "Vosges", prefecture: "Épinal", hints: ["Images d'\u00c9pinal color\u00e9es", "Massif vosgien et ballons", "Route des Cr\u00eates panoramique"], blason: "88.png" },
  { id: 90, numero: "89", name: "Yonne", prefecture: "Auxerre", hints: ["Vignobles de Chablis", "V\u00e9zelay basilique", "Abbaye de Pontigny"], blason: "89.png" },
  { id: 91, numero: "90", name: "Territoire de Belfort", prefecture: "Belfort", hints: ["Lion de Bartholdi monumental", "Trou\u00e9e strat\u00e9gique", "Plus petit d\u00e9partement"], blason: "90.png" },
  { id: 92, numero: "91", name: "Essonne", prefecture: "Évry-Courcouronnes", hints: ["Cath\u00e9drale moderne circulaire", "Vall\u00e9e de Chevreuse", "Plateau de Saclay scientifique"], blason: "91.png" },
  { id: 93, numero: "92", name: "Hauts-de-Seine", prefecture: "Nanterre", hints: ["La D\u00e9fense quartier d'affaires", "Grande Arche moderne", "\u00cele de la Jatte impressionniste"], blason: "92.png" },
  { id: 94, numero: "93", name: "Seine-Saint-Denis", prefecture: "Bobigny", hints: ["Stade de France", "Basilique de Saint-Denis", "N\u00e9cropole des rois"], blason: "93.png" },
  { id: 95, numero: "94", name: "Val-de-Marne", prefecture: "Créteil", hints: ["Bords de Marne bucoliques", "Ch\u00e2teau de Vincennes", "MAC VAL mus\u00e9e d'art"], blason: "94.png" },
  { id: 96, numero: "95", name: "Val-d'Oise", prefecture: "Pontoise", hints: ["Ville nouvelle des ann\u00e9es 70", "Auvers-sur-Oise de Van Gogh", "Abbaye de Royaumont"], blason: "95.png" },
  { id: 97, numero: "971", name: "Guadeloupe", prefecture: "Basse-Terre", hints: ["Papillon des Cara\u00efbes", "Volcan de la Soufri\u00e8re", "Rhum agricole AOC"], blason: "971.png" },
  { id: 98, numero: "972", name: "Martinique", prefecture: "Fort-de-France", hints: ["\u00cele aux fleurs", "Montagne Pel\u00e9e volcanique", "Biblioth\u00e8que Sch\u0153lcher"], blason: "972.png" },
  { id: 99, numero: "973", name: "Guyane", prefecture: "Cayenne", hints: ["Centre spatial guyanais", "For\u00eat amazonienne", "\u00celes du Salut et bagne"], blason: "973.png" },
  { id: 100, numero: "974", name: "La Réunion", prefecture: "Saint-Denis", hints: ["Piton de la Fournaise actif", "Cirques class\u00e9s UNESCO", "Vanille Bourbon r\u00e9put\u00e9e"], blason: "974.png" },
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
