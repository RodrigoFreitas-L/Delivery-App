const md5 = require('md5');
const { User } = require('../database/models');
const { generateJwtToken } = require('../utils/jwt');
const error = require('../utils/error');

const authenticate = async ({ email, password }) => {
  const pass = md5(password);

  const user = await User.findOne({
    where: { email, password: pass },
  });

  if (!user) {
    throw error(404, 'User not found!');
  }

  const userResult = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = generateJwtToken(userResult);
  return { ...userResult, token };
};

module.exports = {
  authenticate,
};
