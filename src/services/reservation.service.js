const httpStatus = require('http-status');
const { Reservation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a reservation
 * @param {Object} reservationBody
 * @returns {Promise<Reservation>}
 */
const createReservation = async (reservationBody) => {
  return Reservation.create(reservationBody);
};

/**
 * Get list of reservations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getReservations = async (filter, options) => {
  const reservations = await Reservation.paginate(filter, {
      ...options,
      populate: [
        'userId',
        'consultantId'
      ]
  });
  return reservations;
};

const getReservationById = async (id) => {
  return Reservation.findById(id);
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
};
