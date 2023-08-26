
import { Remarkable } from 'remarkable';
const md = new Remarkable();

const content = (body) => {
    return {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": "arulvinayakmenon@gmail.com",
            "mobile": "9920807004",
            "type": "blog",
            "content": {
                "dd1": "value"
            }
        })
    }
}

const generateBlog = async () => {
    return await fetch("/generateBlog", {method: "POST"}, content({
        "hey":"yo"
    })).then(async res => {
        let resBlog = (await res.json()).response
        const renderedHTML = md.render(resBlog);
        return renderedHTML;
    }).catch(err => {
      console.log("Error", err)
    })
}

export { generateBlog }