import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Products from './components/Products';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
<Router>
    <Header/>
    <Routes>
    <Route path="/" exact element={<Home/>}/>
   <Route path="/products" exact element={<Products/>} />

    </Routes>
  </Router>
    </div>
  );
}

export default App;
