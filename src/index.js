// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';       // ← note '/client'
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
      <App />

  </React.StrictMode>
);
