const express = require('express');
const md5 = require('md5');
const registerService = require('../services/register.service');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password: md5(password) };
  const createRegister = await registerService.create(user);
  return res.status(201).json(createRegister);
});

module.exports = router;
