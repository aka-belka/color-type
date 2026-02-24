import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';
import {  useTheme } from '../App.js';
import BackgroundImage11 from '../assets/background1.png';
import BackgroundImage21 from '../assets/background2.png';

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const { themeMode } = useTheme();

  const { login, register, users } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9+\-\s()]{10,15}$/;
    return re.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!isLoginMode) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }

      if (!firstName.trim()) {
        newErrors.firstName = 'Имя обязательно';
      }

      if (!lastName.trim()) {
        newErrors.lastName = 'Фамилия обязательна';
      }

      if (!phone) {
        newErrors.phone = 'Номер телефона обязателен';
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Некорректный формат телефона';
      }

      if (!gender) {
        newErrors.gender = 'Выберите пол';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLoginMode) {
      const success = login(email, password);
      
      if (success) {
        navigate('/profile');
      } else {
        setErrors({ form: 'Неверный email или пароль' });
      }
    } else {
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        setErrors({ form: 'Пользователь с таким email уже существует' });
        return;
      }
      
      register(email, password, firstName, lastName, phone, gender);
      navigate('/profile');
    }
  };

  return (
    <div className={`login-page ${themeMode}-theme`}>
      <img src={BackgroundImage11} className="background-foto11"/>
      {isLoginMode && (<img src={BackgroundImage21} className="background-foto21"/>)}
      {!isLoginMode && (<img src={BackgroundImage21} style={{top: 850}}className="background-foto21"/>)}
      <div className="login-container">
        <h2>{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
        
        {errors.form && <div className="error-message">{errors.form}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <div className="form-group">
                <label>Имя</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Введите имя"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Фамилия</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Введите фамилию"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>Номер телефона</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Пол</label>
                <div className="gender-group">
                  <label className="gender-label">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Мужской
                  </label>
                  <label className="gender-label">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Женский
                  </label>
                </div>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group password">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {!isLoginMode && (
            <div className="form-group password">
              <label>Подтвердите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="toggle-mode">
          {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrors({});
              setPassword('');
              setConfirmPassword('');
              if (!isLoginMode) {
                setFirstName('');
                setLastName('');
                setPhone('');
                setGender('');
              }
            }}
            className="toggle-btn"
          >
            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;