
import {
    ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS
    , GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET, NEW_REVIEW_FAIL
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
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,

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
 

export const newReviewReducer = (state = { }, { type, payload }) => {
    switch (type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: payload
             

            }
        case NEW_REVIEW_FAIL:
            return {
      
                loading: false,
                error: payload
            }
            case NEW_REVIEW_RESET:
                return {
                      ...state,
                    success:false
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