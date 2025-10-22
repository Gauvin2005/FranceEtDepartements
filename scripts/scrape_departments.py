#!/usr/bin/env python3
"""
Script pour scraper et convertir les contours des départements français
Télécharge les données GeoJSON et les convertit en format exploitable par l'UI
"""

import requests
import geopandas as gpd
import pandas as pd
import json
import os
from shapely.geometry import Polygon, MultiPolygon
from typing import List, Dict, Tuple, Any
import logging

# Configuration du logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class DepartmentScraper:
    def __init__(self):
        self.base_url = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master"
        self.geojson_file = "departements-version-simplifiee.geojson"
        self.output_file = "departments_paths.json"
        
    def download_geojson(self) -> str:
        """Télécharge le fichier GeoJSON des départements français"""
        url = f"{self.base_url}/{self.geojson_file}"
        logger.info(f"Téléchargement du fichier GeoJSON depuis {url}")
        
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            # Sauvegarde temporaire
            temp_file = "temp_departments.geojson"
            with open(temp_file, 'wb') as f:
                f.write(response.content)
            
            logger.info(f"Fichier téléchargé et sauvegardé dans {temp_file}")
            return temp_file
            
        except requests.RequestException as e:
            logger.error(f"Erreur lors du téléchargement: {e}")
            raise
    
    def load_geodata(self, file_path: str) -> gpd.GeoDataFrame:
        """Charge les données géographiques depuis le fichier GeoJSON"""
        logger.info(f"Chargement des données géographiques depuis {file_path}")
        
        try:
            gdf = gpd.read_file(file_path)
            logger.info(f"Données chargées: {len(gdf)} départements trouvés")
            logger.info(f"Colonnes disponibles: {list(gdf.columns)}")
            return gdf
            
        except Exception as e:
            logger.error(f"Erreur lors du chargement des données: {e}")
            raise
    
    def extract_coordinates(self, geometry) -> List[List[float]]:
        """Extrait les coordonnées d'une géométrie et les normalise"""
        coords = []
        
        if geometry is None:
            return coords
            
        if isinstance(geometry, Polygon):
            # Pour un polygone simple
            exterior_coords = list(geometry.exterior.coords)
            coords = [[float(x), float(y)] for x, y in exterior_coords]
            
        elif isinstance(geometry, MultiPolygon):
            # Pour un multipolygone, prendre le plus grand polygone
            largest_polygon = max(geometry.geoms, key=lambda p: p.area)
            exterior_coords = list(largest_polygon.exterior.coords)
            coords = [[float(x), float(y)] for x, y in exterior_coords]
        
        return coords
    
    def normalize_coordinates(self, coords: List[List[float]]) -> List[List[float]]:
        """Normalise les coordonnées pour l'affichage SVG avec simplification"""
        if not coords:
            return []
        
        # Convertir en DataFrame pour faciliter les calculs
        df = pd.DataFrame(coords, columns=['x', 'y'])
        
        # Calculer les bornes
        min_x, max_x = df['x'].min(), df['x'].max()
        min_y, max_y = df['y'].min(), df['y'].max()
        
        # Normaliser entre 0 et 1000 pour l'affichage SVG
        width, height = 1000, 1000
        
        # Appliquer la normalisation
        df['x_norm'] = ((df['x'] - min_x) / (max_x - min_x)) * width
        df['y_norm'] = ((df['y'] - min_y) / (max_y - min_y)) * height
        
        # Simplifier les coordonnées (réduire la précision et supprimer les points redondants)
        simplified_coords = []
        prev_point = None
        
        for _, row in df.iterrows():
            x, y = round(row['x_norm']), round(row['y_norm'])
            current_point = (x, y)
            
            # Ajouter seulement si le point est différent du précédent
            if prev_point != current_point:
                simplified_coords.append([x, y])
                prev_point = current_point
        
        # Garder seulement tous les 3-5 points pour réduire la complexité
        if len(simplified_coords) > 50:
            step = max(1, len(simplified_coords) // 30)  # Max 30 points par département
            simplified_coords = simplified_coords[::step]
        
        return simplified_coords
    
    def normalize_coordinates_global(self, coords: List[List[float]], global_min_x: float, global_max_x: float, global_min_y: float, global_max_y: float) -> List[List[float]]:
        """Normalise les coordonnées avec les bornes globales pour éviter la superposition"""
        if not coords:
            return []
        
        # Convertir en DataFrame pour faciliter les calculs
        df = pd.DataFrame(coords, columns=['x', 'y'])
        
        # Normaliser avec les bornes globales
        width, height = 1000, 1000
        
        df['x_norm'] = ((df['x'] - global_min_x) / (global_max_x - global_min_x)) * width
        # Inverser Y pour corriger l'orientation (la France était à l'envers)
        df['y_norm'] = height - ((df['y'] - global_min_y) / (global_max_y - global_min_y)) * height
        
        # Simplifier les coordonnées
        simplified_coords = []
        prev_point = None
        
        for _, row in df.iterrows():
            x, y = round(row['x_norm']), round(row['y_norm'])
            current_point = (x, y)
            
            if prev_point != current_point:
                simplified_coords.append([x, y])
                prev_point = current_point
        
        # Limiter le nombre de points pour les performances
        if len(simplified_coords) > 30:
            step = max(1, len(simplified_coords) // 20)  # Max 20 points par département
            simplified_coords = simplified_coords[::step]
        
        return simplified_coords
    
    def calculate_label_position(self, coords: List[List[float]]) -> Tuple[float, float]:
        """Calcule la position du label au centre du département"""
        if not coords:
            return 0, 0
        
        df = pd.DataFrame(coords, columns=['x', 'y'])
        center_x = df['x'].mean()
        center_y = df['y'].mean()
        
        return round(center_x, 2), round(center_y, 2)
    
    def process_departments(self, gdf: gpd.GeoDataFrame) -> List[Dict[str, Any]]:
        """Traite tous les départements et retourne les données formatées"""
        departments_data = []
        seen_codes = set()
        all_coords = []  # Pour la normalisation globale
        
        logger.info("Traitement des départements...")
        
        # Première passe : extraire toutes les coordonnées pour calculer les bornes globales
        for idx, row in gdf.iterrows():
            code_insee = str(row.get('code', row.get('INSEE_COM', ''))).strip()
            nom = str(row.get('nom', row.get('NOM', ''))).strip()
            geometry = row.geometry
            
            if not code_insee or not nom or code_insee in seen_codes:
                continue
                
            seen_codes.add(code_insee)
            raw_coords = self.extract_coordinates(geometry)
            if raw_coords:
                all_coords.extend(raw_coords)
        
        # Calculer les bornes globales
        if not all_coords:
            logger.error("Aucune coordonnée trouvée")
            return []
            
        df_all = pd.DataFrame(all_coords, columns=['x', 'y'])
        global_min_x, global_max_x = df_all['x'].min(), df_all['x'].max()
        global_min_y, global_max_y = df_all['y'].min(), df_all['y'].max()
        
        logger.info(f"Bornes globales: X({global_min_x:.2f}, {global_max_x:.2f}), Y({global_min_y:.2f}, {global_max_y:.2f})")
        
        # Deuxième passe : normaliser avec les bornes globales
        seen_codes.clear()
        departments_data = []
        
        for idx, row in gdf.iterrows():
            code_insee = str(row.get('code', row.get('INSEE_COM', ''))).strip()
            nom = str(row.get('nom', row.get('NOM', ''))).strip()
            geometry = row.geometry
            
            if code_insee in seen_codes:
                continue
            if not code_insee or not nom:
                continue
                
            seen_codes.add(code_insee)
            
            # Extraire les coordonnées
            raw_coords = self.extract_coordinates(geometry)
            if not raw_coords:
                continue
            
            # Normaliser avec les bornes globales
            normalized_coords = self.normalize_coordinates_global(raw_coords, global_min_x, global_max_x, global_min_y, global_max_y)
            
            if not normalized_coords:
                continue
            
            # Calculer la position du label
            label_x, label_y = self.calculate_label_position(normalized_coords)
            
            # Créer l'entrée du département
            department_data = {
                "numero": code_insee,
                "name": nom,
                "coords": normalized_coords,
                "labelX": label_x,
                "labelY": label_y,
                "scale": 1.0
            }
            
            departments_data.append(department_data)
            logger.info(f"Traité: {nom} ({code_insee}) - {len(normalized_coords)} points")
        
        logger.info(f"Total des départements traités: {len(departments_data)}")
        return departments_data
    
    def export_to_json(self, departments_data: List[Dict[str, Any]]) -> None:
        """Exporte les données au format JSON"""
        logger.info(f"Export des données vers {self.output_file}")
        
        try:
            with open(self.output_file, 'w', encoding='utf-8') as f:
                json.dump(departments_data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"Export réussi: {len(departments_data)} départements sauvegardés")
            
        except Exception as e:
            logger.error(f"Erreur lors de l'export: {e}")
            raise
    
    def cleanup_temp_files(self, temp_file: str) -> None:
        """Nettoie les fichiers temporaires"""
        try:
            if os.path.exists(temp_file):
                os.remove(temp_file)
                logger.info(f"Fichier temporaire {temp_file} supprimé")
        except Exception as e:
            logger.warning(f"Impossible de supprimer le fichier temporaire: {e}")
    
    def run(self) -> None:
        """Exécute le processus complet de scraping et conversion"""
        temp_file = None
        
        try:
            # 1. Télécharger le fichier GeoJSON
            temp_file = self.download_geojson()
            
            # 2. Charger les données géographiques
            gdf = self.load_geodata(temp_file)
            
            # 3. Traiter les départements
            departments_data = self.process_departments(gdf)
            
            # 4. Vérifier qu'il n'y a pas de doublons
            codes = [dept['numero'] for dept in departments_data]
            if len(codes) != len(set(codes)):
                logger.error("Des doublons de codes INSEE ont été détectés!")
                return
            
            # 5. Exporter les résultats
            self.export_to_json(departments_data)
            
            logger.info("Processus terminé avec succès!")
            
        except Exception as e:
            logger.error(f"Erreur durant l'exécution: {e}")
            raise
            
        finally:
            # Nettoyer les fichiers temporaires
            if temp_file:
                self.cleanup_temp_files(temp_file)

def main():
    """Fonction principale"""
    scraper = DepartmentScraper()
    scraper.run()

if __name__ == "__main__":
    main()
