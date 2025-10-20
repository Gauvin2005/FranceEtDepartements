# FranceMapStyled - Carte Stylisée de la France

## Description

Composant React/Next.js affichant une **carte stylisée cyberpunk** de la France avec :
- **22 anciennes régions** (avant 2016) avec leurs noms
- **96 départements métropolitains** numérotés
- **Corse** (2A, 2B) affichée séparément
- **Île-de-France** zoomée avec ses 8 départements
- **DOM-TOM** (971, 972, 973, 974, 976) dans une zone dédiée

## Style

- Thème **cyberpunk/gaming** avec fond noir
- Couleurs **violet néon** pour les contours
- Effets **glow** et animations fluides
- Grille animée en arrière-plan
- Responsive (adapté mobile)

## Utilisation

```tsx
import { FranceMapStyled } from '@/components/FranceMapStyled';

// Utilisation basique
<FranceMapStyled />

// Avec département recherché et départements gagnés
<FranceMapStyled 
  currentDepartmentNumber="75"
  highlightedDepartments={["01", "13", "69"]}
/>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `currentDepartmentNumber` | `string?` | - | Numéro du département actuellement recherché (highlight cyan) |
| `highlightedDepartments` | `string[]?` | `[]` | Liste des numéros de départements gagnés (highlight vert) |
| `compact` | `boolean?` | `false` | Mode compact (pour usage futur) |

## Couleurs des états

- **Cyan (#06b6d4)** : Département recherché (pulse animé)
- **Vert (#22c55e)** : Départements gagnés
- **Violet (#8b5cf6)** : Départements disponibles
- **Hover** : Glow intensifié sur survol

## Intégration dans le projet

Le composant est déjà intégré dans :
- **`pages/game.tsx`** : Affichage pendant la partie avec highlights
- **`pages/index.tsx`** : Preview sur la page d'accueil

## Animations

- **Fade-in progressif** des régions au chargement
- **Grille animée** en arrière-plan
- **Pulse** sur les départements recherchés
- **Glow** au survol
- **Légende animée** en bas de la carte

## Responsive

- Desktop : Taille complète avec tous les détails
- Tablet : Textes légèrement réduits
- Mobile : Textes minimaux, focus sur les numéros

## Fichiers

- `components/FranceMapStyled.tsx` : Composant React
- `components/FranceMapStyled.module.css` : Styles CSS

