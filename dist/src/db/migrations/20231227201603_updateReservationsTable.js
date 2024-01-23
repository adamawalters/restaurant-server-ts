"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = function (knex) {
    return knex.schema.table("reservations", (table) => {
        table.string("status").notNullable().defaultTo("booked");
    });
};
exports.up = up;
const down = function (knex) {
    return knex.schema.table("reservations", (table) => {
        table.dropColumn("status");
    });
};
exports.down = down;
