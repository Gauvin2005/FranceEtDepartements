# Scripts de Scraping et Conversion des Départements Français

Ce dossier contient les scripts Python pour télécharger et convertir les contours des départements français depuis des sources officielles.

## Fichiers

- `scrape_departments.py` - Script principal pour télécharger et traiter les données GeoJSON
- `convert_to_typescript.py` - Script pour convertir le JSON en format TypeScript
- `requirements.txt` - Dépendances Python nécessaires
- `departments_paths.json` - Fichier JSON généré (96 départements métropolitains)

## Installation

```bash
# Installer les dépendances Python
pip install --break-system-packages -r requirements.txt
```

## Utilisation

### 1. Générer les données JSON

```bash
python3 scrape_departments.py
```

Ce script :
- Télécharge le fichier GeoJSON depuis GitHub (gregoiredavid/france-geojson)
- Charge les données géographiques avec GeoPandas
- Extrait les coordonnées de chaque département
- Normalise les coordonnées pour l'affichage SVG (0-1000)
- Calcule les positions des labels
- Exporte en JSON (`departments_paths.json`)

### 2. Convertir en TypeScript

```bash
python3 convert_to_typescript.py
```

Ce script :
- Lit le fichier JSON généré
- Convertit les coordonnées en paths SVG
- Génère le fichier TypeScript (`../data/departmentsPathsRealistic.ts`)

## Résultats

- **96 départements** métropolitains traités
- **Coordonnées normalisées** pour l'affichage SVG
- **Format compatible** avec l'interface `DepartmentPath` existante
- **Pas de doublons** de codes INSEE
- **Positions de labels** calculées automatiquement

## Données manquantes

Les départements d'outre-mer (971, 972, 973, 974, 976) ne sont pas inclus dans le fichier GeoJSON source utilisé. Ils peuvent être ajoutés manuellement si nécessaire.

## Format de sortie

```typescript
export interface DepartmentPath {
  num: string;        // Code INSEE (ex: "01", "2A")
  name: string;       // Nom du département
  path: string;        // Path SVG des contours
  labelX: number;      // Position X du label
  labelY: number;      // Position Y du label
  scale?: number;      // Échelle du texte (défaut: 1.0)
}
```

## Sources

- **GeoJSON source** : https://github.com/gregoiredavid/france-geojson
- **Fichier utilisé** : `departements-version-simplifiee.geojson`
- **Projection** : WGS84 (EPSG:4326)
- **Format** : GeoJSON avec géométries Polygon/MultiPolygon
