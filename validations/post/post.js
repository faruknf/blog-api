const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(3).max(64).required(),
  text: Joi.string().required(),
});

module.exports = schema;
