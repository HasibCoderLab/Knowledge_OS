import { prisma } from '../../app/config/database.js';
import type { CreateBookInput, UpdateBookInput, BookQuery } from './library.validation.js';

export const libraryRepository = {
  async create(userId: string, data: CreateBookInput) {
    return prisma.book.create({
      data: {
        userId,
        title: data.title,
        author: data.author,
        category: data.category ?? null,
        coverUrl: data.coverUrl ?? null,
        status: data.status ?? 'wishlist',
        totalPages: data.totalPages ?? null,
        currentPage: data.currentPage ?? 0,
        startDate: data.startDate ? new Date(data.startDate) : null,
        finishDate: data.finishDate ? new Date(data.finishDate) : null,
        rating: data.rating ?? null,
        tags: data.tags ?? [],
      },
    });
  },

  async findById(id: string) {
    return prisma.book.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.book.findFirst({
      where: { id, userId },
    });
  },

  async findByUser(userId: string, query: BookQuery) {
    const { page, limit, search, status, category, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (search) where.title = { contains: search };
    if (status) where.status = status;
    if (category) where.category = category;

    const [data, total] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.book.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async update(id: string, data: UpdateBookInput) {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.coverUrl !== undefined) updateData.coverUrl = data.coverUrl;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.totalPages !== undefined) updateData.totalPages = data.totalPages;
    if (data.currentPage !== undefined) updateData.currentPage = data.currentPage;
    if (data.startDate !== undefined) updateData.startDate = data.startDate ? new Date(data.startDate) : null;
    if (data.finishDate !== undefined) updateData.finishDate = data.finishDate ? new Date(data.finishDate) : null;
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.tags !== undefined) updateData.tags = data.tags;

    return prisma.book.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.book.delete({ where: { id } });
  },
};
