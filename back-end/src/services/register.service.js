const { User } = require('../database/models');

const created = async (user) => {
  const { name, email } = await User.create(user);
  return { name, email };
};

module.exports = created;