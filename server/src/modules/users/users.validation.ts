import { z } from 'zod/v4';

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  avatar: z.string().url('Invalid URL').nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  location: z.string().max(100).nullable().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
  language: z.string().min(2).max(10).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
