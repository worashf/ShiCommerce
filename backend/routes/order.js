const express = require("express")
const router = express.Router()

const { newOrder,getSingleOrder,myOrders, getAllOrders,updateProcessOrder,deleteOrder } = require("../controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

 router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
router.route("/order/me").get(isAuthenticatedUser, myOrders)
//admin routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProcessOrder)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
module.exports = router