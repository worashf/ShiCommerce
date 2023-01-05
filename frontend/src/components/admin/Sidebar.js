import React from 'react'
import { Link } from 'react-router-dom'
import { NavDropdown } from "react-bootstrap";
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
    <nav id="sidebar">
        <ul className="list-unstyled components">
            <li>
                <Link to="/dashboard"> Dashboard</Link>
            </li>

                  <li>
                 
                  <NavDropdown
              id="nav-dropdown-dark-example"
              title="Products"
             menuVariant="dark"
                     
            >
          
                          <NavDropdown.Item ><Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link></NavDropdown.Item>
                          <NavDropdown.Item > <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link></NavDropdown.Item>
        
            </NavDropdown>
             
              
            </li>

            <li>
                <Link to="/admin/orders"> Orders</Link>
            </li>

            <li>
                <Link to="/admin/users"> Users</Link>
            </li>

            <li>
                <Link to="/admin/reviews">Reviews</Link>
            </li>

        </ul>
    </nav>
</div>
  )
}

export default Sidebar