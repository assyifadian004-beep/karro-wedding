import { Router } from 'express';
import * as ctrl from '../controllers/testimoni.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { testimoniRules } from '../validators/paket.validator.js';
import { upload } from '../config/upload.js';

const router = Router();

router.get('/', ctrl.list);
router.post('/', requireAuth, upload.single('foto'), testimoniRules, validate, ctrl.create);
router.put('/:id', requireAuth, upload.single('foto'), testimoniRules, validate, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;
