import React,{useEffect, useState} from 'react'
import { toast } from "react-toastify"
import  {Link,useLocation,useNavigate} from "react-router-dom"
import  {useDispatch, useSelector} from "react-redux"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import {clearErrors,login} from "../../redux/actions/userAction"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isAuthenticated, loading, error } = useSelector(state => state.auth)
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, error, isAuthenticated,location,navigate])
    

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
  return (
      <> {loading ? Loader : (
          <> <MetaData title ={"Login"}/>
                   <div class="row wrapper"> 
		<div class="col-10 col-lg-5 my-5">
        <form class="shadow-lg" onSubmit={loginHandler}>
            <h1 class="mb-3">Login</h1>
            <div class="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                class="form-control"
                                  value={email}
                                  onChange ={e => setEmail(e.target.value)}
              />
            </div>
  
            <div class="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                                  value={password}
                                onChange ={e => setPassword(e.target.value)}
              />
            </div>
                          <div>
                          <Link to ="/password/forgot" class="float-right mb-4">Forgot Password?</Link>     
               </div>
       
  
            <button
              id="login_button "
              type="submit"
              className="btn  w-100 py-3"
            >
              LOGIN
            </button>

                          < div>
                          <Link to="/register" class="float-right mt-3">New User?</Link>
                          </div>
          </form>
		  </div>
    </div>
              </>
      )
          
          
      }
      
      
      </>
  )
}

export default Login