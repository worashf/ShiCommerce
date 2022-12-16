
import { configureStore} from "@reduxjs/toolkit"
import { productReducer, productDetailReducer } from "./reducers/productReducer"
import { authReducer } from "./reducers/userReducer"

const rootReducer = {
  products: productReducer,
  product: productDetailReducer,
  auth: authReducer
}
const store = configureStore({
  reducer:  rootReducer
})

export default store

