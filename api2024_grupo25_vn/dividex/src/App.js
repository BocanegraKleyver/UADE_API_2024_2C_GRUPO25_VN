import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectDashboard from "./screens/ProjectDashboard";
import ProjectDetail from "./screens/ProjectDetail";
import TicketUpload from "./screens/TicketUpload";
import ExpenseSummary from "./screens/ExpenseSummary";
import ReportScreen from "./screens/ReportScreen";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import initializeLocalStorage from "../src/db/initializeData";
import Home from "./screens/Home";
import Perfil from "./screens/Perfil";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      await initializeLocalStorage();
      loadTicketsFromLocalStorage();
    };
    initializeData();
  }, []);

  const loadTicketsFromLocalStorage = () => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  };

  const handleLogin = (usuario) => {
    console.log("Usuario logueado:", usuario);
  };

  const handleRegister = (usuario) => {
    console.log("Usuario registrado:", usuario);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/registro"
            element={<Registro onRegister={handleRegister} />}
          />
          <Route path="/proyectos" element={<ProjectDashboard />} />
          <Route path="/report" element={<ReportScreen />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/ticket/:id" element={<TicketUpload />} />
          <Route
            path="/expense-summary"
            element={<ExpenseSummary tickets={tickets} />}
          />{" "}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
