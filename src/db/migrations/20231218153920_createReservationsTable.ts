//require('ts-node').register()
import { Knex } from 'knex'

const up = async function (knex: Knex) {
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

    return knex.schema.raw("alter table reservations add constraint positive_people  check(people > 0)")

  };
  
  const down = function (knex: Knex) {
    return knex.schema.dropTable("reservations");
  };

  export {up, down}
