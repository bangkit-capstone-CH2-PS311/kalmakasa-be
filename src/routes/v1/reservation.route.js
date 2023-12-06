const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reservationValidation = require('../../validations/reservation.validation');
const reservationController = require('../../controllers/reservation.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(reservationValidation.createReservation), reservationController.createReservation)
  .get(validate(reservationValidation.getReservations), reservationController.getReservations);

router
  .route('/:reservationId')
  .get(validate(reservationValidation.getReservation), reservationController.getReservationById)

module.exports = router;
