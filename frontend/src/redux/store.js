
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { productReducer } from "./reducers/productReducer"
const rootReducer = {
    products: productReducer
}
const store = configureStore({
  reducer:  rootReducer
})

export default store

