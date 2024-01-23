"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
async function list(date) {
    if (date) {
        const response = await (0, connection_1.default)("reservations")
            .select("*")
            .where({ reservation_date: date })
            .andWhereNot({ status: "finished" })
            .andWhereNot({ status: "cancelled" })
            .orderBy("reservation_time");
        return response;
    }
    else {
        const response = await (0, connection_1.default)("reservations")
            .select("*")
            .whereNot({ status: "finished" })
            .andWhereNot({ status: "cancelled" })
            .orderBy("reservation_time");
        return response;
    }
}
async function search(mobile_number) {
    const response = await (0, connection_1.default)("reservations")
        .whereRaw("translate(mobile_number, '() -', '') like ?", `%${mobile_number.replace(/\D/g, "")}%`)
        .orderBy("reservation_date");
    return response;
}
async function create(data) {
    const response = await (0, connection_1.default)("reservations")
        .insert(data)
        .returning("*");
    return response[0];
}
async function read(reservation_id) {
    const response = await (0, connection_1.default)("reservations")
        .select("*")
        .where({ reservation_id: reservation_id });
    return response[0];
}
async function updateStatus(reservation_id, newStatus) {
    const response = await (0, connection_1.default)("reservations")
        .where({ reservation_id: reservation_id })
        .update("status", newStatus)
        .returning("*");
    return response[0];
}
async function update(reservation_id, newReservation) {
    const response = await (0, connection_1.default)("reservations")
        .where({ reservation_id: reservation_id })
        .update(newReservation)
        .returning("*");
    return response[0];
}
exports.default = {
    list,
    create,
    read,
    updateStatus,
    search,
    update,
};
