import { z } from 'zod/v4';

export const createHabitSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).nullable().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
});

export const updateHabitSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).nullable().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
});

export const habitsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().max(100).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name', 'frequency']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const createHabitLogSchema = z.object({
  date: z.string().datetime('Invalid date'),
  completed: z.boolean().optional(),
});

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;
export type HabitsQuery = z.infer<typeof habitsQuerySchema>;
export type CreateHabitLogInput = z.infer<typeof createHabitLogSchema>;
