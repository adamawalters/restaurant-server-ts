/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */

import express, { Router } from "express";
import controller from "./tables.controller"
const router: Router = express.Router();


router.route("/:table_id/seat")
    .put(controller.update)
    .delete(controller.delete)

router.route("/")
    .get(controller.list)
    .post(controller.create)



export default router