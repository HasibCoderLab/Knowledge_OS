import { Router } from 'express';
import * as aiController from './ai.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import {
  createConversationSchema,
  addMessageSchema,
  conversationsQuerySchema,
  idParamSchema,
} from './ai.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(conversationsQuerySchema), aiController.getConversations);
router.get('/:id', authenticate, validateParams(idParamSchema), aiController.getConversation);
router.post('/', authenticate, validate(createConversationSchema), aiController.createConversation);
router.post('/:id/messages', authenticate, validateParams(idParamSchema), validate(addMessageSchema), aiController.addMessage);
router.delete('/:id', authenticate, validateParams(idParamSchema), aiController.deleteConversation);

export default router;
