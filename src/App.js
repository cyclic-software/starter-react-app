import Home from "./Pages/Home";
import Header from "./Components/Header/Header";
import './App.css'
import { useEffect, useState } from "react";
function App() {

  let [correct, setCorrect] = useState(0);
  let [wrong, setWrong] = useState(0)
  let [gameOver, setGameOver] = useState(false);
  const newGameHandler = () => {
    setGameOver(false);
    setWrong(0);
    setCorrect(0);
  }

  useEffect(() => {
    if (wrong === 3) {
      setGameOver(true)
    }
  }, [wrong]);

  if (gameOver === false) {

    return (
      <>
        <Header />
        <Home correct={correct} setCorrect={setCorrect} wrong={wrong} setWrong={setWrong} />
      </>
    );
  }
  else if (gameOver === true) {
    return (
      <div className="score">
        <h1 className="score__title">Your score was: {correct}</h1>
        <button className="newGame" onClick={newGameHandler}>New Game?</button>
      </div>
    )
  }
}

export default App;
