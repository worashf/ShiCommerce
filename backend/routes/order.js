const express = require("express")
const router = express.Router()

const { newOrder,getSingleOrder,myOrders, getAllOrders } = require("../controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

 router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
router.route("/order/me").get(isAuthenticatedUser, myOrders)
//admin routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
module.exports = router