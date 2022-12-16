
import {LOGIN_REQUEST,LOGIN_SUCCESS, LOGIN_FAIL,CLEAR_ERRORS} from '../constants/userConstants'

export const authReducer = (state= {user:{}}, {type, payload}) => {
    switch (type) {
        case LOGIN_REQUEST:
         return {
             loading: true,
             isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case CLEAR_ERRORS:
                return  {
                    ...state,
                    error: null
                 }
      default:
           return   state
     }
}