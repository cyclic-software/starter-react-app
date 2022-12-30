import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import 'boxicons'

export default function Signin(props) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [authenticationFailed, setAuthenticationFailed] = useState(false)
    let [isSigningIn, setIsSigningIn] = useState(false)

    const navigate = useNavigate()

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    async function handleSignin() {
        setIsSigningIn(true)
        try {
            let response = await fetch('https://bookstore-backend.cyclic.app/signin', {
                method: "POST", 
                credentials: 'include',
                headers: {"Content-Type":"application/json"}, 
                body: JSON.stringify( {email: email, password: password} )
            })
            
            if(response.status !== 401) navigate(-1)
            else {
                setEmail("")
                setPassword("")
                setAuthenticationFailed(true)
            }

        } catch(err) {
            console.log(err)
        }
        
    }

    function handleEnter(e) {
        if(e.key === "Enter") handleSignin()
    }

    return(
        <div>
        <Header getUser={props.getUser} />
        <div className="signin-container box-shadow">
            <form method="post" onKeyUp={handleEnter}>
                <h2>WELCOME</h2>
                <div className="overflowContainer"><div className={authenticationFailed ? "warning show" : "warning" }><box-icon name='error-circle' color='#fe0900'></box-icon>Invalid Email address or Password</div></div>
                <label htmlFor="Email">
                    <div className={(authenticationFailed || email.length) > 0 ? "placeholder show": "placeholder"}>Email</div>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmail} />
                </label>
                <label htmlFor="password">
                    <div className={authenticationFailed || password.length > 0 ? "placeholder show": "placeholder"}>Password</div>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword} />
                </label>
                
                <button type='button' className="btn" onClick={handleSignin} disabled={isSigningIn}>{isSigningIn ? "Signing In" : "Sign In"}</button>
                <p><Link to="/signup">Don't have an account yet? Sign Up Here</Link></p>
            </form>
        </div>
        <Footer />
        </div>
    )
}