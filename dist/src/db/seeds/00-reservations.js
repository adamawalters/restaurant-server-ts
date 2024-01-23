import data from "./00-reservations.json";
export async function seed(knex) {
    await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
    return await knex("reservations").insert(data);
}
;
