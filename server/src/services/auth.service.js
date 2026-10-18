import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { adminByUsername } from '../repositories/admin.repository.js';
import { AppError } from '../utils/appError.js';

export async function login(username, password) {
  const { rows } = await adminByUsername(username);
  const admin = rows[0];
  if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
    throw new AppError('Username atau kata sandi salah.', 401);
  }
  const token = jwt.sign({ id: admin.id, nama: admin.nama, username: admin.username }, env.jwtSecret, { expiresIn: '8h' });
  return { token, admin: { id: admin.id, nama: admin.nama, username: admin.username } };
}
