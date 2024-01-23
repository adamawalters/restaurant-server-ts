/**
 * List handler for reservation resources
 */
import service from "./reservations.service";
import asyncErrorBoundary from "../errors/asyncErrorBoundary";
/* Constant data */
const validReservationStatuses = [
    "booked",
    "seated",
    "finished",
    "cancelled",
];
/* type ReqQuery = {
  query: string
} */
/*Controller functions */
const list = async (req, res) => {
    const { date, mobile_number } = req.query;
    if (mobile_number) {
        res.json({ data: await service.search(mobile_number) });
    }
    else {
        res.json({
            data: await service.list(date),
        });
    }
};
const read = async (req, res) => {
    const { reservation_id } = req.params;
    res.json({
        data: await service.read(reservation_id),
    });
};
const create = async (req, res) => {
    const data = res.locals.data;
    const response = await service.create(data);
    res.status(201).json({ data: response });
};
const updateStatus = async (req, res) => {
    const reservation = res.locals.reservation;
    const { status } = res.locals;
    const response = await service.updateStatus(reservation.reservation_id, status);
    res.json({
        data: response,
    });
};
const update = async (req, res) => {
    const reservationFromDatabase = res.locals.reservation;
    const reservationFromBody = res.locals.data;
    const newReservation = Object.assign(Object.assign({}, reservationFromBody), { reservation_id: reservationFromDatabase.reservation_id });
    res.json({
        data: await service.update(reservationFromDatabase.reservation_id, newReservation),
    });
};
/*Validation functions  */
const requiredProperties = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
];
const peoplePropertyIsPositive = async (req, res, next) => {
    const { people } = res.locals.data;
    if (typeof people !== "number" || people < 1) {
        return next({
            status: 400,
            message: `"people (number of guests) " needs to be a positive integer.`,
        });
    }
    next();
};
const reservationDateIsValid = async (req, res, next) => {
    const { reservation_date } = res.locals.data;
    if (isNaN(Number(new Date(reservation_date)))) {
        return next({
            status: 400,
            message: `"reservation_date" is invalid - should be YYYY-MM-DD`,
        });
    }
    next();
};
const reservationTimeIsValid = async (req, res, next) => {
    const { reservation_time } = res.locals.data;
    const regex = new RegExp(/^(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9](?::[0-5]?[0-9])?$/);
    if (!regex.test(reservation_time)) {
        return next({
            status: 400,
            message: `"reservation_time" is invalid - should be HH:MM:SS`,
        });
    }
    next();
};
const reservationIsFutureAndRestaurantIsOpen = async (req, res, next) => {
    const { reservation_date, reservation_time } = res.locals.data;
    const [year, month, day] = reservation_date.split("-").map(Number);
    const [hour, minutes] = reservation_time
        .split(":")
        .map(Number);
    const reservationDate = new Date(year, month - 1, day);
    reservationDate.setHours(hour, minutes);
    const weekDay = reservationDate.getDay();
    const now = new Date();
    let errorString = "";
    if (reservationDate.getTime() < now.getTime()) {
        errorString += `Reservation must be in the future.`;
    }
    if (weekDay === 2) {
        errorString += `No reservations on Tuesdays as the restaurant is closed. `;
    }
    if ((hour === 10 && minutes < 30) || hour < 10) {
        errorString += `Restaurant opens at 10:30 AM. `;
    }
    if ((hour === 21 && minutes > 30) || hour > 21) {
        errorString += `Last reservation is at 9:30 PM. `;
    }
    errorString
        ? next({
            status: 400,
            message: errorString,
        })
        : next();
};
const bodyHasRequiredProperties = (propertiesList) => {
    const checker = (req, res, next) => {
        const { data = {} } = req.body;
        propertiesList.forEach((property) => {
            if (!data[property]) {
                return next({
                    status: 400,
                    message: `Body needs a "${property}" property.`,
                });
            }
        });
        res.locals.data = data;
        next();
    };
    return checker;
};
/* Validations for update status along with reservation exists */
const reservationExists = async (req, res, next) => {
    const { reservation_id } = req.params;
    const response = await service.read(reservation_id);
    if (response) {
        res.locals.reservation = response;
        return next();
    }
    next({
        status: 404,
        message: `Reservation "${reservation_id}" does not exist.`,
    });
};
const statusIsFinished = async (req, res, next) => {
    const reservation = res.locals.reservation;
    if (reservation.status === "finished") {
        return next({
            status: 400,
            message: `Reservation is finished and cannot be updated.`,
        });
    }
    next();
};
const bodyHasStatusProperty = (req, res, next) => {
    const { data } = req.body;
    if (!data || !data["status"]) {
        return next({
            status: 400,
            message: `Body needs a status property.`,
        });
    }
    res.locals.data = data;
    next();
};
const reservationStatusIsValid = async (req, res, next) => {
    const { data: { status } } = req.body;
    if (!validReservationStatuses.includes(status)) {
        return next({
            status: 400,
            message: `Reservation status "${status}" is invalid.`,
        });
    }
    res.locals.status = status;
    next();
};
const reservationStatusIsValidForCreationEditing = async (req, res, next) => {
    const { data: { status = null } = {} } = req.body;
    if (status && status !== "booked") {
        return next({
            status: 400,
            message: `"${status}" status invalid for creation/editing of reservation.`,
        });
    }
    next();
};
const statusIsNotBooked = async (req, res, next) => {
    const { reservation } = res.locals;
    if (reservation.status !== "booked") {
        return next({
            status: 400,
            message: `Reservation status must be "booked" to edit it. Status is currently "${reservation.status}". `,
        });
    }
    next();
};
export default {
    list: [asyncErrorBoundary(list)],
    create: [
        bodyHasRequiredProperties(requiredProperties),
        peoplePropertyIsPositive,
        reservationDateIsValid,
        reservationTimeIsValid,
        reservationIsFutureAndRestaurantIsOpen,
        reservationStatusIsValidForCreationEditing,
        asyncErrorBoundary(create),
    ],
    read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
    updateStatus: [
        asyncErrorBoundary(reservationExists),
        bodyHasStatusProperty,
        statusIsFinished,
        reservationStatusIsValid,
        asyncErrorBoundary(updateStatus),
    ],
    update: [
        asyncErrorBoundary(reservationExists),
        bodyHasRequiredProperties(requiredProperties),
        peoplePropertyIsPositive,
        reservationDateIsValid,
        reservationTimeIsValid,
        reservationIsFutureAndRestaurantIsOpen,
        reservationStatusIsValidForCreationEditing,
        statusIsNotBooked,
        asyncErrorBoundary(update),
    ],
};
