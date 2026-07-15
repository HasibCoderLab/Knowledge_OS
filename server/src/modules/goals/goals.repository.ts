import { prisma } from '../../app/config/database.js';
import type { CreateGoalInput, UpdateGoalInput, GoalsQuery } from './goals.validation.js';

export const goalsRepository = {
  async create(userId: string, data: CreateGoalInput) {
    return prisma.goal.create({
      data: {
        userId,
        title: data.title,
        description: data.description ?? null,
        type: data.category ?? 'general',
        deadline: data.targetDate ? new Date(data.targetDate) : null,
        targetValue: data.targetValue,
        currentValue: data.currentValue,
        progress: Math.round((data.currentValue / data.targetValue) * 100),
        status: data.status ?? 'NOT_STARTED',
        priority: data.priority ?? 'medium',
      },
    });
  },

  async findById(id: string) {
    return prisma.goal.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.goal.findFirst({
      where: { id, userId },
    });
  },

  async findByUser(userId: string, query: GoalsQuery) {
    const { page, limit, search, status, priority, category, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (search) where.title = { contains: search };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.type = category;

    let orderBy: Record<string, string>;
    if (sortBy === 'targetDate') {
      orderBy = { deadline: sortOrder };
    } else if (sortBy === 'progressPercentage') {
      orderBy = { progress: sortOrder };
    } else {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, total] = await Promise.all([
      prisma.goal.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.goal.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async update(id: string, data: UpdateGoalInput) {
    const existing = await prisma.goal.findUnique({ where: { id } });
    if (!existing) return null;

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.type = data.category;
    if (data.targetDate !== undefined) updateData.deadline = data.targetDate ? new Date(data.targetDate) : null;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.status !== undefined) updateData.status = data.status;

    if (data.targetValue !== undefined) updateData.targetValue = data.targetValue;
    if (data.currentValue !== undefined) updateData.currentValue = data.currentValue;

    const finalTarget = data.targetValue ?? existing.targetValue;
    const finalCurrent = data.currentValue ?? existing.currentValue;
    if (data.targetValue !== undefined || data.currentValue !== undefined) {
      updateData.progress = Math.round((finalCurrent / finalTarget) * 100);
    }

    return prisma.goal.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.goal.delete({ where: { id } });
  },
};
