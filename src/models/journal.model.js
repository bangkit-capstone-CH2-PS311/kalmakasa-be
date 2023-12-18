const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const journalSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			trim: true,
		},
		date: {
			type: Date,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		emotionScale: {
			type: Number,
			required: true,
			trim: true,
			min: 1,
			max: 5,
		},
		sentimentResult: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

//add plugin that converts mongoose to json
journalSchema.plugin(toJSON);
journalSchema.plugin(paginate);

/**
 * @typedef Journal
 */
const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
