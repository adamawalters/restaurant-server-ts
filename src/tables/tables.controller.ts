/**
 * List handler for table resources
 */

import service from "./tables.service";
import asyncErrorBoundary from "../errors/asyncErrorBoundary";
import { RequestHandler } from "express";
import { UpdateReservationBody } from "../reservations/reservations.controller";

/* Interfaces */

export interface FullTable {
  table_id: string;
  table_name: string;
  capacity: number;
  reservation_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTable {
  table_name: string;
  capacity: number;
}

const list: RequestHandler = async (req, res) => {
  const { available } = req.query;
  if (available === "true") {
    res.json({
      data: await service.listAvailable(),
    });
  } else {
    res.json({
      data: await service.list(),
    });
  }
};

const create: RequestHandler = async (req, res) => {
  const { data } = res.locals;
  const response = await service.create(data);
  res.status(201).json({ data: response, otherkey: "other!" });
};

const update: RequestHandler = async (req, res) => {
  const { data } = res.locals;
  const { table } = res.locals;

  const response = await service.update(data.reservation_id, table.table_id);

  res.json({ data: response });
};

const deleteReservation: RequestHandler = async (req, res) => {
  const { table } = res.locals;
  const response = await service.deleteReservation(
    table.table_id,
    table.reservation_id
  );
  res.json({ data: response });
};

/*Validation functions  */

const requiredProperties: string[] = ["table_name", "capacity"];
const requiredReservationProperties: string[] = ["reservation_id"];

function bodyHasRequiredProperties(propertiesList: string[]) {
  const checker: RequestHandler = (req, res, next) => {
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

const tableCapacityIsANumber: RequestHandler = (req, res, next) => {
  const {
    data: { capacity },
  } = res.locals;
  if (typeof capacity !== "number" || isNaN(capacity)) {
    return next({
      status: 400,
      message: `capacity must be a number.`,
    });
  }

  next();
};

const tableExists: RequestHandler<{ table_id: string }> = async (
  req,
  res,
  next
) => {
  const { table_id } = req.params;

  const response = await service.read(table_id);

  if (response) {
    res.locals.table = response;
    return next();
  }

  next({
    status: 404,
    message: `table_id ${table_id} not found.`,
  });
};

const reservationExists: RequestHandler = async (req, res, next) => {
  const { reservation_id } = res.locals.data as UpdateReservationBody;
  const response = await service.readReservation(reservation_id);

  if (response) {
    res.locals.reservation = response;
    return next();
  }

  return next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist.`,
  });
};

const tableIsOccupied: RequestHandler = (req, res, next) => {
  const table = res.locals.table as FullTable;

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: `Table ${table.table_id} is not occupied.`,
    });
  }

  next();
};

const tableSeatsReservation: RequestHandler = (req, res, next) => {
  const table = res.locals.table as FullTable;
  const reservation = res.locals.reservation as UpdateReservationBody;

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: `Table ${table.table_id} has capacity ${table.capacity} but reservation is for ${reservation.people} people.`,
    });
  }

  next();
};

const tableIsUnoccupied: RequestHandler = async (req, res, next) => {
  const table = res.locals.table as FullTable;

  if (table.reservation_id) {
    return next({
      status: 400,
      message: `Table ${table.table_id} is occupied.`,
    });
  }

  next();
};

const tableNameIsTwoCharsOrMore: RequestHandler = (req, res, next) => {
  const { table_name } = res.locals.data as FullTable;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: `Length of table_name must be at least 2 characters.`,
    });
  }
  next();
};

const tableCapacityIsAtLeastOne: RequestHandler = (req, res, next) => {
  const { capacity } = res.locals.table as FullTable;
  if (capacity < 1) {
    return next({
      status: 400,
      message: `capacity must be at least 1.`,
    });
  }
  next();
};

const reservationIsSeated: RequestHandler = (req, res, next) => {
  const reservation = res.locals.reservation as UpdateReservationBody;
  if (reservation.status === "seated") {
    next({
      status: 400,
      message: `Reservation ${reservation.reservation_id} is already seated.`,
    });
  }

  next();
};

export default {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyHasRequiredProperties(requiredProperties),
    tableNameIsTwoCharsOrMore,
    tableCapacityIsANumber,
    tableCapacityIsAtLeastOne,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    bodyHasRequiredProperties(requiredReservationProperties),
    asyncErrorBoundary(reservationExists),
    tableSeatsReservation,
    tableIsUnoccupied,
    reservationIsSeated,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(deleteReservation),
  ],
};
