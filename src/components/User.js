import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Profile from './Profile'
import BookContainer from './BookContainer'

export default function User(props) {
    let [user, setUser] = useState(null)
    let [isFetchingUser, setIsFetchingUser] = useState(true)
    const navigate = useNavigate(null)

    // get current user
    useEffect(() => {
        async function getUser() {
            let res = await props.getUser()
            if(!res.err) {
                setUser(res)
            } else {
                navigate('/signin')
            }
        }

        async function loading() {
            await getUser()
            setIsFetchingUser(false)
        }
        loading()

    }, [])

    // put loader while fetching user
    function handleLoader() {
        if(isFetchingUser) {
            return <div className='loader-container'><div className='loader'></div></div>
        } else {
            return(
                <div>
                    <Profile user={null} />
                    <div className='err-message'>No Purchased Books</div>
                </div>
            )
        }
    }

    if(user) {
        return (
            <div>
                <Header getUser={props.getUser} />
                <div className='user margin-top'>
                    <Profile user={user} />
                    {user.purchasedBooks.length <= 0 ? <div className='err-message'>No Purchased Books</div> : 
                     <div className='gallery'>{ user.purchasedBooks.map(book => <BookContainer book={book} key={book._id} isBought={true} createStarsRating={props.createStarsRating} />) }</div>
                    }
                </div>
                <Footer />
            </div>
        )
    }

    else if(isFetchingUser || !user) {
        return (
            <div>
                <Header getUser={props.getUser} />
                <div className='user margin-top'>
                    {handleLoader()}
                </div>
                <Footer />
            </div>
        )
    }
}