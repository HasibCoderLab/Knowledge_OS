import { prisma } from '../../app/config/database.js';
import type { CreateHabitInput, UpdateHabitInput, HabitsQuery, CreateHabitLogInput } from './habits.validation.js';

export const habitsRepository = {
  async create(userId: string, data: CreateHabitInput) {
    return prisma.habit.create({
      data: {
        userId,
        name: data.name,
        description: data.description ?? null,
        frequency: data.frequency ?? 'daily',
      },
    });
  },

  async findById(id: string) {
    return prisma.habit.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.habit.findFirst({
      where: { id, userId },
    });
  },

  async findByUserAndIdWithLogs(userId: string, id: string) {
    return prisma.habit.findFirst({
      where: { id, userId },
      include: { logs: true },
    });
  },

  async findByUser(userId: string, query: HabitsQuery) {
    const { page, limit, search, frequency, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (search) where.name = { contains: search };
    if (frequency) where.frequency = frequency;

    const [data, total] = await Promise.all([
      prisma.habit.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: { logs: true },
      }),
      prisma.habit.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async update(id: string, data: UpdateHabitInput) {
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.frequency !== undefined) updateData.frequency = data.frequency;

    return prisma.habit.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.habit.delete({ where: { id } });
  },

  async createLog(habitId: string, data: CreateHabitLogInput) {
    return prisma.habitLog.create({
      data: {
        habitId,
        date: new Date(data.date),
        completed: data.completed ?? true,
      },
    });
  },

  async findLogById(id: string) {
    return prisma.habitLog.findUnique({ where: { id } });
  },

  async findLogsByHabitId(habitId: string) {
    return prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { date: 'desc' },
    });
  },

  async findLogsByHabitIdAndDate(habitId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return prisma.habitLog.findMany({
      where: {
        habitId,
        date: { gte: startOfDay, lte: endOfDay },
      },
    });
  },

  async findLogByHabitIdAndDate(habitId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return prisma.habitLog.findFirst({
      where: {
        habitId,
        date: { gte: startOfDay, lte: endOfDay },
      },
    });
  },

  async updateLog(id: string, completed: boolean) {
    return prisma.habitLog.update({
      where: { id },
      data: { completed },
    });
  },

  async deleteLog(id: string) {
    return prisma.habitLog.delete({ where: { id } });
  },

  async deleteLogsByHabitId(habitId: string) {
    return prisma.habitLog.deleteMany({ where: { habitId } });
  },

  async findAllLogsByUserHabits(userId: string) {
    const habits = await prisma.habit.findMany({
      where: { userId },
      include: { logs: true },
    });
    return habits;
  },
};
