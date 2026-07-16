import { prisma } from '../../app/config/database.js';
import type { UpdateProfileInput } from './users.validation.js';

export const usersRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
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
    if (data.website !== undefined) updateData.website = data.website;
    if (data.github !== undefined) updateData.github = data.github;
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin;
    if (data.twitter !== undefined) updateData.twitter = data.twitter;

    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  },

  async updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  },

  async clearData(id: string) {
    await prisma.$transaction([
      prisma.book.deleteMany({ where: { userId: id } }),
      prisma.readingSession.deleteMany({ where: { userId: id } }),
      prisma.journalEntry.deleteMany({ where: { userId: id } }),
      prisma.goal.deleteMany({ where: { userId: id } }),
      prisma.task.deleteMany({ where: { userId: id } }),
      prisma.habit.deleteMany({ where: { userId: id } }),
      prisma.calendarEvent.deleteMany({ where: { userId: id } }),
      prisma.notification.deleteMany({ where: { userId: id } }),
      prisma.activity.deleteMany({ where: { userId: id } }),
      prisma.analyticsSnapshot.deleteMany({ where: { userId: id } }),
      prisma.note.deleteMany({ where: { userId: id } }),
      prisma.userSettings.deleteMany({ where: { userId: id } }),
    ]);
  },

  async deleteAccount(id: string) {
    await this.clearData(id);
    return prisma.user.delete({ where: { id } });
  },
};
