"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = async function (knex) {
    await knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary();
        table.string("table_name").notNullable();
        table.integer("capacity").notNullable();
        table.integer("reservation_id").references("reservation_id").inTable("reservations").onDelete("cascade");
        table.timestamps(true, true);
    });
    await knex.schema.raw("alter table tables add constraint table_name_length check(char_length(table_name) > 1)");
    return knex.schema.raw("alter table tables add constraint positive_capacity check(capacity > 0)");
};
exports.up = up;
const down = function (knex) {
    return knex.schema.dropTable("tables");
};
exports.down = down;
