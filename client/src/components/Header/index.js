import React, { useState }  from "react";
import { Link } from "react-router-dom";
import './style.css';

function Header(props) {

  return (
    <section className="container-header">
      <div className="header">
        {props.title}
      </div>
    </section>
  )

}

export default Header;