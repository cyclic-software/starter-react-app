import { useParams } from "react-router-dom";

async function Verify() {
    const { token } = useParams()
    // const basePath = "https://long-jade-sheep.cyclic.cloud/verify"
    const basePath = "http://localhost:3000";

    await fetch(basePath+"/verify?token="+token, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async res=>{
        console.log(await res.json())
    })
}

export default Verify;