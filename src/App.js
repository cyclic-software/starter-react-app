import React, { lazy, Suspense } from "react";
import TopNav from './components/TopNav';
import Home from './components/Home';
import Footer from './components/Footer';

// import Cart from './components/Cart';
import NoMatch from './components/NoMatch';
import {Routes , Route } from "react-router-dom"; 

const CartLazy = lazy(()=>import('./components/Cart'))
function App() {
  return (
    <div className="App">
        <TopNav />
       
          <Routes> 
            <Route path ="/" element= {<Home />}/> 
            
            <Route path ="/cart" element= {
            <Suspense fallback={<div>Loading ...</div>}>
              <CartLazy />
            </Suspense>}
            /> 
          
            <Route path ="*" element= {<NoMatch />}/> 
          </Routes> 
        

        <Footer />
        
    </div>
  );
}

export default App;
