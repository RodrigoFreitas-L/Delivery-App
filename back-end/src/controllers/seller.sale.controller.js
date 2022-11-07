const express = require('express');
const sellerSaleService = require('../services/seller.sale.service');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const saleDetails = await sellerSaleService.findSaleDetailsByPk(req.params.id);
  return res.status(200).json(saleDetails);
});

router.get('/', async (req, res) => {
  const userOrders = await sellerSaleService.findUserSalesByPk(req.query.userId);
  return res.status(200).json(userOrders);
});

module.exports = router;
