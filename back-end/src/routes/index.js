const express = require('express');
const router = express.Router();
const { authValidationMiddleware } = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');

router.use('/auth', authValidationMiddleware, authController);
router.use('/products', productController);

module.exports = router;
