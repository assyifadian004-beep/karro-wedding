import { pool } from '../config/db.js';

export function adminByUsername(username) {
  return pool.query('SELECT * FROM admin WHERE username = $1', [username]);
}
