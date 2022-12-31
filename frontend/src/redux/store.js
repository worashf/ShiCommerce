
import { configureStore} from "@reduxjs/toolkit"
import { productReducer, productDetailReducer } from "./reducers/productReducer"
import { authReducer, userReducer, forgotPassword } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { orderReducer,myOrderReducer } from "./reducers/orderReducer"

const preLoadedCartState = {
  cart: {
     cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): []
   }
 }

const rootReducer = {
  products: productReducer,
  product: productDetailReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrderReducer
}
const store = configureStore({
  reducer: rootReducer,
  preLoadedCartState
})

export default store

