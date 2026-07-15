import { z } from 'zod/v4';

export const createJournalEntrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  mood: z.string().min(1, 'Mood is required').max(50),
  date: z.string().datetime('Invalid date'),
  tags: z.array(z.string().max(30)).max(20).optional(),
});

export const updateJournalEntrySchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  mood: z.string().min(1).max(50).optional(),
  date: z.string().datetime('Invalid date').optional(),
  tags: z.array(z.string().max(30)).max(20).optional(),
});

export const journalEntriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().max(100).optional(),
  mood: z.string().max(50).optional(),
  sortBy: z.enum(['date', 'createdAt', 'updatedAt', 'title']).optional().default('date'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateJournalEntryInput = z.infer<typeof createJournalEntrySchema>;
export type UpdateJournalEntryInput = z.infer<typeof updateJournalEntrySchema>;
export type JournalEntriesQuery = z.infer<typeof journalEntriesQuerySchema>;
