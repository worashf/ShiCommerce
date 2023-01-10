const express = require('express');
const router = express.Router();
const {
  getProducts,
  newProduct,
  productDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts

} = require('../controllers/productController');
const {isAuthenticatedUser} = require("../middlewares/auth")
router.route('/products').get(getProducts);
router.route('/products/:id').get(productDetails);
router.route('/admin/products/new').post(isAuthenticatedUser, newProduct);
router.route('/admin/products/:id').put(isAuthenticatedUser, updateProduct);
router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts)
router.route('/admin/products/:id').delete(isAuthenticatedUser, deleteProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(isAuthenticatedUser, getProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, deleteProductReview)

module.exports = router;
