const express = require('express');
const Created = require('../services/register.service');

const router = express.Router();

router.post('/', async (req, res) => {
  const created = await Created(req.body);
  return res.status(201).json(created);
});

module.exports = router;