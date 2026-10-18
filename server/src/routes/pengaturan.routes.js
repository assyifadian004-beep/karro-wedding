import { Router } from 'express';
import * as ctrl from '../controllers/pengaturan.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { kontakRules } from '../validators/paket.validator.js';

const router = Router();

router.get('/', ctrl.get);
router.put('/', requireAuth, kontakRules, validate, ctrl.update);

export default router;
