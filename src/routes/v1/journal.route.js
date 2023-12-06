const express = require("express");
const validate = require("../../middlewares/validate");
const journalValidation = require("../../validations/journal.validation");
const journalController = require("../../controllers/journal.controller");

const router = express.Router();

router
	.route("/")
	.post(
		validate(journalValidation.createJournal),
		journalController.createJournal
	)
	.get(
		validate(journalValidation.getJournals),
		journalController.getJournals
	);

router
	.route("/:journalId")
	.get(
		validate(journalValidation.getJournal),
		journalController.getJournalById
	);

module.exports = router;
