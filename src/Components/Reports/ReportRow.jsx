import React from "react";
import ReportCell from "./ReportCell";
import "./Reports.css";

function ReportRow({ report }) {
  return (
    <tr className="report-row">
      {/* 1) Execution ID */}
      <ReportCell>
        <a href="#!" className="report-link">
          {report.reportId}
        </a>
      </ReportCell>

      {/* 2) Host Name */}
      <ReportCell>{report.hostName}</ReportCell>

      {/* 3) Host IP */}
      <ReportCell>{report.hostIp}</ReportCell>

      {/* 4) Execution Name */}
      <ReportCell>{report.executionName}</ReportCell>

      {/* 5) Start Date */}
      <ReportCell>{report.startDate}</ReportCell>

      {/* 6) Execution State */}
      <ReportCell>
        <div className="state-wrapper">
          <span>{report.executionState}%</span>
          <div className="state-bar-bg">
            <div
              className="state-bar-fill"
              style={{ width: report.executionState + "%" }}
            ></div>
          </div>
        </div>
      </ReportCell>

      {/* 7) Type */}
      <ReportCell>{report.type}</ReportCell>

      {/* 8) Executed By */}
      <ReportCell>{report.executedBy}</ReportCell>

      {/* 9) Logs */}
      <ReportCell>
        <button className="logs-button">Logs</button>
      </ReportCell>
    </tr>
  );
}

export default ReportRow;
