import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface DepartmentData {
  id: number;
  numero: string;
  nom: string;
  prefecture: string;
  indices: string[];
  blason: string;
}

async function main() {
  console.log('Début du seed...');

  const departmentsPath = path.join(process.cwd(), 'data', 'departments.json');
  const departmentsData: DepartmentData[] = JSON.parse(
    fs.readFileSync(departmentsPath, 'utf-8')
  );

  console.log(`Chargement de ${departmentsData.length} départements...`);

  for (const dept of departmentsData) {
    console.log(`Seed du département ${dept.numero} - ${dept.nom}`);

    const department = await prisma.department.upsert({
      where: { numero: dept.numero },
      update: {
        nom: dept.nom,
        prefecture: dept.prefecture,
        indices: dept.indices,
        blason: dept.blason,
      },
      create: {
        numero: dept.numero,
        nom: dept.nom,
        prefecture: dept.prefecture,
        indices: dept.indices,
        blason: dept.blason,
      },
    });

    const cardNumber = dept.id;
    
    await prisma.card.upsert({
      where: { cardNumber },
      update: {
        type: 'souvenir',
        value: 1000,
      },
      create: {
        cardNumber,
        departmentId: department.id,
        type: 'souvenir',
        value: 1000,
      },
    });

    console.log(`  ✓ Département et carte ${cardNumber} créés/mis à jour`);
  }

  console.log('\n=== RÉCAPITULATIF ===');
  const departmentCount = await prisma.department.count();
  const cardCount = await prisma.card.count();
  
  console.log(`Total départements: ${departmentCount}`);
  console.log(`Total cartes: ${cardCount}`);
  console.log('Seed terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('Erreur durant le seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

