const express = require('express');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const multer = require("multer");
const upload = multer();
const cors = require("cors")
const path = require('path')
const { expressCspHeader } = require('express-csp-header');

const app = express();

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require("./routes/order")
const payment = require("./routes/payment")
const errorMidleWare = require('./middlewares/error');
const env = require("dotenv")

env.config({ path: 'backend/config/config.env' })
// app.use(expressCspHeader({ 
//     policies: { 
//         'default-src': [expressCspHeader.NONE], 
//         'img-src': [expressCspHeader.SELF], 
//         'script-src': [expressCspHeader.SELF], 

//     } 
// })); 

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
app.use('/api/v1', order)
//payment routes
app.use('/api/v1', payment)
//error handeler middleware


if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
app.use(errorMidleWare);
module.exports = app;
