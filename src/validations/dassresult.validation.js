const Joi = require("joi");
const { objectId } = require("./custom.validation");

const inputDassScore = {
	body: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
		questionScore: Joi.array().items(Joi.number().required()).length(21),
	}),
};

const getDassResult = {
	query: Joi.object().keys({
		userId: Joi.string().custom(objectId),
		deppression: Joi.number(),
		anxiety: Joi.number(),
		stress: Joi.number(),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getDassResultById = {
	params: Joi.object().keys({
		dassResultId: Joi.string().required().custom(objectId),
	}),
};

module.exports = {
	inputDassScore,
	getDassResult,
	getDassResultById,
};
