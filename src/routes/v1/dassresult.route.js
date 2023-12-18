const express = require("express");
const validate = require("../../middlewares/validate");
const dassresultValidation = require("../../validations/dassresult.validation");
const dassresultController = require("../../controllers/dassresult.controller");

const router = express.Router();

router
	.route("/")
	.post(
		validate(dassresultValidation.inputDassScore),
		dassresultController.createDassResult
	)
	.get(
		validate(dassresultValidation.getDassResults),
		dassresultController.getDassResults
	);

router
	.route("/:dassresultId")
	.get(
		validate(dassresultValidation.getDassResult),
		dassresultController.getDassResultById
	);

module.exports = router;
