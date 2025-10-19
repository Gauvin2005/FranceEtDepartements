# La France et ses 101 départements

Jeu de plateau en ligne éducatif et ludique permettant de découvrir les départements français à travers un système de dés, de compositions numériques et de collection de cartes.

## Architecture du projet

### Stack technique

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui, framer-motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Backend API**: Next.js API Routes
- **Temps réel**: Socket.IO (serveur Node/Express dédié)
- **Base de données**: MySQL avec Prisma ORM
- **Cache**: Redis
- **Authentication**: JWT (access + refresh tokens)
- **Email**: SMTP avec Nodemailer

### Structure du monorepo

```
/
├── components/           # Composants React réutilisables
│   ├── ui/              # Composants UI de base (shadcn)
│   ├── Dice.tsx         # Affichage et animation des dés
│   ├── CompositionsList.tsx
│   ├── DepartmentCard.tsx
│   ├── PlayersPanel.tsx
│   └── IndicesPanel.tsx
├── pages/
│   ├── api/             # API Routes Next.js
│   │   ├── auth/        # Authentification
│   │   ├── games/       # Gestion des parties
│   │   └── departments/ # Endpoints départements
│   ├── game/[code].tsx  # Page de jeu dynamique
│   └── index.tsx        # Page d'accueil/lobby
├── socket-server/       # Serveur Socket.IO séparé
│   ├── index.ts         # Point d'entrée du serveur temps réel
│   └── tsconfig.json    # Config TypeScript du serveur
├── lib/                 # Utilitaires et logique métier
│   ├── prisma.ts        # Client Prisma
│   ├── redis.ts         # Client Redis
│   ├── jwt.ts           # Gestion des tokens JWT
│   ├── email.ts         # Envoi d'emails
│   ├── gameEngine.ts    # Logique du jeu (dés, compositions, scores)
│   └── utils.ts         # Utilitaires divers
├── hooks/               # Hooks React personnalisés
│   ├── useSocket.ts     # Hook pour Socket.IO
│   └── useAuth.ts       # Hook d'authentification
├── stores/              # Stores Zustand
│   ├── authStore.ts     # État d'authentification
│   └── gameStore.ts     # État du jeu
├── types/               # Types TypeScript
│   └── index.ts
├── data/                # Données statiques
│   └── departments.json # Les 101 départements avec indices
├── public/
│   └── blasons/         # Images des blasons (à ajouter)
├── prisma/
│   ├── schema.prisma    # Schéma de base de données
│   └── seed.ts          # Script de seed
├── styles/
│   └── globals.css      # Styles globaux TailwindCSS
└── scripts/
    └── copy-env.js      # Script de copie des variables d'environnement
```

## Installation et configuration

### Prérequis

- Node.js 18+ et npm
- MySQL 8+
- Redis 6+
- SMTP (pour l'envoi d'emails)

### Étape 1: Cloner et installer les dépendances

```bash
cd FranceEtDepartements
npm install
```

### Étape 2: Configuration des variables d'environnement

Créez un fichier `.env.development` à partir du template :

```bash
npm run copy:env:dev
```

Puis éditez `.env.development` avec vos valeurs :

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/france_departements"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT Secrets (à changer en production!)
JWT_SECRET="votre-secret-jwt-tres-securise"
JWT_REFRESH_SECRET="votre-secret-refresh-jwt-tres-securise"

# SMTP Configuration
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="no-reply@departements-de-france.fr"
SMTP_PASS="votre-mot-de-passe-smtp"
SMTP_FROM="no-reply@departements-de-france.fr"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"

# Socket.IO Server
SOCKET_PORT="3001"

# Node Environment
NODE_ENV="development"
```

### Étape 3: Préparer la base de données

```bash
# Générer le client Prisma
npm run prisma:generate

# Créer les migrations
npm run prisma:migrate

