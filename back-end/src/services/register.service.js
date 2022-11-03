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

const create = async (user) => {
  const { email: newEmail, name: newName } = user;
  const verifyT = await verify(newEmail, newName);
  
  if (verifyT) {
    throw error(409, 'User already exists!');
  }

  const newUser = await User.create(user);
  const findUser = await User.findByPk(newUser.id);
  
  const userResult = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
    role: findUser.role,
  };

  const token = generateJwtToken(userResult);

  return { ...userResult, token };
};

module.exports = {
  create,
};
