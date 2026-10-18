import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/appError.js';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(new AppError('Harus login terlebih dahulu.', 401));
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.admin = payload;
    next();
  } catch {
    next(new AppError('Sesi tidak valid. Silakan login ulang.', 401));
  }
}
