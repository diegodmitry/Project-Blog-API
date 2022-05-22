const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

// Req 3
const generateToken = (dataValues) => jwt.sign(dataValues, process.env.JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '31d',
});

const fieldLoginValidation = async (email, password) => {
  const { error } = Joi.object({
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate({ email, password });
  if (error) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  // check if there are email and passwd on db
  const hasUser = await User.findOne({ where: { email, password } });
  if (!hasUser) return { status: 400, message: 'Invalid fields' };

  const token = generateToken(hasUser.dataValues);

  return { status: 200, token };
};

const loginValidation = async (email, password) => {
  // Req 3
  const isLoginOK = await fieldLoginValidation(email, password);
  return isLoginOK;
};

module.exports = { loginValidation };