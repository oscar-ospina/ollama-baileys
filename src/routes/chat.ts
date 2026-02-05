import { Router } from 'express';
import { chatService } from '../services/chatService';
import { catchAsync } from '../utils/catchAsync';
import { ValidationError } from '../utils/AppError';
import { config } from '../config';

const router = Router();

router.post(
  '/chat',
  catchAsync(async (req, res) => {
    const { message, model = config.defaultModel } = req.body;

    if (!message) {
      throw new ValidationError('Message is required');
    }

    const result = await chatService.chat(message, model);

    res.json(result);
  })
);

router.post('/clear', (_req, res) => {
  chatService.clearHistory();
  res.json({ success: true });
});

export default router;
