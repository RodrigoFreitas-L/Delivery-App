const { User } = require('../database/models');

const created = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

module.exports = created;