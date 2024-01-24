"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { PORT = 5001 } = process.env;
const app_1 = __importDefault(require("./app"));

    app_1.default.listen(PORT, listener); //new

function listener() {
    console.log(`Listening on Port here: ${PORT}!`);
}
