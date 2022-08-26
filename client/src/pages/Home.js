import React from "react";
import Carousel from "../components/Carousel";
import Category from "../components/Categories";
import Header from "../components/Header";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from "../utils/queries";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";

const images = [
  {"name":"img1", "url": "http://placecorgi.com/600/600", "id":1},
  {"name":"img2", "url": "http://placecorgi.com/600/601", "id":2},
  {"name":"img3", "url": "http://placecorgi.com/600/602", "id":3},
  {"name":"img4", "url": "http://placecorgi.com/600/603", "id":4}
];



const Home = () => {

  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) console.log(loading);
  if (error) console.log(error);
  console.log(data);
  // console.log(Object.keys(data.categories))

  return (
    <div className="container">
      <Carousel images={images}/>
      <Header title="Shop by Category" />
      {data?.categories.map((current, index) => {
        return (
          <Category title={data.categories[index].name} url="/" image={data.categories[index].image}/>
        )
      })}
    </div>
  );
};

export default Home;
