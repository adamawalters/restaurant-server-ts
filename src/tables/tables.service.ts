import knex from "../db/connection"
import { UpdateReservationBody } from "../reservations/reservations.controller"
import { CreateTable, FullTable } from "./tables.controller"

async function list(){
    const response: Array<FullTable> = await knex("tables")
        .select("*")
        .orderBy("table_name")

    return response

}

async function listAvailable(){
    const response: Array<FullTable> = await knex("tables")
        .select("*")
        .orderBy("table_name")
        .where({reservation_id : null})

    return response
}

async function read(table_id: string) {
    const response: Array<FullTable> = await knex("tables")
        .select("*")
        .where({ table_id: table_id })
    return response[0]
}

async function create(data: CreateTable){
    const response: Array<FullTable> = await knex("tables")
        .insert(data)
        .returning("*")
    return response[0]
}

async function deleteReservation(table_id: string, reservation_id: string){
    const response: Array<FullTable> = await knex("tables")
            .where({table_id : table_id})
            .update({
                reservation_id : null
            })
            .returning("*")

    await knex("reservations")
            .where({reservation_id : reservation_id})
            .update({status : "finished"})

    return response;
}

async function update(reservation_id: string, table_id: string){
    const response: Array<FullTable> = await knex("tables")
        .update({
            reservation_id: reservation_id
        })
        .where({
            table_id: table_id
        })
        .returning("*")

    await knex("reservations")
            .update({
                status : "seated"
            })
            .where({
                reservation_id: reservation_id
            })

    return response[0];
}

async function readReservation(reservation_id: string) {
    const response: Array<UpdateReservationBody> = await knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
    return response[0]
}


export default {
    list,
    listAvailable,
    create,
    read,
    update,
    readReservation,
    deleteReservation,
}