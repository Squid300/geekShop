import React, { useState }  from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries'
import './style.css';

function Navi() {
 
  const [menuResponsive, setMenuResponsive] = useState(false);
  const handleMenu = () => {
    setMenuResponsive(!menuResponsive);
  };

  const { loading, error, data } = useQuery(QUERY_CATEGORIES);
  if (loading) console.log(loading);
  if (error) console.log(error);

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
            {data?.categories.map((current, index) => {
              return (
                <Link to={"/categories/" + data.categories[index].name + "/" + data.categories[index]._id}>{data.categories[index].name}</Link>
              )
            })}
            </div>
          </div>
          <div className="dropdown-responsive">
            <div className="dropbtn-responsive">Categories</div>
            {data?.categories.map((current, index) => {
              return (
                <Link to={"/categories/" + data.categories[index].name + "/" + data.categories[index]._id} className="dropdown-content-responsive">{data.categories[index].name}</Link>
              )
            })}
          </div>
          <Link to="/orderHistory" className="nav-item">Orders</Link>
          <a href="/" className="nav-item" onClick={() => Auth.logout()}>Logout</a>
          <Link to="/cart" className="cart-link">
              <span className="material-symbols-outlined icon" id="cart-icon">shopping_cart</span>
          </Link>
        </nav>
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
            {data?.categories.map((current, index) => {
              return (
                <Link to={"/categories/" + data.categories[index].name + "/" + data.categories[index]._id}>{data.categories[index].name}</Link>
              )
            })}
            </div>
          </div>
          <div className="dropdown-responsive">
            <div className="dropbtn-responsive">Categories</div>
            {data?.categories.map((current, index) => {
              return (
                <Link to={"/categories/" + data.categories[index].name + "/" + data.categories[index]._id} className="dropdown-content-responsive">{data.categories[index].name}</Link>
              )
            })}
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
