const { User } = require('../database/models');
const { generateJwtToken } = require('../utils/jwt');
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

  const newUser = await User.create(user);

  console.log(newUser);

  const userResult = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };

  const token = generateJwtToken(userResult);

  return { ...userResult, token };
};

module.exports = created;