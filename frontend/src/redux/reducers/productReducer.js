
import {
    ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS
    , GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"


export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products:[]
            }
        
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
        case ALL_PRODUCTS_FAIL:
            return {
               
            loading: false,
            error: action.payload
            }
        case CLEAR_ERRORS:
           return  {
               ...state,
               error: null
            }
        default: 
            return state
    }
}

 const intialState = {
    
     loading: false,
     error: null
 }
export const productDetailReducer = (state = { productDetail: {} }, { type, payload }) => {
     switch (type) {
         case GET_PRODUCT_DETAILS_REQUEST:
             return {
                 ...state,
                 loading: true
             }
         case GET_PRODUCT_DETAILS_SUCCESS:
             return {
                 loading: false,
              productDetail: payload
 
             }
         case GET_PRODUCT_DETAILS_FAIL:
             return {
       
                 loading: false,
                 error: payload
             }
         case CLEAR_ERRORS:
             return {
                 ...state,
                 loading: false,
                 error:null
             }
         default: 
             return  state
      }
 
 }