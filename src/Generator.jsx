import './App.css';
import React from 'react';
import { generateData } from './api/generator';

function Generator () {
    const[notification, setNotification] = React.useState("")
    const[blog, setBlog]  = React.useState("")
    const[disableGenerate, setDisableGenerate]  = React.useState(true)

    const user = localStorage.getItem("User")
    const[userData, setUserData]  = React.useState(user !== "undefined" && JSON.parse(user))
    const[userDataRequired, setUserDataRequired]  = React.useState(!userData)
  
    const [ generatorData, setGeneratorData] = React.useState({
      company_name: "",
      industry_name: "",
      blog_type: "",
      topic: "",
      type: "blog"
    })

    React.useEffect(() => {
      Object.keys(blog).indexOf(key=> generatorData[key] === "") > -1 && 
      Object.keys(userData).indexOf(key=> userData[key] === "") > -1
      ? setDisableGenerate(true) : setDisableGenerate(false) && setNotification("Kindly provide a few more details")
    }, [generatorData])

    let formGenerateData = async () => {
        userDataRequired && setUserDataRequired(!userData)
        let response = await generateData(generatorData, userData)
        if(response.message){
          setNotification(response.message)
          return
        }
        response && setBlog(response)
    }
  
    const updateForm = ($e, key) => {
      setGeneratorData({...generatorData, [key]: $e.target.value})
      console.log(generatorData)
    }
  
    const getUserData = ($e, key) => {
      setUserData({...userData, [key]: $e.target.value})
      console.log(userData)
    }

      return (
        <>

          <div className="App">
              {notification}
              {
                userDataRequired && 
                <div>
                    <input type="test" id="name" placeholder="name" onChange={(event) => getUserData(event, "name")}/>
                    <input type="text" id="email" placeholder="email" onChange={(event) => getUserData(event, "email")}/>
                    <input type="text" id="mobile" placeholder="mobile" onChange={(event) => getUserData(event, "mobile")}/>
                </div>
              }
              <input type="text" id="company_name" placeholder="company_name" onChange={(event) => updateForm(event, "company_name")}/>
              <input type="text" id="industry_name" placeholder="industry_name" onChange={(event) => updateForm(event, "industry_name")}/>
              <input type="text" id="blog_type" placeholder="blog_type" onChange={(event) => updateForm(event, "blog_type")}/>
              <input type="text" id="topic" placeholder="topic" onChange={(event) => updateForm(event, "topic")}/>

              <button disabled={disableGenerate} onClick={formGenerateData}>Generate Blog</button>
              <div dangerouslySetInnerHTML={{__html: blog}} />
          </div> 
        </>
      );
}

export default Generator