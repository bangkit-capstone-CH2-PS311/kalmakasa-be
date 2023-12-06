const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reservationService } = require('../services');

const createReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.createReservation(req.body);
  res.status(httpStatus.CREATED).send(reservation);
});

const getReservations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'consultantId', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reservationService.getReservations(filter, options);
  res.send(result);
});

const getReservationById = catchAsync(async (req, res) => {
  const reservation = await reservationService.getReservationById(req.params.reservationId);
  if (!reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  }
  res.send(reservation);
});

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
};
