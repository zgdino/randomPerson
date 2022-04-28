import React from 'react';
import ReactDOM from 'react-dom';
// importing css file here because it affects App.js
import './index.css';
import App from './App';

// rendering App from App.js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
