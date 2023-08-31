
import { Remarkable } from 'remarkable';
const md = new Remarkable();

const getContent = (reqBody) => {
    return {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    }
}

const generateData = async (generatorData, userData) => {
    return await fetch("/generateData", getContent({
        ...userData,
        content: generatorData
    })).then(async res => {
        const response = (await res.json())

        if(response.message){
            return response
        } else {
            const blog = response.response
            const user = response.user
            localStorage.setItem('User',JSON.stringify(user))
            const renderedHTML = md.render(blog);
            return renderedHTML;
        }
    }).catch(err => {
      console.log("Error", err)
    })
}

export { generateData }