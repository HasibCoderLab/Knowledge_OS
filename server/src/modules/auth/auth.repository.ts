import { prisma } from '../../app/config/database.js';
import type { RegisterInput } from './auth.validation.js';

export const authRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  },

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async create(data: RegisterInput) {
    return prisma.user.create({ data });
  },

  async updateRefreshToken(id: string, refreshToken: string | null) {
    return prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  },

  async updateProfile(id: string, data: Record<string, unknown>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
};
