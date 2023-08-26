require('dotenv').config()

let bearerToken = process.env.OPEN_AI_KEY;

const getBlogData = async (req, response, content) => {
    console.log(response)
    return await fetch("https://api.openai.com/v1/chat/completions", {
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
        response.send({"response": res.choices[0].message.content});
      }).catch((err)=>{
        response.send("error", err)
      })
}

module.exports = { getBlogData }
