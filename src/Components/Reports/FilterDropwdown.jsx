import React, { useState } from "react";
import "./Reports.css";

function FilterDropdown({
  filterType,
  setFilterType,
  filterExecutedBy,
  setFilterExecutedBy,
}) {
  // Toggle for showing/hiding the dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  const typeOptions = ["All", "Template", "Test case", "Analysis"];
  const executedByOptions = ["All", "Streya", "Magnish", "Vignesh"];

  return (
    <div className="filter-dropdown-container">
      {/* Filter button */}
      <button
        className="filter-toggle-button"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        Filter
        <span className="caret-icon">{showDropdown ? "▲" : "▼"}</span>
      </button>

      {/*Dropdown*/}
      {showDropdown && (
        <div className="filter-dropdown-menu">
          <div className="filter-dropdown-item">
            <label htmlFor="filter-type">Type:</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {typeOptions.map((opt) => (
                <option key={opt} value={opt === "All" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown-item">
            <label htmlFor="filter-executedBy">Executed By:</label>
            <select
              id="filter-executedBy"
              value={filterExecutedBy}
              onChange={(e) => setFilterExecutedBy(e.target.value)}
            >
              {executedByOptions.map((opt) => (
                <option key={opt} value={opt === "All" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
