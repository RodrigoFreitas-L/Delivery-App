const { User } = require('../database/models');

const findAll = async () => {
  const sellers = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { role: 'seller' },
  });
  return sellers;
};

module.exports = {
  findAll,
};
