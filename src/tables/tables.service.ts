import knex from "../db/connection"

function list(){
    return knex("tables")
        .select("*")
        .orderBy("table_name")

}

function listAvailable(){
    return knex("tables")
        .select("*")
        .orderBy("table_name")
        .where({reservation_id : null})
}

function read(table_id) {
    return knex("tables")
                .select("*")
                .where({table_id : table_id})
                .then((response) => response[0])
}

function create(data){
    return knex("tables")
            .insert(data)
            .returning("*")
            .then((response) => response[0])
}

async function deleteReservation(table_id, reservation_id){
    const response = await  knex("tables")
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

async function update(reservation_id, table_id){
    const response = await knex("tables")
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

function readReservation(reservation_id) {
    return knex("reservations")
            .select("*")
            .where({reservation_id : reservation_id})
            .then((response) => response[0])
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