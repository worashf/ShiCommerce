import axios from "axios";
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL,
     UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL,
    CLEAR_ERRORS,

} from "../constants/orderConstants"
import {api}  from "../../apiConfig"


export const createOrder = (order) => async (dispatch) => {
    try {
     
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(order, "order")

        const { data } = await axios.post(`/api/v1/order/new`, order, config)

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
        const { data } = await axios.get(`/api/v1/orders/me`)
  
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
      console.log(id,"id")
    try {
        
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        console.log(data.order,"order")
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


// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/orders`)

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}


// Delete order
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    })
}