import React, { useState, useMemo, useEffect } from "react";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReportRow from "./ReportRow";
import FilterDropdown from "./FilterDropwdown";
import data from "./reportsData.json";
import "./Reports.css";

function Reports() {
  const [activeTab, setActiveTab] = useState("hosts");

  const [selectedFilter, setSelectedFilter] = useState("weekly");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const [filterType, setFilterType] = useState("");
  const [filterExecutedBy, setFilterExecutedBy] = useState("");

  // customDateRange holds [startDate, endDate]
  const [customDateRange, setCustomDateRange] = useState([null, null]);
  const [startDate, endDate] = customDateRange;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const parseDate = (dateString) => {
    const formatted = dateString.replace(" ", "T");
    const parsed = new Date(formatted);
    if (isNaN(parsed)) {
      console.warn("Failed to parse date:", dateString);
    }
    return parsed;
  };

  const csvHeaders = [
    { label: "Execution ID", key: "reportId" },
    { label: "Host Name", key: "hostName" },
    { label: "Host IP", key: "hostIp" },
    { label: "Execution Name", key: "executionName" },
    { label: "Start Date", key: "startDate" },
    { label: "Execution State", key: "executionState" },
    { label: "Type", key: "type" },
    { label: "Executed By", key: "executedBy" },
  ];

  const filterByDateRange = (report) => {
    const reportDate = parseDate(report.startDate);
    const now = new Date();
    switch (selectedFilter) {
      case "weekly": {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return reportDate >= sevenDaysAgo && reportDate <= now;
      }
      case "monthly": {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return reportDate >= thirtyDaysAgo && reportDate <= now;
      }
      case "yearly": {
        const yearAgo = new Date(now);
        yearAgo.setDate(yearAgo.getDate() - 365);
        return reportDate >= yearAgo && reportDate <= now;
      }
      case "custom": {
        if (!startDate || !endDate) return true;
        return reportDate >= startDate && reportDate <= endDate;
      }
      default:
        return true;
    }
  };

  const filterByAdditionalOptions = (report) => {
    if (filterType && report.type !== filterType) return false;
    if (filterExecutedBy && report.executedBy !== filterExecutedBy)
      return false;
    return true;
  };

  const fuzzyMatch = (report) => {
    const term = searchTerm.toLowerCase();
    return (
      report.reportId.toLowerCase().includes(term) ||
      report.hostIp.toLowerCase().includes(term) ||
      (report.hostName || "").toLowerCase().includes(term) ||
      report.executionName.toLowerCase().includes(term)
    );
  };

  const sortReports = (a, b) => {
    if (a.executionName < b.executionName) return sortAsc ? -1 : 1;
    if (a.executionName > b.executionName) return sortAsc ? 1 : -1;
    return 0;
  };

  const filteredData = useMemo(() => {
    return data
      .filter(filterByDateRange)
      .filter(filterByAdditionalOptions)
      .filter(fuzzyMatch)
      .sort(sortReports);
  }, [
    data,
    selectedFilter,
    startDate,
    endDate,
    filterType,
    filterExecutedBy,
    searchTerm,
    sortAsc,
  ]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    // When switching to non-custom, clear custom date range.
    if (filter !== "custom") {
      setCustomDateRange([null, null]);
    }
  };

  const handleSortClick = () => {
    setSortAsc((prev) => !prev);
  };

  const handleDateChange = (update) => {
    setCustomDateRange(update);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="page-background">
      <div className="reports-title-row">
        <div className="reports-left-arrow"></div>
        <h1 className="reports-title">Reports</h1>
      </div>
      <p className="reports-subtitle">
        View reports for hosts and projects scans
      </p>
      <div className="main-white-container">
        <div className="tabs">
          <button
            className={activeTab === "hosts" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("hosts")}
          >
            Hosts
          </button>
          <button
            className={activeTab === "projects" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
        </div>
        {activeTab === "hosts" && (
          <>
            <div className="filters-row">
              <div className="active-tab-name">Hosts</div>
              <div className="filters-right">
                <div className="range-filters">
                  <button
                    className={
                      selectedFilter === "weekly"
                        ? "range-btn active"
                        : "range-btn"
                    }
                    onClick={() => handleFilterClick("weekly")}
                  >
                    Weekly
                  </button>
                  <button
                    className={
                      selectedFilter === "monthly"
                        ? "range-btn active"
                        : "range-btn"
                    }
                    onClick={() => handleFilterClick("monthly")}
                  >
                    Monthly
                  </button>
                  <button
                    className={
                      selectedFilter === "yearly"
                        ? "range-btn active"
                        : "range-btn"
                    }
                    onClick={() => handleFilterClick("yearly")}
                  >
                    Yearly
                  </button>
                  {selectedFilter === "custom" ? (
                    <DatePicker
                      open={true}
                      selectsRange
                      startDate={startDate}
                      endDate={endDate}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      customInput={
                        <button className="range-btn active">Custom</button>
                      }
                      shouldCloseOnSelect={false}
                    />
                  ) : (
                    <button
                      className="range-btn"
                      onClick={() => handleFilterClick("custom")}
                    >
                      Custom
                    </button>
                  )}
                </div>
                <FilterDropdown
                  filterType={filterType}
                  setFilterType={setFilterType}
                  filterExecutedBy={filterExecutedBy}
                  setFilterExecutedBy={setFilterExecutedBy}
                />
                <button className="sort-btn" onClick={handleSortClick}>
                  Sort {sortAsc ? "▲" : "▼"}
                </button>
                <div className="search-box">
                  <div className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <CSVLink
                  data={filteredData}
                  headers={csvHeaders}
                  filename="reports.csv"
                  className="export-btn"
                >
                  <img className="exporticon" src="/Assets/Export.svg" alt="" />
                  Export
                </CSVLink>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Execution ID</th>
                    <th>Host Name</th>
                    <th>Host IP</th>
                    <th>Execution Name</th>
                    <th>Start Date</th>
                    <th>Execution State</th>
                    <th>Type</th>
                    <th>Executed By</th>
                    <th>Logs</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((report) => (
                    <ReportRow key={report.reportId} report={report} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-bar">
              <button
                className="arrow-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon"
                >
                  <path
                    d="M10 12L6 8l4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="arrow-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon"
                >
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
        {activeTab === "projects" && (
          <>
            <div className="filters-row">
              <div className="active-tab-name">Projects</div>
            </div>
            <h2 className="hosts-heading">Projects</h2>
            <p>Placeholder for project reports.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Reports;
