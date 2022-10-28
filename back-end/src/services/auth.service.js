const md5 = require('md5');
const { User } = require('../database/models');
const { generateJwtToken } = require('../utils/jwt');
const error = require('../utils/error');

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'role', 'password'],
    where: { email },
  });

  if (!user || user.password !== md5(password)) {
    throw error(404, 'User not found!');
  }

  const userResult = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return generateJwtToken(userResult);
};

module.exports = {
  authenticate,
};