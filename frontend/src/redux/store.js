
import { configureStore} from "@reduxjs/toolkit"
import { productReducer, productDetailReducer, newReviewReducer, productActionReducer,newProductReducer,productReviewsReducer,reviewReducer} from "./reducers/productReducer"
import { authReducer, userReducer, forgotPassword, allUsersReducer,userDetailsReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { orderReducer,myOrderReducer,orderDetailsReducer, allOrdersReducer, orderActionReducer } from "./reducers/orderReducer"

const preLoadedCartState = {
  cart: {
     cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): []
   }
 }

const rootReducer = {
  products: productReducer,
  newProduct: newProductReducer,
  product: productDetailReducer,
  productAction: productActionReducer,
  auth: authReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrderReducer,
  orderDetail: orderDetailsReducer,
  allOrders: allOrdersReducer,
  orderAction: orderActionReducer,
  review: newReviewReducer,
  productReviews: productReviewsReducer,
  reviewAction: reviewReducer,
}
const store = configureStore({
  reducer: rootReducer,
  preLoadedCartState
})

export default store

