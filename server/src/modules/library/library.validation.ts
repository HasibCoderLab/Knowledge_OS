import { z } from 'zod/v4';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  author: z.string().min(1, 'Author is required').max(100),
  category: z.string().max(50).nullable().optional(),
  coverUrl: z.string().url('Invalid URL').nullable().optional(),
  status: z.enum(['wishlist', 'reading', 'completed', 'paused', 'dropped']).optional(),
  totalPages: z.number().int().positive().nullable().optional(),
  currentPage: z.number().int().min(0).optional(),
  startDate: z.string().datetime('Invalid date').nullable().optional(),
  finishDate: z.string().datetime('Invalid date').nullable().optional(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
});

export const updateBookSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  author: z.string().min(1).max(100).optional(),
  category: z.string().max(50).nullable().optional(),
  coverUrl: z.string().url('Invalid URL').nullable().optional(),
  status: z.enum(['wishlist', 'reading', 'completed', 'paused', 'dropped']).optional(),
  totalPages: z.number().int().positive().nullable().optional(),
  currentPage: z.number().int().min(0).optional(),
  startDate: z.string().datetime('Invalid date').nullable().optional(),
  finishDate: z.string().datetime('Invalid date').nullable().optional(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
});

export const bookQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().max(100).optional(),
  status: z.enum(['wishlist', 'reading', 'completed', 'paused', 'dropped']).optional(),
  category: z.string().max(50).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'title', 'author', 'status', 'rating']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type BookQuery = z.infer<typeof bookQuerySchema>;
