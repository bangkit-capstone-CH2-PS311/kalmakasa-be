const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createJournal = {
	body: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
		date: Joi.date().required(),
		emotionScale: Joi.number().required().min(1).max(5),
		content: Joi.string().required(),
		sentimentResult: Joi.string(),
	}),
};

const getJournals = {
	query: Joi.object().keys({
		userId: Joi.string().custom(objectId),
		date: Joi.date(),
		emotionScale: Joi.number().min(1).max(5),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getJournal = {
	params: Joi.object().keys({
		journalId: Joi.string().required().custom(objectId),
	}),
};

module.exports = {
	createJournal,
	getJournals,
	getJournal,
};
