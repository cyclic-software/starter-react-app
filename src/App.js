import Home from "./Pages/Home";
import Header from "./Components/Header/Header";
import { useState } from "react";
function App() {

  let [correct, setCorrect] = useState(0);
  let [wrong, setWrong] = useState(0)

  return (
    <>
      <Header />
      <Home correct={correct} setCorrect={setCorrect} wrong={wrong} setWrong={setWrong} />
    </>
  );
}

export default App;
