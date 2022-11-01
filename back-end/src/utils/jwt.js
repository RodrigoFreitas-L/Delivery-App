require('dotenv').config();
const jwtKey = require('fs')
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

  const jwt = require('jsonwebtoken');
  const error = require('./error');
  
  const jwtConfig = {
    algorithm: 'HS256',
    noTimestamp: true,
  };

const generateJwtToken = (payload) =>
  jwt.sign(payload, jwtKey, jwtConfig);

const authenticateJwtToken = (token) => {
  if (!token) {
    throw error(401, 'token not exists');
  }

  try {
    return jwt.verify(token, jwtKey);
  } catch (e) {
    throw error(401, 'token malformed');
  }
};

module.exports = {
  generateJwtToken,
  authenticateJwtToken,
};
