 import axios from "axios"
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS } from "../constants/userConstants"
 

export const login = (email, passsword) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                "Content-Type":"application/json"
                
            }
        }
        const { data } = await axios.post("/api/v1/login", { email, passsword }, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
     }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL,
          payload:error.response.data.errorMessage
        })
 }
}