import { notificationsRepository } from './notifications.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateNotificationInput, NotificationsQuery } from './notifications.validation.js';

export const notificationsService = {
  async createNotification(userId: string, input: CreateNotificationInput) {
    return notificationsRepository.create(userId, input);
  },

  async getNotifications(userId: string, query: NotificationsQuery) {
    const [result, unreadCount] = await Promise.all([
      notificationsRepository.findByUser(userId, query),
      notificationsRepository.countUnread(userId),
    ]);

    return { ...result, unreadCount };
  },

  async markAsRead(userId: string, id: string) {
    const notification = await notificationsRepository.findByUserAndId(userId, id);
    if (!notification) {
      throw new NotFoundError('Notification');
    }

    return notificationsRepository.markAsRead(id);
  },

  async markAllAsRead(userId: string) {
    await notificationsRepository.markAllAsRead(userId);
  },

  async deleteNotification(userId: string, id: string) {
    const notification = await notificationsRepository.findByUserAndId(userId, id);
    if (!notification) {
      throw new NotFoundError('Notification');
    }

    await notificationsRepository.delete(id);
  },
};
