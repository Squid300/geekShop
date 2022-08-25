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
    <nav className={`${menuResponsive ? "topnav" : "topnav responsive"}`} id="topnav">
      <div id="icon-logo">
        <a className="hamburger-menu nav-item" onClick={handleMenu}>
          <span className="material-symbols-outlined" id="hamburger-icon">
            menu
          </span>
        </a>
        <a href="#" className="nav-item" id="logo">Geek Shop</a>
      </div>
      <div className="dropdown">
        <div className="dropbtn">Categories</div>
        <div className="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
      <div className="dropdown-responsive">
        <div className="dropbtn-responsive">Categories</div>
        <a href="#" className="dropdown-content-responsive">Link 1</a>
        <a href="#" className="dropdown-content-responsive">Link 2</a>
        <a href="#" className="dropdown-content-responsive">Link 3</a>
      </div>
      <a href="#contact" className="nav-item">Signup</a>
      <a href="#about" className="nav-item">Login</a>
      <a className="cart-link">
          <span className="material-symbols-outlined" id="cart-icon">shopping_cart</span>
      </a>
    </nav>
  );

}
export default Navi;
