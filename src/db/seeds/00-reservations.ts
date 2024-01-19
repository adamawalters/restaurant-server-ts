import data from "./00-reservations.json";
import { Knex } from "knex";

exports.seed = async function (knex : Knex) {
  await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
  return await knex("reservations").insert(data);
};
