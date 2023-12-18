const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { dassResultService } = require("../services");
const { tokenService } = require("../services");

const createDassResult = catchAsync(async (req, res) => {
	const dassResult = await dassResultService.createDassResult(req.body);
	res.status(httpStatus.CREATED).send(dassResult);
});

const getDassResults = catchAsync(async (req, res) => {
	// get user login
	let token = req.headers.authorization;
	let userId = null;

	if (token) {
		token = token.replace("Bearer ", "");
		userId = await tokenService.getUserByToken(token);
	}

	let filter = pick(req.query, ["userId"]);
	if (userId) {
		filter = { ...filter, userId };
	}

	const options = pick(req.query, ["sortBy", "limit", "page"]);
	const result = await dassResultService.getDassResults(filter, options);
	res.send(result);
});

const getDassResultById = catchAsync(async (req, res) => {
	const dassResult = await dassResultService.getDassResultById(
		req.params.dassResultId
	);
	if (!dassResult) {
		throw new ApiError(httpStatus.NOT_FOUND, "DassResult not found");
	}
	res.send(dassResult);
});

module.exports = {
	createDassResult,
	getDassResults,
	getDassResultById,
};
