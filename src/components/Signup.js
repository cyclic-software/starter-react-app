import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Signup(props) {
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('') 
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [showErr, setShowErr] = useState(false)
    let [errMessage, setErrMessage] = useState("")
    let [showPassword, setShowPassword] = useState(false)
    let [signingUp, setSigningUp] = useState(false)

    const navigate = useNavigate()

    function handleFirstname(e) {
        setFirstname(e.target.value)
    }
    function handleLastname(e) {
        setLastname(e.target.value)
    }
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handleShowPassword() {
        let bool = showPassword
        setShowPassword(!bool)
    }
    function reset() {
        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")
    }

    async function handleSubmit(e) {
        e.preventDefault()

        // Don't submit the form unless all fields are filled
        if(firstname.length <= 0 || lastname.length <= 0 || email.length <= 0 || password.length <= 0) {
            setShowErr(true)
            setErrMessage("Please Fill Out All Fields")
            return
        }

        setSigningUp(true)
        let res = await fetch("http://localhost:4000/signup", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            })
        })
        res = await res.json()

        // Else display Error Message
        if(res.err) {
            setShowErr(true)
            setErrMessage(res.err)
        } else {
            setShowErr(false)
        }

        // if new user is created successfully, sign in the user and 
        // redirect to main page
        if(res.message) {
            try {
                let response = await fetch('http://localhost:4000/signin', {
                    method: "POST", 
                    credentials: 'include',
                    headers: {"Content-Type":"application/json"}, 
                    body: JSON.stringify( {email: email, password: password} )
                })
                
                if(response.status !== 401) navigate('/')
            } catch(err) {
                console.log(err)
            }
        }

        reset()
        setSigningUp(false)
    }

    return(
        <div>
        <Header getUser={props.getUser} />
        <div className="signin-container box-shadow">
            <form onSubmit={handleSubmit} method="post">
                <h2>WELCOME</h2>
                <div className="overflowContainer"><div className={showErr ? "warning show" : "warning" }><box-icon name='error-circle' color='#fe0900'></box-icon>{errMessage}</div></div>
                <label htmlFor="firstname">
                    <div className={firstname.length > 0 ? "placeholder show": "placeholder"}>First Name</div>
                    <input type="text" name="firstname" placeholder="First Name" value={firstname} onChange={handleFirstname} />
                </label>
                <label htmlFor="lastname">
                    <div className={lastname.length > 0 ? "placeholder show": "placeholder"}>Last Name</div>
                    <input type="text" name="lastname" placeholder="Last Name" value={lastname} onChange={handleLastname} />
                </label>
                <label htmlFor="email">
                    <div className={email.length > 0 ? "placeholder show": "placeholder"}>Email</div>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmail} />
                </label>
                <label htmlFor="password">
                    <div className={password.length > 0 ? "placeholder show": "placeholder"}>Password</div>
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <div className="show-password" onClick={handleShowPassword}>
                     {showPassword ? 
                      <box-icon name='hide' type="solid" color='#7a7a7a' ></box-icon> : 
                      <box-icon name='show' color='#7a7a7a'></box-icon>
                     }
                    </div>
                </label>
                
                <button type="submit" className="btn" disabled={signingUp}>{signingUp ? "Signing Up" : "Sign Up"}</button>
                <p><Link to="/signin">Already a member? Sign In Here</Link></p>
            </form>
        </div>
        <Footer />
        </div>
    )
}