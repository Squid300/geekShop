import React, { useState }  from "react";
import { Link } from "react-router-dom";
import './style.css';

function Category(props) {

  return (
    <section className="container-category">
      <div>test {props.category}</div>
    </section>
  )

}

export default Category;