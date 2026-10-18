import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/login',
  authLimiter,
  [
    body('username').trim().notEmpty().withMessage('Username wajib diisi.'),
    body('password').notEmpty().withMessage('Kata sandi wajib diisi.'),
  ],
  validate,
  ctrl.login,
);

export default router;
