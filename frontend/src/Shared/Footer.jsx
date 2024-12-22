// src/components/Footer.js
import React from 'react';
import './Footer.css';
import logo from '../image/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src={logo} alt="Bear Works Lanka Logo" className="footer-logo" />
          <address>
            15 Schofield Pl, Colombo 09892 <br />
            bearworkslanka@gmail.com
          </address>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#location">Location</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#news">News</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow</h3>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;