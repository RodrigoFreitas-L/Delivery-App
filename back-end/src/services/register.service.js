const { User } = require('../database/models');
const error = require('../utils/error');

const verify = async (emailP, nameP) => {
  const email = await User.findOne({ where: { email: emailP } });
  if (!email) return false;
  const name = await User.findOne({ where: { name: nameP } });
  if (!name) return false;
  return true;
};

const created = async (user) => {
  const { email: newEmail, name: newName } = user;
  const verifyT = await verify(newEmail, newName);
  
  if (verifyT) {
    throw error(409, 'Usuario já existe');
  }

  const { name, email } = await User.create(user);
  return { name, email };
};

module.exports = created;