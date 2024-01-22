import express, { Router } from 'express'
import controller from "./reservations.controller"

const router: Router = express.Router();

router.route("/:reservation_id/status")
    .put(controller.updateStatus)

router.route("/:reservation_id")
    .get(controller.read)
    .put(controller.update)

router.route("/")
    .get(controller.list)
    .post(controller.create)

export default router

