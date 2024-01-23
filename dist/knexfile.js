"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = require("path");
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
// Update with your config settings.
const { DATABASE_URL = "postgresql://postgres@localhost/postgres", DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/postgres", DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres", DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres", DEBUG, } = process.env;
const config = {
    development: {
        client: 'postgresql',
        connection: DATABASE_URL_DEVELOPMENT,
        migrations: {
            directory: (0, path_1.join)(__dirname, "src", "db", "migrations"),
        },
        seeds: {
            directory: (0, path_1.join)(__dirname, "src", "db", "seeds"),
        }
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
exports.default = config;
