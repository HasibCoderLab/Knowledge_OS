import { activitiesRepository } from './activities.repository.js';
import type { CreateActivityInput, ActivitiesQuery } from './activities.validation.js';

export const activityService = {
  async logActivity(userId: string, input: CreateActivityInput) {
    return activitiesRepository.create(userId, input);
  },

  async getActivities(userId: string, query: ActivitiesQuery) {
    return activitiesRepository.findByUser(userId, query);
  },

  async getRecentActivities(userId: string) {
    return activitiesRepository.findRecentByUser(userId, 20);
  },
};
