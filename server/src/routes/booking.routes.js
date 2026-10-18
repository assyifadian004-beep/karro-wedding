import { Router } from 'express';
import * as ctrl from '../controllers/booking.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { bookingLimiter } from '../middlewares/rateLimiter.js';
import { bookingRules } from '../validators/booking.validator.js';

const router = Router();

router.post('/', bookingLimiter, bookingRules, validate, ctrl.create);
router.get('/', requireAuth, ctrl.list);

export default router;
