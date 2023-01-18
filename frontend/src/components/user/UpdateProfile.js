import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'
import { clearErrors,updateProfile ,loadUser} from '../../redux/actions/userAction'
const UpdateProfile = () => {

    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [avatar, setAvatar] = useState('')

    const [avatarPreview, setAvatarPreview] = useState("/images/avatar.jpg");
    const {user } = useSelector(state =>  state.auth)
    const {isUpdated, error, loading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
          setAvatarPreview(user.avatar.url)
       }
        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }
        
        if (isUpdated) {
            toast.success("Profile updated successfuly")
            dispatch(loadUser())
            navigate("/me")
            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, isUpdated, error, user,navigate])



    const submitHandler = e => {
        e.preventDefault();
    
            const formData = new FormData();
            formData.set('name', name);
            formData.set('email', email);
            formData.set('avatar', avatar);
    
    
        dispatch(updateProfile(formData))
    }
    
    const onChange = e => {

    
        const reader = new FileReader();
    
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
    
        reader.readAsDataURL(e.target.files[0])
    

        
    }
  return (
      <div className='mt-5'> {
          user && <>
              <MetaData title={"Update user profile"} />
              <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg"  onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                  value={name}
                                  onChange ={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                  value={email}
                                  onChange ={e=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label for='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                          id='customFile'
                                          accept='image/*'
                                          onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                           Update
                        </button>
                    </form>
                </div>
            </div>
        
              
              </>
      }
      
      </div>
  )
}

export default UpdateProfile