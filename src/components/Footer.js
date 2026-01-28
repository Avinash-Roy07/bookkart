import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ABOUT BOOKKART</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>HELP</h4>
            <ul>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns & Refunds</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Customer Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>POLICIES</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>CONNECT WITH US</h4>
            <div className="contact-info">
              <p>📧 facthint@gmail.com</p>
              <p>📞 7369896771</p>
              <p>📍 Bihar, India</p>
            </div>
            <div className="social-icons">
              <a href="#facebook" className="social-icon">📘</a>
              <a href="#twitter" className="social-icon">🐦</a>
              <a href="#instagram" className="social-icon">📷</a>
              <a href="#youtube" className="social-icon">📺</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2026 BookKart - Your Ultimate Book Destination</span>
          </div>
          <div className="footer-bottom-right">
            <div className="payment-icons">
              <span className="payment-text">We Accept:</span>
              <div className="payment-methods">
                <span className="payment-icon">💳</span>
                <span className="payment-icon">🏦</span>
                <span className="payment-icon">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;