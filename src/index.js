import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider'
import ContentProvider from './context/ContentProvider';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
