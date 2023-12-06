const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { journalService } = require("../services");

const createJournal = catchAsync(async (req, res) => {
	const journal = await journalService.createJournal(req.body);
	res.status(httpStatus.CREATED).send(journal);
});

const getJournals = catchAsync(async (req, res) => {
	const filter = pick(req.query, ["userId", "date", "title"]);
	const options = pick(req.query, ["sortBy", "limit", "page"]);
	const result = await journalService.getJournals(filter, options);
	res.send(result);
});

const getJournalById = catchAsync(async (req, res) => {
	const journal = await journalService.getJournalById(req.params.journalId);
	if (!journal) {
		throw new ApiError(httpStatus.NOT_FOUND, "Journal not found");
	}
	res.send(journal);
});

module.exports = {
	createJournal,
	getJournals,
	getJournalById,
};
