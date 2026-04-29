import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section footer-about">
          <h3>🏠 Real Estate App</h3>
          <p>Your trusted partner in finding the perfect property. We connect buyers with their dream homes.</p>
          <div className="footer-social">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📸</a>
            <a href="#" className="social-link">💼</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/seller">Seller Dashboard</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
        </div>

        {/* Property Types */}
        <div className="footer-section">
          <h4>Property Types</h4>
          <ul className="footer-links">
            <li><Link to="/properties?type=Residential+Apartment">Residential Apartment</Link></li>
            <li><Link to="/properties?type=Villa">Villa</Link></li>
            <li><Link to="/properties?type=Independent+House">Independent House</Link></li>
            <li><Link to="/properties?type=Office+Space">Office Space</Link></li>
            <li><Link to="/properties?type=Commercial+Space">Commercial Space</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>📍 Mumbai, Maharashtra, India</li>
            <li>📞 +91-9876543210</li>
            <li>✉️ info@realestateapp.com</li>
            <li>🌐 www.realestateapp.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 Real Estate App. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">FAQ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;