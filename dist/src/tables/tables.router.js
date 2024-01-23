"use strict";
/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tables_controller_1 = __importDefault(require("./tables.controller"));
const router = express_1.default.Router();
router.route("/:table_id/seat")
    .put(tables_controller_1.default.update)
    .delete(tables_controller_1.default.delete);
router.route("/")
    .get(tables_controller_1.default.list)
    .post(tables_controller_1.default.create);
exports.default = router;
