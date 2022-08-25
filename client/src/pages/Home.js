import React from "react";
import Carousel from "../components/Carousel";
import Category from "../components/Categories";
import Header from "../components/Header";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";

const images = [
  {"name":"img1", "url": "#f99", "id":1},
  {"name":"img2", "url": "#99f", "id":2},
  {"name":"img3", "url": "#f99", "id":3},
  {"name":"img4", "url": "#99f", "id":4}
];
// const images = ["img1", "img2", "img3", "img4"];

const Home = () => {
  return (
    <div className="container">
      <Carousel images={images}/>
      <Header />
      <Category category="test1"/>
      <Category category="test2"/>
      <Category category="test3"/>
      {/* <CategoryMenu />
      <ProductList />
      <Cart /> */}
    </div>
  );
};

export default Home;
