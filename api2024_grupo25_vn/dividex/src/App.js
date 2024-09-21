import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectDashboard from "./screens/ProjectDashboard";
import ProjectDetail from "./screens/ProjectDetail";
import TicketUpload from "./screens/TicketUpload";
import ExpenseSummary from "./screens/ExpenseSummary";
import ReportScreen from "./screens/ReportScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProjectDashboard />} />
          <Route path="/project/:id" element={<ProjectDetail />} />{" "}
          {/* Asegúrate de usar :id para recibir el ID */}
          <Route path="/upload-ticket" element={<TicketUpload />} />
          <Route path="/expense-summary" element={<ExpenseSummary />} />
          <Route path="/report" element={<ReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
