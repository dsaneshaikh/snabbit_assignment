import React from "react";
import ReportCell from "./ReportCell";
import "./Reports.css";

function ReportRow({ report }) {
  const percentage = report.executionState || 0;

  // Assign a top-to-bottom gradient based on the percentage
  let progressGradient;
  if (percentage < 50) {
    // Dark-to-light gradient in a yellow-ish range
    progressGradient = "linear-gradient(to bottom, #f2c94c, #f4d97d)";
  } else if (percentage < 80) {
    // Dark-to-light gradient in a green-ish range
    progressGradient = "linear-gradient(to bottom, #4ec762, #6cd87c)";
  } else {
    // Dark-to-light gradient in a red-ish range
    progressGradient = "linear-gradient(to bottom, #ff6151, #ff867e)";
  }

  return (
    <tr className="report-row">
      <ReportCell>
        <a href="#!" className="report-link">
          {report.reportId}
        </a>
      </ReportCell>

      <ReportCell>{report.hostName}</ReportCell>
      <ReportCell>{report.hostIp}</ReportCell>
      <ReportCell>{report.executionName}</ReportCell>
      <ReportCell>{report.startDate}</ReportCell>

      <ReportCell>
        <div className="state-wrapper">
          <span>{percentage}%</span>
          <div className="state-bar-bg">
            <div
              className="state-bar-fill"
              style={{
                width: `${percentage}%`,
                background: progressGradient,
              }}
            />
          </div>
        </div>
      </ReportCell>

      <ReportCell>{report.type}</ReportCell>
      <ReportCell>{report.executedBy}</ReportCell>
      <ReportCell>
        <button className="logs-button">Logs</button>
      </ReportCell>
    </tr>
  );
}

export default ReportRow;
