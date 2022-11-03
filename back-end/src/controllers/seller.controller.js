const express = require('express');

const router = express.Router();
const sellerService = require('../services/seller.service');

router.get('/', async (_req, res) => {
  const sellers = await sellerService.findAll();
  return res.status(200).json(sellers);
});

module.exports = router;