import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
const Header = () => {

  return (
      <>
     <nav className="navbar row">
      <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
            <img src="/images/logo.png" />
            </Link>

        </div>
      </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
     
        <Search />
      

      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to ="/login" className="btn mx-2" id="login_btn">Login</Link>

        <span id="cart" className="mx-2">Cart</span>
        <span className="ml-3" id="cart_count">2</span>
      </div>
    </nav>

      </>
  )
}

export default Header