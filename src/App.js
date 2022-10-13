import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  const [movieOne, setMovieOne] = useState(undefined);
  const [movieTwo, setMovieTwo] = useState(undefined);
  const [response, setResponse] = useState(true);
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=dd6bde53984a2de059e7ad2d8f4bf1f5&language=en-US`)
      .then(res => {
        setMovieOne(res.data.results[Math.floor(Math.random() * res.data.results.length)])
      })
  }, [response])



  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=dd6bde53984a2de059e7ad2d8f4bf1f5&language=en-US`)
      .then(res => {
        setMovieTwo(res.data.results[Math.floor(Math.random() * res.data.results.length)])
      })
  }, [response])

  const movieOneHandler = () => {
    if (movieOne.release_date <= movieTwo.release_date) {
      console.log('correct')
      setResponse(!response)
    }
    else {
      console.log('incorrect');
      setResponse(!response)
    }

  }

  const movieTwoHandler = () => {
    if (movieTwo.release_date <= movieOne.release_date) {
      console.log('correct')
      setResponse(!response)

    }
    else {
      console.log('incorrect');
      setResponse(!response)
    }
  }

  if (movieOne === undefined || movieTwo === undefined) {
    return ("Loading...")
  }
  return (
    <div className="App">
      <div>
        {movieOne.title}
        <button onClick={movieOneHandler}>Movie One</button>
      </div>
      <div>
        {movieTwo.title}
        <button onClick={movieTwoHandler}>Movie Two</button>
      </div>
    </div>
  );
}

export default App;
