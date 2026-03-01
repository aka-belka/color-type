import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';
import {  useTheme } from '../App.js';

import sun from '../assets/icons/солнце.png';
import moon from '../assets/icons/луна.png';

const Navigation = () => {
  const location = useLocation();
  const { isLoggedIn, isAdmin } = useAuth();
  const { themeMode, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Ручной подбор', path: '/manual' },
    { name: 'Анализ ИИ', path: '/ai' },
    { name: 'Теория цвета', path: '/theory' },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Админ', path: '/admin' });
  }
  navItems.push({ 
     name: isLoggedIn ? 'Профиль' : 'Вход', 
    path: isLoggedIn ? '/profile' : '/login' 
  });

  return (
    <nav className={`main-navigation ${themeMode}-theme`} aria-label="Основная навигация">
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <span className="logo-text">designer</span>
        </Link>
      </div>
      
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              to={item.path} 
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.name}
            </Link>
          </li>
        ))}

        <li className="theme-toggle-item">
          <button 
            className={`theme-toggle-btn ${themeMode === 'dark' ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            {themeMode === 'light' && (
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '4px',
                transform: 'translateY(-50%)',
                width: '15px',
                height: '15px',
                backgroundImage: `url(${sun})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 10
              }} />
            )}
            
            {themeMode === 'dark' && (
              <span style={{
                position: 'absolute',
                top: '50%',
                right: '0px',
                transform: 'translateY(-50%)',
                width: '15px',
                height: '15px',
                backgroundImage: `url(${moon})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 10
              }} />
            )}
            
            <span className={`slider ${themeMode === 'dark' ? 'active' : ''}`} />
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;