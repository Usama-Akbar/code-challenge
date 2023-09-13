const Joi = require("joi");

const sector_schema = Joi.object({
  name: Joi.string().required(),
  sector: Joi.string().required(),
  agreedTerms: Joi.boolean().required(),
});

module.exports = sector_schema;
