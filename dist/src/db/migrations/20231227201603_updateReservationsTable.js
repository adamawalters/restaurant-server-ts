const up = function (knex) {
    return knex.schema.table("reservations", (table) => {
        table.string("status").notNullable().defaultTo("booked");
    });
};
const down = function (knex) {
    return knex.schema.table("reservations", (table) => {
        table.dropColumn("status");
    });
};
export { up, down };
