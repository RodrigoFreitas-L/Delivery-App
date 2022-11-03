const { Sale, SalesProduct, Product, User } = require('../database/models');
const error = require('../utils/error');

const userOrSellerNotExists = async (sale) => {
  const userId = await User.findByPk(sale.userId);
  const sellerId = await User.findByPk(sale.sellerId);
  
  if (!userId || !sellerId) throw error(404, 'User or Seller not exists!');
};

const productNotExists = async (sale) => {
  const promises = sale.products.map(async ({ productId }) => ({
    productId: await Product.findByPk(productId),
  }));

  const productNull = (await Promise.all(promises))
    .some(({ productId }) => productId === null);

  if (productNull) throw error(404, 'Product not exist!');
};

const create = async (sale) => {
  await userOrSellerNotExists(sale);
  await productNotExists(sale);

  const newSale = await Sale.create(sale);

  sale.products.map(({ productId, quantity }) => (
    SalesProduct.create({
      saleId: newSale.id,
      productId,
      quantity,
    })
  ));

  return { orderId: newSale.dataValues.id };
};

module.exports = {
  create,
};
