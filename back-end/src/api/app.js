require('express-async-errors');
const express = require('express');
const { join } = require('path');
const routes = require('../routes');
const cors = require('cors');

const errorMiddleware = require('../middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/images', express.static(join(__dirname, './../../public/images')));
app.use(errorMiddleware);

module.exports = app;
