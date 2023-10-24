import React, {useState} from 'react';
import {categoriesData} from './data/data';




const Categories = () => {
    const [categorys, setCategory]=useState(categoriesData);

  return (
    <div className='max-w-[1520px] m-auto px-4 py-12'>
    <h1 className='text-orange-500 font-bold text-2xl text-center py-2'>
        Trending Categories
    </h1>

    <div className='grid md:grid-cols-2 sm-grid-cols-1 lg:grid-cols-4 gap-6 py-4'
       >

          {
            
            categorys && categorys.map((item)=>{
              return (
                  <div key={item.id} className='p-4 flex justify-center hover:scale-105 duration-300'>
                      <img src={item.image} alt={item.image} className='object-contain rounded-xl w-40 h-10 cursor-pointer shadow-xl' />
                  </div>
              )
            })
          }
    </div> 
    </div>
  )
}

export default Categories