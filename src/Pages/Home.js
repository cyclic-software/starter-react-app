import './Home.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Home({ setCorrect, setWrong, correct, wrong }) {
    const [movieOne, setMovieOne] = useState(undefined);
    const [movieTwo, setMovieTwo] = useState(undefined);
    const [response, setResponse] = useState(true);
    const [hideOne, setHideOne] = useState(true);
    const [hideTwo, setHideTwo] = useState(true)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?page=${Math.floor(Math.random() * 100)}&api_key=dd6bde53984a2de059e7ad2d8f4bf1f5&language=en-US`)
            .then(res => {
                setMovieOne(res.data.results[Math.floor(Math.random() * res.data.results.length)])
            })
    }, [response])



    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?page=${Math.floor(Math.random() * 100)}&api_key=dd6bde53984a2de059e7ad2d8f4bf1f5&language=en-US`)
            .then(res => {
                setMovieTwo(res.data.results[Math.floor(Math.random() * res.data.results.length)])
            })
    }, [response])

    const movieOneHandler = () => {
        if (movieOne.release_date <= movieTwo.release_date) {
            console.log('correct')
            setResponse(!response)
            setCorrect(correct += 1)
        }
        else {
            console.log('incorrect');
            setResponse(!response)
            setWrong(wrong += 1)
        }

    }
    const movieTwoHandler = () => {
        if (movieTwo.release_date <= movieOne.release_date) {
            console.log('correct')
            setResponse(!response)
            setCorrect(correct += 1)

        }
        else {
            console.log('incorrect');
            setResponse(!response)
            setWrong(wrong += 1)
        }
    }

    if (movieOne === undefined || movieTwo === undefined) {
        return ("Loading...")
    }
    return (
        <div className="Home">
            <div className="instructions">
                <h1>Which came first?</h1>
            </div>
            <div className="movieOne">
                <h2>{movieOne.title}</h2>
                <p className={(hideOne === true) ? 'Hidden' : ''}>{movieOne.overview}</p>
                <button onClick={() => setHideOne(!hideOne)}>{(hideOne === true) ? 'Show Description' : 'Hide Description'}</button>
                <button onClick={movieOneHandler}>Movie One</button>
            </div>
            <div className="movieTwo">
                <h2>{movieTwo.title}</h2>
                <p className={(hideTwo === true) ? 'Hidden' : ''}>{movieTwo.overview}</p>
                <button onClick={() => setHideTwo(!hideTwo)}>{(hideTwo === true) ? 'Show Description' : 'Hide Description'}</button>
                <button onClick={movieTwoHandler}>Movie Two</button>
            </div>
            <div className="score">
                <h2>Correct: {correct}</h2>
                <h2>Incorrect: {wrong}</h2>
            </div>
        </div>
    );
}

export default Home;
