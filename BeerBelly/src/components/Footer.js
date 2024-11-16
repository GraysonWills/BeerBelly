import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h5>Connect With Us</h5>
          <p>Follow us on social media</p>
        </div>
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Newsletter</h5>
          <p>Stay updated with our latest releases</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 BeerBelly. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
