import React from "react";
import { NavLink } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import "./navigation.css";

function Navigation() {
  return (
    <nav className="sidebar">
      {/* Top section*/}
      <div className="sidebar-top">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <img
            className="nav-icon"
            src="/Assets/Dashboard.svg"
            alt="Dashboard"
          />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/environments"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <img
            className="nav-icon"
            src="/Assets/Environment.svg"
            alt="Environments"
          />
          <span>Environments</span>
        </NavLink>

        <NavLink
          to="/executions"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <img
            className="nav-icon"
            src="/Assets/Execution.svg"
            alt="Executions"
          />
          <span>Executions</span>
        </NavLink>

        <NavLink
          to="/configuration"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <img
            className="nav-icon"
            src="/Assets/Config.png"
            alt="Configuration"
          />
          <span>Configuration</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <img className="nav-icon" src="/Assets/Reports.svg" alt="Reports" />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/administration"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <img
            className="nav-icon"
            src="/Assets/Admin.svg"
            alt="Administration"
          />
          <span>Administration</span>
        </NavLink>
      </div>

      {/*Settings */}
      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
        >
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
