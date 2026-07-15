import { prisma } from '../../app/config/database.js';
import type { CreateNotificationInput, NotificationsQuery } from './notifications.validation.js';

export const notificationsRepository = {
  async create(userId: string, data: CreateNotificationInput) {
    return prisma.notification.create({
      data: {
        userId,
        title: data.title,
        message: data.message,
        type: data.type ?? 'info',
      },
    });
  },

  async findByUser(userId: string, query: NotificationsQuery) {
    const { page, limit, type, read, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (type) where.type = type;
    if (read !== undefined) where.read = read;

    const [data, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async findById(id: string) {
    return prisma.notification.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.notification.findFirst({
      where: { id, userId },
    });
  },

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  },

  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  },

  async countUnread(userId: string) {
    return prisma.notification.count({
      where: { userId, read: false },
    });
  },

  async delete(id: string) {
    return prisma.notification.delete({ where: { id } });
  },
};
