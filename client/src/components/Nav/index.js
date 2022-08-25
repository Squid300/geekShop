import React, { useState }  from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './style.css';

function Navi() {

  const [menuResponsive, setMenuResponsive] = useState(false);
  const handleMenu = () => {
    setMenuResponsive(!menuResponsive);
  };

  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <nav className={`${menuResponsive ? "topnav responsive" : "topnav"}`} id="topnav">
          <div id="icon-logo">
            <div className="hamburger-menu nav-item" role="button" onClick={handleMenu}>
              <span className="material-symbols-outlined icon" id="hamburger-icon">
                menu
              </span>
            </div>
            <Link to="/" className="nav-item" id="logo">Geek Shop</Link>
          </div>
          <div className="dropdown">
            <div className="dropbtn">Categories</div>
            <div className="dropdown-content">
              <Link to="/">Category 1</Link>
              <Link to="/">Category 2</Link>
              <Link to="/">Category 3</Link>
            </div>
          </div>
          <div className="dropdown-responsive">
            <div className="dropbtn-responsive">Categories</div>
            <Link to="/" className="dropdown-content-responsive">Category 1</Link>
            <Link to="/" className="dropdown-content-responsive">Category 2</Link>
            <Link to="/" className="dropdown-content-responsive">Category 3</Link>
          </div>
          <Link to="/orderHistory" className="nav-item">Orders</Link>
          <a href="/" className="nav-item" onClick={() => Auth.logout()}>Logout</a>
          <Link to="/cart" className="cart-link">
              <span className="material-symbols-outlined icon" id="cart-icon">shopping_cart</span>
          </Link>
        </nav>

        // <ul className="flex-row">
        //   <li className="mx-1">
        //     <Link to="/orderHistory">
        //       Order History
        //     </Link>
        //   </li>
        //   <li className="mx-1">
        //     {/* this is not using the Link component to logout or user and then refresh the application to the start */}
        //     <a href="/" onClick={() => Auth.logout()}>
        //       Logout
        //     </a>
        //   </li>
        // </ul>
      );
    } else {
      return (
        <nav className={`${menuResponsive ? "topnav responsive" : "topnav"}`} id="topnav">
          <div id="icon-logo">
            <div className="hamburger-menu nav-item" role="button" onClick={handleMenu}>
              <span className="material-symbols-outlined icon" id="hamburger-icon">
                menu
              </span>
            </div>
            <Link to="/" className="nav-item" id="logo">Geek Shop</Link>
          </div>
          <div className="dropdown">
            <div className="dropbtn">Categories</div>
            <div className="dropdown-content">
              <Link to="/">Category 1</Link>
              <Link to="/">Category 2</Link>
              <Link to="/">Category 3</Link>
            </div>
          </div>
          <div className="dropdown-responsive">
            <div className="dropbtn-responsive">Categories</div>
            <Link to="/" className="dropdown-content-responsive">Category 1</Link>
            <Link to="/" className="dropdown-content-responsive">Category 2</Link>
            <Link to="/" className="dropdown-content-responsive">Category 3</Link>
          </div>
          <Link to="/Signup" className="nav-item">Signup</Link>
          <Link to="/Login" className="nav-item">Login</Link>
          <Link to="/Login" className="cart-link">
              <span className="material-symbols-outlined icon" id="cart-icon">shopping_cart</span>
          </Link>
        </nav>
      );
    }
  }

  return (
    showNav()
  );

}
export default Navi;
