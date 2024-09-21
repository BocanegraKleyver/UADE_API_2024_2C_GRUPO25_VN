import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './screen/Login';
import Registro from './screen/Registro'

function App() {
  const handleRegister = (usuario) => {
    console.log('Usuario registrado:', usuario);
    // Aquí puedes manejar lo que sucede cuando un usuario se registra
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro onRegister={handleRegister} />} />
        {/* Otras rutas pueden ir aquí */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
