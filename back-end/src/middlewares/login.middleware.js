const { authenticateJwtToken } = require('../utils/jwt');
const error = require('../utils/error');

const loginAuthenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const user = authenticateJwtToken(token);

  req.user = user;

  return next();
};

const loginValidationMiddleware = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw error(404, 'Fields email or password not found!');
  }

  return next();
};

module.exports = {
  loginAuthenticateMiddleware,
  loginValidationMiddleware,
};
