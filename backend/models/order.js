const modgoose = require("mongoose")
 
const orderShcema = modgoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required:true
        },
        city: {
            type: String,
            required:true
        },
        
    phoneNo: {
            type: String,
            required:true
        },
        postalCode: {
            type: String,
            required:true
        },
    country: {
            type: String,
            required:true
        },
       
    },
    user:{
        type: modgoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    orderItems: [
        {
            name: {
                type: String,
            required:true 
            },
            quantity: {
                 type: Number,
            required:true
            },
            image: {
                type: String,
                required:true
            },
            price: {
                type: Number,
                required:true
            },
            product: {
                type: modgoose.Schema.ObjectId,
                ref: "Product",
                required:true
            }
        }
    ],
    paymentInfo: {
        id: {
            type:String
        },
        status: {
            type:String
        },
     
    },
    paidAt: {
        type:Date
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true, 
        default:"Processing"
    },
    deliveredAt: {
        type:Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
        
    }
    
    

})

module.exports = modgoose.model("Order",orderShcema)