import React from 'react'
import 'boxicons'

export default function CartItem(props) {

    return(
        <div className="cart-items">
            <img className="book-cover" src="http://localhost:4000//img/7.jpg" alt="book cover" />
            <div className="description">
                <h2 className="book-title">{props.book.title}</h2>
                <div className="rating-container">{props.createStarsRating(props.book.rating)}<span className="rating">{props.book.rating.toFixed(1)}</span></div>
                <div className="price">Price: ${props.book.price}</div>
                <button className="trash-btn" onClick={props.removeFromCart} id={props.book._id}><box-icon size="xs" name='trash' color="red"></box-icon></button>
            </div>
            
        </div>
    )
}