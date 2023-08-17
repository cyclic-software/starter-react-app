import logo from './logo.svg';
import './App.css';

function App() {

  let generateText = async () => {
    console.log("generate logo");

    fetch("/generateBlog", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "hey":"yo"
        })
    }).then(res=>{
        console.log("Response", res)
    })
  }

  // let generateLogo = async () => {

  // }

    return (
      <div className="App">
        <header className="App-header">
          
          <button onClick={generateText}>Generate Blog</button>



          {/* <button onClick={generateLogo}>Generate Logo</button> */}

        </header>
      </div>
    );
}

export default App;
