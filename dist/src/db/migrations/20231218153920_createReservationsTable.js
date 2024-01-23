"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = async function (knex) {
    await knex.schema.createTable("reservations", (table) => {
        table.increments("reservation_id").primary();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("mobile_number").notNullable();
        table.date("reservation_date").notNullable();
        table.time("reservation_time").notNullable();
        table.integer("people").notNullable();
        table.timestamps(true, true);
    });
    return knex.schema.raw("alter table reservations add constraint positive_people  check(people > 0)");
};
exports.up = up;
const down = function (knex) {
    return knex.schema.dropTable("reservations");
};
exports.down = down;
