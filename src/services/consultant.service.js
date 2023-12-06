const httpStatus = require('http-status');
const { Consultant } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a consultant
 * @param {Object} consultantBody
 * @returns {Promise<Consultant>}
 */
const createConsultant = async (consultantBody) => {
  return Consultant.create(consultantBody);
};

/**
 * Get list of consultants
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getConsultants = async (filter, options) => {
  const consultants = await Consultant.paginate(filter, options);
  return consultants;
};

/**
 * Get consultant by ID
 * @param {ObjectId} consultantId
 * @returns {Promise<Consultant>}
 */
const getConsultantById = async (consultantId) => {
  return Consultant.findById(consultantId);
};

/**
 * Update consultant by ID
 * @param {ObjectId} consultantId
 * @param {Object} updateBody
 * @returns {Promise<Consultant>}
 */
const updateConsultantById = async (consultantId, updateBody) => {
  const consultant = await getConsultantById(consultantId);
  if (!consultant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Consultant not found');
  }
  Object.assign(consultant, updateBody);
  await consultant.save();
  return consultant;
};

/**
 * Delete consultant by ID
 * @param {ObjectId} consultantId
 * @returns {Promise<Consultant>}
 */
const deleteConsultantById = async (consultantId) => {
  const consultant = await getConsultantById(consultantId);
  if (!consultant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Consultant not found');
  }
  await consultant.remove();
  return consultant;
};

module.exports = {
  createConsultant,
  getConsultants,
  getConsultantById,
  updateConsultantById,
  deleteConsultantById,
};
