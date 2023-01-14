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
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
router.route('/products').get(getProducts);
router.route('/products/:id').get(productDetails);
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route('/admin/products/:id').put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct);
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"), getAdminProducts)
router.route('/admin/products/:id').delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(isAuthenticatedUser, getProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, deleteProductReview)

module.exports = router;
