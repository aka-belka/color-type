import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import {  useTheme } from '../App.js';
import BackgroundImage1 from '../assets/background1.png';
import BackgroundImage2 from '../assets/background2.png';
import BackgroundImage3 from '../assets/background3.png';
import BackgroundImage4 from '../assets/background4.png';

const HomePage = () => {
  const { themeMode } = useTheme(); 
  return (
    <div className={`home-page ${themeMode}-theme`}>
      <section className="hero-section">
        {themeMode === 'light' &&  <img src={BackgroundImage4} className="background-foto4"/>}
        <h1 className="hero-title">deSIGNer</h1>
        <p className="hero-subtitle">Раскройте свою цветовую палитру в один клик</p>
        {themeMode === 'light' &&  <img src={BackgroundImage3} className="background-foto3"/>}
      </section>

      <section className="selection-section">
        <div className="selection-cards">
          <div className="selection-card">
            <Link to="/manual" className="card-btn1">
              <a className="title-selection">Подобрать вручную</a>
            </Link>
            <p>Используйте универсальный конструктор, который позволит примерить на себе любой цвет из цветовой палитры</p>
          </div>
          
          <div className="selection-card">
            <Link to="/ai" className="card-btn2">
              <a className="title-selection">Пройти анализ ИИ</a>
            </Link>
            <p>Позвольте ИИ-генератору проанализировать вашу внешность и дать рекомендации по цвету</p>
          </div>
        </div>
      </section>

    <div className="hero-tags">
        <span className="tag">#DESIGNER</span>
        <span className="tag">#ТОЧНЫЙ_ЦВЕТОТИП</span>
        <span className="tag">#ВАША_ПАЛИТРА_ЦВЕТОВ</span>
        <span className="tag">#ПРАКТИЧЕСКИЕ_СОВЕТЫ</span>
        <span className="tag">#ГАРМОНИЯ_ЦВЕТА</span>
        
    </div>

      <section className="how-it-works">
        <h2>Как это работает?</h2>
        <p className="how-it-works-text">
          Просто загрузите свою фотографию — портрет при естественном освещении подойдет идеально. 
          Ваше лицо должно быть хорошо видно, без фильтров и сильного макияжа. 
          Затем наш искусственный интеллект за считанные секунды проанализирует тон вашей кожи, 
          цвет глаз и волос, оценит контраст и яркость (не волнуйтесь, мы не собираем ваши данные).
        </p>
      </section>
      
      <img src={BackgroundImage2} className="background-foto2"/>
      <div className="cta-section">
          <h3>Подготовили для вас материал по теме!</h3>
          <Link 
            to="/theory" 
            className="cta-btn"
          >
            Почитать теорию цвета
          </Link>
      </div>
      
        <img src={BackgroundImage1} className="background-foto1"/>
    </div>
  );
};

export default HomePage;