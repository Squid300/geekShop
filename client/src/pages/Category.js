import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import CategoryHeader from '../components/Categories';

const images = [
  {"name":"img1", "url": "http://placecorgi.com/600/600", "id":1},
  {"name":"img2", "url": "http://placecorgi.com/600/601", "id":2},
  {"name":"img3", "url": "http://placecorgi.com/600/602", "id":3},
  {"name":"img4", "url": "http://placecorgi.com/600/603", "id":4}
];

function Category() {

  const { name } = useParams();
  const [currentCat, setCurrentCat ] = useState({});
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);
  if (loading) console.log(loading);
  if (error) console.log(error);

  useEffect(() => {
    setCurrentCat(data?.categories.find((cat) => cat.name === name));
  }, [data?.categories, name, currentCat])

  console.log(currentCat)

  return (
    <div className="container">
      <Carousel images={images}/>
      <Header title="Shop by Category" />
      {data?.categories.map((current, index) => {
        return (
          <CategoryHeader title={data.categories[index].name} url="/" image={data.categories[index].image}/>
        )
      })}
    </div>
  )

}

export default Category;