import React, { useEffect, useState } from 'react'
import BookContainer from './BookContainer'

export default function Gallery(props) {

    // retrieve temp cart from data in session storage
    let tempCart = []
    let data = sessionStorage.getItem("tempCart")
    if(data) tempCart = JSON.parse(data)

    let [cart, setCart] = useState(tempCart)
    let [bookCollections, setBookCollections] = useState([])
    let [fetchingBooks, setFetchingBooks] = useState(true)

    async function addToCart(bookId) {
        // else add to backend cart
        let res = await addToBackendCart(bookId)

        // if no user is signed in, save the cart in session storage
        if(res.err) addToTempCart(bookId)
    }

    function addToTempCart(bookId) {
        // Retrieve book from BookCollections using bookId
        let bookIndex = bookCollections.findIndex(book => book._id === bookId)
        let bookToBeAdded = bookCollections[bookIndex]
        let newCart = [...cart, bookToBeAdded]
        if(bookToBeAdded) setCart(newCart)

        // update Temp cart stored in session storage
        sessionStorage.setItem("tempCart", JSON.stringify(newCart))
    }

    // Add book to cart stored in server
    async function addToBackendCart(bookId) {
        try {
            let res = await fetch('http://localhost:4000//cart/add', {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type":"application/json"}, 
                body: JSON.stringify({id: bookId})
            })
            return await res.json()

        } catch(err) {
            console.log(err)
        }
    }

    // Add book to cart stored in server
    function addToBackendCartInBatch(books) {
        books.forEach( book => {
            addToBackendCart(book._id)
        })
    }

    // Update bookCollections and cart with API
    useEffect(() => {
        async function loading() {
            await fetchData()
            setFetchingBooks(false)
        }
        loading()
    }, [])    

    // Fetch books from backend
    async function fetchData() {
        try {
            let resBook = await fetch('http://localhost:4000//books/json')
            setBookCollections(await resBook.json())
    
            let resCart = await fetch('http://localhost:4000//cart/json', {credentials: "include"})
            resCart = await resCart.json()

            // if user is logged in
            if(!resCart.err) {

                // combine local temp cart and backend cart together
                let newCart = resCart

                if(resCart.length <= 0) {
                    newCart = tempCart
                    addToBackendCartInBatch(newCart)
                } else if(tempCart.length <= 0) {
                    newCart = resCart
                }

                if(resCart.length > 0 && tempCart.length > 0) {
                    tempCart.forEach(book => {
                        resCart.forEach(resBook => {
                            if(book._id !== resBook._id) {
                                newCart.push(book)
                                // add local temp cart to backend cart if local cart items are not in backend cart
                                addToBackendCart(book._id)
                            }
                        })
                    })
                }

                // Update react state cart
                setCart(newCart)

                // Reset local temp cart to empty
                sessionStorage.setItem('tempCart', '[]')
            }
            
        } catch(err) {
            console.log(err)
        }
    }

    if(fetchingBooks) {
        return <div className='loader-container'><div className='loader'></div></div>
    }

    return(
        <div className="gallery margin-top">
            {bookCollections.length <= 0 ? <div className="err-message">No Book Available</div> :
            bookCollections.map(book => ( <BookContainer book={book} addToCart={addToCart} createStarsRating={props.createStarsRating} cart={cart} key={book._id} /> ))}
        </div>
    )
}