import data from "./00-reservations.json";
import { Knex } from "knex";

export async function seed (knex : Knex) {
  await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
  return await knex("reservations").insert(data);
};
