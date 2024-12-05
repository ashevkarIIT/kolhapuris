//Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/FooterStyles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 Kolhapuris. All Rights Reserved.</p>
        <div className="social-links">
          <Link to="/terms" target="_blank" rel="noopener noreferrer" className="social-icon">Terms of Service</Link>
          <Link to="/contact" target="_blank" rel="noopener noreferrer" className="social-icon">Contact Us</Link>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
