import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {toast} from "react-toastify"
import Search from "./Search";
import {logout} from "../../redux/actions/userAction"
const Header = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logout Successfuly")
  }
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

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center row">
          <div className="col-4  mt-2">
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <span id="cart" className="mx-2">
                Cart
              </span>
              <span className="ml-3" id="cart_count">
                2
              </span>
            </Link>
          </div>

          {user ? (
            <div className="col-6 d-flex  ">
              <div className="ml-4">
                <figure className="avatar nav-avatar">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    className="rounded-circle"
                  />
                </figure>
              </div>
              <Dropdown className="px-4">
                <Dropdown.Toggle split id="dropdown-split-basic">
                  {user && user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user && user.role !== "admin" ? (
                     <Dropdown.Item><Link to="/orders/me" style={{ textDecoration: "none" }}>
                     orders
                    </Link>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item> <Link to="/" style={{ textDecoration: "none" }}>
                    Dashboard
                      </Link>
                      </Dropdown.Item>
                  )}
                <Dropdown.Item>
                  <Link to="/me" style={{ textDecoration: "none" }}>
                   Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                  <Link to="/" style={{ textDecoration: "none" }} onClick={handleLogout}>
                 Logout
                    </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
              !loading && (
                
              <Link to="/login" className="btn mx-2 col-3" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
