import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
try {
  await p.$connect();
  console.log('Prisma connected OK');
  await p.$disconnect();
} catch (e) {
  console.log('Prisma error:', e.message);
}
