
import { configureStore} from "@reduxjs/toolkit"
import { productReducer, productDetailReducer, newReviewReducer, productActionReducer,newProductReducer} from "./reducers/productReducer"
import { authReducer, userReducer, forgotPassword, allUsersReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { orderReducer,myOrderReducer,orderDetailsReducer, allOrdersReducer } from "./reducers/orderReducer"

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
  allUsers: allUsersReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrderReducer,
  orderDetail: orderDetailsReducer,
  allOrders: allOrdersReducer,
  review: newReviewReducer
}
const store = configureStore({
  reducer: rootReducer,
  preLoadedCartState
})

export default store

