import { z } from 'zod/v4';

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  username: z.string().min(2).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').optional(),
  avatar: z.string().url('Invalid URL').nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  location: z.string().max(100).nullable().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
  language: z.string().min(2).max(10).optional(),
  website: z.string().url('Invalid URL').nullable().optional(),
  github: z.string().max(50).nullable().optional(),
  linkedin: z.string().max(50).nullable().optional(),
  twitter: z.string().max(50).nullable().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').max(128),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
