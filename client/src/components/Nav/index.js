import React, { useState }  from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './style.css';

function Navi() {

  const [menuResponsive, setMenuResponsive] = useState(false);
  const handleMenu = () => {
    setMenuResponsive(!menuResponsive);
  };

  return (
    <nav className={`${menuResponsive ? "topnav responsive" : "topnav"}`} id="topnav">
      <div id="icon-logo">
        <div className="hamburger-menu nav-item" onClick={handleMenu}>
          <span className="material-symbols-outlined icon" id="hamburger-icon">
            menu
          </span>
        </div>
        <Link to="/" className="nav-item" id="logo">Geek Shop</Link>
      </div>
      <div className="dropdown">
        <div className="dropbtn">Categories</div>
        <div className="dropdown-content">
          <Link to="/">Link 1</Link>
          <Link to="/">Link 2</Link>
          <Link to="/">Link 3</Link>
        </div>
      </div>
      <div className="dropdown-responsive">
        <div className="dropbtn-responsive">Categories</div>
        <Link to="/" className="dropdown-content-responsive">Link 1</Link>
        <Link to="/" className="dropdown-content-responsive">Link 2</Link>
        <Link to="/" className="dropdown-content-responsive">Link 3</Link>
      </div>
      <Link to="/Signup" className="nav-item">Signup</Link>
      <Link to="/Login" className="nav-item">Login</Link>
      <Link to="/" className="cart-link">
          <span className="material-symbols-outlined icon" id="cart-icon">shopping_cart</span>
      </Link>
    </nav>
  );

}
export default Navi;
