import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface Environment {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;
  corsOrigin: string;
  cookieSecret: string;
  bcryptSaltRounds: number;
  rateLimitWindow: number;
  rateLimitMax: number;
}

function validateEnv(): Environment {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    cookieSecret: process.env.COOKIE_SECRET || 'cookie_secret_key',
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  };
}

export const env = validateEnv();
