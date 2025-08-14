import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// * Seed a curated list ONCE (no hardcoding inside routes).
const seedCompanies = [
  { name: "Apple Inc.", symbol: "AAPL", order: 1 },
  { name: "Microsoft Corporation", symbol: "MSFT", order: 2 },
  { name: "Alphabet Inc. (Class A)", symbol: "GOOGL", order: 3 },
  { name: "Amazon.com, Inc.", symbol: "AMZN", order: 4 },
  { name: "Tesla, Inc.", symbol: "TSLA", order: 5 },
  { name: "Meta Platforms, Inc.", symbol: "META", order: 6 },
  { name: "NVIDIA Corporation", symbol: "NVDA", order: 7 },
  { name: "Netflix, Inc.", symbol: "NFLX", order: 8 },
  { name: "Adobe Inc.", symbol: "ADBE", order: 9 },
  { name: "Intel Corporation", symbol: "INTC", order: 10 },
  { name: "Cisco Systems, Inc.", symbol: "CSCO", order: 11 },
  { name: "Oracle Corporation", symbol: "ORCL", order: 12 }
];

async function main() {
  for (const c of seedCompanies) {
    await prisma.company.upsert({
      where: { symbol: c.symbol },
      update: { name: c.name, order: c.order },
      create: { name: c.name, symbol: c.symbol, order: c.order }
    });
  }
  console.log("Seeded companies.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
