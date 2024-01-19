"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { PORT = 5001 } = process.env;
const app_1 = __importDefault(require("./app"));
//import knex from "./db/connection";
/* knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  }); */
app_1.default.listen(PORT, listener);
function listener() {
    console.log(`Listening on Port ${PORT}!`);
}
