const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const dassResultSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			trim: true,
		},
		questionScore: {
			type: [Number],
			required: true,
			trim: true,
		},
		depression: {
			type: Number,
			required: false,
			trim: true,
		},
		anxiety: {
			type: Number,
			required: false,
			trim: true,
		},
		stress: {
			type: Number,
			required: false,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

//add plugin that converts mongoose to json
dassResultSchema.plugin(toJSON);
dassResultSchema.plugin(paginate);

/**
 * @typedef DassResult
 */
const DassResult = mongoose.model("DassResult", dassResultSchema);

module.exports = DassResult;
