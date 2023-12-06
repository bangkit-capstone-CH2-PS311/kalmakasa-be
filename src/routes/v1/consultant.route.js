const express = require('express');
const validate = require('../../middlewares/validate');
const consultantValidation = require('../../validations/consultant.validation');
const consultantController = require('../../controllers/consultant.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(consultantValidation.createConsultant), consultantController.createConsultant)
  .get(validate(consultantValidation.getConsultants), consultantController.getConsultants);

router
  .route('/:consultantId')
  .get(validate(consultantValidation.getConsultant), consultantController.getConsultant)
  .patch(validate(consultantValidation.updateConsultant), consultantController.updateConsultant)
  .delete(validate(consultantValidation.deleteConsultant), consultantController.deleteConsultant);

module.exports = router;

