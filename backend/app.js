const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require ("./routes/order")
const errorMidleWare = require('./middlewares/error');

// const { request } = require('express');
app.use(express.json());
app.use(cookieParser())
// product route
app.use('/api/v1', products);
//user authentiction
app.use('/api/v1', auth);
//order routes
app.use("/api/v1", order)
//error handeler middleware
app.use(errorMidleWare);
module.exports = app;
