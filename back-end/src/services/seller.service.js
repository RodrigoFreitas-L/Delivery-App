const { User } = require('../database/models');

const findSellers = async () => {
  const findAllSellers = await User.findAll({ where: { role: 'seller' } });
  return findAllSellers;
};

module.exports = { findSellers };