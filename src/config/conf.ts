import { config } from 'dotenv';

config();

const { env } = process;

export const pg = {
  host: env.PG_HOST || 'localhost',
  port: env.PG_PORT || 5432,
  user: env.PG_USER || 'postgres',
  password: env.PG_PASSWORD || 'pgpwd',
  database: env.PG_DB_NAME || 'medium_db',
  migrationsTable: env.PG_MIGRATIONS_TABLE || 'migrations',
  maxPool: 75,
  minPool: 2,
};

export const server = {
  httpPort: env.HTTP_PORT || 4000,
  nodeEnv: env.NODE_ENV || 'development',
  refreshToken: {
    secret: env.REFRESH_TOKEN_SECRET,
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  },
  accessToken: {
    secret: env.ACCESS_TOKEN_SECRET,
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  }
};

export const emailService = {
  username: env.EMAIl_USERNAME,
  password: env.EMAIL_PASSWORD,
  hostname: env.EMAIL_HOSTNAME,
};

