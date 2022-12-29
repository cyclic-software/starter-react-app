import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import CartItem from "./CartItem"
import Header from "./Header"
import Footer from "./Footer"

export default function Cart(props) {

    // retrieve temp cart from data in session storage
    let tempCart = []
    let data = sessionStorage.getItem("tempCart")
    if(data) tempCart = JSON.parse(data)

    let [cart, setCart] = useState(tempCart)
    let [quantity, setQuantity] = useState(0)
    let [total, setTotal] = useState(0)
    let [afterTax, setAfterTax] = useState(0)
    let [showPopUp, setShowPopUp] = useState(false)
    let [message, setMessage] = useState("")
    let [isCheckingOut, setIsCheckingOut] = useState(false)
    let [isFetchingCart, setIsFetchingCart] = useState(true)
    
    const navigate = useNavigate()

    // Fetch Cart data
    useEffect(() => {
        async function fetchCart() {
            try {
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
        
        async function loading() {
            await fetchCart()
            setIsFetchingCart(false)
        }

        loading()

    }, [])

    // Update receipt box 
    useEffect(() => {
        // update quantity
        if(cart.length) setQuantity(cart.length)
        else setQuantity(0)

        // Update total
        let tempTotal = 0
        cart.forEach(item => {
            tempTotal += item.price
        })
        setTotal(tempTotal)

        // Update Price After Tax
        setAfterTax(tempTotal*1.05)

    }, [cart])

    // Remove book from cart
    async function removeFromCart(e) {
        // remove from backend Cart
        try {
            let res = await fetch('http://localhost:4000//cart/remove', {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type":"application/json"}, 
                body: JSON.stringify({id: e.target.id})
            })
            res = await res.json()

            // Remove from react cart
            if(!res.err) {
                let newCart = cart.filter(book => book._id !== e.target.id)
                setCart(newCart)
            }
        } catch(err) {
            console.log(err)
        }
    }

    // Purchase books
    async function handleCheckOut() {
        let res = await props.getUser()
        setIsCheckingOut(true)

        // if user is not signed in
        if(res.err) {
            navigate('/signin')
        } 
        // if user is signed in
        else if(cart.length <= 0) {
            handlePopUp("No Book In Cart")
        } else {
            let res = await fetch("http://localhost:4000//purchase", {
                method: "POST",
                credentials: "include",
            })
            res = await res.json()
            if(!res.err) {
                handlePopUp("Purchased Successfully!")
                clearCart()
            } else {
                handlePopUp("Purchased Failed. Try Again")
            }
            
        }

        setIsCheckingOut(false)
    }

    // Open pop-up message
    function handlePopUp(text) {
        setShowPopUp(true)
        setMessage(text)
        setTimeout(() => {setShowPopUp(false)}, 2000)
    }

    // Clear Cart
    async function clearCart() {
        setCart([])
        await fetch("http://localhost:4000//cart/clear", {
            method: "POST",
            credentials: "include",
        })    
    }

    // Add book to cart stored in server
    function addToBackendCartInBatch(books) {
        books.forEach( book => {
            addToBackendCart(book._id)
        })
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

    // handle cart loading
    function handleCartLoading() {
        if(isFetchingCart) return <div className='loader-container'><div className='loader'></div></div>
        return (
            <div>
            {cart.map((book, index) => ( <CartItem book={book} removeFromCart={removeFromCart} createStarsRating={props.createStarsRating} key={index} /> )) }
            {(cart.length <= 0) ? <div className="err-message">Your Cart is Empty</div> : null}
            </div>
        )
    }

    return(
        <div>
            <Header getUser={props.getUser} />
            <div className={showPopUp ? 'pop-up-message show' : "pop-up-message"}>{message}</div>
            <div className="cart">
                <div className="cart-item-container">
                    {handleCartLoading()}
                </div>
        
                <div className="receipt box-shadow">
                    <div><span>QUANTITY:</span><span className="right">{quantity}</span></div>
                    <div><span>TOTAL</span><span className="right">${total.toFixed(2)}</span></div>
                    <div><span>AFTER TAX (5%):</span><span className="right">${afterTax.toFixed(2)}</span></div>
                    <button className="btn" onClick={handleCheckOut}>{isCheckingOut ? 'CHECKING OUT' : 'CHECKOUT'}</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}