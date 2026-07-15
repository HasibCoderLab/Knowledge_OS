import { z } from 'zod/v4';

export const updateSettingsSchema = z.object({
  notifications: z.boolean().optional(),
  emailReports: z.boolean().optional(),
  weeklyReview: z.boolean().optional(),
  focusReminders: z.boolean().optional(),
  readingReminders: z.boolean().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
  language: z.string().min(2).max(5).optional(),
  dailyReadingGoal: z.number().int().min(0).optional(),
  timezone: z.string().min(1).max(50).optional(),
  weekStartsOn: z.enum(['monday', 'sunday', 'saturday']).optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
