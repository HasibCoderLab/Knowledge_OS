import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middleware/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to KnowledgeOS API v1' });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
