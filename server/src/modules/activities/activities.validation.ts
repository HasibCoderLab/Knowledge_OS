import { z } from 'zod/v4';

export const createActivitySchema = z.object({
  type: z.string().min(1, 'Type is required').max(50),
  action: z.string().min(1, 'Action is required').max(50),
  entityId: z.string().nullable().optional(),
  entityType: z.string().max(50).nullable().optional(),
  metadata: z.any().nullable().optional(),
});

export const activitiesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  type: z.string().max(50).optional(),
  action: z.string().max(50).optional(),
  entityType: z.string().max(50).optional(),
  sortBy: z.enum(['createdAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type ActivitiesQuery = z.infer<typeof activitiesQuerySchema>;
