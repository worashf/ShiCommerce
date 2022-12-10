
import { configureStore} from "@reduxjs/toolkit"
import { productReducer, productDetailReducer } from "./reducers/productReducer"

const rootReducer = {
  products: productReducer,
  product: productDetailReducer
}
const store = configureStore({
  reducer:  rootReducer
})

export default store

