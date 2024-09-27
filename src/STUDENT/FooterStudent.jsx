import React from 'react';
import './FooterStudent.css'; // Make sure to create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          
          <p>
            EDUBRIDGE is committed to transforming education by providing 
            virtual classrooms, resource management, and collaboration between students, teachers, and institutions.
          </p>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/students">Students</a></li>
            <li><a href="/teachers">Teachers</a></li>
            <li><a href="/administrators">Administrators</a></li>
            
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: rahulkrishnamoorthy2004@gmail.com</p>
          <p>Phone: 8610350048</p>
          
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EDUBRIDGE | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
