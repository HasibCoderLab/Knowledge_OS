import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/environment.js';
import { errorMiddleware, notFoundHandler } from '../middleware/error.middleware.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import routes from '../routes/index.js';

const app: Express = express();

// Security
app.use(helmet());
app.use(cors({
  origin: env.corsOrigin,
  credentials: true,
}));
app.use(cookieParser(env.cookieSecret));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// API routes
app.use('/api/v1', routes);

// Root
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to KnowledgeOS API v1' });
});

// Error handling
app.use(notFoundHandler);
app.use(errorMiddleware);

export default app;
