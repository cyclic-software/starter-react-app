import React, { useState, useEffect } from 'react'
import CreateNewBook from './CreateNewBook'
import Header from './Header'
import Footer from './Footer'
import BookContainer from './BookContainer'


export default function Admin(props) {
    let [bookCollections, setBookCollections] = useState([])
    let [isCreateContainer, setIsCreateContainer] = useState(true)
    let [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        async function fetchBooks() {
            let resBook = await fetch('https://bookstore-backend-rwh0.onrender.com/books/json')
            setBookCollections(await resBook.json())
        }
        fetchBooks()
    }, [bookCollections])

    // Delete Books
    async function handleDelete(e) {
        let res = await fetch("https://bookstore-backend-rwh0.onrender.com/delete_book", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type":"application/json"}, 
            body: JSON.stringify({id: e.target.id})
        })
        res = await res.json()
        console.log(res)
    } 

    // Open container to ceate new book
    function openCreateContainer() {
        setIsCreateContainer(true)
    }

    // View All books
    function viewAllBooks() {
        setIsCreateContainer(false)
    }

    // Open pop-up message
    function handlePopUp() {
        setShowPopUp(true)
        setTimeout(() => {setShowPopUp(false)}, 2000)
    }

    return(
        <div>
            <Header getUser={props.getUser} />
            <div className='admin'>
                <div className={showPopUp ? 'pop-up-message show' : "pop-up-message"}>New Book Successfully Created!</div>
                <div className="button-container">
                    <button className="btn small" onClick={openCreateContainer}>New Book</button>
                    <button className="btn small" onClick={viewAllBooks}>View All Books</button>
                </div>
                {isCreateContainer ? <CreateNewBook handlePopUp={handlePopUp} /> : 
                 <div className="gallery">
                 {bookCollections.length <= 0 ? 
                  <div className='err-message'>No Book Available<br/>Click New Book to add more books</div> : 
                  bookCollections.map(book => ( <BookContainer book={book} key={book._id} admin={true} handleDelete={handleDelete} createStarsRating={props.createStarsRating} /> ))}
                 </div>
                }
                
            </div>
            <Footer />
        </div>
    )
}