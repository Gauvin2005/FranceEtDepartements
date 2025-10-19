# Architecture du projet - La France et ses 101 départements

## Vue d'ensemble

Ce projet est une application web de jeu en temps réel construite avec Next.js, Socket.IO, Prisma et Redis. L'architecture est divisée en trois couches principales :

1. **Frontend (Next.js)** : Interface utilisateur, gestion de l'état côté client
2. **Backend API (Next.js API Routes)** : Authentification, gestion des données
3. **Backend Temps Réel (Socket.IO Server)** : Logique du jeu, communication temps réel

---

## Stack technique détaillée

### Frontend
- **Framework** : Next.js 14 (Pages Router)
- **Langage** : TypeScript
- **Styling** : TailwindCSS + shadcn/ui
- **Animations** : Framer Motion
- **State Management** : Zustand (avec persist middleware)
- **Data Fetching** : TanStack React Query
- **WebSocket Client** : Socket.IO Client

### Backend
- **API** : Next.js API Routes
- **Temps réel** : Socket.IO Server (Express)
- **ORM** : Prisma
- **Base de données** : MySQL 8+
- **Cache/Session** : Redis
- **Auth** : JWT (access + refresh tokens)
- **Email** : Nodemailer (SMTP)
- **Hashing** : bcryptjs

---

## Architecture des données

### Base de données MySQL (Prisma)

```
User (utilisateurs)
  ├─ sessions (1:n)
  ├─ gamesPlayed (1:n via GamePlayer)
  └─ badges (1:n)

Department (départements)
  └─ card (1:1)

Card (cartes de jeu)
  ├─ department (1:1)
  └─ ownedCards (1:n)

Game (parties)
  ├─ players (1:n GamePlayer)
  └─ rounds (1:n historique)

GamePlayer (joueur dans une partie)
  ├─ user (n:1)
  ├─ game (n:1)
  ├─ ownedCards (1:n)
  └─ rounds (1:n)

OwnedCard (carte possédée par joueur)
  ├─ gamePlayer (n:1)
  └─ card (n:1)

Round (historique des tours)
  ├─ game (n:1)
  └─ player (n:1 GamePlayer)

Badge (achievements)
  └─ user (n:1)
```

### Cache Redis

**Structure des clés** :

```
game:{code}:state         → État complet de la partie (GameState)
user:{userId}:session     → Session utilisateur
socket:{socketId}:meta    → Métadonnées socket
```

**TTL** :
- Game state : 24h
- User session : 7j
- Socket meta : 1h

---

## Flow d'authentification

### 1. Inscription

```
Client → POST /api/auth/register
  ├─ Validation (Zod)
  ├─ Hash password (bcrypt)
  ├─ INSERT User (isConfirmed=false)
  ├─ Génération token confirmation (JWT)
  ├─ Envoi email (Nodemailer)
  └─ Response 201
```

### 2. Confirmation email

```
User clique lien → GET /api/auth/confirm?token=xxx
  ├─ Vérification token (JWT)
  ├─ UPDATE User (isConfirmed=true)
  └─ Redirect vers homepage
```

### 3. Connexion

```
Client → POST /api/auth/login
  ├─ Recherche User (pseudo ou email)
  ├─ Vérif password (bcrypt.compare)
  ├─ Vérif isConfirmed
  ├─ Génération access + refresh tokens (JWT)
  ├─ INSERT Session
  ├─ SET Redis user session
  └─ Response 200 {user, accessToken, refreshToken}
```

### 4. Refresh token

```
Client → POST /api/auth/refresh {refreshToken}
  ├─ Vérification refresh token (JWT)
  ├─ Recherche Session en DB
  ├─ Génération nouveau access token
  └─ Response 200 {accessToken}
```

---

## Flow de création et jointure de partie

### 1. Création de partie

```
Client → POST /api/games/create {maxPlayers, maxTurns?, timeLimitSec?}
  ├─ Vérif auth (JWT access token)
  ├─ Génération code partie (6 chars)
  ├─ INSERT Game (status=lobby)
  ├─ INSERT GamePlayer (créateur, playerOrder=0)
  ├─ Récup toutes les cartes Souvenir disponibles
  ├─ Création GameState initial
  ├─ SET Redis game state
  └─ Response 201 {game}
```

### 2. Rejoindre une partie (via WebSocket)

```
Client → Socket.emit('game:join', {code, pseudo, token?})
  ├─ Récup game state (Redis ou DB)
  ├─ Si status=lobby ET places disponibles
  │   ├─ INSERT GamePlayer
  │   ├─ UPDATE game state
  │   ├─ SET Redis
  │   └─ Broadcast 'game:player:joined'
  ├─ Sinon → mode spectateur
  └─ Socket.emit('game:state:update', gameState)
```

---

## Flow de jeu (déroulement d'un tour)

### 1. Démarrage de la partie

