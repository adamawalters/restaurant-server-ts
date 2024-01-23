"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const _00_reservations_json_1 = __importDefault(require("./00-reservations.json"));
async function seed(knex) {
    await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
    return await knex("reservations").insert(_00_reservations_json_1.default);
}
exports.seed = seed;
;
