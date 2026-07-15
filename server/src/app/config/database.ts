import { PrismaClient } from '@prisma/client';
import { env } from './environment.js';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: env.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (env.nodeEnv !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('[Database] Connected successfully');
  } catch (error) {
    console.error('[Database] Connection failed:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  console.log('[Database] Disconnected');
}
