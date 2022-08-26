import React, { useState }  from "react";
import { Link } from "react-router-dom";
import './style.css';

function CategoryHeader(props) {

  return (
    <section className="container-category">
      <img src={props.image}></img>
      <div className="header-category">
        <div className="header-category-inner">
          <Link to={props.url} className="header-text">
            {props.title}
          </Link>
        </div>
      </div>
    </section>
  )

}

export default CategoryHeader;