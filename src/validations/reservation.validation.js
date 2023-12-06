const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReservation = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    consultantId: Joi.string().required().custom(objectId),
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    notes: Joi.string(),
  }),
};

const getReservations = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    consultantId: Joi.string().custom(objectId),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReservation = {
  params: Joi.object().keys({
    reservationId: Joi.string().required().custom(objectId),
  }),
};


module.exports = {
  createReservation,
  getReservations,
  getReservation,
};
