import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS, QUERY_PRODUCTS_BY_CATEGORY } from '../utils/queries';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import CategoryHeader from '../components/Categories';
import ProductItem from '../components/ProductItem';

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

  return (
    <div className="container">
      <Carousel images={images}/>
      <Header title={name} />
      {data?.products.map((current, index) => {
        return (
          <ProductItem key={data.products[index]._id} item={data.products[index]} />
        )
      })}
    </div>
  )
}

export default Category;