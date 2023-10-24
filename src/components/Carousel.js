import React, { useState } from 'react'
import {BsChevronCompactRight, BsChevronCompactLeft} from 'react-icons/bs';
import {RxDotFilled} from 'react-icons/rx'
 const Carousel = () => {
    const sliders=[
        
    {
        url: 'assets/burgur.jpg'
      },
      
      {
        url: 'assets/pasta.jpg',
      },
      {
        url: 'assets/fish.jpg'
      },
  
    ];

    const [currentIndex, setCurrentIndex]= useState(0);
    const prevSlider =()=>{
        setCurrentIndex((prevIndex)=>(prevIndex -1 < 0) ? sliders.length -1 : prevIndex-1);
    }

    const nextSlider =()=>{
        setCurrentIndex((prevIndex)=>(prevIndex+1 === sliders.length) ? 0 : prevIndex +1)
    }

    const moveToNextSlider =(sliderIndex)=>{
        setCurrentIndex(sliderIndex);
    }
  return (
    <div className='max-w-[1520px] h-[500px] w-full py-4 px-4 relative group'>
        <div className='w-full h-full  rounded-2xl bg-center bg-cover duration-500'
        style={{backgroundImage:`url(${sliders[currentIndex].url})`}}>

        </div>
        <div onClick={prevSlider}
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer'>
            <BsChevronCompactLeft />
        </div>
        <div onClick={nextSlider}
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer'>
            <BsChevronCompactRight />
        </div>
        <div className='flex top-4 justify-center py-2'>
            {
                sliders.map((slidersItem, slidersIndex)=>{
                   return(
                    <div  key={slidersIndex}
                    onClick={()=>moveToNextSlider(slidersIndex)} 
                    className={`text-3xl cursor-pointer ${currentIndex === slidersIndex ? 'text-orange-700':""}`}>
                    <RxDotFilled />
                </div>
                   )
                })
            }
        </div>
    </div>
  )
}

export default Carousel
