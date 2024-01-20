// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import 'dotenv/config'
import { join } from 'path';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  DEBUG,
} = process.env;


/* export type ConfigOptions = {
  [key: string] : Knex.Config
} */


export const development = {
  client: 'postgresql',
  connection: DATABASE_URL_DEVELOPMENT,
  migrations: {
    directory: join(__dirname, "src", "db", "migrations"),
  },
  seeds: {
    directory: join(__dirname, "src", "db", "seeds"),
  }
};
export const staging = {
  client: 'postgresql',
  connection: DATABASE_URL_PREVIEW,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: join(__dirname, "src", "db", "migrations"),
  },
  seeds: {
    directory: join(__dirname, "src", "db", "seeds"),
  }
};
export const production = {
  client: 'postgresql',
  connection: DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: join(__dirname, "src", "db", "migrations"),
  },
  seeds: {
    directory: join(__dirname, "src", "db", "seeds"),
  }
};
