import knex from "../db/connection";
async function list() {
    const response = await knex("tables")
        .select("*")
        .orderBy("table_name");
    return response;
}
async function listAvailable() {
    const response = await knex("tables")
        .select("*")
        .orderBy("table_name")
        .where({ reservation_id: null });
    return response;
}
async function read(table_id) {
    const response = await knex("tables")
        .select("*")
        .where({ table_id: table_id });
    return response[0];
}
async function create(data) {
    const response = await knex("tables")
        .insert(data)
        .returning("*");
    return response[0];
}
async function deleteReservation(table_id, reservation_id) {
    const response = await knex("tables")
        .where({ table_id: table_id })
        .update({
        reservation_id: null
    })
        .returning("*");
    await knex("reservations")
        .where({ reservation_id: reservation_id })
        .update({ status: "finished" });
    return response;
}
async function update(reservation_id, table_id) {
    const response = await knex("tables")
        .update({
        reservation_id: reservation_id
    })
        .where({
        table_id: table_id
    })
        .returning("*");
    await knex("reservations")
        .update({
        status: "seated"
    })
        .where({
        reservation_id: reservation_id
    });
    return response[0];
}
async function readReservation(reservation_id) {
    const response = await knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id });
    return response[0];
}
export default {
    list,
    listAvailable,
    create,
    read,
    update,
    readReservation,
    deleteReservation,
};
