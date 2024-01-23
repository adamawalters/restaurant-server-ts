"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const _01_tables_json_1 = __importDefault(require("./01-tables.json"));
async function seed(knex) {
    await knex('tables').del();
    return await knex('tables').insert(_01_tables_json_1.default);
}
exports.seed = seed;
;
