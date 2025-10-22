#!/usr/bin/env python3
"""
Script pour convertir le fichier JSON généré en format TypeScript compatible
avec l'interface DepartmentPath existante
"""

import json
import os
from typing import List, Dict, Any

def convert_to_typescript_format(json_file: str, output_file: str) -> None:
    """Convertit le JSON en format TypeScript compatible"""
    
    # Charger les données JSON
    with open(json_file, 'r', encoding='utf-8') as f:
        departments_data = json.load(f)
    
    # Générer le contenu TypeScript
    ts_content = """export interface DepartmentPath {
  num: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  scale?: number;
}

// Formes SVG des départements français générées automatiquement
// Coordonnées basées sur les données GeoJSON officielles
export const departmentsPaths: DepartmentPath[] = [
"""
    
    for dept in departments_data:
        # Convertir les coordonnées en path SVG
        coords = dept['coords']
        if len(coords) < 3:
            continue
            
        # Créer le path SVG
        path_parts = []
        for i, coord in enumerate(coords):
            x, y = coord
            if i == 0:
                path_parts.append(f"M {x},{y}")
            else:
                path_parts.append(f"L {x},{y}")
        
        # Fermer le path
        path_parts.append("Z")
        path_string = " ".join(path_parts)
        
        # Ajouter l'entrée TypeScript
        ts_content += f"""  {{ 
    num: "{dept['numero']}", 
    name: "{dept['name']}", 
    path: "{path_string}", 
    labelX: {dept['labelX']}, 
    labelY: {dept['labelY']}, 
    scale: {dept['scale']} 
  }},
"""
    
    ts_content += "];\n"
    
    # Sauvegarder le fichier TypeScript
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Fichier TypeScript généré: {output_file}")
    print(f"Nombre de départements convertis: {len(departments_data)}")

def main():
    """Fonction principale"""
    json_file = "departments_paths.json"
    output_file = "../data/departmentsPathsRealistic.ts"
    
    if not os.path.exists(json_file):
        print(f"Erreur: Le fichier {json_file} n'existe pas")
        print("Exécutez d'abord scrape_departments.py")
        return
    
    convert_to_typescript_format(json_file, output_file)

if __name__ == "__main__":
    main()
