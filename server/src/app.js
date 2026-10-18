import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { uploadsPath } from './config/upload.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsPath));
app.use('/api', routes);
app.use((_req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan.' }));
app.use(errorHandler);

export default app;
