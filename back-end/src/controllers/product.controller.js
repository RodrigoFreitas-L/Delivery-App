const express = require('express');

const router = express.Router();
const productService = require('../services/product.service');

router.get('/', async (_req, res) => {
  const products = await productService.findAll();
  return res.status(200).json(products);
});

module.exports = router;