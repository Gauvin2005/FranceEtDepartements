export interface DepartmentPath {
  num: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  scale?: number;
  indices: string[];
}

// Formes SVG des départements français générées automatiquement
// Coordonnées basées sur les données GeoJSON officielles
export const departmentsPaths: DepartmentPath[] = [
  { 
    num: "01", 
    name: "Ain", 
    path: "M 667,505 L 672,490 L 678,471 L 694,471 L 703,481 L 713,491 L 720,496 L 732,492 L 745,494 L 756,481 L 761,498 L 749,503 L 742,515 L 740,526 L 737,550 L 728,561 L 720,553 L 713,541 L 701,545 L 685,543 L 676,536 L 668,531 L 664,519 Z", 
    labelX: 711.48, 
    labelY: 512.74, 
    scale: 1.0,
    indices: [
      "Département limitrophe de la Suisse",
      "Célèbre pour ses volailles et son fromage bleu",
      "Abrite le monastère de Brou"
    ]
  },
  { 
    num: "02", 
    name: "Aisne", 
    path: "M 616,173 L 601,174 L 589,188 L 591,199 L 589,211 L 580,224 L 566,224 L 555,205 L 550,195 L 545,193 L 548,177 L 551,161 L 551,142 L 551,121 L 568,108 L 586,109 L 606,110 L 626,115 L 627,134 L 621,148 L 616,163 Z", 
    labelX: 582.52, 
    labelY: 165.43, 
    scale: 1.0,
    indices: [
      "Département des Hauts-de-France",
      "Marqué par la bataille du Chemin des Dames",
      "Capitale perchée sur une colline fortifiée"
    ]
  },
  { 
    num: "03", 
    name: "Allier", 
    path: "M 545,442 L 564,450 L 574,455 L 585,449 L 593,460 L 602,470 L 611,482 L 604,496 L 599,512 L 592,526 L 577,522 L 563,517 L 546,513 L 539,501 L 524,500 L 513,509 L 503,494 L 493,484 L 508,470 L 515,455 L 531,448 Z", 
    labelX: 556.24, 
    labelY: 483.57, 
    scale: 1.0,
    indices: [
      "Au cœur de l'Auvergne",
      "Station thermale de Vichy célèbre",
      "Forêt de Tronçais réputée"
    ]
  },
  { 
    num: "04", 
    name: "Alpes-de-Haute-Provence", 
    path: "M 729,709 L 744,707 L 747,697 L 760,680 L 772,680 L 784,682 L 803,672 L 818,666 L 815,683 L 807,697 L 803,719 L 818,740 L 799,744 L 789,749 L 770,750 L 754,763 L 742,758 L 728,747 L 720,735 L 721,714 L 727,712 Z", 
    labelX: 769.05, 
    labelY: 714.48, 
    scale: 1.0,
    indices: [
      "Champs de lavande à perte de vue",
      "Route Napoléon traverse ce département",
      "Géologie exceptionnelle avec réserve UNESCO"
    ]
  },
  { 
    num: "05", 
    name: "Hautes-Alpes", 
    path: "M 770,613 L 786,621 L 798,619 L 804,636 L 822,648 L 819,660 L 801,674 L 782,681 L 770,681 L 758,680 L 746,702 L 746,708 L 730,705 L 719,693 L 717,684 L 729,678 L 738,660 L 751,649 L 764,641 L 777,634 L 767,620 Z", 
    labelX: 766.38, 
    labelY: 661.29, 
    scale: 1.0,
    indices: [
      "Département le plus élevé de France",
      "Parc national des Écrins",
      "Briançon, ville fortifiée par Vauban"
    ]
  },
  { 
    num: "06", 
    name: "Alpes-Maritimes", 
    path: "M 814,692 L 821,703 L 833,708 L 845,714 L 857,714 L 868,713 L 868,726 L 861,738 L 856,753 L 847,758 L 836,766 L 829,773 L 817,779 L 813,777 L 808,767 L 802,756 L 801,749 L 804,742 L 818,740 L 807,728 L 800,712 L 807,697 Z", 
    labelX: 827.82, 
    labelY: 736.59, 
    scale: 1.0,
    indices: [
      "Côte d'Azur et Promenade des Anglais",
      "Festival de Cannes mondialement connu",
      "Arrière-pays montagneux avec le Mercantour"
    ]
  },
  { 
    num: "07", 
    name: "Ardèche", 
    path: "M 646,602 L 656,596 L 667,590 L 669,603 L 669,614 L 672,627 L 671,642 L 667,663 L 661,676 L 658,691 L 655,699 L 644,699 L 638,694 L 631,702 L 622,694 L 617,687 L 609,670 L 603,653 L 615,643 L 625,638 L 633,627 L 638,621 L 644,613 Z", 
    labelX: 643.91, 
    labelY: 649.74, 
    scale: 1.0,
    indices: [
      "Gorges spectaculaires et Pont d'Arc",
      "Grotte Chauvet, art préhistorique",
      "Châtaignes et marrons emblématiques"
    ]
  },
  { 
    num: "08", 
    name: "Ardennes", 
    path: "M 629,116 L 648,117 L 662,102 L 675,98 L 670,110 L 675,121 L 679,132 L 691,141 L 705,147 L 706,154 L 692,154 L 688,165 L 686,178 L 676,188 L 663,189 L 653,184 L 637,182 L 627,175 L 616,167 L 615,152 L 623,144 L 629,136 L 631,122 Z", 
    labelX: 659.83, 
    labelY: 146.7, 
    scale: 1.0,
    indices: [
      "Berceau du poète Rimbaud",
      "Forêt mythique et légendaire",
      "Frontière avec la Belgique"
    ]
  },
  { 
    num: "09", 
    name: "Ariège", 
    path: "M 452,804 L 458,816 L 469,827 L 473,842 L 467,857 L 486,865 L 471,871 L 458,876 L 446,870 L 437,872 L 428,863 L 415,862 L 398,854 L 396,839 L 403,826 L 413,816 L 423,821 L 426,812 L 425,805 L 433,809 L 438,802 L 452,804 Z", 
    labelX: 439.41, 
    labelY: 836.95, 
    scale: 1.0,
    indices: [
      "Pyrénées ariégeoises",
      "Château cathare sur un piton rocheux",
      "Grottes préhistoriques de Niaux"
    ]
  },
  { 
    num: "10", 
    name: "Aube", 
    path: "M 572,278 L 573,263 L 583,255 L 595,263 L 606,259 L 615,250 L 634,244 L 647,262 L 658,269 L 669,284 L 672,303 L 661,310 L 652,321 L 633,325 L 624,322 L 612,325 L 602,317 L 595,304 L 584,299 L 584,289 L 573,281 Z", 
    labelX: 616.38, 
    labelY: 286.81, 
    scale: 1.0,
    indices: [
      "Capitale historique de la bonneterie",
      "Cœur de ville en forme de bouchon de champagne",
      "Lacs de la forêt d'Orient"
    ]
  },
  { 
    num: "11", 
    name: "Aude", 
    path: "M 452,804 L 460,795 L 470,788 L 485,789 L 493,787 L 513,789 L 515,801 L 527,806 L 535,798 L 552,805 L 553,819 L 541,845 L 528,843 L 512,848 L 497,855 L 486,868 L 474,859 L 470,847 L 472,829 L 465,817 L 452,807 Z", 
    labelX: 497.71, 
    labelY: 819.0, 
    scale: 1.0,
    indices: [
      "Cité médiévale fortifiée classée UNESCO",
      "Canal du Midi traverse le département",
      "Vignobles du Languedoc"
    ]
  },
  { 
    num: "12", 
    name: "Aveyron", 
    path: "M 488,666 L 504,663 L 516,644 L 526,633 L 535,647 L 542,663 L 553,685 L 554,701 L 568,709 L 569,723 L 565,740 L 547,749 L 542,759 L 523,756 L 511,736 L 501,721 L 487,712 L 472,712 L 466,700 L 463,682 L 477,669 Z", 
    labelX: 519.48, 
    labelY: 698.57, 
    scale: 1.0,
    indices: [
      "Viaduc de Millau, pont le plus haut du monde",
      "Roquefort, fromage mondialement célèbre",
      "Villages de pierre caussenards"
    ]
  },
  { 
    num: "13", 
    name: "Bouches-du-Rhône", 
    path: "M 664,737 L 680,742 L 698,755 L 722,764 L 735,757 L 730,769 L 732,780 L 733,790 L 733,799 L 728,813 L 714,810 L 708,804 L 698,798 L 681,791 L 674,795 L 653,795 L 649,785 L 633,779 L 643,769 L 653,760 L 658,752 L 663,739 Z", 
    labelX: 690.09, 
    labelY: 776.5, 
    scale: 1.0,
    indices: [
      "Plus ancienne ville de France",
      "Calanques spectaculaires",
      "Camargue et chevaux sauvages"
    ]
  },
  { 
    num: "14", 
    name: "Calvados", 
    path: "M 256,178 L 277,178 L 303,180 L 327,184 L 349,171 L 357,184 L 360,193 L 360,208 L 364,218 L 356,220 L 345,223 L 332,228 L 314,230 L 304,228 L 285,232 L 273,240 L 258,237 L 261,226 L 271,214 L 272,202 L 262,192 L 256,181 Z", 
    labelX: 306.45, 
    labelY: 206.68, 
    scale: 1.0,
    indices: [
      "Plages du Débarquement de 1944",
      "Pommeraies et cidre réputé",
      "Tapisserie de Bayeux"
    ]
  },
  { 
    num: "15", 
    name: "Cantal", 
    path: "M 509,577 L 525,586 L 540,595 L 551,593 L 560,604 L 564,623 L 563,634 L 553,636 L 545,654 L 538,649 L 529,639 L 521,636 L 513,649 L 499,663 L 485,664 L 483,644 L 483,628 L 488,612 L 495,593 L 503,585 Z", 
    labelX: 522.35, 
    labelY: 623.2, 
    scale: 1.0,
    indices: [
      "Plus grand volcan d'Europe",
      "Fromages AOP célèbres",
      "Vaches Salers en estive"
    ]
  },
  { 
    num: "16", 
    name: "Charente", 
    path: "M 327,527 L 341,514 L 361,517 L 368,509 L 382,511 L 392,512 L 399,522 L 392,535 L 384,548 L 373,561 L 366,571 L 352,592 L 343,605 L 334,604 L 320,595 L 315,589 L 315,572 L 304,562 L 303,547 L 317,544 L 325,535 Z", 
    labelX: 348.24, 
    labelY: 551.05, 
    scale: 1.0,
    indices: [
      "Festival international de la bande dessinée",
      "Cognac produit dans la région",
      "Ville perchée sur un promontoire"
    ]
  },
  { 
    num: "17", 
    name: "Charente-Maritime", 
    path: "M 255,492 L 267,490 L 282,492 L 291,509 L 311,515 L 324,524 L 326,539 L 312,546 L 305,553 L 313,567 L 315,585 L 318,594 L 334,604 L 328,614 L 312,610 L 305,599 L 284,593 L 265,565 L 247,546 L 259,532 L 257,514 L 251,501 Z", 
    labelX: 293.68, 
    labelY: 549.27, 
    scale: 1.0,
    indices: [
      "Port historique avec tours médiévales",
      "Île de Ré reliée par un pont",
      "Huîtres de Marennes-Oléron"
    ]
  },
  { 
    num: "18", 
    name: "Cher", 
    path: "M 490,357 L 506,361 L 519,368 L 528,367 L 538,375 L 542,398 L 547,422 L 540,441 L 523,447 L 514,461 L 504,470 L 488,480 L 486,469 L 484,452 L 477,438 L 478,427 L 475,410 L 459,408 L 465,399 L 476,393 L 482,378 L 491,370 L 487,358 Z", 
    labelX: 499.96, 
    labelY: 410.83, 
    scale: 1.0,
    indices: [
      "Cathédrale gothique classée UNESCO",
      "Route Jacques Cœur",
      "Vignobles de Sancerre et Menetou-Salon"
    ]
  },
  { 
    num: "19", 
    name: "Corrèze", 
    path: "M 466,554 L 479,550 L 492,555 L 504,554 L 507,561 L 509,579 L 501,585 L 495,593 L 488,610 L 481,624 L 469,631 L 458,634 L 447,623 L 432,620 L 426,612 L 420,603 L 423,593 L 424,582 L 431,575 L 443,570 L 456,560 L 466,554 Z", 
    labelX: 464.41, 
    labelY: 587.36, 
    scale: 1.0,
    indices: [
      "Brive-la-Gaillarde, ville principale",
      "Plateau de Millevaches",
      "Manufacture d'armes et dentelle"
    ]
  },
  { 
    num: "21", 
    name: "Côte-d'Or", 
    path: "M 633,325 L 650,318 L 668,319 L 676,326 L 678,342 L 688,353 L 703,358 L 716,366 L 716,380 L 716,395 L 709,412 L 698,422 L 682,425 L 660,431 L 648,419 L 632,409 L 622,396 L 617,379 L 628,359 L 633,345 L 631,330 Z", 
    labelX: 666.86, 
    labelY: 371.86, 
    scale: 1.0,
    indices: [
      "Capitale des Ducs de Bourgogne",
      "Route des Grands Crus",
      "Moutarde célèbre dans le monde entier"
    ]
  },
  { 
    num: "22", 
    name: "Côtes-d'Armor", 
    path: "M 79,250 L 88,235 L 103,232 L 119,233 L 129,244 L 140,258 L 151,262 L 170,250 L 180,258 L 191,262 L 198,272 L 195,287 L 182,296 L 169,305 L 159,305 L 149,306 L 129,300 L 111,301 L 96,303 L 86,293 L 86,272 L 84,258 Z", 
    labelX: 136.09, 
    labelY: 271.91, 
    scale: 1.0,
    indices: [
      "Côte de Granit Rose unique",
      "Cap Fréhel et Fort La Latte",
      "Festival de Perros-Guirec"
    ]
  },
  { 
    num: "23", 
    name: "Creuse", 
    path: "M 485,480 L 496,486 L 503,492 L 509,499 L 513,518 L 510,534 L 503,545 L 498,553 L 487,554 L 479,550 L 467,553 L 463,543 L 451,540 L 444,531 L 444,525 L 442,516 L 433,505 L 435,492 L 442,483 L 454,483 L 467,478 L 480,481 Z", 
    labelX: 472.95, 
    labelY: 515.5, 
    scale: 1.0,
    indices: [
      "Département le moins peuplé de France métropolitaine",
      "Tapisseries d'Aubusson",
      "Paysages bocagers préservés"
    ]
  },
  { 
    num: "24", 
    name: "Dordogne", 
    path: "M 378,553 L 386,563 L 400,563 L 411,570 L 418,579 L 424,590 L 420,603 L 428,613 L 432,626 L 429,646 L 419,659 L 403,664 L 393,661 L 378,657 L 365,662 L 355,651 L 348,643 L 335,628 L 332,613 L 339,604 L 353,595 L 366,571 L 374,559 Z", 
    labelX: 386.35, 
    labelY: 611.87, 
    scale: 1.0,
    indices: [
      "Périgord et gastronomie du foie gras",
      "Grottes de Lascaux",
      "Châteaux médiévaux et bastides"
    ]
  },
  { 
    num: "25", 
    name: "Doubs", 
    path: "M 808,363 L 817,369 L 815,381 L 826,385 L 813,400 L 800,414 L 788,424 L 782,441 L 768,457 L 756,459 L 766,445 L 752,434 L 748,422 L 735,419 L 737,403 L 733,393 L 750,386 L 766,376 L 784,368 L 793,368 L 803,363 Z", 
    labelX: 778.1, 
    labelY: 403.33, 
    scale: 1.0,
    indices: [
      "Citadelle Vauban dominant la ville",
      "Horlogerie et microtechnique",
      "Rivière en forme de fer à cheval"
    ]
  },
  { 
    num: "26", 
    name: "Drôme", 
    path: "M 668,596 L 686,593 L 695,614 L 704,621 L 717,627 L 723,649 L 740,657 L 725,669 L 718,679 L 713,689 L 725,697 L 728,710 L 722,712 L 709,708 L 694,704 L 681,700 L 666,696 L 661,680 L 667,663 L 672,636 L 671,619 L 669,603 Z", 
    labelX: 697.91, 
    labelY: 660.09, 
    scale: 1.0,
    indices: [
      "Nougat de Montélimar",
      "Vercors et ses gorges",
      "Lavande de la Drôme provençale"
    ]
  },
  { 
    num: "27", 
    name: "Eure", 
    path: "M 355,171 L 376,171 L 394,174 L 396,182 L 407,184 L 424,177 L 437,168 L 453,173 L 459,189 L 449,201 L 436,208 L 436,221 L 430,236 L 414,237 L 401,244 L 387,248 L 382,236 L 367,226 L 364,218 L 362,207 L 356,189 L 355,177 Z", 
    labelX: 401.82, 
    labelY: 201.68, 
    scale: 1.0,
    indices: [
      "Giverny et les jardins de Monet",
      "Château Gaillard des Andelys",
      "Normandie verdoyante"
    ]
  },
  { 
    num: "28", 
    name: "Eure-et-Loir", 
    path: "M 391,249 L 405,243 L 417,238 L 429,232 L 439,222 L 445,234 L 449,252 L 458,265 L 469,274 L 471,286 L 468,300 L 456,311 L 439,315 L 429,322 L 416,317 L 407,306 L 395,306 L 390,298 L 396,281 L 400,266 L 393,255 Z", 
    labelX: 426.76, 
    labelY: 274.86, 
    scale: 1.0,
    indices: [
      "Cathédrale aux vitraux exceptionnels",
      "Plaine de Beauce, grenier à blé",
      "Pèlerinage médiéval célèbre"
    ]
  },
  { 
    num: "29", 
    name: "Finistère", 
    path: "M 79,250 L 85,270 L 86,294 L 76,309 L 93,323 L 89,335 L 74,338 L 52,334 L 37,339 L 20,317 L 12,311 L 36,305 L 20,294 L 15,285 L 29,289 L 29,284 L 13,283 L 0,275 L 13,258 L 33,249 L 57,243 L 66,247 Z", 
    labelX: 46.09, 
    labelY: 292.36, 
    scale: 1.0,
    indices: [
      "Bout du monde en breton",
      "Pointe du Raz et phares mythiques",
      "Faïencerie traditionnelle"
    ]
  },
  { 
    num: "2A", 
    name: "Corse-du-Sud", 
    path: "M 931,896 L 944,900 L 954,909 L 965,917 L 974,932 L 977,947 L 987,949 L 988,970 L 985,977 L 979,991 L 971,998 L 963,990 L 951,983 L 949,973 L 948,964 L 942,958 L 947,946 L 935,942 L 940,932 L 936,922 L 934,909 L 934,899 Z", 
    labelX: 956.09, 
    labelY: 945.64, 
    scale: 1.0,
    indices: [
      "Ville natale de Napoléon Bonaparte",
      "Îles Sanguinaires face à la ville",
      "GR20 traverse le département"
    ]
  },
  { 
    num: "2B", 
    name: "Haute-Corse", 
    path: "M 989,949 L 980,951 L 978,944 L 974,932 L 967,922 L 960,913 L 953,907 L 945,901 L 937,898 L 934,892 L 938,882 L 944,877 L 953,870 L 965,866 L 975,860 L 985,859 L 983,842 L 990,831 L 995,846 L 997,875 L 999,891 L 1000,915 L 992,936 Z", 
    labelX: 971.0, 
    labelY: 893.87, 
    scale: 1.0,
    indices: [
      "Port principal de l'île",
      "Cap Corse et ses villages perchés",
      "Désert des Agriates"
    ]
  },
  { 
    num: "30", 
    name: "Gard", 
    path: "M 569,712 L 587,711 L 605,714 L 608,699 L 613,682 L 622,694 L 633,697 L 644,699 L 658,701 L 665,721 L 663,739 L 655,759 L 643,769 L 624,783 L 626,766 L 613,749 L 599,740 L 586,738 L 573,742 L 574,727 L 566,713 Z", 
    labelX: 615.52, 
    labelY: 726.43, 
    scale: 1.0,
    indices: [
      "Pont du Gard, aqueduc romain",
      "Arènes romaines encore utilisées",
      "Camargue gardoise"
    ]
  },
  { 
    num: "31", 
    name: "Haute-Garonne", 
    path: "M 400,751 L 422,751 L 433,742 L 445,748 L 453,765 L 473,783 L 467,790 L 452,804 L 436,810 L 429,807 L 422,821 L 404,824 L 393,843 L 382,862 L 366,851 L 376,829 L 367,816 L 384,793 L 402,795 L 410,777 L 408,760 Z", 
    labelX: 415.43, 
    labelY: 796.29, 
    scale: 1.0,
    indices: [
      "Ville rose et capitale aéronautique",
      "Airbus et Cité de l'Espace",
      "Canal du Midi commence ici"
    ]
  },
  { 
    num: "32", 
    name: "Gers", 
    path: "M 339,731 L 350,728 L 368,723 L 381,726 L 394,726 L 388,737 L 396,746 L 408,760 L 418,771 L 408,778 L 405,790 L 396,790 L 385,794 L 365,797 L 355,794 L 346,786 L 338,779 L 329,771 L 317,772 L 317,761 L 320,743 L 329,735 L 338,740 Z", 
    labelX: 364.78, 
    labelY: 759.91, 
    scale: 1.0,
    indices: [
      "Patrie de d'Artagnan",
      "Armagnac et foie gras",
      "Bastides et villages gascons"
    ]
  },
  { 
    num: "33", 
    name: "Gironde", 
    path: "M 284,593 L 305,599 L 312,610 L 328,614 L 337,627 L 347,645 L 353,649 L 342,656 L 340,670 L 334,687 L 332,699 L 318,702 L 304,698 L 287,682 L 266,685 L 247,676 L 259,663 L 252,651 L 250,627 L 257,571 L 272,584 L 292,625 L 284,593 Z", 
    labelX: 300.09, 
    labelY: 643.74, 
    scale: 1.0,
    indices: [
      "Capitale mondiale du vin",
      "Dune du Pilat, plus haute d'Europe",
      "Place de la Bourse et miroir d'eau"
    ]
  },
  { 
    num: "34", 
    name: "Hérault", 
    path: "M 568,738 L 579,740 L 586,738 L 599,735 L 603,742 L 613,749 L 624,759 L 620,772 L 606,779 L 589,792 L 570,803 L 555,807 L 543,803 L 534,798 L 525,805 L 514,798 L 513,789 L 516,774 L 526,769 L 539,761 L 547,755 L 549,746 L 562,740 Z", 
    labelX: 564.35, 
    labelY: 769.22, 
    scale: 1.0,
    indices: [
      "Plus ancienne faculté de médecine",
      "Station balnéaire du Cap d'Agde",
      "Canal du Midi et étang de Thau"
    ]
  },
  { 
    num: "35", 
    name: "Ille-et-Vilaine", 
    path: "M 198,262 L 197,247 L 204,251 L 228,259 L 238,271 L 252,263 L 259,275 L 259,299 L 259,320 L 251,331 L 237,335 L 223,341 L 212,348 L 194,351 L 186,350 L 190,339 L 188,332 L 185,319 L 181,312 L 175,303 L 186,291 L 197,282 L 200,270 Z", 
    labelX: 213.0, 
    labelY: 302.22, 
    scale: 1.0,
    indices: [
      "Capitale de la Bretagne",
      "Saint-Malo, cité corsaire",
      "Mont-Saint-Michel à la frontière"
    ]
  },
  { 
    num: "36", 
    name: "Indre", 
    path: "M 426,401 L 443,394 L 455,394 L 458,407 L 473,407 L 478,425 L 479,437 L 481,450 L 484,466 L 482,480 L 467,478 L 453,483 L 440,480 L 426,483 L 414,477 L 405,465 L 399,452 L 403,445 L 408,425 L 417,418 L 429,408 Z", 
    labelX: 443.81, 
    labelY: 441.67, 
    scale: 1.0,
    indices: [
      "Berry méridional",
      "George Sand à Nohant",
      "Vallée de la Creuse pittoresque"
    ]
  },
  { 
    num: "37", 
    name: "Indre-et-Loire", 
    path: "M 377,349 L 394,352 L 404,360 L 412,373 L 411,387 L 419,390 L 428,409 L 416,416 L 406,427 L 401,448 L 390,438 L 374,420 L 365,427 L 355,419 L 348,411 L 339,401 L 344,383 L 349,369 L 353,359 L 362,355 L 373,352 Z", 
    labelX: 381.9, 
    labelY: 392.62, 
    scale: 1.0,
    indices: [
      "Jardin de la France",
      "Châteaux de la Loire majestueux",
      "Amboise, Chenonceau, Villandry"
    ]
  },
  { 
    num: "38", 
    name: "Isère", 
    path: "M 726,563 L 734,581 L 747,578 L 761,582 L 763,605 L 768,615 L 775,632 L 769,641 L 748,646 L 735,658 L 716,644 L 714,618 L 694,619 L 692,596 L 673,595 L 665,579 L 672,567 L 686,559 L 686,545 L 703,539 L 719,553 Z", 
    labelX: 721.24, 
    labelY: 595.95, 
    scale: 1.0,
    indices: [
      "Capitale des Alpes",
      "Téléphérique vers la Bastille",
      "JO d'hiver 1968"
    ]
  },
  { 
    num: "39", 
    name: "Jura", 
    path: "M 718,389 L 731,393 L 739,403 L 737,418 L 750,423 L 754,435 L 765,446 L 755,461 L 758,478 L 745,494 L 730,491 L 715,496 L 708,487 L 708,476 L 711,460 L 708,448 L 714,438 L 708,433 L 702,421 L 711,409 L 716,395 Z", 
    labelX: 727.76, 
    labelY: 442.57, 
    scale: 1.0,
    indices: [
      "Comté et vin jaune",
      "Cascades du Hérisson",
      "Salines royales d'Arc-et-Senans"
    ]
  },
  { 
    num: "40", 
    name: "Landes", 
    path: "M 317,772 L 303,775 L 295,776 L 281,772 L 266,777 L 256,780 L 249,777 L 232,779 L 234,764 L 245,696 L 266,679 L 280,685 L 290,688 L 304,698 L 315,709 L 325,708 L 343,716 L 338,733 L 334,735 L 322,737 L 321,749 L 317,761 L 317,769 Z", 
    labelX: 293.48, 
    labelY: 740.65, 
    scale: 1.0,
    indices: [
      "Plus grande forêt artificielle d'Europe",
      "Hossegor et surf atlantique",
      "Courses landaises traditionnelles"
    ]
  },
  { 
    num: "41", 
    name: "Loir-et-Cher", 
    path: "M 393,307 L 407,306 L 418,321 L 432,321 L 443,326 L 442,341 L 463,353 L 478,351 L 487,358 L 490,372 L 482,386 L 468,394 L 458,397 L 443,394 L 424,396 L 411,390 L 413,374 L 404,360 L 392,351 L 377,346 L 390,327 L 390,310 Z", 
    labelX: 432.05, 
    labelY: 353.68, 
    scale: 1.0,
    indices: [
      "Château royal avec escalier François Ier",
      "Chambord, le plus grand des châteaux",
      "Sologne et chasse"
    ]
  },
  { 
    num: "42", 
    name: "Loire", 
    path: "M 606,495 L 616,505 L 631,504 L 642,503 L 634,513 L 630,524 L 638,537 L 639,553 L 649,567 L 658,572 L 665,583 L 656,596 L 642,598 L 634,588 L 623,587 L 613,590 L 610,581 L 608,567 L 596,550 L 596,535 L 600,525 L 599,507 L 604,495 Z", 
    labelX: 625.61, 
    labelY: 546.74, 
    scale: 1.0,
    indices: [
      "Manufacture d'armes et cycles",
      "Gorges de la Loire sauvages",
      "Stade Geoffroy-Guichard mythique"
    ]
  },
  { 
    num: "43", 
    name: "Haute-Loire", 
    path: "M 606,590 L 616,590 L 625,586 L 634,588 L 638,600 L 644,610 L 637,619 L 633,625 L 626,635 L 614,642 L 605,652 L 595,643 L 584,639 L 575,643 L 570,631 L 564,623 L 561,609 L 555,597 L 555,590 L 569,585 L 584,588 L 597,590 L 604,590 Z", 
    labelX: 599.61, 
    labelY: 611.52, 
    scale: 1.0,
    indices: [
      "Point de départ de Saint-Jacques",
      "Rocher et chapelle Saint-Michel",
      "Lentilles vertes AOP"
    ]
  },
  { 
    num: "44", 
    name: "Loire-Atlantique", 
    path: "M 163,374 L 176,368 L 189,359 L 199,350 L 220,344 L 237,335 L 252,349 L 261,363 L 268,381 L 243,386 L 252,396 L 253,411 L 244,413 L 235,426 L 226,419 L 217,432 L 200,423 L 184,409 L 183,393 L 163,393 Z", 
    labelX: 218.25, 
    labelY: 386.2, 
    scale: 1.0,
    indices: [
      "Machines de l'île et éléphant",
      "Château des ducs de Bretagne",
      "Vignoble du Muscadet"
    ]
  },
  { 
    num: "45", 
    name: "Loiret", 
    path: "M 539,301 L 550,316 L 545,335 L 537,341 L 539,355 L 533,364 L 527,367 L 516,366 L 504,358 L 490,355 L 474,351 L 463,353 L 446,345 L 445,330 L 440,320 L 449,310 L 468,303 L 473,288 L 489,283 L 503,287 L 509,302 L 515,304 L 529,300 Z", 
    labelX: 499.26, 
    labelY: 327.57, 
    scale: 1.0,
    indices: [
      "Jeanne d'Arc libératrice",
      "Loire sauvage classée UNESCO",
      "Cathédrale Sainte-Croix"
    ]
  },
  { 
    num: "46", 
    name: "Lot", 
    path: "M 435,624 L 447,623 L 456,632 L 467,629 L 479,631 L 485,646 L 485,661 L 482,670 L 470,676 L 463,682 L 461,696 L 448,701 L 441,706 L 435,703 L 424,703 L 415,697 L 413,689 L 406,685 L 406,672 L 415,659 L 424,649 L 432,640 L 435,624 Z", 
    labelX: 444.52, 
    labelY: 665.13, 
    scale: 1.0,
    indices: [
      "Vin noir de Malbec",
      "Pont Valentré médiéval",
      "Rocamadour, cité sacrée"
    ]
  },
  { 
    num: "47", 
    name: "Lot-et-Garonne", 
    path: "M 355,651 L 363,663 L 374,658 L 390,657 L 392,667 L 409,670 L 405,683 L 403,691 L 395,697 L 397,709 L 389,714 L 381,726 L 368,723 L 350,728 L 339,731 L 334,714 L 328,705 L 332,692 L 333,682 L 347,661 L 343,657 Z", 
    labelX: 367.95, 
    labelY: 689.48, 
    scale: 1.0,
    indices: [
      "Pruneaux d'Agen réputés",
      "Bastides du Sud-Ouest",
      "Confluence entre Lot et Garonne"
    ]
  },
  { 
    num: "48", 
    name: "Lozère", 
    path: "M 568,629 L 573,639 L 581,644 L 589,639 L 595,645 L 604,659 L 609,670 L 610,687 L 609,696 L 611,703 L 609,712 L 596,714 L 587,711 L 578,716 L 568,709 L 559,707 L 552,702 L 551,689 L 551,680 L 545,668 L 545,652 L 550,641 L 558,639 L 563,634 Z", 
    labelX: 577.54, 
    labelY: 674.38, 
    scale: 1.0,
    indices: [
      "Département le moins peuplé",
      "Aubrac et Margeride",
      "Bête du Gévaudan légendaire"
    ]
  },
  { 
    num: "49", 
    name: "Maine-et-Loire", 
    path: "M 247,341 L 266,342 L 279,343 L 297,343 L 311,346 L 321,354 L 338,358 L 348,365 L 347,381 L 339,401 L 327,411 L 317,410 L 302,412 L 284,422 L 267,420 L 253,411 L 251,398 L 240,390 L 259,382 L 267,370 L 257,357 L 249,347 Z", 
    labelX: 289.36, 
    labelY: 377.45, 
    scale: 1.0,
    indices: [
      "Tapisserie de l'Apocalypse",
      "Château et forteresse médiévale",
      "Vignobles d'Anjou et Saumur"
    ]
  },
  { 
    num: "50", 
    name: "Manche", 
    path: "M 256,178 L 266,195 L 273,207 L 263,223 L 260,238 L 277,242 L 278,261 L 260,265 L 245,265 L 228,262 L 231,254 L 225,235 L 225,221 L 221,191 L 207,174 L 205,151 L 203,142 L 220,147 L 243,143 L 243,158 L 256,178 Z", 
    labelX: 242.14, 
    labelY: 206.19, 
    scale: 1.0,
    indices: [
      "Mont-Saint-Michel merveille",
      "Cotentin et Cherbourg",
      "Débarquement d'Utah Beach"
    ]
  },
  { 
    num: "51", 
    name: "Marne", 
    path: "M 616,173 L 636,181 L 654,187 L 669,189 L 679,197 L 683,217 L 678,231 L 682,247 L 669,250 L 663,262 L 641,260 L 629,245 L 611,253 L 602,264 L 587,259 L 576,247 L 573,234 L 584,219 L 584,209 L 595,199 L 589,185 L 601,174 L 615,174 Z", 
    labelX: 626.78, 
    labelY: 219.83, 
    scale: 1.0,
    indices: [
      "Champagne et grandes maisons",
      "Cathédrale de Reims pour sacres",
      "Batailles de la Grande Guerre"
    ]
  },
  { 
    num: "52", 
    name: "Haute-Marne", 
    path: "M 659,263 L 672,255 L 676,247 L 682,254 L 694,260 L 711,272 L 711,283 L 728,290 L 730,303 L 737,320 L 738,333 L 730,341 L 724,351 L 711,354 L 699,359 L 685,351 L 678,342 L 677,329 L 669,322 L 662,313 L 670,304 L 672,287 L 657,271 Z", 
    labelX: 694.43, 
    labelY: 304.52, 
    scale: 1.0,
    indices: [
      "Sources de la Marne",
      "Cutellerie et métallurgie",
      "Lac du Der-Chantecoq"
    ]
  },
  { 
    num: "53", 
    name: "Mayenne", 
    path: "M 259,265 L 272,267 L 284,272 L 292,269 L 308,267 L 316,261 L 324,271 L 326,279 L 323,291 L 316,304 L 312,313 L 308,325 L 306,332 L 307,341 L 293,343 L 281,343 L 270,340 L 256,340 L 249,334 L 256,320 L 263,311 L 259,287 L 260,271 Z", 
    labelX: 288.7, 
    labelY: 302.0, 
    scale: 1.0,
    indices: [
      "Vieux-Château médiéval",
      "Bocage mayennais verdoyant",
      "Grottes de Saulges préhistoriques"
    ]
  },
  { 
    num: "54", 
    name: "Meurthe-et-Moselle", 
    path: "M 715,164 L 738,158 L 747,177 L 751,193 L 755,213 L 772,223 L 784,239 L 800,247 L 819,255 L 825,267 L 795,269 L 773,273 L 756,280 L 744,271 L 732,257 L 734,238 L 741,220 L 736,204 L 735,186 L 722,171 L 715,165 Z", 
    labelX: 756.62, 
    labelY: 222.38, 
    scale: 1.0,
    indices: [
      "Place Stanislas classée UNESCO",
      "École de Nancy Art Nouveau",
      "Mirabelles et quiche lorraine"
    ]
  },
  { 
    num: "55", 
    name: "Meuse", 
    path: "M 679,190 L 689,177 L 689,160 L 701,159 L 715,159 L 717,173 L 725,172 L 733,183 L 733,195 L 739,203 L 741,219 L 737,226 L 732,242 L 732,257 L 730,269 L 711,272 L 694,260 L 682,254 L 682,241 L 677,226 L 685,215 L 679,197 Z", 
    labelX: 709.18, 
    labelY: 211.32, 
    scale: 1.0,
    indices: [
      "Verdun et mémoire 14-18",
      "Voie sacrée historique",
      "Dragées réputées"
    ]
  },
  { 
    num: "56", 
    name: "Morbihan", 
    path: "M 89,333 L 96,320 L 76,311 L 89,299 L 107,302 L 129,300 L 148,311 L 163,300 L 178,310 L 185,319 L 191,334 L 186,347 L 184,367 L 169,373 L 162,368 L 140,370 L 139,364 L 133,358 L 118,371 L 112,350 L 105,348 L 88,337 Z", 
    labelX: 135.77, 
    labelY: 336.0, 
    scale: 1.0,
    indices: [
      "Golfe parsemé d'îles",
      "Alignements de Carnac",
      "Belle-Île-en-Mer"
    ]
  },
  { 
    num: "57", 
    name: "Moselle", 
    path: "M 745,164 L 771,163 L 793,175 L 803,194 L 817,192 L 834,201 L 856,197 L 863,215 L 838,216 L 825,214 L 827,229 L 835,232 L 843,250 L 826,261 L 808,251 L 791,241 L 772,231 L 761,222 L 751,200 L 751,183 L 745,164 Z", 
    labelX: 802.62, 
    labelY: 209.29, 
    scale: 1.0,
    indices: [
      "Cathédrale gothique lumineuse",
      "Centre Pompidou-Metz",
      "Histoire franco-allemande"
    ]
  },
  { 
    num: "58", 
    name: "Nièvre", 
    path: "M 534,367 L 544,363 L 559,370 L 577,370 L 590,375 L 602,378 L 606,381 L 620,386 L 628,398 L 621,408 L 615,421 L 617,431 L 608,447 L 590,447 L 582,453 L 573,452 L 562,450 L 545,442 L 548,419 L 542,394 L 536,371 Z", 
    labelX: 580.9, 
    labelY: 405.86, 
    scale: 1.0,
    indices: [
      "Faïences artistiques",
      "Circuit de Nevers Magny-Cours",
      "Morvan et lacs"
    ]
  },
  { 
    num: "59", 
    name: "Nord", 
    path: "M 478,8 L 503,3 L 516,23 L 536,41 L 557,36 L 562,55 L 583,60 L 594,80 L 615,77 L 622,98 L 623,114 L 601,107 L 583,106 L 563,110 L 549,100 L 547,84 L 546,67 L 530,55 L 526,48 L 508,47 L 502,33 L 478,8 Z", 
    labelX: 551.0, 
    labelY: 61.82, 
    scale: 1.0,
    indices: [
      "Beffrois flamands",
      "Braderie la plus célèbre",
      "Moules-frites traditionnelles"
    ]
  },
  { 
    num: "60", 
    name: "Oise", 
    path: "M 458,137 L 478,143 L 499,147 L 517,152 L 529,151 L 545,145 L 553,156 L 554,169 L 541,182 L 541,193 L 551,198 L 536,206 L 520,205 L 501,199 L 480,195 L 463,197 L 457,188 L 453,173 L 454,163 L 454,146 L 455,138 Z", 
    labelX: 501.86, 
    labelY: 170.62, 
    scale: 1.0,
    indices: [
      "Cathédrale au chœur le plus haut",
      "Chantilly et son château",
      "Forêt de Compiègne historique"
    ]
  },
  { 
    num: "61", 
    name: "Orne", 
    path: "M 275,240 L 296,230 L 311,229 L 335,226 L 351,219 L 363,220 L 373,228 L 386,240 L 391,254 L 400,266 L 391,282 L 384,297 L 368,288 L 359,271 L 339,276 L 327,272 L 317,262 L 299,266 L 283,270 L 278,261 L 277,242 Z", 
    labelX: 338.24, 
    labelY: 254.24, 
    scale: 1.0,
    indices: [
      "Dentelle au point d'Alençon",
      "Haras du Pin prestigieux",
      "Camembert de Normandie"
    ]
  },
  { 
    num: "62", 
    name: "Pas-de-Calais", 
    path: "M 478,8 L 497,32 L 500,43 L 513,48 L 527,44 L 530,52 L 541,59 L 542,71 L 554,87 L 549,100 L 542,107 L 527,108 L 517,101 L 505,99 L 505,94 L 497,88 L 482,90 L 469,78 L 455,75 L 444,59 L 445,36 L 452,18 L 477,9 Z", 
    labelX: 502.09, 
    labelY: 65.48, 
    scale: 1.0,
    indices: [
      "Beffroi et Grand-Place",
      "Cap Blanc-Nez et Gris-Nez",
      "Plus proche de l'Angleterre"
    ]
  },
  { 
    num: "63", 
    name: "Puy-de-Dôme", 
    path: "M 513,509 L 524,502 L 535,497 L 541,511 L 555,517 L 570,517 L 581,522 L 594,537 L 598,554 L 610,569 L 606,584 L 598,588 L 584,590 L 569,585 L 550,590 L 540,595 L 527,587 L 514,580 L 507,564 L 508,550 L 506,537 L 515,520 Z", 
    labelX: 552.05, 
    labelY: 550.23, 
    scale: 1.0,
    indices: [
      "Volcan emblématique culminant",
      "Capitale du pneumatique",
      "Chaîne des Puys classée"
    ]
  },
  { 
    num: "64", 
    name: "Pyrénées-Atlantiques", 
    path: "M 317,772 L 330,776 L 333,786 L 331,803 L 322,820 L 314,831 L 308,851 L 296,855 L 284,843 L 268,837 L 248,826 L 240,823 L 236,816 L 225,802 L 214,802 L 226,781 L 242,780 L 256,780 L 272,775 L 292,777 L 303,775 Z", 
    labelX: 278.9, 
    labelY: 805.29, 
    scale: 1.0,
    indices: [
      "Berceau d'Henri IV",
      "Biarritz et surf basque",
      "Fromage Ossau-Iraty"
    ]
  },
  { 
    num: "65", 
    name: "Hautes-Pyrénées", 
    path: "M 327,772 L 335,776 L 343,781 L 346,791 L 357,796 L 369,798 L 374,809 L 365,819 L 372,828 L 378,832 L 375,842 L 366,854 L 364,864 L 354,865 L 345,860 L 333,864 L 317,852 L 314,833 L 320,825 L 326,813 L 331,801 L 335,789 L 332,783 Z", 
    labelX: 346.87, 
    labelY: 819.43, 
    scale: 1.0,
    indices: [
      "Lourdes, lieu de pèlerinage",
      "Pic du Midi observatoire",
      "Cirque de Gavarnie majestueux"
    ]
  },
  { 
    num: "66", 
    name: "Pyrénées-Orientales", 
    path: "M 485,867 L 496,862 L 496,849 L 512,848 L 526,847 L 534,840 L 546,849 L 546,874 L 553,882 L 555,890 L 544,887 L 534,887 L 526,891 L 516,899 L 507,900 L 495,891 L 484,891 L 475,898 L 469,888 L 462,886 L 455,878 L 465,875 L 473,867 L 485,867 Z", 
    labelX: 505.79, 
    labelY: 875.54, 
    scale: 1.0,
    indices: [
      "Catalogne française",
      "Canigou montagne sacrée",
      "Côte Vermeille et Collioure"
    ]
  },
  { 
    num: "67", 
    name: "Bas-Rhin", 
    path: "M 866,209 L 882,211 L 891,212 L 905,219 L 893,239 L 879,254 L 875,271 L 868,295 L 858,305 L 850,295 L 839,287 L 828,274 L 827,263 L 840,257 L 840,246 L 838,233 L 828,236 L 825,229 L 821,219 L 826,208 L 836,217 L 853,218 L 864,213 Z", 
    labelX: 853.57, 
    labelY: 243.91, 
    scale: 1.0,
    indices: [
      "Capitale européenne",
      "Cathédrale de grès rose",
      "Marché de Noël célèbre"
    ]
  },
  { 
    num: "68", 
    name: "Haut-Rhin", 
    path: "M 835,286 L 844,292 L 853,295 L 857,302 L 861,309 L 862,325 L 859,340 L 857,348 L 862,361 L 857,370 L 853,372 L 841,376 L 834,375 L 831,365 L 823,360 L 824,348 L 818,341 L 811,336 L 817,327 L 822,315 L 826,304 L 833,290 Z", 
    labelX: 840.0, 
    labelY: 333.5, 
    scale: 1.0,
    indices: [
      "Petite Venise alsacienne",
      "Route des vins pittoresque",
      "Musée Unterlinden"
    ]
  },
  { 
    num: "69", 
    name: "Rhône", 
    path: "M 640,501 L 650,496 L 661,492 L 663,503 L 665,514 L 664,530 L 674,534 L 680,543 L 687,548 L 690,556 L 682,564 L 670,566 L 667,578 L 659,576 L 653,567 L 641,561 L 637,547 L 635,533 L 634,524 L 634,513 L 640,504 Z", 
    labelX: 658.38, 
    labelY: 535.71, 
    scale: 1.0,
    indices: [
      "Capitale de la gastronomie",
      "Confluence Rhône et Saône",
      "Fête des Lumières"
    ]
  },
  { 
    num: "70", 
    name: "Haute-Saône", 
    path: "M 744,325 L 748,323 L 761,315 L 769,325 L 785,329 L 801,330 L 807,340 L 808,355 L 803,363 L 792,366 L 787,369 L 770,375 L 758,384 L 746,386 L 731,393 L 719,391 L 716,380 L 713,370 L 710,359 L 716,350 L 730,350 L 730,338 L 738,333 Z", 
    labelX: 755.74, 
    labelY: 354.3, 
    scale: 1.0,
    indices: [
      "Chanson de Jacques Brel",
      "Chapelle Notre-Dame de la Motte",
      "Forges et ferronnerie"
    ]
  },
  { 
    num: "71", 
    name: "Saône-et-Loire", 
    path: "M 621,408 L 637,411 L 653,423 L 667,429 L 689,425 L 704,428 L 714,438 L 711,452 L 709,470 L 694,471 L 675,478 L 667,505 L 661,492 L 645,493 L 631,504 L 611,505 L 612,491 L 603,471 L 593,460 L 594,446 L 617,442 L 614,423 L 621,408 Z", 
    labelX: 649.7, 
    labelY: 455.35, 
    scale: 1.0,
    indices: [
      "Vignobles bourguignons sud",
      "Cluny abbaye bénédictine",
      "Charolais et élevage bovin"
    ]
  },
  { 
    num: "72", 
    name: "Sarthe", 
    path: "M 330,278 L 341,275 L 355,268 L 362,285 L 374,293 L 387,299 L 393,304 L 392,318 L 388,327 L 377,344 L 373,352 L 364,357 L 358,361 L 347,359 L 330,354 L 320,353 L 314,347 L 304,337 L 306,327 L 312,317 L 317,309 L 324,295 L 325,282 Z", 
    labelX: 347.52, 
    labelY: 319.17, 
    scale: 1.0,
    indices: [
      "24 Heures mythiques",
      "Rillettes réputées",
      "Cité Plantagenêt médiévale"
    ]
  },
  { 
    num: "73", 
    name: "Savoie", 
    path: "M 808,546 L 821,562 L 829,578 L 830,592 L 819,605 L 806,610 L 791,616 L 777,619 L 768,612 L 761,597 L 758,581 L 746,580 L 734,581 L 726,564 L 737,550 L 744,538 L 756,549 L 769,556 L 786,535 L 794,544 L 805,547 Z", 
    labelX: 779.29, 
    labelY: 574.38, 
    scale: 1.0,
    indices: [
      "Lacs d'Annecy et du Bourget",
      "Stations de ski olympiques",
      "Fromages Beaufort et Reblochon"
    ]
  },
  { 
    num: "74", 
    name: "Haute-Savoie", 
    path: "M 808,546 L 800,549 L 790,538 L 785,535 L 772,556 L 762,548 L 750,547 L 743,535 L 739,519 L 747,510 L 761,509 L 773,497 L 776,485 L 788,482 L 808,484 L 812,497 L 809,510 L 816,517 L 824,528 L 818,538 L 809,543 Z", 
    labelX: 785.24, 
    labelY: 522.52, 
    scale: 1.0,
    indices: [
      "Venise des Alpes",
      "Mont-Blanc point culminant",
      "Chamonix et alpinisme"
    ]
  },
  { 
    num: "75", 
    name: "Paris", 
    path: "M 502,230 L 506,231 L 506,233 L 504,234 L 501,232 L 499,234 L 496,234 L 493,232 L 489,230 L 490,228 L 491,227 L 493,227 L 496,225 L 500,225 L 502,228 L 502,230 Z", 
    labelX: 498.12, 
    labelY: 230.0, 
    scale: 1.0,
    indices: [
      "Capitale de la France",
      "Tour Eiffel emblématique",
      "Ville Lumière"
    ]
  },
  { 
    num: "76", 
    name: "Seine-Maritime", 
    path: "M 430,105 L 440,111 L 453,123 L 454,140 L 454,146 L 454,159 L 458,165 L 447,172 L 430,168 L 424,177 L 410,183 L 399,182 L 398,180 L 388,172 L 371,166 L 352,169 L 339,163 L 347,142 L 364,134 L 389,125 L 411,118 Z", 
    labelX: 410.1, 
    labelY: 152.38, 
    scale: 1.0,
    indices: [
      "Jeanne d'Arc martyrisée",
      "Falaises d'Étretat",
      "Port du Havre"
    ]
  },
  { 
    num: "77", 
    name: "Seine-et-Marne", 
    path: "M 513,247 L 513,229 L 512,212 L 526,209 L 541,207 L 554,206 L 565,223 L 575,231 L 573,240 L 579,252 L 575,263 L 572,275 L 561,280 L 546,284 L 539,301 L 524,304 L 510,305 L 509,294 L 503,280 L 508,264 L 514,248 Z", 
    labelX: 538.67, 
    labelY: 254.95, 
    scale: 1.0,
    indices: [
      "Disneyland Paris",
      "Forêt de Fontainebleau",
      "Château Renaissance"
    ]
  },
  { 
    num: "78", 
    name: "Yvelines", 
    path: "M 487,224 L 484,234 L 489,238 L 483,242 L 477,247 L 476,257 L 469,260 L 469,268 L 464,272 L 458,265 L 453,258 L 446,250 L 445,238 L 444,230 L 441,223 L 437,217 L 436,208 L 446,206 L 452,209 L 459,207 L 464,213 L 473,213 L 482,216 L 488,220 Z", 
    labelX: 463.42, 
    labelY: 233.96, 
    scale: 1.0,
    indices: [
      "Château du Roi Soleil",
      "Galerie des Glaces",
      "Jardins à la française"
    ]
  },
  { 
    num: "79", 
    name: "Deux-Sèvres", 
    path: "M 272,423 L 291,421 L 306,413 L 323,410 L 331,425 L 333,440 L 332,456 L 334,470 L 336,485 L 346,492 L 344,505 L 343,513 L 327,527 L 315,518 L 297,509 L 283,496 L 290,489 L 289,481 L 292,466 L 288,451 L 276,432 Z", 
    labelX: 311.81, 
    labelY: 467.71, 
    scale: 1.0,
    indices: [
      "Marais Poitevin vert",
      "Mutualité et assurances",
      "Angélique de Niort"
    ]
  },
  { 
    num: "80", 
    name: "Somme", 
    path: "M 430,105 L 451,94 L 441,83 L 458,75 L 470,80 L 485,92 L 499,90 L 502,94 L 507,98 L 517,102 L 528,107 L 544,106 L 554,118 L 549,133 L 540,144 L 527,152 L 517,152 L 502,147 L 482,144 L 462,142 L 452,123 L 435,108 Z", 
    labelX: 493.27, 
    labelY: 113.14, 
    scale: 1.0,
    indices: [
      "Plus vaste cathédrale de France",
      "Jules Verne résidant",
      "Batailles de la Grande Guerre"
    ]
  },
  { 
    num: "81", 
    name: "Tarn", 
    path: "M 473,714 L 486,711 L 494,716 L 507,726 L 512,740 L 523,756 L 538,759 L 526,769 L 519,778 L 508,787 L 490,786 L 478,790 L 474,780 L 463,776 L 453,765 L 449,755 L 444,745 L 441,735 L 453,725 L 453,717 L 464,714 Z", 
    labelX: 483.24, 
    labelY: 749.71, 
    scale: 1.0,
    indices: [
      "Cathédrale fortifiée unique",
      "Toulouse-Lautrec natif",
      "Bastides médiévales"
    ]
  },
  { 
    num: "82", 
    name: "Tarn-et-Garonne", 
    path: "M 408,690 L 415,697 L 426,705 L 439,701 L 448,701 L 464,696 L 467,708 L 468,712 L 457,719 L 452,723 L 441,735 L 435,742 L 427,746 L 416,750 L 402,751 L 396,739 L 392,729 L 385,721 L 393,711 L 396,699 L 403,691 Z", 
    labelX: 425.24, 
    labelY: 717.43, 
    scale: 1.0,
    indices: [
      "Briques roses omniprésentes",
      "Ingres peintre célèbre",
      "Chasselas de Moissac"
    ]
  },
  { 
    num: "83", 
    name: "Var", 
    path: "M 735,757 L 748,757 L 755,761 L 770,750 L 783,750 L 798,755 L 805,763 L 815,773 L 814,788 L 803,792 L 795,805 L 799,811 L 780,817 L 769,820 L 761,827 L 746,819 L 739,821 L 730,808 L 730,797 L 733,784 L 731,772 L 735,757 Z", 
    labelX: 767.0, 
    labelY: 785.64, 
    scale: 1.0,
    indices: [
      "Base navale importante",
      "Îles d'Hyères paradisiaques",
      "Gorges du Verdon spectaculaires"
    ]
  },
  { 
    num: "84", 
    name: "Vaucluse", 
    path: "M 658,701 L 663,696 L 669,703 L 678,702 L 688,700 L 693,700 L 699,707 L 707,707 L 714,717 L 720,726 L 720,735 L 722,743 L 726,747 L 732,752 L 734,758 L 725,764 L 706,758 L 695,756 L 682,745 L 674,739 L 667,736 L 671,728 L 664,721 L 662,707 L 658,701 Z", 
    labelX: 693.08, 
    labelY: 725.96, 
    scale: 1.0,
    indices: [
      "Palais des Papes",
      "Pont Saint-Bénézet incomplet",
      "Mont Ventoux géant de Provence"
    ]
  },
  { 
    num: "85", 
    name: "Vendée", 
    path: "M 254,418 L 272,423 L 280,437 L 287,453 L 292,466 L 290,479 L 292,486 L 284,492 L 271,491 L 263,487 L 250,494 L 232,488 L 212,475 L 197,452 L 191,426 L 204,425 L 214,432 L 227,426 L 232,420 L 239,422 L 244,413 Z", 
    labelX: 248.9, 
    labelY: 452.62, 
    scale: 1.0,
    indices: [
      "Puy du Fou parc historique",
      "Guerres de Vendée",
      "Île de Noirmoutier"
    ]
  },
  { 
    num: "86", 
    name: "Vienne", 
    path: "M 327,414 L 338,404 L 349,415 L 356,427 L 376,425 L 383,431 L 397,453 L 410,468 L 415,483 L 401,494 L 389,502 L 382,511 L 365,513 L 352,515 L 344,505 L 346,492 L 336,485 L 334,470 L 332,456 L 333,440 L 331,425 Z", 
    labelX: 361.71, 
    labelY: 463.24, 
    scale: 1.0,
    indices: [
      "Bataille de 732 décisive",
      "Futuroscope parc d'attractions",
      "Églises romanes nombreuses"
    ]
  },
  { 
    num: "87", 
    name: "Haute-Vienne", 
    path: "M 391,510 L 394,497 L 406,488 L 418,484 L 432,486 L 430,501 L 442,516 L 443,527 L 448,534 L 456,538 L 465,553 L 458,559 L 444,569 L 432,572 L 421,581 L 415,572 L 406,565 L 393,566 L 387,558 L 379,550 L 389,542 L 398,528 L 392,517 Z", 
    labelX: 419.09, 
    labelY: 535.35, 
    scale: 1.0,
    indices: [
      "Porcelaine mondialement connue",
      "Émail sur cuivre",
      "Oradour-sur-Glane martyre"
    ]
  },
  { 
    num: "88", 
    name: "Vosges", 
    path: "M 715,274 L 734,270 L 744,271 L 749,282 L 763,279 L 773,275 L 792,273 L 809,277 L 830,265 L 835,283 L 826,304 L 816,324 L 807,335 L 791,325 L 771,322 L 761,315 L 749,321 L 737,323 L 728,305 L 727,293 L 713,283 Z", 
    labelX: 770.0, 
    labelY: 295.19, 
    scale: 1.0,
    indices: [
      "Images d'Épinal colorées",
      "Massif vosgien et ballons",
      "Route des Crêtes panoramique"
    ]
  },
  { 
    num: "89", 
    name: "Yonne", 
    path: "M 539,301 L 546,283 L 564,279 L 580,283 L 586,294 L 595,300 L 604,316 L 612,325 L 627,323 L 632,328 L 636,343 L 627,356 L 621,375 L 611,386 L 604,376 L 593,379 L 577,370 L 557,367 L 540,361 L 533,342 L 545,335 L 549,312 Z", 
    labelX: 585.36, 
    labelY: 333.36, 
    scale: 1.0,
    indices: [
      "Vignobles de Chablis",
      "Vézelay basilique",
      "Abbaye de Pontigny"
    ]
  },
  { 
    num: "90", 
    name: "Territoire de Belfort", 
    path: "M 809,337 L 811,338 L 816,341 L 820,343 L 824,346 L 825,351 L 822,357 L 826,359 L 829,364 L 831,369 L 826,370 L 821,370 L 820,375 L 817,374 L 815,370 L 818,368 L 815,364 L 812,364 L 808,363 L 806,356 L 806,352 L 806,347 L 805,344 L 809,339 Z", 
    labelX: 816.54, 
    labelY: 356.71, 
    scale: 1.0,
    indices: [
      "Lion de Bartholdi monumental",
      "Trouée stratégique",
      "Plus petit département"
    ]
  },
  { 
    num: "91", 
    name: "Essonne", 
    path: "M 489,238 L 495,243 L 499,244 L 508,242 L 512,247 L 511,249 L 511,256 L 508,264 L 509,274 L 506,279 L 501,285 L 495,284 L 489,283 L 484,286 L 476,288 L 471,286 L 472,280 L 468,275 L 467,269 L 471,263 L 472,261 L 476,257 L 475,252 L 481,244 L 484,240 L 489,238 Z", 
    labelX: 489.19, 
    labelY: 262.58, 
    scale: 1.0,
    indices: [
      "Cathédrale moderne circulaire",
      "Vallée de Chevreuse",
      "Plateau de Saclay scientifique"
    ]
  },
  { 
    num: "92", 
    name: "Hauts-de-Seine", 
    path: "M 494,220 L 496,220 L 497,222 L 496,223 L 496,225 L 493,227 L 491,227 L 490,228 L 489,230 L 493,232 L 496,234 L 496,237 L 495,240 L 496,241 L 495,243 L 492,239 L 490,239 L 489,238 L 487,236 L 486,236 L 486,234 L 484,234 L 484,232 L 484,228 L 485,226 L 487,224 L 492,220 L 494,220 Z", 
    labelX: 491.18, 
    labelY: 230.54, 
    scale: 1.0,
    indices: [
      "La Défense quartier d'affaires",
      "Grande Arche moderne",
      "Île de la Jatte impressionniste"
    ]
  },
  { 
    num: "93", 
    name: "Seine-Saint-Denis", 
    path: "M 512,214 L 514,216 L 513,218 L 514,220 L 515,223 L 514,226 L 513,229 L 515,233 L 515,235 L 511,231 L 507,229 L 502,230 L 502,228 L 500,225 L 496,225 L 496,223 L 497,222 L 496,220 L 494,220 L 494,218 L 497,219 L 497,218 L 500,218 L 502,219 L 505,219 L 506,218 L 509,217 L 510,214 L 512,214 Z", 
    labelX: 505.45, 
    labelY: 222.1, 
    scale: 1.0,
    indices: [
      "Stade de France",
      "Basilique de Saint-Denis",
      "Nécropole des rois"
    ]
  },
  { 
    num: "94", 
    name: "Val-de-Marne", 
    path: "M 496,234 L 499,234 L 501,232 L 504,234 L 506,233 L 506,231 L 502,230 L 507,229 L 511,231 L 515,235 L 516,238 L 514,241 L 514,243 L 513,245 L 513,247 L 512,247 L 510,246 L 509,243 L 508,242 L 505,243 L 502,244 L 499,244 L 498,242 L 496,241 L 495,240 L 496,237 L 496,234 Z", 
    labelX: 505.3, 
    labelY: 238.52, 
    scale: 1.0,
    indices: [
      "Bords de Marne bucoliques",
      "Château de Vincennes",
      "MAC VAL musée d'art"
    ]
  },
  { 
    num: "95", 
    name: "Val-d'Oise", 
    path: "M 514,207 L 512,212 L 509,217 L 502,219 L 497,219 L 492,220 L 486,220 L 482,216 L 475,215 L 467,211 L 463,211 L 459,207 L 454,210 L 449,206 L 449,201 L 453,191 L 456,197 L 465,197 L 471,197 L 479,193 L 486,197 L 493,198 L 501,199 L 508,203 L 514,207 Z", 
    labelX: 481.44, 
    labelY: 206.8, 
    scale: 1.0,
    indices: [
      "Ville nouvelle des années 70",
      "Auvers-sur-Oise de Van Gogh",
      "Abbaye de Royaumont"
    ]
  },
];
