const express = require('express');

const router = express.Router();
const { authValidationMiddleware } = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const registerController = require('../controllers/register.controller');
const sellerController = require('../controllers/seller.controller');

router.use('/login', authValidationMiddleware, authController);
router.use('/products', productController);
router.use('/register', registerController);
router.use('/sellers', sellerController);

module.exports = router;
