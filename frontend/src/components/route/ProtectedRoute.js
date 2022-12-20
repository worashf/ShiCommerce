import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProtectedRoute = () => {
    const { loading, isAuthenticated} = useSelector(state=>state.auth)
    return (
        <>
      { loading===false  &&(isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>)}
      </>
  )
}

export default ProtectedRoute