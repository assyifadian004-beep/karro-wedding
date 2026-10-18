import { Router } from 'express';
import authRoutes from './auth.routes.js';
import paketRoutes from './paket.routes.js';
import galeriRoutes from './galeri.routes.js';
import testimoniRoutes from './testimoni.routes.js';
import bookingRoutes from './booking.routes.js';
import pengaturanRoutes from './pengaturan.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/paket', paketRoutes);
router.use('/galeri', galeriRoutes);
router.use('/testimoni', testimoniRoutes);
router.use('/booking', bookingRoutes);
router.use('/pengaturan', pengaturanRoutes);

export default router;
