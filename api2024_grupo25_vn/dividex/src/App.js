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
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/ticket/:id" element={<TicketUpload />} />{" "}
          {/* Modificado aquí */}
          <Route path="/expense-summary" element={<ExpenseSummary />} />
          <Route path="/report" element={<ReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
