const express = require('express');

const router = express.Router();
const loginService = require('../services/login.service');

router.post('/', async (req, res) => {
  const token = await loginService.loginAuthenticate(req.body);
  return res.status(200).json(token);
});

module.exports = router;
