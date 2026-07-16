import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/token.js';
import { ConflictError, UnauthorizedError } from '../../shared/errors.js';
import { env } from '../../app/config/environment.js';
import type { RegisterInput, LoginInput } from './auth.validation.js';
import type { AuthResponse, UserResponse } from './auth.types.js';

function toUserResponse(user: { id: string; name: string; username?: string | null; email: string; avatar: string | null; bio: string | null; location: string | null; theme: string; language: string; createdAt: Date }): UserResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username ?? null,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    location: user.location,
    theme: user.theme,
    language: user.language,
    createdAt: user.createdAt,
  };
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictError('User with this email already exists');
    }

    if (input.username) {
      const existingUsername = await authRepository.findByUsername(input.username.toLowerCase());
      if (existingUsername) {
        throw new ConflictError('Username is already taken');
      }
    }

    const hashedPassword = await bcrypt.hash(input.password, env.bcryptSaltRounds);

    const user = await authRepository.create({
      name: input.name,
      username: input.username ? input.username.toLowerCase() : undefined,
      email: input.email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await authRepository.updateRefreshToken(user.id, refreshToken);

    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await authRepository.updateRefreshToken(user.id, refreshToken);

    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken: string): Promise<AuthResponse> {
    let decoded: { userId: string };
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await authRepository.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await authRepository.updateRefreshToken(user.id, newRefreshToken);

    return {
      user: toUserResponse(user),
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(userId: string): Promise<void> {
    await authRepository.updateRefreshToken(userId, null);
  },

  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    return toUserResponse(user);
  },
};
