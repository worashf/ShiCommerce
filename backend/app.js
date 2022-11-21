const express = require('express');
const app = express();

const products = require('./routes/product');
const errorMidleWare = require('./middlewares/error');
app.use(express.json());

// product route
app.use('/api/v1', products);

//error handeler middleware
app.use(errorMidleWare);
module.exports = app;
