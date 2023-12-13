const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const reservationSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			trim: true,
		},
		consultantId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Consultant",
			trim: true,
		},
		startTime: {
			type: String,
			required: true,
			trim: true,
		},
		endTime: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: Date,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			trim: true,
			default: "pending",
		},
		meetingLink: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
		commonIssues: {
			type: String,
			trim: true,
		},
		psychologicalDynamics: {
			type: String,
			trim: true,
		},
		triggers: {
			type: String,
			trim: true,
		},
		recommendation: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
reservationSchema.plugin(toJSON);
reservationSchema.plugin(paginate);

/**
 * @typedef Reservation
 */
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
