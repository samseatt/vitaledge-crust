import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/vitaledge',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
};
