import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screen/Login'; // Asumiendo que tienes el componente Login

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Otras rutas pueden ir aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/**
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
**/