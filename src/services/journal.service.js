const httpStatus = require("http-status");
const { Journal } = require("../models");

/**
 * Create a journal
 * @param {Object} journalBody
 * @returns {Promise<Journal>}
 */
const createJournal = async (journalBody) => {
	return Journal.create(journalBody);
};

/**
 * Get list of journals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */

const getJournals = async (filter, options) => {
	const journals = await Journal.paginate(filter, options);
	return journals;
};

/**
 * Get journal by ID
 * @param {ObjectId} journalId
 * @returns {Promise<Journal>}
 */
const getJournalById = async (journalId) => {
	return Journal.findById(journalId);
};

module.exports = {
	createJournal,
	getJournals,
	getJournalById,
};
