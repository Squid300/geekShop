import React, { useState }  from "react";
import { Link } from "react-router-dom";
import './style.css';

function Carousel(props) {
// props should contain images in an array, each with properties name/url and ids 1-4
  function renderSlides(props) {
    return (
      <ol className="carousel-viewport">
        {props.images.map(item => {
          let id = "carousel-slide" + item.id;
          let prev;
          let next;
          if (item.id === 1) {
            prev = "#carousel-slide" + 4;
          } else {
            const prevId = item.id -1;
            prev = "#carousel-slide" + prevId;
          }
          if (item.id === 4) {
            next = "#carousel-slide" + 1;
          } else {
            const nextId = item.id + 1;
            next = "#carousel-slide" + nextId;
          }
          return (
            <li id={id} key={item.name} tabIndex="0" className="carousel-slide" style={{backgroundColor: item.url}}>
              <div className="carousel-snapper">
                <a href={prev} className="carousel-prev">Go to last slide</a>
                <a href={next} className="carousel-next">Go to next slide</a>
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <div className="container-carousel">
      <section className="carousel" aria-label="Gallery">
        {renderSlides(props)}
      </section>
    </div>
  )

}

export default Carousel;