const fs = require('fs');
const path = require('path');

const environment = process.argv[2] || 'development';

const sourceFile = path.join(__dirname, '..', 'env.example');
const targetFile = path.join(__dirname, '..', `.env.${environment}`);

if (!fs.existsSync(sourceFile)) {
  console.error(`Le fichier source ${sourceFile} n'existe pas.`);
  process.exit(1);
}

fs.copyFileSync(sourceFile, targetFile);
console.log(`Fichier .env.${environment} créé avec succès depuis env.example`);
console.log(`N'oubliez pas de modifier les valeurs dans .env.${environment} selon votre environnement.`);

