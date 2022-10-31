const express = require('express');
const Created = require('../services/register.service');
const md5 = require('md5');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password: md5(password)}
  const created = await Created(user);
  return res.status(201).json(created);
});

module.exports = router;