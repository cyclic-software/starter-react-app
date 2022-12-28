import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Gallery from './Gallery'

export default function Index(props) {
    return( 
        <div>
            <Header getUser={props.getUser} />
            <Gallery createStarsRating={props.createStarsRating} />
            <Footer />
        </div>
    )
}