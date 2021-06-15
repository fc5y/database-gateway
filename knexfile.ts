import dotenv from 'dotenv';
dotenv.config();

import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
};

export default config;
