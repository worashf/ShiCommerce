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
        <button className="btn" id="login_btn">Login</button>

        <span id="cart" className="ml-4">Cart</span>
        <span className="ml-3" id="cart_count">2</span>
      </div>
    </nav>

      </>
  )
}

export default Header