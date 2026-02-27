import React from 'react';
import './Footer.css';
import {  useTheme } from '../App.js';

const Footer = () => {
  const { themeMode } = useTheme(); 
  return (
    <footer className={`main-footer ${themeMode}-theme`}>
      <div className="footer-content">
        <div className="footer-section">
          <p>© 2026 deSIGNer. Все права защищены.</p>
        </div> 
      </div>
    </footer>
  );
};

export default Footer;