const express = require('express');
const sellerSaleService = require('../services/seller.sale.service');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const saleDetails = await sellerSaleService.findSaleDetailsByPk(req.params.id);
  return res.status(200).json(saleDetails);
});

router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const saleDetails = await sellerSaleService.updateSaleStatusByPk(req.params.id, status);
  return res.status(204).send();
});

router.get('/', async (req, res) => {
  const userOrders = await sellerSaleService.findUserSalesByPk(req.query.userId);
  return res.status(200).json(userOrders);
});

module.exports = router;
