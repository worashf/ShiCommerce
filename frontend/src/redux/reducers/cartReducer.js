
import { ADD_TO_CART } from "../constants/cartConstants"


const initialState = {
    cartItems :[]
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
         
        default: 
            return state
    }
}