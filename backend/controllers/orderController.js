
const Order = require("../models/order")
const Product = require("../models/product")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// Create  new order =>  /api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user:req.user._id
    })
    
    if (!order) {
         return next( new ErrorHandler("Some thing went wrong, Order does not created",401))
    }

    res.status(200).json({
        success: true, 
        order
    })

})

// Get single order = > /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user",'name email')
    if (!order) {
        return  next(new ErrorHandler(`No oder found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true, 
        order
   }) 
})


 // Get logged in user order = > /api/v1/order/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user.id})
    if (!orders) {
        return  next(new ErrorHandler(`No oders found for: ${req.user.email}`))
    }
    res.status(200).json({
        success: true, 
        orders
   }) 
})

//Admin get all orders =>  /api/v1/admin/orders

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true, 
        totalAmount,
        orders,
   })
})

//Admin update process order =>  /api/v1/admin/order/:id

exports.updateProcessOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order",400))
    }
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })
    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now()
    await order.save()


    res.status(200).json({
        success: true, 
        order

   })
})

// Admin delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    
    if (!order) {
        return  next(new ErrorHandler(`No order found with id: ${req.params.id}`))  
    }
    await order.remove()
    
    res.status(200).json({
        success: true, 

   })
})



//helper funtion
async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock = product.stock - quantity
     await product.save({validateBeforeSave:false})
}