import React, { useState } from "react"

export default function BookContainer(props) {

    // Decide whether this book is already added to the cart
    let [isAdded, setIsAdded] = useState(false)
    if(props.cart) {
        props.cart.forEach(book => {
            if(book._id === props.book._id) isAdded = true
            return
        })
    }

    // Add this book to the cart if it is not already added
    async function handleAddToCart() {
        if(isAdded) return
        props.addToCart(props.book._id)
        setIsAdded(true)
    }

    // fetch book.pdf from backend and display it in a new window
    async function handleOpenBook() {
        let res = await fetch("https://bookstore-backend-rwh0.onrender.com/book/view", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type":"application/json"}, 
            body: JSON.stringify({book: props.book})
        })

        res = await res.blob()

        let url = window.URL.createObjectURL(res)
        let a = document.createElement('a')
        a.href = url
        a.download = props.book.title + ".pdf"
        document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click()    
        a.remove()
    }

    // choose which buttons to render
    function chooseButton() {
        if(props.admin) {
            return <button className="btn red" onClick={props.handleDelete} id={props.book._id}>DELETE</button>
        } else if(props.isBought) {
            return <button className="btn" onClick={handleOpenBook}>DOWNLOAD</button>
        } else {
            return <button className="btn" onClick={handleAddToCart} disabled={isAdded}>{isAdded ? "Added" : "Add to Cart"}</button>
        }
    }

    return(
        <div className="book-container box-shadow">
            <img src={"https://bookstore-backend-rwh0.onrender.com/" + props.book.bookCover} alt="book cover" className="book-cover" />
            <h2 className="book-title">{props.book.title}</h2>
            <div className="rating-container">{props.createStarsRating(props.book.rating)}<span className="rating">{props.book.rating.toFixed(1)}</span></div>
            <div className='price'>${props.book.price}</div>
            {chooseButton()}
        </div>
    )
}