# Seeder les 101 départements + cartes
npm run seed
```

Le seed va lire le fichier `data/departments.json` et créer :
- 101 départements dans la table `Department`
- 101 cartes "Souvenir" correspondantes dans la table `Card`

### Étape 4: Ajouter les images des blasons

Placez les images des blasons dans le dossier `public/blasons/` avec la nomenclature suivante :

```
public/blasons/
  ├── 01.png      # Ain
  ├── 02.png      # Aisne
  ├── ...
  ├── 2A.png      # Corse-du-Sud
  ├── 2B.png      # Haute-Corse
  ├── ...
  ├── 971.png     # Guadeloupe
  ├── 972.png     # Martinique
  ├── 973.png     # Guyane
  ├── 974.png     # La Réunion
  └── 976.png     # Mayotte
```

**Important** : Les fichiers doivent être nommés exactement comme le numéro du département (01, 02, 2A, 2B, 971, etc.) avec l'extension `.png`.

### Étape 5: Démarrer en développement

Démarrez simultanément Next.js et le serveur Socket.IO :

```bash
npm run dev
```

Cela lance :
- Next.js sur `http://localhost:3000`
- Socket.IO server sur `http://localhost:3001`

## Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre Next.js et Socket.IO en mode dev |
| `npm run dev:next` | Démarre uniquement Next.js |
| `npm run dev:socket` | Démarre uniquement le serveur Socket.IO |
| `npm run build` | Build Next.js et Socket.IO pour production |
| `npm run start` | Démarre en production (après build) |
| `npm run prisma:generate` | Génère le client Prisma |
| `npm run prisma:migrate` | Crée et applique les migrations |
| `npm run prisma:migrate:deploy` | Applique les migrations en prod |
| `npm run seed` | Seed la base avec les 101 départements |
| `npm run copy:env:dev` | Copie env.example vers .env.development |
| `npm run copy:env:prod` | Copie env.example vers .env.production |
| `npm run lint` | Linter Next.js |
| `npm run type-check` | Vérification TypeScript |

## Vérification de l'installation

### 1. Vérifier le seed des départements

```bash
npm run seed
```

Vous devriez voir :

```
Début du seed...
Chargement de 101 départements...
Seed du département 01 - Ain
  ✓ Département et carte 1 créés/mis à jour
...
=== RÉCAPITULATIF ===
Total départements: 101
Total cartes: 101
Seed terminé avec succès!
```

### 2. Vérifier la connexion à la base de données

Ouvrez Prisma Studio pour explorer les données :

```bash
npx prisma studio
```

### 3. Vérifier que Redis fonctionne

```bash
redis-cli ping
# Devrait répondre: PONG
```

### 4. Tester l'application

1. Ouvrez `http://localhost:3000`
2. Inscrivez-vous avec un email et un pseudo
3. Vérifiez votre email pour confirmer le compte (ou consultez les logs du serveur en dev)
4. Créez une partie
5. Invitez un autre joueur avec le code de partie
6. Lancez la partie et jouez!

## Règles du jeu

### Objectif

Collecter des cartes "Souvenir" en identifiant correctement les départements français à partir de compositions numériques obtenues avec des dés.

### Déroulement

1. **Lancer les dés** : Le joueur actif lance 2 dés D10 (0-10) et 1 dé D6 (1-6).

2. **Composer un nombre** : Utiliser les valeurs des dés pour créer un nombre entre 1 et 101 :
   - Juxtaposition : placer les chiffres côte à côte (ex: 3 et 5 = 35 ou 53)
   - Addition : additionner les valeurs (ex: 3 + 5 = 8)
   - Combinaisons des trois dés possibles

3. **Choisir une composition** : Sélectionner parmi la liste des compositions valides.

4. **Utiliser des indices** (optionnel) : Révéler jusqu'à 3 indices sur le département.
   - 0 indice utilisé = 1000 points
   - 1 indice utilisé = 500 points
   - 2 indices utilisés = 250 points
   - 3 indices utilisés = 100 points

5. **Bonus préfecture** : +500 points si la préfecture est identifiée correctement.

6. **Pénalité** : -500 points en cas de mauvaise réponse.

7. **Recevoir la carte** : En cas de bonne réponse, le joueur reçoit la carte Souvenir.

### Collection et cartes Champion

- Tous les 10 Souvenirs collectés (10, 20, 30...), une carte **Champion** est créée (valeur: 5000€).
- Les joueurs peuvent **revendre 2 Souvenirs** pour 1000€ à la banque.

