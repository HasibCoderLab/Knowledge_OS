import { prisma } from '../../app/config/database.js';
import type { UpdateProfileInput } from './users.validation.js';

export const usersRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdateProfileInput) {
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.username !== undefined) updateData.username = data.username.toLowerCase();
    if (data.avatar !== undefined) updateData.avatar = data.avatar;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.theme !== undefined) updateData.theme = data.theme;
    if (data.language !== undefined) updateData.language = data.language;

    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  },
};
