const express = require('express');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const multer = require("multer");
const upload = multer();
const cors = require("cors")

const app = express();

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require ("./routes/order")
const errorMidleWare = require('./middlewares/error');





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
// for parsing multipart/form-data
app.use(upload.array());
// product route
app.use('/api/v1', products);
//user authentiction
app.use('/api/v1', auth);
//order routes
app.use("/api/v1", order)
//error handeler middleware
app.use(errorMidleWare);
module.exports = app;
