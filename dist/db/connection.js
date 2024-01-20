import { knex } from "../../node_modules/knex/types/index";
const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const connection = knex(config);
export default connection;
