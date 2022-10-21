import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    posts: [],
    errMsg: ""
  }
  
  const [userState, setUserState] = useState(initState)
  
  function signup(credentials){
    axios.post("https://api-plantae.cyclic.app/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("https://api-plantae.cyclic.app/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      todos: []
    })
  }

  function handleAuthError(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthError(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }

  // function getUserTodos(){
  //   userAxios.get("/api/todo/user")
  //     .then(res => {
  //       setUserState(prevState => ({
  //         ...prevState,
  //         todos: res.data
  //       }))
  //     })
  //     .catch(err => console.log(err.response.data.errMsg))
  // }

  // function addTodo(newTodo){
  //   userAxios.post("/api/todo", newTodo)
  //     .then(res => {
  //       setUserState(prevState => ({
  //         ...prevState,
  //         todos: [...prevState.todos, res.data]
  //       }))
  //     })
  //     .catch(err => console.log(err.response.data.errMsg))
  // }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        resetAuthError
      }}>
      { props.children }
    </UserContext.Provider>
  )
}