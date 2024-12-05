//Footer.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import './Styles/FooterStyles.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleTerms = () => {
    navigate("/terms");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 Kolhapuris. All Rights Reserved.</p>
        <div className="social-links">
        <div onClick={handleTerms} className="social-icon">
            Terms of Service
          </div>
          <div onClick={handleContact} className="social-icon">
            Contact Us
          </div>

          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
