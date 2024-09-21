import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectDashboard from "./screens/ProjectDashboard";
import ProjectDetail from "./screens/ProjectDetail";
import TicketUpload from "./screens/TicketUpload";
import ExpenseSummary from "./screens/ExpenseSummary";
import ReportScreen from "./screens/ReportScreen";
import initializeLocalStorage from "../src/db/initializeData"; // Asegúrate de que la ruta sea correcta

function App() {
  useEffect(() => {
    const initializeData = async () => {
      await initializeLocalStorage();
    };
    initializeData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProjectDashboard />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/ticket/:id" element={<TicketUpload />} />
          <Route path="/expense-summary" element={<ExpenseSummary />} />
          <Route path="/report" element={<ReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
