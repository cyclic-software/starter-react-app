import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../context/UserProvider'
import Logo from "../components/Logo"
import { ContentContext } from '../context/ContentProvider'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { signup, login, errMsg, resetAuthError } = useContext(UserContext)


  function handleAuthDisplay(value){
    setShowModal(prev => !prev)
    console.log(showModal)
    if (value === "login"){
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  // let modalDisplay = showModal ? "auth-modal" : "null";

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthError()
  }

  return (
    <div className={`auth-page` }>
      <div className='auth-intro'>
        <Logo />
        <h3 className='auth welcome'>A place for people who love plants to share, learn, and grow</h3>
        <button onClick={() => handleAuthDisplay('login')}>Login</button>
        <button onClick={() => handleAuthDisplay('signup')}>Sign Up</button>
      </div>
      { showModal &&
        <>
      { !toggle ?
        <div className='auth-popup'>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
            setShowModal={setShowModal}
          />
          <p onClick={toggleForm} className='auth-toggle'>Already a member?</p>
        </div>
      :
        <div className='auth-popup'>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
            setShowModal={setShowModal}
          />
          <p className='auth-toggle' onClick={toggleForm}>Not a member?</p>
        </div>
      }
      </>}
    </div>
  )
}