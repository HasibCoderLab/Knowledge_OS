import { Router } from 'express';
import * as notificationsController from './notifications.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import { createNotificationSchema, notificationsQuerySchema, idParamSchema } from './notifications.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(notificationsQuerySchema), notificationsController.getNotifications);
router.post('/', authenticate, validate(createNotificationSchema), notificationsController.createNotification);
router.patch('/read-all', authenticate, notificationsController.markAllAsRead);
router.patch('/:id/read', authenticate, validateParams(idParamSchema), notificationsController.markAsRead);
router.delete('/:id', authenticate, validateParams(idParamSchema), notificationsController.deleteNotification);

export default router;
