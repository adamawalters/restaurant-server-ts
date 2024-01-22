import knex from "../db/connection";
import { CreateReservationBody, UpdateReservationBody } from "./reservations.controller";

async function list(date: string): Promise<Array<UpdateReservationBody>> {
  if (date) {
    const response = await knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .andWhereNot({ status: "finished" })
      .andWhereNot({status : "cancelled"})
      .orderBy("reservation_time");
      
      return response
  } else {
    const response = await knex("reservations")
      .select("*")
      .whereNot({ status: "finished" })
      .andWhereNot({status : "cancelled"})
      .orderBy("reservation_time");
      return response
  }
}

async function search(mobile_number: string): Promise<Array<UpdateReservationBody>> {
  const response = await knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
  return response;
}

async function create(data: CreateReservationBody): Promise<UpdateReservationBody> {
  const response: Array<UpdateReservationBody> = await knex("reservations")
        .insert(data)
        .returning("*");
    return response[0];
}

async function read(reservation_id: string): Promise<UpdateReservationBody> {
  const response: Array<UpdateReservationBody> = await knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id });
    return response[0];
}

async function updateStatus(reservation_id: string, newStatus: string): Promise<UpdateReservationBody> {
  const response: Array<UpdateReservationBody> = await knex("reservations")
        .where({ reservation_id: reservation_id })
        .update("status", newStatus)
        .returning("*");
    return response[0];
}

async function update(reservation_id: string, newReservation: UpdateReservationBody): Promise<UpdateReservationBody> {
  const response: Array<UpdateReservationBody> = await knex("reservations")
        .where({ reservation_id: reservation_id })
        .update(newReservation)
        .returning("*");
    return response[0];
}

export default {
  list,
  create,
  read,
  updateStatus,
  search,
  update,
};
