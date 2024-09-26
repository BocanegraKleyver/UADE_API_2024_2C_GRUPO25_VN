import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectDashboard from "./screens/ProjectDashboard";
import ProjectDetail from "./screens/ProjectDetail";
import TicketUpload from "./screens/TicketUpload";
import ExpenseSummary from "./screens/ExpenseSummary";
import ReportScreen from "./screens/ReportScreen";
import Login from "./screens/Login"; // Asumiendo que tienes el componente Login
import Registro from "./screens/Registro";
import initializeLocalStorage from "../src/db/initializeData"; // Asegúrate de que la ruta sea correcta
import Home from "./screens/Home"; // Importar el nuevo componente
import Perfil from "./screens/Perfil"

function App() {
  useEffect(() => {
    const initializeData = async () => {
      await initializeLocalStorage();
    };
    initializeData();
  }, []);

  const handleLogin = (usuario) => {
    // Lógica para manejar el inicio de sesión
    console.log('Usuario logueado:', usuario);
  };

  const handleRegister = (usuario) => {
    // Lógica para manejar eñ registro de sesión
    console.log("Usuario registrado:", usuario);
    
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin}/>} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/registro" element={<Registro onRegister={handleRegister} />} />
          <Route path="/proyectos" element={<ProjectDashboard />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/ticket/:id" element={<TicketUpload />} />
          <Route path="/expense-summary" element={<ExpenseSummary />} />
          <Route path="/reportes" element={<ReportScreen />} />
          <Route path="/perfil" element={<Perfil />} />
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;