```
Host → Socket.emit('game:start', {code})
  ├─ Vérif nb joueurs >= 2
  ├─ UPDATE Game (status=running)
  ├─ UPDATE game state
  ├─ SET Redis
  ├─ Broadcast 'game:state:update'
  └─ Broadcast 'game:turn:started' (playerId du premier joueur)
```

### 2. Lancer les dés

```
Joueur actif → Socket.emit('game:roll:dice', {code})
  ├─ gameEngine.rollDice()
  │   ├─ d10a = random(0-10)
  │   ├─ d10b = random(0-10)
  │   └─ d6 = random(1-6)
  ├─ gameEngine.calculateCompositions(dice)
  │   ├─ Juxtapositions possibles
  │   ├─ Additions possibles
  │   └─ Filtre 1-101 unique
  ├─ UPDATE game state (currentTurn.diceRoll, compositions)
  ├─ SET Redis
  ├─ Broadcast 'game:dice:rolled' {dice}
  └─ Broadcast 'game:compositions:list' {compositions}
```

### 3. Révéler des indices (optionnel)

```
Joueur → Socket.emit('game:use:index', {code, indexNumber})
  ├─ Vérif 0 <= indexNumber <= 2
  ├─ Vérif indice pas déjà révélé
  ├─ UPDATE game state (indicesRevealed)
  ├─ SET Redis
  └─ Broadcast 'game:indices:reveal' {indexNumber, indicesRevealed}
```

### 4. Choisir une composition

```
Joueur → Socket.emit('game:choose:composition', {code, compositionValue})
  ├─ Vérif carte disponible (availableCards)
  ├─ Recherche Card par cardNumber
  ├─ gameEngine.calculateScore(indicesUsed, isPrefecture, true)
  │   ├─ 0 indice = 1000pts
  │   ├─ 1 indice = 500pts
  │   ├─ 2 indices = 250pts
  │   ├─ 3 indices = 100pts
  │   └─ Bonus préfecture = +500pts
  ├─ UPDATE GamePlayer (money, position)
  ├─ INSERT OwnedCard
  ├─ INSERT Round (historique)
  ├─ Retrait carte de availableCards
  ├─ Vérif création Champion (10/20/30 souvenirs)
  ├─ Vérif élimination (money < 0 ET < 2 souvenirs)
  ├─ Si éliminé → UPDATE GamePlayer (isEliminated=true)
  ├─ Si partie terminée (1 seul restant)
  │   ├─ UPDATE Game (status=finished)
  │   └─ Broadcast 'game:finished' {winner}
  ├─ Sinon → passage au joueur suivant
  │   ├─ turnIndex = (turnIndex + 1) % players.length
  │   ├─ Skip joueurs éliminés
  │   ├─ UPDATE Game (turnIndex)
  │   └─ Broadcast 'game:turn:started' (nextPlayerId)
  ├─ UPDATE game state
  ├─ SET Redis
  ├─ Broadcast 'game:round:result' {...}
  └─ Broadcast 'game:state:update'
```

### 5. Revendre 2 Souvenirs

```
Joueur → Socket.emit('game:sell:souvenirs', {code, playerId})
  ├─ Vérif >= 2 cartes Souvenir
  ├─ DELETE 2 OwnedCard
  ├─ UPDATE GamePlayer (money += 1000)
  ├─ Ajout 2 cartes à availableCards
  ├─ UPDATE game state
  ├─ SET Redis
  ├─ Broadcast 'game:cards:sold' {...}
  └─ Broadcast 'game:state:update'
```

### 6. Sauvegarder la partie

```
Joueur → Socket.emit('game:save', {code})
  ├─ UPDATE Game (status=paused)
  ├─ UPDATE game state
  ├─ SET Redis
  └─ Broadcast 'game:saved' {message}
```

---

## Logique du moteur de jeu (gameEngine.ts)

### rollDice()

Génère 3 valeurs aléatoires :
- d10a : 0-10
- d10b : 0-10
- d6 : 1-6

### calculateCompositions(dice)

À partir des 3 dés, calcule **toutes** les compositions valides :

1. **Dés seuls** : d10a, d10b, d6 (si != 0 pour D10)
2. **Juxtapositions 2 dés** :
   - d10a + d10b → "35", "53"
   - d10a + d6 → "34", "43"
   - d10b + d6 → "54", "45"
3. **Additions** :
   - d10a + d10b
   - d10a + d6
   - d10b + d6
   - d10a + d10b + d6

**Filtres** :
- Valeur entre 1 et 101
- Pas de doublons

**Retour** : Tableau trié de `{value, formula, description}`

### calculateScore(indicesUsed, isPrefecture, isCorrect)

