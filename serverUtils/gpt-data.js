require('dotenv').config()

const bearerToken = process.env.OPEN_AI_KEY;

const basePath = `https://api.openai.com/`

const getBlogData = async (req, response, content) => {
    console.log(response)
    return await fetch(basePath+"v1/chat/completions", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Authorization" : "Bearer " + bearerToken,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo-0613",
            "messages": [{"role": "user", "content": content}],
            "temperature": 0.7
        })
      }).then(async chatCompletionResponse => {
        let res = await chatCompletionResponse.json();
        response.send({"response": res.choices[0].message.content, "user": {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile
        }});
      }).catch((err)=>{
        response.send("error", err)
      })
}

const getLogoData = async (req, response, content) => {
    console.log(response)
    return await fetch(basePath+"v1/images/generations", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Authorization" : "Bearer " + bearerToken,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "prompt": content,
          "n": 2,
          "size": "1024x1024"
        })
      }).then(async chatCompletionResponse => {
        let res = await chatCompletionResponse.json();
        response.send({"response": res});
      }).catch((err)=>{
        response.send("error", err)
      })
}

module.exports = { getBlogData, getLogoData }
