const express = require('express');
const router = express.Router();
const {
  getProducts,
  newProduct,
  productDetails,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/products/:id').get(productDetails);
router.route('/admin/products/new').post(newProduct);
router.route('/admin/products/:id').put(updateProduct);
router.route('/admin/products/:id').delete(deleteProduct);

module.exports = router;
