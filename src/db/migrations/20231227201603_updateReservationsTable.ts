//require('ts-node').register()
import { Knex } from "knex";
const up = function(knex: Knex) {
    return knex.schema.table("reservations", (table) => {
        table.string("status").notNullable().defaultTo("booked"); 
    })
};

const down = function(knex: Knex) {
    return knex.schema.table("reservations", (table) => {
        table.dropColumn("status");
    })
}

export {up, down}
