import {
    ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_REQUEST, CLEAR_ERRORS,
    GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";
import axios  from "axios"
export const getAllProducts = (keyword="", currentPage =1,price,category,rating=0) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,

        })
 

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price}&ratings[gte]=${rating}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price}&category=${category}`
  }
    
        const res = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: res.data
        })

    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload:error.response.data.errorMessage
        })
 }
}

export const getProductdetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/products/${id}`)
        dispatch({
            type: GET_PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }
    catch (error) {
        dispatch({
            type: GET_PRODUCT_DETAILS_FAIL, 
            payload:error.response.data.errorMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    })
}