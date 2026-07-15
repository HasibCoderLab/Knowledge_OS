import jwt from 'jsonwebtoken';
import { env } from '../app/config/environment.js';

interface TokenPayload {
  userId: string;
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId } satisfies TokenPayload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  } as jwt.SignOptions);
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId } satisfies TokenPayload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtSecret) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtRefreshSecret) as TokenPayload;
}
