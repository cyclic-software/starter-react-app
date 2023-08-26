import React from 'react';
import Generator from './Generator';
import Verify from './Verify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/user/verify/:token" element={<Verify/>}/>
          <Route path="/" element={<Generator />} />
        </Routes>
    </Router>
  );
}

export default App;