const express = require('express');
const customerOrderService = require('../services/customer.order.service');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const orderDetails = await customerOrderService.findOrderDetailsByPk(req.params.id);
  return res.status(200).json(orderDetails);
});

router.get('/', async (req, res) => {
  const userOrders = await customerOrderService.findUserOrdersByPk(req.query.userId);
  return res.status(200).json(userOrders);
});

module.exports = router;
