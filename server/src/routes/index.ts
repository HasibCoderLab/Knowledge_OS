import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import usersRoutes from '../modules/users/users.routes.js';
import libraryRoutes from '../modules/library/library.routes.js';
import readingRoutes from '../modules/reading/reading.routes.js';
import journalRoutes from '../modules/journal/journal.routes.js';
import calendarRoutes from '../modules/calendar/calendar.routes.js';
import goalsRoutes from '../modules/goals/goals.routes.js';
import tasksRoutes from '../modules/tasks/tasks.routes.js';
import analyticsRoutes from '../modules/analytics/analytics.routes.js';
import settingsRoutes from '../modules/settings/settings.routes.js';
import notificationsRoutes from '../modules/notifications/notifications.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/library', libraryRoutes);
router.use('/reading', readingRoutes);
router.use('/journal', journalRoutes);
router.use('/calendar', calendarRoutes);
router.use('/goals', goalsRoutes);
router.use('/tasks', tasksRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/settings', settingsRoutes);
router.use('/notifications', notificationsRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'KnowledgeOS API is running', timestamp: new Date().toISOString() });
});

export default router;
