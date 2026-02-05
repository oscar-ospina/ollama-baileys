import express from 'express';
import path from 'path';
import chatRoutes from './routes/chat';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './utils/AppError';

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api', chatRoutes);

// 404 handler for API routes
app.use('/api', (_req, _res, next) => {
  next(new NotFoundError('Endpoint not found'));
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
