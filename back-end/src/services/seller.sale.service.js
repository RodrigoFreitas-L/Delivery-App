const { Sale, Product, User } = require('../database/models');
const error = require('../utils/error');

const saleDetails = async (saleId) => (
  Sale.findByPk(saleId, {
    include: [
      { model: User, as: 'seller' },
      { model: User, as: 'customer' },
      { model: Product, as: 'products' },
    ],
  })
);

const findSaleDetailsByPk = async (saleId) => {
  const sale = await saleDetails(saleId);
  
  if (!sale) throw error(404, 'sale not exists!');

  return sale;
};

const userSales = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      { 
        attributes: { exclude: ['seller_id', 'user_id'] },
        model: Sale,
        as: 'sales',
      },
    ],
  });

  if (!userId || user.role === 'administrator' || user.role === 'customer') {
    throw error(404, 'User not exists!');
  }

  return user;
};

const findUserSalesByPk = async (userId) => {
  const sales = await userSales(userId);
  return sales;
};

const updateSaleStatusByPk = async (id, status) => {
  const response = await Sale.update({ status }, { where: { id } });

  return response;
};

module.exports = {
  findUserSalesByPk,
  findSaleDetailsByPk,
  updateSaleStatusByPk,
};
