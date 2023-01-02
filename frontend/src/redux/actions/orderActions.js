import axios from "axios";
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL, CLEAR_ERRORS
} from "../constants/orderConstants"


export const createOrder = (order) => async (dispatch) => {
    try {
     
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(order, "order")

        const { data } = await axios.post('/api/v1/order/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    }
    catch (err) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: err.response.data.errorMessage
        })
    }
}


// get currently logged in user  orders 

export const getMyOrders = () => async (dispatch) => {
    
    try {
        
        dispatch({ type: MY_ORDER_REQUEST })
        const { data } = await axios.get("/api/v1/orders/me")
  
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })
    }
    catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

// get order details 
export const orderDetails = (id) => async (dispatch) => {
    
    try {
        
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/${id}`)
  
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    })
}