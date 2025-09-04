import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const count = await prisma.project.count();
  if (count > 0) {
    console.log(`Seed skipped: ${count} project(s) already exist.`);
    return;
  }

  await prisma.project.createMany({
    data: [
      { name: 'Alpha', status: 'active' },
      { name: 'Beta', status: 'paused' },
      { name: 'Gamma', status: 'completed' }
    ]
  });

  const projects = await prisma.project.findMany();
  console.log('Seeded projects:', projects);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

