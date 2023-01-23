
import axios from "axios";
import { ADD_TO_CART ,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";
import {api} from "../../apiConfig"
export const addItemToCart = (id,quantity) => async (dispatch,getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity

        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeItemToCart = (id) => async (dispatch,getState) => {
    
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


export const saveShippingInfo = (shippingData) => async (dispatch) => {
    
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: shippingData
    })

    localStorage.setItem("shippingInfo", JSON.stringify(shippingData))
}