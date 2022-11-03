const { Sale, Product, User } = require('../database/models');
const error = require('../utils/error');

const orderDetails = async (orderId) => (
  Sale.findByPk(orderId, {
    include: [
      { model: User, as: 'customer' },
      { model: User, as: 'seller' },
      { model: Product, as: 'products' },
    ],
  })
);

const findOrderDetailsByPk = async (orderId) => {
  const order = await orderDetails(orderId);
  
  if (!order) throw error(404, 'Order not exisits!');

  return order;
};

const userOrders = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      { 
        attributes: { exclude: ['seller_id', 'user_id'] },
        model: Sale,
        as: 'orders',
      },
    ],
  });

  if (!userId || user.role === 'administrator' || user.role === 'seller') {
    throw error(404, 'User not exisits!');
  }

  return user;
};

const findUserOrdersByPk = async (userId) => {
  const order = await userOrders(userId);
  return order;
};

module.exports = {
  findOrderDetailsByPk,
  findUserOrdersByPk,
};