### Élimination

Un joueur est éliminé si :
- Son argent tombe en dessous de 0€
- **ET** il ne possède pas au moins 2 cartes Souvenir vendables

### Fin de partie

La partie se termine quand :
- Il ne reste qu'un seul joueur non éliminé (gagnant)
- Le nombre de tours maximum est atteint (optionnel)

## Déploiement en production

### Option 1 : VPS OVH (recommandé)

#### Prérequis sur le serveur

- Ubuntu 22.04 LTS
- Node.js 18+
- MySQL 8+
- Redis 6+
- Nginx (reverse proxy)
- PM2 (gestionnaire de processus)

#### Étapes de déploiement

1. **Cloner le dépôt sur le serveur**

```bash
git clone <votre-repo> /var/www/france-departements
cd /var/www/france-departements
```

2. **Installer les dépendances**

```bash
npm install --production
```

3. **Configurer l'environnement de production**

```bash
npm run copy:env:prod
# Éditer .env.production avec les valeurs de production
nano .env.production
```

4. **Build l'application**

```bash
npm run build
```

5. **Appliquer les migrations**

```bash
npm run prisma:migrate:deploy
```

6. **Seed la base**

```bash
npm run seed
```

7. **Configurer PM2**

Créez un fichier `ecosystem.config.js` :

```javascript
module.exports = {
  apps: [
    {
      name: 'france-departements-next',
      script: 'npm',
      args: 'run start:next',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'france-departements-socket',
      script: 'npm',
      args: 'run start:socket',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

Démarrez avec PM2 :

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

8. **Configurer Nginx**

Créez `/etc/nginx/sites-available/france-departements` :

```nginx
server {
    listen 80;
    server_name votre-domaine.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

Activez le site :

```bash
ln -s /etc/nginx/sites-available/france-departements /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

9. **SSL avec Let's Encrypt**

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d votre-domaine.fr
```

### Option 2 : Vercel (Frontend uniquement)

**Note** : Vercel ne supporte pas les WebSockets persistants. Il faudra héberger le serveur Socket.IO séparément (VPS, Heroku, Railway, etc.).

1. **Deploy Next.js sur Vercel**

```bash
vercel deploy --prod
```

2. **Variables d'environnement Vercel**

Ajoutez toutes les variables de `env.example` dans les settings Vercel, notamment :
- `DATABASE_URL`
- `REDIS_URL`
- `NEXT_PUBLIC_SOCKET_URL` (pointant vers votre serveur Socket.IO externe)
- `JWT_SECRET` / `JWT_REFRESH_SECRET`
- Paramètres SMTP

3. **Serveur Socket.IO séparé**

Hébergez `socket-server/` sur un VPS ou service cloud avec support WebSocket.

## Maintenance et monitoring

### Logs

- **Next.js** : `pm2 logs france-departements-next`
- **Socket.IO** : `pm2 logs france-departements-socket`

### Redémarrage

```bash
pm2 restart all
```

### Backups

Automatisez les backups MySQL et Redis :

```bash
# Backup MySQL
mysqldump -u user -p france_departements > backup_$(date +%Y%m%d).sql

# Backup Redis
redis-cli BGSAVE
```

## Troubleshooting

### Le seed échoue

- Vérifiez que `data/departments.json` existe et est valide.
- Vérifiez la connexion à la base de données (`DATABASE_URL`).
- Supprimez les données existantes : `npx prisma migrate reset`

### Les WebSockets ne fonctionnent pas

- Vérifiez que le serveur Socket.IO tourne sur le port configuré.
- Vérifiez les CORS dans `socket-server/index.ts`.
- En production, assurez-vous que Nginx forward correctement les WebSockets.

### Redis ne se connecte pas

- Vérifiez que Redis est démarré : `systemctl status redis`
- Testez la connexion : `redis-cli ping`
- Vérifiez `REDIS_URL` dans `.env`

### Les emails ne sont pas envoyés

- Vérifiez les paramètres SMTP dans `.env`.
- Testez avec un service comme Mailtrap en développement.
- Consultez les logs du serveur pour les erreurs d'envoi.

## Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT.

## Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Bon jeu et bonne découverte des départements français!**

