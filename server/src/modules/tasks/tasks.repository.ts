import { prisma } from '../../app/config/database.js';
import type { CreateTaskInput, UpdateTaskInput, TasksQuery } from './tasks.validation.js';

export const tasksRepository = {
  async create(userId: string, data: CreateTaskInput) {
    return prisma.task.create({
      data: {
        userId,
        title: data.title,
        description: data.description ?? null,
        priority: data.priority ?? 'medium',
        status: data.status ?? 'TODO',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        goalId: data.goalId ?? null,
        isCompleted: data.status === 'DONE' ? true : false,
        category: null,
      },
    });
  },

  async findById(id: string) {
    return prisma.task.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  },

  async findByUser(userId: string, query: TasksQuery) {
    const { page, limit, search, status, priority, completed, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (search) where.title = { contains: search };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (completed !== undefined) where.isCompleted = completed;

    const [data, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.task.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async update(id: string, data: UpdateTaskInput) {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    if (data.goalId !== undefined) updateData.goalId = data.goalId;

    if (data.status !== undefined) {
      updateData.status = data.status;
      updateData.isCompleted = data.status === 'DONE' ? true : false;
    }

    return prisma.task.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.task.delete({ where: { id } });
  },
};
