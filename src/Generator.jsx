import './App.css';
import React from 'react';
import { generateBlog } from './api/generator';

function Generator () {
    let [blog, setBlog]  = React.useState("")

    let generateText = async () => {
      console.log("generate blog");
  
      let renderedHTML = await generateBlog()
      setBlog(renderedHTML)
    }
  
    React.useEffect(()=>{
      console.log(blog)
    },[blog])
  
      return (
        <div className="App">
            <button onClick={generateText}>Generate Blog</button>
            <div dangerouslySetInnerHTML={{__html: blog}} />
        </div>
      );
}

export default Generator