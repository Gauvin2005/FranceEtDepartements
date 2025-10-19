# Checklist de vérification de l'installation

Cette checklist vous permet de vérifier que tout fonctionne correctement après l'installation.

## ✅ Étape 1 : Installation des dépendances

```bash
npm install
```

**Vérification** : Aucune erreur dans la console, dossier `node_modules/` créé.

---

## ✅ Étape 2 : Configuration de l'environnement

```bash
npm run copy:env:dev
```

**Vérification** : 
- Le fichier `.env.development` existe
- Éditez-le avec vos valeurs réelles

---

## ✅ Étape 3 : Base de données MySQL

### Vérifier que MySQL est démarré

```bash
# Linux
systemctl status mysql

# macOS
brew services list | grep mysql
```

### Créer la base de données

```sql
CREATE DATABASE france_departements CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Générer le client Prisma

```bash
npm run prisma:generate
```

**Vérification** : Message "Generated Prisma Client" affiché.

### Créer les migrations

```bash
npm run prisma:migrate
```

**Vérification** : 
- Plusieurs fichiers dans `prisma/migrations/`
- Message de succès dans la console
- Tables créées dans MySQL

### Vérifier les tables créées

```bash
npx prisma studio
```

**Vérification** : 
- Ouvre une interface web sur `http://localhost:5555`
- Vous voyez les tables : User, Session, Department, Card, Game, GamePlayer, OwnedCard, Round, Badge

---

## ✅ Étape 4 : Redis

### Vérifier que Redis est démarré

```bash
redis-cli ping
```

**Réponse attendue** : `PONG`

Si Redis n'est pas installé :

```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis

# macOS
brew install redis
brew services start redis
```

---

## ✅ Étape 5 : Seed de la base de données

```bash
npm run seed
```

**Vérification réussie** :

```
Début du seed...
Chargement de 101 départements...
Seed du département 01 - Ain
  ✓ Département et carte 1 créés/mis à jour
Seed du département 02 - Aisne
  ✓ Département et carte 2 créés/mis à jour
...
Seed du département 976 - Mayotte
  ✓ Département et carte 101 créés/mis à jour

=== RÉCAPITULATIF ===
Total départements: 101
Total cartes: 101
Seed terminé avec succès!
```

### Vérifier dans Prisma Studio

```bash
npx prisma studio
```

**Vérification** :
- Table `Department` : **101 entrées**
- Table `Card` : **101 entrées**
- Chaque département a une carte associée (type "souvenir", value 1000)

---

## ✅ Étape 6 : Blasons des départements

### Créer le dossier

```bash
mkdir -p public/blasons
```

### Ajouter les images

Placez vos images PNG dans `public/blasons/` avec les noms suivants :

```
01.png, 02.png, 03.png, ..., 95.png
2A.png, 2B.png
971.png, 972.png, 973.png, 974.png, 976.png
```

**Note** : Si vous n'avez pas les images, l'application fonctionnera quand même mais les blasons ne s'afficheront pas.

---

## ✅ Étape 7 : Démarrer l'application en développement

```bash
npm run dev
```

**Vérification** :
- Next.js démarre sur `http://localhost:3000`
- Socket.IO server démarre sur `http://localhost:3001`
- Aucune erreur dans la console

### Logs attendus

```
> concurrently "npm run dev:next" "npm run dev:socket"

[0] ready - started server on 0.0.0.0:3000, url: http://localhost:3000
[1] Serveur Socket.IO démarré sur le port 3001
[1] Redis connecté
```

---

## ✅ Étape 8 : Test de l'interface web

### Ouvrir l'application

Accédez à `http://localhost:3000`

**Vérification** :
- ✅ Page d'accueil s'affiche
- ✅ Titre : "La France et ses 101 départements"
- ✅ Boutons "Se connecter" et "S'inscrire" visibles
- ✅ Formulaires "Créer une partie" et "Rejoindre une partie" visibles

---

## ✅ Étape 9 : Test de l'inscription

### S'inscrire

1. Cliquez sur "S'inscrire"
2. Remplissez :
   - Pseudo : `test`
   - Email : `test@example.com`
   - Mot de passe : `password123`
3. Cliquez sur "S'inscrire"

**Vérification** :
- ✅ Message : "Inscription réussie! Vérifiez votre email..."
- ✅ En développement, consultez les logs du serveur pour voir le lien de confirmation

### Confirmer le compte

En développement, si SMTP n'est pas configuré, vous pouvez confirmer manuellement :

```bash
npx prisma studio
```

1. Allez dans la table `User`
2. Trouvez votre utilisateur
3. Changez `isConfirmed` à `true`

**OU** utilisez le lien de confirmation dans les logs :

```
Email de confirmation envoyé à test@example.com
```

---

## ✅ Étape 10 : Test de la connexion

### Se connecter

1. Cliquez sur "Se connecter"
2. Entrez votre pseudo ou email
3. Entrez votre mot de passe
4. Cliquez sur "Connexion"

**Vérification** :
- ✅ Message : "Connexion réussie!"
- ✅ Message : "Bienvenue, test!"
- ✅ Bouton "Déconnexion" visible

---

