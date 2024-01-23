import data from "./01-tables.json";
export async function seed(knex) {
    await knex('tables').del();
    return await knex('tables').insert(data);
}
;
