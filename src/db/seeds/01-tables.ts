import data from "./01-tables.json"

import { Knex } from "knex";


export async function seed (knex: Knex) {
  await knex('tables').del();
  return await knex('tables').insert(data);
};
