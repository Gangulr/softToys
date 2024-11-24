// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Bear Works Lanka Logo" />
          <Link to="/" style={{ textDecoration: 'none' }}>
      <h1>Bear Works Lanka</h1>
    </Link>
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

export default Header;
