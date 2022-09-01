import React, { useState } from "react";
import Carousel from "../components/Carousel";
import CategoryHeader from "../components/Categories";
import Header from "../components/Header";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from "../utils/queries";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";

const images = [
  {"name":"img1", "url": "http://placecorgi.com/1000/1000", "id":1},
  {"name":"img2", "url": "http://placecorgi.com/1000/1001", "id":2},
  {"name":"img3", "url": "http://placecorgi.com/1000/1002", "id":3},
  {"name":"img4", "url": "http://placecorgi.com/1000/1003", "id":4}
];



const Home = () => {

  const { loading, error, data } = useQuery(QUERY_CATEGORIES);
  if (loading) console.log(loading);
  if (error) console.log(error);

  return (
    <div className="container">
      <Carousel images={images}/>
      <Header title="Shop by Category" />
      {data?.categories.map((current, index) => {
        return (
          <CategoryHeader title={data.categories[index].name} url={"/categories/" + data.categories[index].name + "/" + data.categories[index]._id} image={data.categories[index].image}/>
        )
      })}
    </div>
  );
};

export default Home;
