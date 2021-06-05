const Joi = require("@hapi/joi");

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

//Login Validation

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
