import { prisma } from '../../app/config/database.js';
import type { CreateReadingSessionInput, UpdateReadingSessionInput, ReadingSessionsQuery } from './reading.validation.js';

export const readingRepository = {
  async create(userId: string, data: CreateReadingSessionInput) {
    return prisma.readingSession.create({
      data: {
        userId,
        bookId: data.bookId,
        date: new Date(data.date),
        pagesRead: data.pagesRead,
        durationMinutes: data.durationMinutes,
        startPage: data.startPage,
        endPage: data.endPage,
      },
    });
  },

  async findById(id: string) {
    return prisma.readingSession.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.readingSession.findFirst({
      where: { id, userId },
    });
  },

  async findByUser(userId: string, query: ReadingSessionsQuery) {
    const { page, limit, bookId, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (bookId) where.bookId = bookId;

    const [data, total] = await Promise.all([
      prisma.readingSession.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.readingSession.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async update(id: string, data: UpdateReadingSessionInput) {
    const updateData: Record<string, unknown> = {};
    if (data.bookId !== undefined) updateData.bookId = data.bookId;
    if (data.date !== undefined) updateData.date = new Date(data.date);
    if (data.pagesRead !== undefined) updateData.pagesRead = data.pagesRead;
    if (data.durationMinutes !== undefined) updateData.durationMinutes = data.durationMinutes;
    if (data.startPage !== undefined) updateData.startPage = data.startPage;
    if (data.endPage !== undefined) updateData.endPage = data.endPage;

    return prisma.readingSession.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.readingSession.delete({ where: { id } });
  },
};
