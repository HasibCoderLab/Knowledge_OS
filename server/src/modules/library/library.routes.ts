import { Router } from 'express';
import * as libraryController from './library.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import { createBookSchema, updateBookSchema, bookQuerySchema, idParamSchema } from './library.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(bookQuerySchema), libraryController.getLibrary);
router.get('/:id', authenticate, validateParams(idParamSchema), libraryController.getBook);
router.post('/', authenticate, validate(createBookSchema), libraryController.createBook);
router.patch('/:id', authenticate, validateParams(idParamSchema), validate(updateBookSchema), libraryController.updateBook);
router.delete('/:id', authenticate, validateParams(idParamSchema), libraryController.deleteBook);

export default router;
