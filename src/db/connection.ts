import { Knex, knex } from "../../node_modules/knex/types/index";


const environment = process.env.NODE_ENV || "development";
const config: Knex.Config = require("../../knexfile")[environment];
const connection = knex(config);

export default connection
