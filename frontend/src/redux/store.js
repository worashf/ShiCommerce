
import { configureStore} from "@reduxjs/toolkit"
import { productReducer, productDetailReducer } from "./reducers/productReducer"
import { authReducer,userReducer, forgotPassword} from "./reducers/userReducer"

const rootReducer = {
  products: productReducer,
  product: productDetailReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPassword
}
const store = configureStore({
  reducer:  rootReducer
})

export default store

