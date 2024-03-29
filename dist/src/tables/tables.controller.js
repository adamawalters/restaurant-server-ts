"use strict";
/**
 * List handler for table resources
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tables_service_1 = __importDefault(require("./tables.service"));
const asyncErrorBoundary_1 = __importDefault(require("../errors/asyncErrorBoundary"));
const list = async (req, res) => {
    const { available } = req.query;
    if (available === "true") {
        res.json({
            data: await tables_service_1.default.listAvailable(),
        });
    }
    else {
        res.json({
            data: await tables_service_1.default.list(),
        });
    }
};
const create = async (req, res) => {
    const data = res.locals.data;
    const response = await tables_service_1.default.create(data);
    res.status(201).json({ data: response });
};
const update = async (req, res) => {
    const { data } = res.locals;
    const { table } = res.locals;
    const response = await tables_service_1.default.update(data.reservation_id, table.table_id);
    res.json({ data: response });
};
const deleteReservation = async (req, res) => {
    const { table } = res.locals;
    const response = await tables_service_1.default.deleteReservation(table.table_id, table.reservation_id);
    res.json({ data: response });
};
/*Validation functions  */
const requiredProperties = ["table_name", "capacity"];
const requiredReservationProperties = ["reservation_id"];
function bodyHasRequiredProperties(propertiesList) {
    const checker = (req, res, next) => {
        const { data = {} } = req.body;
        propertiesList.forEach((property) => {
            if (!data[property]) {
                return next({
                    status: 400,
                    message: `Body needs to be an object containing a data key whose value is object containing a "${property}" property.`,
                });
            }
        });
        res.locals.data = data;
        next();
    };
    return checker;
}
const tableCapacityIsANumber = (req, res, next) => {
    const { capacity } = res.locals.data;
    if (typeof capacity !== "number" || isNaN(capacity)) {
        return next({
            status: 400,
            message: `capacity must be a number.`,
        });
    }
    next();
};
const tableExists = async (req, res, next) => {
    const { table_id } = req.params;
    const response = await tables_service_1.default.read(table_id);
    if (response) {
        res.locals.table = response;
        return next();
    }
    next({
        status: 404,
        message: `table_id ${table_id} not found.`,
    });
};
const reservationExists = async (req, res, next) => {
    const { reservation_id } = res.locals.data;
    const response = await tables_service_1.default.readReservation(reservation_id);
    if (response) {
        res.locals.reservation = response;
        return next();
    }
    return next({
        status: 404,
        message: `Reservation ${reservation_id} does not exist.`,
    });
};
const tableIsOccupied = (req, res, next) => {
    const table = res.locals.table;
    if (!table.reservation_id) {
        return next({
            status: 400,
            message: `Table ${table.table_id} is not occupied.`,
        });
    }
    next();
};
const tableSeatsReservation = (req, res, next) => {
    const table = res.locals.table;
    const reservation = res.locals.reservation;
    if (reservation.people > table.capacity) {
        return next({
            status: 400,
            message: `Table ${table.table_id} has capacity ${table.capacity} but reservation is for ${reservation.people} people.`,
        });
    }
    next();
};
const tableIsUnoccupied = async (req, res, next) => {
    const table = res.locals.table;
    if (table.reservation_id) {
        return next({
            status: 400,
            message: `Table ${table.table_id} is occupied.`,
        });
    }
    next();
};
const tableNameIsTwoCharsOrMore = (req, res, next) => {
    const { table_name } = res.locals.data;
    if (typeof table_name !== 'string' || table_name.length < 2) {
        return next({
            status: 400,
            message: `Length of table_name must be a string of at least 2 characters.`,
        });
    }
    next();
};
const tableCapacityIsAtLeastOne = (req, res, next) => {
    const { capacity } = res.locals.data;
    if (capacity < 1) {
        return next({
            status: 400,
            message: `capacity must be at least 1.`,
        });
    }
    next();
};
const reservationIsSeated = (req, res, next) => {
    const reservation = res.locals.reservation;
    if (reservation.status === "seated") {
        next({
            status: 400,
            message: `Reservation ${reservation.reservation_id} is already seated.`,
        });
    }
    next();
};
exports.default = {
    list: [(0, asyncErrorBoundary_1.default)(list)],
    create: [
        bodyHasRequiredProperties(requiredProperties),
        tableNameIsTwoCharsOrMore,
        tableCapacityIsANumber,
        tableCapacityIsAtLeastOne,
        (0, asyncErrorBoundary_1.default)(create),
    ],
    update: [
        (0, asyncErrorBoundary_1.default)(tableExists),
        bodyHasRequiredProperties(requiredReservationProperties),
        (0, asyncErrorBoundary_1.default)(reservationExists),
        tableSeatsReservation,
        tableIsUnoccupied,
        reservationIsSeated,
        (0, asyncErrorBoundary_1.default)(update),
    ],
    delete: [
        (0, asyncErrorBoundary_1.default)(tableExists),
        tableIsOccupied,
        (0, asyncErrorBoundary_1.default)(deleteReservation),
    ],
};
