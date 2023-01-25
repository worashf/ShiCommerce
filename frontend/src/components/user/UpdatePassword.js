import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants'
import { clearErrors,updatePassword } from '../../redux/actions/userAction'
const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [password,setPassword] = useState("")



    const {user } = useSelector(state =>  state.auth)
    const {isUpdated, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }
        
        if (isUpdated) {
            toast.success("Password updated successfuly")
            navigate("/me")
            dispatch({type:UPDATE_PASSWORD_RESET })
        }
    }, [dispatch, isUpdated, error, user, navigate])



    const submitHandler = e => {
        e.preventDefault();
    
        const passwords = {
            oldPassword,
            password
            }
        dispatch(updatePassword(passwords))
    }


    return (
      <>
<MetaData title={"Change password"}/>
    <div class="row wrapper">
    <div class="col-10 col-lg-5">
        <form class="shadow-lg" onSubmit={submitHandler}>
            <h1 class="mt-2 mb-5">Update Password</h1>
            <div class="form-group">
                <label for="old_password_field">Old Password</label>
                <input
                    type="password"
                    id="old_password_field"
                    class="form-control"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="new_password_field">New Password</label>
                <input
                    type="password"
                    id="new_password_field"
                    class="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" class="btn update-btn btn-block mt-4 mb-3">Update Password</button>
        </form>
    </div>
            </div>
            </>
  )
}

export default UpdatePassword