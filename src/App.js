import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Index from "./components/Index"
import Cart from "./components/Cart"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Admin from './components/Admin'
import User from './components/User'

export default function App() { 
    async function getUser() {
        try{
            let response = await fetch('https://bookstore-backend-rwh0.onrender.com/user', {credentials: 'include'})
            let data = await response.json()
            return data
        } catch(err) {
            console.log(err)
        }
    }

    // Create stars for rating
    function createStarsRating(num) {
        let stars = []
        for(let i = 0; i < 5; i++, num--) {
            if(num >= 1) stars.push(<box-icon name='star' type='solid' color='#fce803' size="16px" key={i}></box-icon>)
            else if(num >= 0.5) stars.push(<box-icon type='solid' name='star-half' color='#fce803' size="16px" key={i}></box-icon>)
            else stars.push(<box-icon name='star' color='#fce803' size="16px" key={i}></box-icon>)
        }
        return stars
    }
    
    return(
     <Router>
        <Routes>
            <Route path="/" exact element={<Index getUser={getUser} createStarsRating={createStarsRating} />} />	
            <Route path="/cart" element={<Cart getUser={getUser} createStarsRating={createStarsRating} />} />
            <Route path="/signup" element={<Signup getUser={getUser} />} />
            <Route path="/signin" element={<Signin getUser={getUser} />} />
            <Route path="/admin" element={<Admin getUser={getUser} createStarsRating={createStarsRating} />} />
            <Route path="/profile" element={<User getUser={getUser} createStarsRating={createStarsRating} />} />
        </Routes>
     </Router>
    )
}
