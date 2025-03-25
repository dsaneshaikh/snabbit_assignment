import React from "react";
import "./header.css";

function Header() {
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="logo">HASS</div>

      <div className="search-container">
        {/* Left Search Icon */}
        <span className="search-icon"></span>
        <input type="text" className="search-input" placeholder="Search" />

        {/* Shortcut Icon */}
        <div className="shortcut-icon">
          <span className="command-symbol">⌘</span>
          <span className="shortcut-key">K</span>
        </div>
      </div>

      {/* Right: Info / Notification area */}
      <div className="info">
        <div className="notification-bar">
          <div className="icon-box">
            <img
              className="icon-exclamation"
              src="/Assets/exclamation.svg"
              alt=""
            />
          </div>

          {/* Icon Box: Bell + Notification Badge */}
          <div className="icon-box bell-box">
            <span className="icon-bell"></span>
            <span className="notification-badge">2</span>
          </div>

          {/* User Profile: Avatar + Name */}
          <div className="user-profile">
            <span className="user-name">John Doe</span>
            <img
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              alt="User Avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
