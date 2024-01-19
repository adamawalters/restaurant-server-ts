import { Knex } from "knex";

exports.up = function(knex: Knex) {
    return knex.schema.table("reservations", (table) => {
        table.string("status").notNullable().defaultTo("booked"); 
    })
};

exports.down = function(knex: Knex) {
    return knex.schema.table("reservations", (table) => {
        table.dropColumn("status");
    })
}
