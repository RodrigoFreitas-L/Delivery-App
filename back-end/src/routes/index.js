const express = require('express');

const router = express.Router();
const { authValidationMiddleware } = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const registerController = require('../controllers/register.controller');

router.use('/login', authValidationMiddleware, authController);
router.use('/products', productController);
router.use('/register', registerController);

module.exports = router;
