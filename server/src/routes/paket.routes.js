import { Router } from 'express';
import * as ctrl from '../controllers/paket.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { paketRules } from '../validators/paket.validator.js';
import { upload } from '../config/upload.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/:slug', ctrl.detail);
router.post('/', requireAuth, upload.single('foto'), paketRules, validate, ctrl.create);
router.put('/:id', requireAuth, upload.single('foto'), paketRules, validate, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;
