
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants"


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
}
export const cartReducer = (state = initialState, { type, payload })=>{
    
    switch (type) {
        case ADD_TO_CART:
            const item = payload
            const itemExist = state.cartItems.find(existingItem => existingItem.productId === item.productId)
            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.productId === itemExist.productId ? item :i)
                }
            }
            else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state, 
                cartItems: state.cartItems.filter(item=> item.productId !== payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo : payload

            }
        default: 
            return state
    }
}