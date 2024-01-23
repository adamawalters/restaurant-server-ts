"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
async function list() {
    const response = await (0, connection_1.default)("tables")
        .select("*")
        .orderBy("table_name");
    return response;
}
async function listAvailable() {
    const response = await (0, connection_1.default)("tables")
        .select("*")
        .orderBy("table_name")
        .where({ reservation_id: null });
    return response;
}
async function read(table_id) {
    const response = await (0, connection_1.default)("tables")
        .select("*")
        .where({ table_id: table_id });
    return response[0];
}
async function create(data) {
    const response = await (0, connection_1.default)("tables")
        .insert(data)
        .returning("*");
    return response[0];
}
async function deleteReservation(table_id, reservation_id) {
    const response = await (0, connection_1.default)("tables")
        .where({ table_id: table_id })
        .update({
        reservation_id: null
    })
        .returning("*");
    await (0, connection_1.default)("reservations")
        .where({ reservation_id: reservation_id })
        .update({ status: "finished" });
    return response;
}
async function update(reservation_id, table_id) {
    const response = await (0, connection_1.default)("tables")
        .update({
        reservation_id: reservation_id
    })
        .where({
        table_id: table_id
    })
        .returning("*");
    await (0, connection_1.default)("reservations")
        .update({
        status: "seated"
    })
        .where({
        reservation_id: reservation_id
    });
    return response[0];
}
async function readReservation(reservation_id) {
    const response = await (0, connection_1.default)("reservations")
        .select("*")
        .where({ reservation_id: reservation_id });
    return response[0];
}
exports.default = {
    list,
    listAvailable,
    create,
    read,
    update,
    readReservation,
    deleteReservation,
};
