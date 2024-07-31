import { PrismaClient } from '@prisma/client';
import * as Jobs from '../../src/jobs/data/generated.json';

const prisma = new PrismaClient();

const uniqueCompniesData = Object.values(
  Jobs.map((job) => {
    return {
      name: job.company.name,
      description: job.company.description,
      contactEmail: job.company.contactEmail,
      contactPhone: job.company.contactPhone,
    };
  }).reduce(
    (acc, current) => {
      acc[current.name] = current;
      return acc;
    },
    {} as {
      [key: string]: {
        name: string;
        description: string;
        contactEmail: string;
        contactPhone: string;
      };
    },
  ),
);

async function main() {
  // Seed data

  const companiesData = await prisma.company.createMany({
    data: uniqueCompniesData,
  });

  console.log(companiesData);
  console.log(Jobs);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
