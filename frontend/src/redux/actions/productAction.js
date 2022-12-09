import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_REQUEST, CLEAR_ERRORS } from "../constants/productConstants";
import axios  from "axios"
export const getAllProducts = () => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,

        })
        const res = await axios.get("/api/v1/products")
        console.log(res)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: res.data
        })

    }
    catch (err) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: err.response.data.message
        })
 }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    })
}