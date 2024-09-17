import React, {useState, useRef, useEffect} from 'react';
import { FaSearch, FaBell } from "react-icons/fa";


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Bear Works Lanka Logo" />
          <h1>Bear Works Lanka</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#users">Users</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#finance">Finance</a></li>
            <li><a href="#feedbacks">Feedbacks</a></li>
          </ul>
        </nav>
        <div className="login">
          <button className="login-button">Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;