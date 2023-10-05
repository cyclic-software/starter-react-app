import React, { useEffect, useState } from 'react'
import getAllProducts from '../services/postServices/PostServices';

export default function Products() {
const [data, setData]= useState([]);


useEffect(() => {
    getAllProducts().then(datas => {
      setData(datas);
      console.log(datas)
    })

}, [])



  return <>
    <h1>Products</h1>
    <hr/>
    <ul>
    <div className='row'>
    {data.map((item, index) => (
    <div className='col-sm-12 col-md-6 col-xl-3 mb-2' key={index}>
    <div className='card'>
    <img src='' alt='image'/>
     <div className='card-body'>
     <div className='card-title'>{item.title}</div>
      </div>
    </div>
    </div>
     ))}
    </div>

    </ul>
    
    </>
}
