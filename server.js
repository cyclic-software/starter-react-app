
const express = require('express')
const path = require("path");
const app = express()
require('dotenv').config()

let bearerToken = process.env.OPEN_AI_KEY;
// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('build', options))

const port = process.env.PORT || 3000

app.post("/generateBlog", async (req, response)=>{
  console.log(req.body)
    
  await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
      "Authorization" : "Bearer " + bearerToken,
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": "Say whadup doc!"}],
          "temperature": 0.7
      })
    }).then(res=>{
      console.log(res.body)
      response.send(res.body)
    }).catch((err)=>{
      response.send("error")
    })
});

app.listen(port, () => {
  console.log(`React app listening at http://localhost:${port}`)
})
