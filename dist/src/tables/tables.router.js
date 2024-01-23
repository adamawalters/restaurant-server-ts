/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */
import express from "express";
import controller from "./tables.controller";
const router = express.Router();
router.route("/:table_id/seat")
    .put(controller.update)
    .delete(controller.delete);
router.route("/")
    .get(controller.list)
    .post(controller.create);
export default router;
