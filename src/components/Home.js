import React from 'react'
import Carousel from './Carousel';
import Delivery from './Delivery';
import TopPicks from './TopPicks';
import Meal from './Meal';
import Categories from './Categories';

const Home = () => {
  return (
    <div className='min-h-[800px]'>
        <Carousel />
        <Delivery />
        <TopPicks />
        <Meal />
        <Categories />
    </div>
  )
}

export default Home