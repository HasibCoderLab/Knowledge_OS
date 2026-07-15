import { z } from 'zod/v4';

export const createGoalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(500).nullable().optional(),
  category: z.string().max(50).nullable().optional(),
  targetDate: z.string().datetime('Invalid date').nullable().optional(),
  targetValue: z.number().positive('Target value must be positive').optional().default(100),
  currentValue: z.number().min(0).optional().default(0),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
});

export const updateGoalSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(500).nullable().optional(),
  category: z.string().max(50).nullable().optional(),
  targetDate: z.string().datetime('Invalid date').nullable().optional(),
  targetValue: z.number().positive().optional(),
  currentValue: z.number().min(0).optional(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
});

export const goalsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().max(100).optional(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  category: z.string().max(50).optional(),
  sortBy: z.enum(['createdAt', 'targetDate', 'progressPercentage', 'title', 'priority']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
export type GoalsQuery = z.infer<typeof goalsQuerySchema>;
