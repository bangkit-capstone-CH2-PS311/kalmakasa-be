const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { reservationService } = require('../services');

const createReservation = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    consultantId: Joi.string().required().custom(objectId),
    consultant: Joi.string().required().custom(objectId),
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    notes: Joi.string(),
    commonIssues: Joi.string(),
    psychologicalDynamics: Joi.string(),
    triggers: Joi.string(),
    recommendation: Joi.string(),
  }),
};

const createMeetingLink = {
  params: Joi.object().keys({
    reservationId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    consultantId: Joi.string().required().custom(objectId),
    userId: Joi.string().required().custom(objectId),
  })
};

const updateReservation = {
  params: Joi.object().keys({
    reservationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId),
      consultantId: Joi.string().custom(objectId),
      date: Joi.date(),
      startTime: Joi.string(),
      endTime: Joi.string(),
      notes: Joi.string(),
      commonIssues: Joi.string(),
      psychologicalDynamics: Joi.string(),
      triggers: Joi.string(),
      recommendation: Joi.string(),
      status: Joi.string(),
    })
    .min(1),
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
  createMeetingLink,
  updateReservation,
  getReservations,
  getReservation,
};
