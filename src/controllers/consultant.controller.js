const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { consultantService } = require('../services');

const createConsultant = catchAsync(async (req, res) => {
  const consultant = await consultantService.createConsultant(req.body);
  res.status(httpStatus.CREATED).send(consultant);
});

const getConsultants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullname', 'title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await consultantService.getConsultants(filter, options);
  res.send(result);
});

const getConsultant = catchAsync(async (req, res) => {
  const consultant = await consultantService.getConsultantById(req.params.consultantId);
  if (!consultant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Consultant not found');
  }
  res.send(consultant);
});

const updateConsultant = catchAsync(async (req, res) => {
  const consultant = await consultantService.updateConsultantById(req.params.consultantId, req.body);
  res.send(consultant);
});

const deleteConsultant = catchAsync(async (req, res) => {
  await consultantService.deleteConsultantById(req.params.consultantId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createConsultant,
  getConsultants,
  getConsultant,
  updateConsultant,
  deleteConsultant,
};
