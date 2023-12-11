const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const consultantSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
    },
    patients: {
      type: Number,
    },
    bio: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    speciality: [
      {
        type: String,
        trim: true,
      },
    ],
    // Add any other fields you want to include in the model
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
consultantSchema.plugin(toJSON);
consultantSchema.plugin(paginate);

/**
 * @typedef Consultant
 */
const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
