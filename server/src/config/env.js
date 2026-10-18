import dotenv from 'dotenv';

dotenv.config();

const required = ['PORT', 'DATABASE_URL', 'JWT_SECRET', 'CLIENT_URL'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Variabel lingkungan ${key} belum diatur di server/.env`);
  }
}

export const env = {
  port: Number(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  uploadsDir: process.env.UPLOADS_DIR || 'uploads',
};
