//import { Knex, knex } from "../../node_modules/knex/types/index";
import knex from 'knex';
import KnexFile from "../../knexfile";
const environment = process.env.NODE_ENV || "development";
const config = KnexFile[environment];
const connection = knex(config);
export default connection;
