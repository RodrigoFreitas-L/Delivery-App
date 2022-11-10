const express = require('express');

const router = express.Router();
const { loginValidationMiddleware } = require('../middlewares/login.middleware');

const loginController = require('../controllers/login.controller');
const productController = require('../controllers/product.controller');
const registerController = require('../controllers/register.controller');
const checkoutController = require('../controllers/checkout.controller');
const customerOrderController = require('../controllers/customer.order.controller');
const sellerController = require('../controllers/seller.controller');
const sellerSaleController = require('../controllers/seller.sale.controller');

router.use('/login', loginValidationMiddleware, loginController);
router.use('/register', registerController);
router.use('/products', productController);
router.use('/sellers', sellerController);
router.use('/checkout', checkoutController);
router.use('/customer/orders', customerOrderController);
router.use('/seller/orders', sellerSaleController);

module.exports = router;
