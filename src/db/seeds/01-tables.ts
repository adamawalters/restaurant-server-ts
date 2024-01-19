
const data = require("./01-tables.json")
import { Knex } from "knex";


exports.seed = async function(knex: Knex) {
  await knex('tables').del();
  return await knex('tables').insert(data);
};
