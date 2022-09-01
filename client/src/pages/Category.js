import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS, QUERY_PRODUCTS_BY_CATEGORY } from '../utils/queries';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import CategoryHeader from '../components/Categories';
import ProductItem from '../components/ProductItem';
import { ShoppingCartContext } from '../context/cartContext';

const images = [
  {"name":"img1", "url": "http://placecorgi.com/600/600", "id":1},
  {"name":"img2", "url": "http://placecorgi.com/600/601", "id":2},
  {"name":"img3", "url": "http://placecorgi.com/600/602", "id":3},
  {"name":"img4", "url": "http://placecorgi.com/600/603", "id":4}
];

function Category() {

  const { name, id } = useParams();
  const { loading, error, data } = useQuery(QUERY_PRODUCTS_BY_CATEGORY, {
    variables: {category: id}
  });
  const [prods, setProds] = useState([]);

  useEffect(() => {
    if (data) {
      setProds(data.products)
    }
  }, [data])

  return (
    <div className="container">
      <Carousel images={images}/>
      <Header title={name} />
      {loading ? "Loading..." : ""}
      {prods.map((current, index) => {
        return (
          <ProductItem key={prods[index]._id} item={prods[index]} />
        )
      })}
    </div>
  )
}

export default Category;