const express = require('express');

const router = express.Router();
const checkoutService = require('../services/checkout.service');

router.post('/', async (req, res) => {
  const createCheckout = await checkoutService.create(req.body);
  return res.status(201).json(createCheckout);
});

module.exports = router;
