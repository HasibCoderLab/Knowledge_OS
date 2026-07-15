import { prisma } from '../../app/config/database.js';
import type { CreateActivityInput, ActivitiesQuery } from './activities.validation.js';

export const activitiesRepository = {
  async create(userId: string, data: CreateActivityInput) {
    return prisma.activity.create({
      data: {
        userId,
        type: data.type,
        action: data.action,
        entityId: data.entityId ?? null,
        entityType: data.entityType ?? null,
        metadata: data.metadata ?? undefined,
      },
    });
  },

  async findByUser(userId: string, query: ActivitiesQuery) {
    const { page, limit, type, action, entityType, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (type) where.type = type;
    if (action) where.action = action;
    if (entityType) where.entityType = entityType;

    const [data, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.activity.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async findRecentByUser(userId: string, limit: number = 20) {
    return prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },
};