## ✅ Étape 11 : Test de création de partie

### Créer une partie

1. Sélectionnez le nombre de joueurs (2-6)
2. Cliquez sur "Créer une partie"

**Vérification** :
- ✅ Redirection vers `/game/[CODE]`
- ✅ Code de partie affiché en haut (ex: "Partie: ABC123")
- ✅ Statut : "En attente"
- ✅ Votre nom apparaît dans la liste des joueurs

---

## ✅ Étape 12 : Test avec plusieurs joueurs

### Ouvrir un second navigateur (ou onglet incognito)

1. Accédez à `http://localhost:3000`
2. Cliquez sur "Rejoindre une partie"
3. Entrez le code de la partie créée à l'étape 11
4. Entrez un pseudo (ex: "joueur2")
5. Cliquez sur "Rejoindre"

**Vérification** :
- ✅ Le second joueur rejoint la partie
- ✅ Dans le premier navigateur, "joueur2" apparaît dans la liste
- ✅ Compteur : "2 / 4 joueurs" (ou selon votre config)

---

## ✅ Étape 13 : Test du jeu

### Démarrer la partie

Dans le navigateur du créateur de la partie :

1. Cliquez sur "Démarrer la partie"

**Vérification** :
- ✅ Statut passe de "En attente" à "En cours"
- ✅ Message : "Votre tour!" ou "Tour de [joueur]"
- ✅ Bouton "Lancer les dés" visible pour le joueur actif

### Lancer les dés

1. Cliquez sur "Lancer les dés"

**Vérification** :
- ✅ Animation des dés
- ✅ 3 dés affichés : D10, D10, D6
- ✅ Valeurs aléatoires affichées (0-10, 0-10, 1-6)
- ✅ Liste des "Compositions possibles" apparaît en dessous

### Sélectionner une composition

1. Cliquez sur l'un des nombres proposés (ex: "35")

**Vérification** :
- ✅ Message : "Département sélectionné"
- ✅ Informations du département affichées (numéro, nom, préfecture)
- ✅ Bouton "Confirmer le choix" visible

### Utiliser des indices (optionnel)

1. Panel "Indices" apparaît
2. Cliquez sur "Indice 1", "Indice 2", ou "Indice 3" pour les révéler

**Vérification** :
- ✅ Texte de l'indice s'affiche
- ✅ Couleur du panneau change (bleu)

### Confirmer le choix

1. Cliquez sur "Confirmer le choix"

**Vérification** :
- ✅ Points ajoutés au joueur
- ✅ Argent du joueur mis à jour
- ✅ Position du joueur incrémentée
- ✅ Carte ajoutée à la collection du joueur
- ✅ Tour passe au joueur suivant

---

## ✅ Étape 14 : Vérification de la sauvegarde

### Sauvegarder la partie

1. Cliquez sur le bouton "Sauvegarder"

**Vérification** :
- ✅ Message : "Partie sauvegardée"
- ✅ Statut passe à "paused"

---

## ✅ Étape 15 : Vérification des WebSockets

### Console développeur

Ouvrez la console du navigateur (F12 → Console)

**Vérification** :
- ✅ Message : "Socket connecté"
- ✅ Aucune erreur de connexion WebSocket
- ✅ Les événements temps réel fonctionnent (dés, compositions, tours)

---

## ✅ Étape 16 : Vérification finale

### Checklist complète

- [x] MySQL installé et base créée
- [x] Redis installé et démarré
- [x] Prisma : migrations et seed réussis
- [x] 101 départements dans la base
- [x] 101 cartes dans la base
- [x] Next.js démarre correctement
- [x] Socket.IO démarre correctement
- [x] Inscription fonctionne
- [x] Connexion fonctionne
- [x] Création de partie fonctionne
- [x] Rejoindre une partie fonctionne
- [x] Lancer les dés fonctionne
- [x] Compositions calculées correctement
- [x] Sélection de département fonctionne
- [x] Indices révélables
- [x] Score et argent mis à jour
- [x] Passage de tour fonctionne
- [x] Sauvegarde fonctionne
- [x] WebSockets temps réel opérationnels

---

## 🎉 Félicitations!

Si toutes les étapes sont validées, votre installation est complète et fonctionnelle.

## ❌ Troubleshooting

### Si le seed échoue

```bash
# Reset complet
npx prisma migrate reset
npm run prisma:migrate
npm run seed
```

### Si Redis ne fonctionne pas

```bash
# Vérifier le statut
systemctl status redis  # Linux
brew services list       # macOS

# Redémarrer Redis
sudo systemctl restart redis   # Linux
brew services restart redis    # macOS
```

### Si Socket.IO ne se connecte pas

- Vérifiez que le port 3001 n'est pas utilisé
- Vérifiez `NEXT_PUBLIC_SOCKET_URL` dans `.env.development`
- Consultez les logs du serveur

### Si les images de blasons ne s'affichent pas

- Vérifiez que les fichiers sont bien dans `public/blasons/`
- Vérifiez les noms : `01.png`, `02.png`, etc. (pas de majuscules)
- Redémarrez le serveur Next.js

---

Pour toute autre question, consultez le README.md ou ouvrez une issue sur GitHub.

