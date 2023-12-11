const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createConsultant = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    fullname: Joi.string().required(),
    title: Joi.string(),
    experience: Joi.number(),
    patients: Joi.number(),
    bio: Joi.string(),
    rating: Joi.number(),
    speciality: Joi.array().items(Joi.string()),
    // Add any other fields you want to include in the validation
  }),
};

const getConsultants = {
  query: Joi.object().keys({
    fullname: Joi.string(),
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getConsultant = {
  params: Joi.object().keys({
    consultantId: Joi.string().required().custom(objectId),
  }),
};

const updateConsultant = {
  params: Joi.object().keys({
    consultantId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId),
      fullname: Joi.string(),
      title: Joi.string(),
      experience: Joi.number(),
      patients: Joi.number(),
      bio: Joi.string(),
      rating: Joi.number(),
      // Add any other fields you want to include in the validation
    })
    .min(1),
};

const deleteConsultant = {
  params: Joi.object().keys({
    consultantId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createConsultant,
  getConsultants,
  getConsultant,
  updateConsultant,
  deleteConsultant,
};
