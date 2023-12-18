const httpStatus = require("http-status");
const { DassResult } = require("../models");

/**
 *
 * @param {Object} dassResultBody
 * @returns {Promise<DassResult>}
 */

const createDassResult = async (dassResultBody) => {
	// Extract necessary data from the request body
	const { userId, questionScore } = dassResultBody;

	// Calculate scores for depression, anxiety, and stress
	const depressionQuestions = [3, 5, 10, 13, 16, 17, 21];
	const anxietyQuestions = [2, 4, 7, 9, 15, 19, 20];
	const stressQuestions = [1, 6, 8, 11, 12, 14, 18];

	const calculateScore = (questions, questionScore) =>
		questions.reduce(
			(sum, questionNumber) => sum + questionScore[questionNumber - 1],
			0
		);

	const depression = calculateScore(depressionQuestions, questionScore);
	const anxiety = calculateScore(anxietyQuestions, questionScore);
	const stress = calculateScore(stressQuestions, questionScore);

	// Create a new DassResult object with the calculated scores
	const newDassResult = {
		userId,
		questionScore,
		depression,
		anxiety,
		stress,
	};

	// Save the newDassResult object to the database
	return DassResult.create(newDassResult);
};

/**
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */

const getDassResults = async (filter, options) => {
	const dassResults = await DassResult.paginate(filter, options);
	return dassResults;
};

/**
 *
 * @param {ObjectId} dassResultId
 * @returns {Promise<DassResult>}
 */
const getDassResultById = async (dassResultId) => {
	return DassResult.findById(dassResultId);
};

/**
 *
 * @param {ObjectId} dassResultId
 * @param {Object} updateBody
 * @returns {Promise<DassResult>}
 */
const updateDassResultById = async (dassResultId, updateBody) => {
	const dassResult = await getDassResultById(dassResultId);
	if (!dassResult) {
		throw new ApiError(httpStatus.NOT_FOUND, "DassResult not found");
	}
	Object.assign(dassResult, updateBody);
	await dassResult.save();
	return dassResult;
};

module.exports = {
	createDassResult,
	getDassResults,
	getDassResultById,
	updateDassResultById,
};