```typescript
if (!isCorrect) return -500;

basePoints = 
  indicesUsed === 0 ? 1000 :
  indicesUsed === 1 ? 500 :
  indicesUsed === 2 ? 250 :
  indicesUsed === 3 ? 100 : 0;

bonusPoints = isPrefecture ? 500 : 0;
totalPoints = basePoints + bonusPoints;
```

### shouldCreateChampionCard(souvenirCount)

Retourne `true` si `souvenirCount === 10 || === 20 || === 30`

### isPlayerEliminated(money, souvenirCount)

```typescript
if (money >= 0) return false;
if (souvenirCount >= 2) return false; // Peut revendre
return true;
```

---

## Communication temps réel (Socket.IO)

### Événements Server → Client

| Événement | Payload | Description |
|-----------|---------|-------------|
| `game:state:update` | `Partial<GameState>` | Mise à jour de l'état |
| `game:player:joined` | `GamePlayer` | Nouveau joueur |
| `game:player:left` | `playerId: number` | Joueur parti |
| `game:turn:started` | `playerId: number` | Début du tour |
| `game:dice:rolled` | `DiceRoll` | Résultat des dés |
| `game:compositions:list` | `Composition[]` | Compositions possibles |
| `game:indices:reveal` | `{indexNumber, indicesRevealed}` | Indice révélé |
| `game:move:piece` | `{playerId, newPosition}` | Mouvement pion |
| `game:round:result` | `RoundResult` | Résultat du tour |
| `game:finished` | `{winner}` | Partie terminée |
| `game:saved` | `{message}` | Partie sauvegardée |
| `game:cards:sold` | `{playerId, newMoney, cardsReturned}` | Vente de cartes |
| `game:spectator:mode` | `boolean` | Mode spectateur activé |
| `error` | `string` | Erreur |

### Événements Client → Server

| Événement | Payload | Description |
|-----------|---------|-------------|
| `game:join` | `{code, pseudo, token?}` | Rejoindre partie |
| `game:start` | `{code}` | Démarrer partie |
| `game:roll:dice` | `{code}` | Lancer dés |
| `game:use:index` | `{code, indexNumber}` | Révéler indice |
| `game:choose:composition` | `{code, compositionValue}` | Choisir composition |
| `game:save` | `{code}` | Sauvegarder |
| `game:sell:souvenirs` | `{code, playerId}` | Revendre 2 Souvenirs |

---

## Gestion de l'état côté client

### AuthStore (Zustand + persist)

```typescript
{
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
  setUser: (user) => void,
  setTokens: (access, refresh) => void,
  clearAuth: () => void
}
```

Persiste dans `localStorage` sous la clé `auth-storage`.

### GameStore (Zustand)

```typescript
{
  gameState: GameState | null,
  currentDice: DiceRoll | null,
  currentCompositions: Composition[],
  indicesRevealed: number[],
  isSpectator: boolean,
  // ... méthodes
}
```

Non persisté, recréé à chaque connexion Socket.

---

## Sécurité

### JWT
- **Access token** : durée 15min
- **Refresh token** : durée 7j
- Secrets séparés pour access et refresh
- Tokens stockés côté client (localStorage)

### Passwords
- Hashés avec bcrypt (10 rounds)
- Jamais stockés en clair

### API
- Validation des inputs avec Zod
- Vérification des tokens JWT sur endpoints protégés
- Rate limiting recommandé en production

### WebSockets
- Vérification de l'appartenance à la partie
- Validation des actions (tour du joueur, etc.)
- État authoritative côté serveur

---

## Performances et optimisations

### Cache Redis
- State des parties en mémoire (évite DB queries)
- TTL automatique (cleanup)
- Pub/Sub pour scalabilité (si multiple instances)

### Prisma
- Indexes sur colonnes fréquemment utilisées
- Relations optimisées avec `include`
- Connection pooling

### React
- Composants memoized (React.memo)
- Hooks optimisés (useCallback, useMemo)
- Code splitting automatique (Next.js)

### Socket.IO
- Rooms pour isoler les parties
- Broadcast ciblé (pas de messages globaux)
- Reconnection automatique côté client

---

## Déploiement

### Configuration recommandée

**Production** :
- VPS OVH ou équivalent
- PM2 pour process management
- Nginx reverse proxy
- SSL Let's Encrypt
- MySQL master/slave (si haute charge)
- Redis cluster (si haute charge)

**Monitoring** :
- Logs PM2
- Redis monitoring (redis-cli INFO)
- MySQL slow query log
- Sentry pour errors tracking (optionnel)

---

## Évolutions possibles

### Court terme
- Mode solo contre IA
- Replay des parties
- Statistiques joueurs
- Classement global

### Moyen terme
- Tournois
- Système de rangs/leagues
- Customisation avatars
- Chat intégré

### Long terme
- Version mobile (React Native)
- Mode "Régions" et "Communes"
- API publique
- SDK pour extensions communautaires

---

Pour toute question sur l'architecture, consultez le README.md ou ouvrez une issue GitHub.

