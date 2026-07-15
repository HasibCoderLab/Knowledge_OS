import { prisma } from '../../app/config/database.js';
import type { CreateJournalEntryInput, UpdateJournalEntryInput, JournalEntriesQuery } from './journal.validation.js';

export const journalRepository = {
  async create(userId: string, data: CreateJournalEntryInput) {
    return prisma.journalEntry.create({
      data: {
        userId,
        title: data.title,
        content: data.content,
        mood: data.mood,
        date: new Date(data.date),
        tags: data.tags ?? [],
      },
    });
  },

  async findById(id: string) {
    return prisma.journalEntry.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.journalEntry.findFirst({
      where: { id, userId },
    });
  },

  async findByUser(userId: string, query: JournalEntriesQuery) {
    const { page, limit, search, mood, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (search) where.title = { contains: search };
    if (mood) where.mood = mood;

    const [data, total] = await Promise.all([
      prisma.journalEntry.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.journalEntry.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async update(id: string, data: UpdateJournalEntryInput) {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.mood !== undefined) updateData.mood = data.mood;
    if (data.date !== undefined) updateData.date = new Date(data.date);
    if (data.tags !== undefined) updateData.tags = data.tags;

    return prisma.journalEntry.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.journalEntry.delete({ where: { id } });
  },
};
