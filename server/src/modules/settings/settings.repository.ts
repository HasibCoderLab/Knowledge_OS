import { prisma } from '../../app/config/database.js';
import type { UpdateSettingsInput } from './settings.validation.js';

const defaultSettings = {
  notifications: true,
  emailReports: false,
  weeklyReview: true,
  focusReminders: false,
  readingReminders: false,
  theme: 'system',
  language: 'en',
  dailyReadingGoal: 0,
  timezone: 'UTC',
  weekStartsOn: 'monday',
};

export const settingsRepository = {
  async findByUserId(userId: string) {
    return prisma.userSettings.findUnique({ where: { userId } });
  },

  async upsert(userId: string) {
    return prisma.userSettings.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        ...defaultSettings,
      },
    });
  },

  async update(userId: string, data: UpdateSettingsInput) {
    const updateData: Record<string, unknown> = {};
    if (data.notifications !== undefined) updateData.notifications = data.notifications;
    if (data.emailReports !== undefined) updateData.emailReports = data.emailReports;
    if (data.weeklyReview !== undefined) updateData.weeklyReview = data.weeklyReview;
    if (data.focusReminders !== undefined) updateData.focusReminders = data.focusReminders;
    if (data.readingReminders !== undefined) updateData.readingReminders = data.readingReminders;
    if (data.theme !== undefined) updateData.theme = data.theme;
    if (data.language !== undefined) updateData.language = data.language;
    if (data.dailyReadingGoal !== undefined) updateData.dailyReadingGoal = data.dailyReadingGoal;
    if (data.timezone !== undefined) updateData.timezone = data.timezone;
    if (data.weekStartsOn !== undefined) updateData.weekStartsOn = data.weekStartsOn;

    return prisma.userSettings.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        ...defaultSettings,
        ...updateData,
      },
    });
  },
};
