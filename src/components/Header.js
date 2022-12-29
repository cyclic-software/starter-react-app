import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(props) {
    let [currentUser, setCurrentUser] = useState(null)
    let [extendedMobileNav, setExtendedMobileNav] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function getUser() {
            let res = await props.getUser()
            if(!res.err) setCurrentUser(res)
        }
        getUser()
    }, []) 

    async function handleLogOut() {
        try {
            await fetch("https://bookstore-backend-rwh0.onrender.com/logout", {credentials: 'include'})
            navigate('/')
            window.location.reload()  

        } catch(err) {
            console.log(err)
        }
    }

    function openMobileNav() {
        setExtendedMobileNav(true)
    }

    function closeMobileNav() {
        setExtendedMobileNav(false)
    }

    return(
        <header>
        <div className={extendedMobileNav ? 'dim-cover cover' : 'dim-cover'}></div>
        <a href="/" className="logo"><img src="https://bookstore-backend-rwh0.onrender.com/img/logo.png" alt="logo"/></a>
        <nav className='desktop-nav'>
            <ul>
                {currentUser ? <li><Link to='/profile'>Hello, {currentUser.firstname}!</Link></li> : null}
                {(currentUser && currentUser.role === "admin") ? <li><Link to="/admin">Admin Controls</Link></li> : null}
                {!currentUser ? <li><Link to='/signin'>Sign In</Link></li> : null}
                <li><Link to='/cart'>Cart</Link></li>
                {currentUser ? <li onClick={handleLogOut}>Log out</li> : null}
            </ul>
        </nav>
        <div className='mobile-nav'>
            <ul onClick={openMobileNav}>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <nav className={extendedMobileNav ? 'mobile-nav-extended show' : 'mobile-nav-extended'}>
            <div className='nav-close-button' onClick={closeMobileNav}>    
                <div className='bar-1'></div>   
                <div className='bar-2'></div>   
            </div>
            <ul>
                {currentUser ? <li>Hello, {currentUser.firstname}!</li> : null}
                {(currentUser && currentUser.role === "admin") ? <li><Link to="/admin">Admin Controls</Link></li> : null}
                {!currentUser ? <li><Link to='/signin'>Sign In</Link></li> : null}
                <li><Link to='/cart'>Cart</Link></li>
                {currentUser ? <li onClick={handleLogOut}>Log out</li> : null}
            </ul>
        </nav>
        </header>
    )
}
