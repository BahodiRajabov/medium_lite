import { Knex } from 'knex';
import { pg } from '../config/conf';

const {
  database,
  host,
  maxPool,
  migrationsTable,
  minPool,
  password,
  port,
  user,
} = pg;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host,
      port: +port,
      database,
      user,
      password,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: "migrations",
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      host,
      port: +port,
      database,
      user,
      password,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: "migrations",
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host,
      port: +port,
      database,
      user,
      password,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: "migrations",
    },
  },
};

export default config;
