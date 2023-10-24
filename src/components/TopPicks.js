import React,{useState, useEffect, useMemo} from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {topPicks} from './data/data'

const TopPicks = () => {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);

      const [perPage, setPerPage]=useState(4);

      useMemo(()=>{
            if(windowSize[0] < 376){
                setPerPage(1);    
            }else if(windowSize[0] < 513){
                setPerPage(2) ;   

            }else if(windowSize[0] < 769){
                setPerPage(3);
            }else{
                setPerPage(4);
            }
      }, [windowSize]);

      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []); 
  return (
    <>
    <h1 className='text-orange-500 font-bold text-2xl text-center py-2'>Top Picks</h1>
    <div className=' lg:flex max-w-[1520px] m-auto py-2 px-4'>
    <Splide options={ {perPage:perPage, gap:"0.7rem", drag:'free', arrows:false} } aria-label="React Splide Example">

        {
            topPicks.map((item)=>{
                return (
                    <SplideSlide key={item.id}>
                    <div className='rounded-3xl relative' >
                        
                        <div className='absolute w-full h-full bg-black/50 rounded-3xl text-white'>
                            <p className='px-2 py-2 font-bold'>{item.title}</p>
                            <p className='px-2'>{item.price}</p>
                            <button className='border-dotted border-white text-white mx-2 absolute
                            bottom-4'>Add To cart</button>
                        </div>
                        <img  src={item.img}  alt={item.title}
                        className='h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300' />
                    </div>
                    </SplideSlide>
                )
            })
        }
            
    </Splide>   
    </div>
    </>
  )
}

export default TopPicks