import React, { useState, useRef, useEffect } from 'react'

export default function CreateNewBook(props) {

    let [title, setTitle] = useState("")
    let [rating, setRating] = useState(0)
    let [price, setPrice] = useState(0)
    let [bookCover, setBookCover] = useState()
    let [bookCoverPath, setBookCoverPath] = useState("https://bookstore-backend.cyclic.app/img/book-cover-logo.jpg")
    let [showErr, setShowErr] = useState(false)
    let [titleErr, setTitleErr] = useState(true)
    let [ratingErr, setRatingErr] = useState(true)
    let [priceErr, setPriceErr] = useState(true)
    let [isSavingBook, setIsSavingBook] = useState(false)
    let [isPageLoading, setIsPageLoading] = useState(true)

    let form = useRef(null)

    // display loading if images are not loaded yet
    useEffect(() => {
        let onPageLoad = () => setIsPageLoading(false)

        if(document.readyState === "complete") {
            onPageLoad()
        } else {
            window.addEventListener('load', onPageLoad) 
            return () => window.removeEventListener('load', onPageLoad)
        }
    }, [])
    
    function handleTitle(e) {
        let inputTitle = e.target.value
        if(inputTitle.length > 50) return
        setTitle(inputTitle)
        if(inputTitle.length <= 0) setTitleErr(true)
        else setTitleErr(false)
    }
    function handleRating(e) {
        let inputRating = Number(e.target.value)
        console.log(inputRating)

        if(inputRating < 0.0) {
            inputRating = 1;
        } else if(inputRating > 5.0) {
            return
        }

        setRating(inputRating)
        if(inputRating <= 0) setRatingErr(true)
        else setRatingErr(false)
    }
    function handlePrice(e) {
        let inputPrice = e.target.value
        if(inputPrice < 0 || inputPrice > 9999) return

        setPrice(inputPrice)
        if(inputPrice < 0) setPriceErr(true)
        else setPriceErr(false)
    }

    function handleUpload(e) {
        let file = e.target.files[0]
        setBookCover(file)
        let reader = new FileReader()
        reader.addEventListener('load', e => {
            setBookCoverPath(e.target.result)
        })
        reader.readAsDataURL(file)
    }

    function reset(e) {
        setTitle("")
        setRating(0)
        setPrice(0)
        setBookCover(undefined)
        setBookCoverPath("https://bookstore-backend.cyclic.app/img/photo-logo.jpg")
        form.current.reset()
    }

    async function handleCreate() {
        if(titleErr || ratingErr || priceErr || bookCover === undefined) {
            setShowErr(true)
            return
        } else setShowErr(false)
        
        const formData = new FormData()
        formData.append("title", title)
        formData.append("rating", rating)
        formData.append("price", price)
        formData.append("file", bookCover)

        setIsSavingBook(true)

        let response = await fetch("https://bookstore-backend.cyclic.app/books/create", {
            method: "POST",
            credentials: "include",
            body: formData,
        })

        response = await response.json()
        if(!response.err) {
            reset()
            props.handlePopUp()
        }

        setIsSavingBook(false)
    }

    if(isPageLoading) {
        return <div className='loader-container'><div className='loader'></div></div>
    }

    return(
        <form className="create-new-book" ref={form}>
            <div className="overflowContainer">
                <div className={showErr ? "warning show" : "warning"}>Please fill all reqired fields*</div>
            </div>
            <img src={bookCoverPath} alt="book cover" className="book-cover-container" />
            <div className="description-edit">
                <div className="grid-container">
                    <span><span className="red-asterisk">*</span>Title:</span><input type="text" className="book-title" value={title} onChange={handleTitle} placeholder='Book Title'/>
                    <span><span className="red-asterisk">*</span>Rating:</span><input type="number" className="rating" min="0" max="5" value={rating === 0 ? "" : rating} onChange={handleRating} placeholder='1 to 5' />
                    <span><span className="red-asterisk">*</span>Price($):</span><input type="number" className="price" min="0" value={price === 0 ? "" : price} onChange={handlePrice} placeholder='Ex: 25'/>
                </div>
                <label htmlFor="book-cover-upload" className="btn small label clear">
                    Upload Book Cover<input type="file" accept="image/*" onChange={handleUpload} id="input-file" /><span className="red-asterisk">*</span>   
                </label>
                <button className="btn small" onClick={handleCreate} disabled={isSavingBook}>{isSavingBook ? "Saving" : "Save"}</button>  
            </div>
        </form>
    )
}