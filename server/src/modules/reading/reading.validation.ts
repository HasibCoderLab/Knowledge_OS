import { z } from 'zod/v4';

export const createReadingSessionSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  date: z.string().datetime('Invalid date'),
  pagesRead: z.number().int().positive('Pages read must be positive'),
  durationMinutes: z.number().int().positive('Duration must be positive'),
  startPage: z.number().int().min(0, 'Start page must be non-negative'),
  endPage: z.number().int().min(0, 'End page must be non-negative'),
});

export const updateReadingSessionSchema = z.object({
  bookId: z.string().min(1).optional(),
  date: z.string().datetime('Invalid date').optional(),
  pagesRead: z.number().int().positive().optional(),
  durationMinutes: z.number().int().positive().optional(),
  startPage: z.number().int().min(0).optional(),
  endPage: z.number().int().min(0).optional(),
});

export const readingSessionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  bookId: z.string().optional(),
  sortBy: z.enum(['date', 'createdAt', 'pagesRead', 'durationMinutes']).optional().default('date'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateReadingSessionInput = z.infer<typeof createReadingSessionSchema>;
export type UpdateReadingSessionInput = z.infer<typeof updateReadingSessionSchema>;
export type ReadingSessionsQuery = z.infer<typeof readingSessionsQuerySchema>;
