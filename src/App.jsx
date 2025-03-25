import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./Components/Navigation/Navigation";
import Header from "./Components/Header/Header";
import Reports from "./Components/Reports/Reports";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Redirect root to /reports so Reports is active by default */}
              <Route path="/" element={<Navigate to="/reports" replace />} />
              <Route path="/reports/*" element={<Reports />} />
              {/* Uncomment and add additional routes as needed */}
              {/* <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/environments" element={<Environments />} />
              <Route path="/administration" element={<Administration />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
