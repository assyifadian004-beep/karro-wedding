import { Router } from 'express';
import * as ctrl from '../controllers/galeri.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { upload } from '../config/upload.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/paket/:paketId', ctrl.listByPaket);
router.post('/', requireAuth, upload.single('file'), ctrl.create);
router.put('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;
