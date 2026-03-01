import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ColorTheoryPage.css';
import colorWheelImage from '../assets/circle.png';
import {  useTheme } from '../App.js';
import BackgroundImage32 from '../assets/background3.png';
import BackgroundImage42 from '../assets/background4.png';

import seasonIconSpring from '../assets/icons/цветок.png';
import seasonIconSummer from '../assets/icons/солнце.png';
import seasonIconAutumn from '../assets/icons/листья.png';
import seasonIconWinter from '../assets/icons/снежинка.png';

import { ReactComponent as ColorWheelIcon } from '../assets/icons/круг.svg';
import { ReactComponent as Subton } from '../assets/icons/подтоны.svg';

import { ReactComponent as SeasonIconSkin } from '../assets/icons/тело.svg';
import { ReactComponent as SeasonIconEyes } from '../assets/icons/глаз.svg';
import { ReactComponent as SeasonIconHair } from '../assets/icons/волосы.svg';
import { ReactComponent as SeasonIconLips} from '../assets/icons/губы.svg';

import { ReactComponent as SeasonIconSpring } from '../assets/icons/цветок.svg';
import { ReactComponent as SeasonIconSummer } from '../assets/icons/солнце.svg';
import { ReactComponent as SeasonIconAutumn } from '../assets/icons/листья.svg';
import { ReactComponent as SeasonIconWinter} from '../assets/icons/снежинка.svg';

const ColorTheoryPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const { themeMode } = useTheme();

  useEffect(() => {
    
    window.scrollTo(0, 0)
    const handleScroll = () => {
      const sections = document.querySelectorAll('.theory-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.scrollTo(0, 0); 
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Icon = ({ name, className }) => {
    const icons = {
      intro: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      seasons: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/><path d="M12 4L12 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
      harmony: `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L8 8L12 12L16 8L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16L8 12L12 16L16 12L20 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };

    return <span className={className} dangerouslySetInnerHTML={{ __html: icons[name] }} />;
  };
  return (
    <div className={`theory-page ${themeMode}-theme`}>
      {themeMode === 'light' && <img src={BackgroundImage32} className="background-foto32"/>}
      {themeMode === 'light' && <img src={BackgroundImage42} className="background-foto42"/>}
      <section className="theory-hero">
        <div className="theory-hero-content">
          <h1 className="theory-title">ТЕОРИЯ ЦВЕТА</h1>
          <p className="theory-subtitle">
            Цвет - это сила, которая напрямую влияет на душу. Полное руководство по цветотипам, 
            цветовым гармониям и психологии восприятия цвета.
          </p>
          <div className="theory-tags">
            <span className="tag">#КОЛОРИСТИКА</span>
            <span className="tag">#ЦВЕТОВОЙ_КРУГ</span>
            <span className="tag">#ГАРМОНИЯ</span>
            <span className="tag">#ПСИХОЛОГИЯ_ЦВЕТА</span>
          </div>
        </div>
      </section>

      <div className="section-navigation">
        <div className="nav-container">
          <button 
            className={`nav-section-btn ${activeSection === 'intro' ? 'active' : ''}`}
            onClick={() => scrollToSection('intro')}
          >
            <Icon name="intro" className="nav-icon" />
            Введение
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'color-wheel' ? 'active' : ''}`}
            onClick={() => scrollToSection('color-wheel')}
          >
          <ColorWheelIcon className="nav-icon" />
            Цветовой круг
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'seasons' ? 'active' : ''}`}
            onClick={() => scrollToSection('seasons')}
          >
          <Icon name="seasons" className="nav-icon" />
           4 сезона
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'subtones' ? 'active' : ''}`}
            onClick={() => scrollToSection('subtones')}
          >
          <Subton className="nav-icon" />
            12 подтонов
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'harmony' ? 'active' : ''}`}
            onClick={() => scrollToSection('harmony')}
          >
            <Icon name="harmony" className="nav-icon" />
            Цветовые гармонии
          </button>
        </div>
      </div>

      <section id="intro" className="theory-section intro-section">
        <div className="section-header">
          <h2> <Icon name="intro" className="nav-icon icons" />Введение в теорию цвета</h2>
        </div>
        
        <div className="intro-content">
          <div className="intro-text">
            <div className="theory-block">
              <div className="theory-block3">
                <p><strong>Теория цвета</strong> — это система знаний о том, как цвета взаимодействуют между собой и как они влияют на наше восприятие. Еще <strong>Аристотель</strong> пытался систематизировать цвета, выделяя <strong>7 основных</strong>: белый, желтый, красный, фиолетовый, зеленый, синий и черный. Но настоящую революцию совершил <strong>Исаак Ньютон</strong> в 1676 году, когда разложил солнечный свет через призму и получил спектр из 7 цветов.</p>
              </div>
              <div className="theory-block2">
                <p>В 1810 году <strong>Иоганн Вольфганг Гёте</strong> опубликовал "Учение о цвете", где впервые описал психологическое воздействие цвета. А в 1961 году <strong>Йоханнес Иттен</strong> создал свой знаменитый <strong>цветовой круг</strong>, который до сих пор является основой колористики.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="color-wheel" className="theory-section color-wheel-section">
        <div className="section-header sh-wheel">
          <h2> <ColorWheelIcon className="nav-icon icons" />Цветовой круг Иттена</h2>
        </div>
        <div className="color-wheel-content">
          <div className="color-wheel-main">

            <div >
                <img src={colorWheelImage} alt="Цветовой круг Иттена" className="color-wheel-container"/>
                <div className="theory-block1">
                  <p>Цветовой круг Иттена представляет собой схему из <strong>12 цветов</strong> (первичных, вторичных и третичных), которая помогает находить гармоничные цветовые сочетания. Иттен считал, что восприятие цвета работает через контраст.</p>
                </div>
            </div>

            <div className="color-theory-detailed">
              <div className="color-category">
                <div className="col-cat">
                  <p><h3> Первичные цвета</h3>Базовые цвета, которые нельзя получить смешиванием. Все остальные цвета создаются из них.</p>
                </div>
                <div className="color-cards1">
                  <div className="color-card cc">
                    <span className="color-circle " style={{background: '#FF4757'}}></span>
                    <span className="color-name">Красный</span>
                  </div>
                  
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#FFC312'}}></span>
                    <span className="color-name">Желтый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#1E90FF'}}></span>
                    <span className="color-name">Синий</span>
                  </div>
                </div>
              </div>

              <div className="color-category2">
                
                <p><h3>Вторичные цвета </h3>Получаются смешиванием двух первичных цветов в равных пропорциях.</p>
                <div className="color-cards2">
                  <div className="color-card">
                    <span className="color-circle"  style={{background: '#FFA502'}}></span>
                    <span className="color-name">Оранжевый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#2ED573'}}></span>
                    <span className="color-name">Зеленый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle"  style={{background: '#AA80F9'}}></span>
                    <span className="color-name">Фиолетовый</span>
                  </div>
                </div>
              </div>

              <div className="color-category ">
                <p className="color-category3"><h3>Третичные цвета </h3>Получаются смешиванием первичного и вторичного цвета.</p>
                <div className="color-grid-6" >
                  <div className="color-card" >
                    <span className="color-circle"  style={{background: '#FF6B4A'}}></span>
                    <span className="color-name">Красно-оранжевый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#FFD93D'}}></span>
                    <span className="color-name">Желто-оранжевый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#E5FF99'}}></span>
                    <span className="color-name">Желто-зеленый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#4ECDC4'}}></span>
                    <span className="color-name">Сине-зеленый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle" style={{background: '#6C5CE7'}}></span>
                    <span className="color-name">Сине-фиолетовый</span>
                  </div>
                  <div className="color-card" >
                    <span className="color-circle"  style={{background: '#A55EEA'}}></span>
                    <span className="color-name">Красно-фиолетовый</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="seasons" className="theory-section seasons-section">
        <div className="section-header">
          <h2><Icon name="seasons" className="nav-icon icons" />4 Сезона: Теория Цветотипов</h2>
        </div>

        <p className="theory-subtitle ts-p">
          Теория цветотипов делит людей на <strong>4 группы</strong> по аналогии с временами года. 
          Эта система была разработана в <strong>1970-х</strong> годах и до сих пор является основой 
          для подбора персональной цветовой палитры.
        </p>

        <div className="seasons-grid-full">
          <div className="season-card-full spring-card">
            <div className="season-header" style={{background: '#FFDAB9'}}>
              <h3><img src={seasonIconSpring} className="season-icon-s"/>Весна</h3>
              <div className="season-tag">Теплый • Светлый</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4> Характеристика цветотипа</h4>
                <ul>
                  <li>
                    <SeasonIconSkin className="season-icon"/>
                    <strong>Кожа:</strong> Теплого персикового или слоновой кости оттенка. Легко загорает, приобретая золотистый оттенок. Возможны веснушки.
                  </li>
                  <li>
                    <SeasonIconEyes className="feature-icon"/>
                    <strong>Глаза:</strong> Голубые, бирюзовые, зеленые, янтарные, ореховые.
                  </li>
                  <li>
                    <SeasonIconHair className="hair-icon"/>
                    <strong>Волосы:</strong> Золотисто-русые, медовые, пшеничные, льняные, светло-каштановые с рыжиной.
                  </li>
                  <li>
                    <SeasonIconLips className="feature-icon"/>
                    <strong>Губы:</strong> Розового или кораллового оттенка.
                  </li>
                </ul>
              </div>

              <div className="season-palette">
                <h4> Идеальная палитра</h4>
                <div className="palette-full">
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#fdffb9'}}>
                      
                    </div>
                    <div className="palette-color" style={{background: '#FFB347'}}>
                     
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#FF8C69'}}>
                      
                    </div>
                    <div className="palette-color" style={{background: '#FDFF9E'}}>
                      
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#A8E6CF'}}>
                      
                    </div>
                    <div className="palette-color" style={{background: '#DCEDC1'}}>
                      
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#FFD3B6'}}>
                      
                    </div>
                    <div className="palette-color" style={{background: '#E6B8A2'}}>
                      
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="season-card-full summer-card">
            <div className="season-header" style={{background: '#D8BFD8'}}>
              <h3><img src={seasonIconSummer} className="season-icon-s" style={{width: 28,height:28}}/>Лето</h3>
              <div className="season-tag">Холодный • Мягкий</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4>Характеристика цветотипа</h4>
                <ul>
                  <li>
                    <SeasonIconSkin className="season-icon"/>
                    <strong>Кожа:</strong> Светлая с розоватым или оливковым отливом. Плохо загорает, склонна к покраснениям.
                  </li>
                  <li>
                    <SeasonIconEyes className="feature-icon"/>
                    <strong>Глаза:</strong> Серые, серо-голубые, серо-зеленые, ореховые. Без яркого контраста.
                  </li>
                  <li>
                    <SeasonIconHair className="hair-icon"/>
                    <strong>Волосы:</strong> Пепельно-русые, холодный блонд, пепельно-каштановые. С пепельным оттенком без рыжины.
                  </li>
                  <li>
                    <SeasonIconLips className="feature-icon"/>
                    <strong>Губы:</strong> Холодного розового оттенка.
                  </li>
                </ul>
              </div>

              <div className="season-palette">
                <h4> Идеальная палитра</h4>
                <div className="palette-full">
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#E6E6FA'}}>
                    </div>
                    <div className="palette-color" style={{background: '#B0E0E6'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#D8BFD8'}}>
                    </div>
                    <div className="palette-color" style={{background: '#AFEEEE'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#F0F8FF'}}>
                    </div>
                    <div className="palette-color" style={{background: '#E0B0FF'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#C0C0C0'}}>
                    </div>
                    <div className="palette-color" style={{background: '#F5F5DC'}}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="season-card-full autumn-card">
            <div className="season-header" style={{background: '#CD853F'}}>
              <h3><img src={seasonIconAutumn} className="season-icon-s" style={{width: 30,height:30}}/>Осень</h3>
              <div className="season-tag">Теплый • Насыщенный</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4> Характеристика цветотипа</h4>
                <ul>
                  <li>
                    <SeasonIconSkin className="season-icon"/>
                    <strong>Кожа:</strong> Персиковая, бронзовая, золотисто-бежевая. Много рыжевато-коричневых веснушек.
                  </li>
                  <li>
                    <SeasonIconEyes className="feature-icon"/>
                    <strong>Глаза:</strong> Карие, зеленые, янтарные, ореховые. Часто с золотистыми лучиками.
                  </li>
                  <li>
                    <SeasonIconHair className="hair-icon"/>
                    <strong>Волосы:</strong> Рыжие, медные, каштановые с золотым отливом, бронзовые.
                  </li>
                  <li>
                    <SeasonIconLips className="feature-icon"/>
                    <strong>Губы:</strong> Теплого кораллового или персикового оттенка.
                  </li>
                </ul>
              </div>

              <div className="season-palette">
                <h4> Идеальная палитра</h4>
                <div className="palette-full">
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#DEB887'}}>
                    </div>
                    <div className="palette-color" style={{background: '#CD853F'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#8B4513'}}>
                    </div>
                    <div className="palette-color" style={{background: '#D2691E'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#6B8E23'}}>
                    </div>
                    <div className="palette-color" style={{background: '#808000'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#FF8C00'}}>
                    </div>
                    <div className="palette-color" style={{background: '#B8860B'}}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="season-card-full winter-card">
            <div className="season-header" style={{background: '#B0C4DE'}}>
              
              <h3><img src={seasonIconWinter} className="season-icon-s" style={{width: 28,height:28}}/>Зима</h3>
              <div className="season-tag">Холодный • Контрастный</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4>Характеристика цветотипа</h4>
                <ul>
                  <li>
                    <SeasonIconSkin className="season-icon"/>
                    <strong>Кожа:</strong> Фарфорово-белая с голубоватым отливом, оливковая. Практически не загорает.
                  </li>
                  <li>
                    <SeasonIconEyes className="feature-icon"/>
                    <strong>Глаза:</strong> Темно-карие, синие, фиолетовые, серо-голубые. Очень яркие.
                  </li>
                  <li>
                    <SeasonIconHair className="hair-icon"/>
                    <strong>Волосы:</strong> Черные, темно-каштановые, платиновый блонд.
                  </li>
                  <li>
                    <SeasonIconLips className="feature-icon"/>
                    <strong>Губы:</strong> Холодного розового или красного оттенка.
                  </li>
                </ul>
              </div>

              <div className="season-palette">
                <h4>Идеальная палитра</h4>
                <div className="palette-full">
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#FF0000'}}>
                    </div>
                    <div className="palette-color" style={{background: '#0000FF'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#FFFFFF'}}>
                    </div>
                    <div className="palette-color" style={{background: '#000000'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#FF69B4'}}>
                    </div>
                    <div className="palette-color" style={{background: '#9370DB'}}>
                    </div>
                  </div>
                  <div className="palette-row">
                    <div className="palette-color" style={{background: '#00CED1'}}>
                    </div>
                    <div className="palette-color" style={{background: '#C0C0C0'}}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subtones" className="theory-section subtones-section">
        <div className="section-header">
          <h2><Subton className="nav-icon icons" />12 подтонов: детальная система цветотипов</h2>
        </div>
        <p className="theory-subtitle ts-sub">
            Каждый из 4 сезонов делится на 3 подтипа. Всего существует <strong>12 цветотипов</strong>, 
            что позволяет определить вашу палитру с максимальной точностью. 
            Система 12 подтонов учитывает <strong>три параметра</strong>: температуру (теплый/холодный), 
            яркость (чистый/мягкий) и глубину (светлый/темный).
        </p>

        <div className="subtones-matrix">
          <div className="subtype-block">
            <h3 className="subtype-block-title spring-title"> <SeasonIconSpring />ВЕСНА</h3>
            <div className="subtype-grid">
              <div className="subtype-detailed bright">
                <div className="subtype-header" style={{background: '#FFE4B5'}}>
                  <h4>Яркая Весна</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Чистые, яркие теплые тона. Контрастная внешность. Первое, что замечаешь — яркие глаза.</p>
                  <p><strong>Цвета:</strong> Чистый красный, коралловый, бирюзовый, ярко-зеленый.</p>
                  <p><strong>Знаменитости:</strong> Николь Кидман, Кира Найтли</p>
                </div>
              </div>
              <div className="subtype-detailed naturale">
                <div className="subtype-header" style={{background: '#FFDAB9'}}>
                  <h4>Натуральная Весна</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Теплые, приглушенные тона. Мягкий контраст. Золотистые веснушки.</p>
                  <p><strong>Цвета:</strong> Лососевый, персиковый, оливковый, горчичный.</p>
                  <p><strong>Знаменитости:</strong> Джиджи Хадид, Кейт Хадсон</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#FFEBCD'}}>
                  <h4>Светлая Весна</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Светлые, нежные теплые тона. Низкий контраст. Очень светлая внешность.</p>
                  <p><strong>Цвета:</strong> Ванильный, нежно-желтый, мятный, аквамарин.</p>
                  <p><strong>Знаменитости:</strong> Кейт Бланшетт, Кейт Мосс</p>
                </div>
              </div>
            </div>
          </div>
          <div className="subtype-block">
            <h3 className="subtype-block-title summer-title"><SeasonIconSummer style={{marginRight: 5}}/>ЛЕТО</h3>
            <div className="subtype-grid">
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#E6E6FA'}}>
                  <h4>Светлое Лето</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Светлые, холодные пастельные тона. Очень нежная, прозрачная внешность.</p>
                  <p><strong>Цвета:</strong> Лавандовый, нежно-голубой, мятный, пудровый.</p>
                  <p><strong>Знаменитости:</strong> Кейт Миддлтон, Риз Уизерспун</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#B0E0E6'}}>
                  <h4>Холодное Лето</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Чистые холодные тона, средний контраст. Пепельные волосы.</p>
                  <p><strong>Цвета:</strong> Ледяной голубой, мятный, розовый, сиреневый.</p>
                  <p><strong>Знаменитости:</strong> Кэмерон Диас, Сара Джессика Паркер</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#D8BFD8'}}>
                  <h4>Мягкое Лето</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Приглушенные, пыльные холодные тона. Низкий контраст.</p>
                  <p><strong>Цвета:</strong> Пыльная роза, серо-голубой, фиолетовый, сливовый.</p>
                  <p><strong>Знаменитости:</strong> Дженнифер Энистон, Натали Портман</p>
                </div>
              </div>
            </div>
          </div>
          <div className="subtype-block">
            <h3 className="subtype-block-title autumn-title"><SeasonIconAutumn className="season-icon-s"/>ОСЕНЬ </h3>
            <div className="subtype-grid">
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#DEB887'}}>
                  <h4>Мягкая Осень</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Теплые приглушенные тона, низкий контраст. Оливковая кожа.</p>
                  <p><strong>Цвета:</strong> Хаки, оливковый, горчичный, терракотовый.</p>
                  <p><strong>Знаменитости:</strong> Джулия Робертс, Мила Кунис</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#CD853F'}}>
                  <h4>Теплая Осень</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Насыщенные теплые тона, золотистые оттенки. Рыжие волосы.</p>
                  <p><strong>Цвета:</strong> Медный, тыквенный, кирпичный, коричневый.</p>
                  <p><strong>Знаменитости:</strong> Эмма Стоун, Джессика Честейн</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#8B4513'}}>
                  <h4>Темная Осень</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Глубокие теплые тона, высокий контраст. Темные волосы.</p>
                  <p><strong>Цвета:</strong> Шоколадный, кофейный, изумрудный, бордовый.</p>
                  <p><strong>Знаменитости:</strong> Пенелопа Крус, Сальма Хайек</p>
                </div>
              </div>
            </div>
          </div>

          <div className="subtype-block">
            <h3 className="subtype-block-title winter-title"><SeasonIconWinter className="season-icon-s"/>ЗИМА</h3>
            <div className="subtype-grid">
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#4682B4'}}>
                  <h4>Холодная Зима</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Чистые холодные тона, высокая контрастность. Фарфоровая кожа.</p>
                  <p><strong>Цвета:</strong> Красный, синий, белый, черный, фуксия.</p>
                  <p><strong>Знаменитости:</strong> Тейлор Свифт, Меган Фокс</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#483D8B'}}>
                  <h4>Темная Зима</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Глубокие насыщенные холодные тона. Очень темные волосы.</p>
                  <p><strong>Цвета:</strong> Темно-синий, фиолетовый, изумрудный, винный.</p>
                  <p><strong>Знаменитости:</strong> Энн Хэтэуэй, Люси Лью</p>
                </div>
              </div>
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#B0C4DE'}}>
                  <h4>Яркая Зима</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Яркие чистые тона, экстремальный контраст. Бросающаяся в глаза внешность.</p>
                  <p><strong>Цвета:</strong> Лимонный, бирюзовый, маджента, электрик.</p>
                  <p><strong>Знаменитости:</strong> Дита фон Тиз, Кэти Перри</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="harmony" className="theory-section harmony-section">
        <div className="section-header">
          <h2><Icon name="harmony" className="nav-icon icons"/>Цветовые гармонии и сочетания</h2>
        </div>
        <div className="har1">
          <p className="theory-subtitle ">
              <strong>Цветовая гармония</strong> — это теория сочетания цветов для создания приятного визуального восприятия. 
              Существуют математически выверенные схемы, которые гарантированно работают.
          </p>
        </div>
        <div className="har2">
          <p className="theory-subtitle">Универсальное <strong>правило 60-30-10</strong> помогает распределять цвета в образе: 60% занимает доминирующий цвет (фон), 
                30% — дополнительный и 10% — яркие акценты. Это правило работает в одежде, интерьере, графическом дизайне — везде, где нужно 
                создать сбалансированную цветовую композицию.
          </p >
        </div>
        <div className="harmony-schemes">
          <div className="harmony-scheme-card">
            <div className="scheme-visual monochrome-scheme">
              <div className="scheme-bar" style={{background: '#1E3A5F'}}></div>
              <div className="scheme-bar" style={{background: '#2E5090'}}></div>
              <div className="scheme-bar" style={{background: '#4A77B5'}}></div>
              <div className="scheme-bar" style={{background: '#6E9FD1'}}></div>
              <div className="scheme-bar" style={{background: '#A5C8E9'}}></div>
            </div>
            <h4>МОНОХРОМНАЯ ГАРМОНИЯ</h4>
            <p className="scheme-desc">Один цвет в разных оттенках и тонах. Всегда выглядит элегантно, создает целостный образ.</p>
            <div className="scheme-usage">
              <span className="usage-tag">базовый гардероб</span>
              <span className="usage-tag">деловой стиль</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual analogous-scheme">
              <div className="scheme-bar" style={{background: '#FF6B6B'}}></div>
              <div className="scheme-bar" style={{background: '#FF8E53'}}></div>
              <div className="scheme-bar" style={{background: '#FFB347'}}></div>
              <div className="scheme-bar" style={{background: '#FFD93D'}}></div>
            </div>
            <h4>АНАЛОГОВАЯ ГАРМОНИЯ</h4>
            <p className="scheme-desc">2-5 соседних цвета в цветовом круге. Создает спокойную, гармоничную композицию. Часто встречается в природе.</p>
            <div className="scheme-usage">
              <span className="usage-tag">повседневный стиль</span>
              <span className="usage-tag">спокойствие</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual complementary-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#1E90FF'}}></div>
            </div>
            <h4>КОМПЛЕМЕНТАРНАЯ ГАРМОНИЯ</h4>
            <p className="scheme-desc">Противоположные цвета в цветовом круге. Максимальный контраст, энергия и динамика. Привлекает внимание.</p>
            <div className="scheme-usage">
              <span className="usage-tag">вечерние образы</span>
              <span className="usage-tag">акценты</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual split-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#2ED573'}}></div>
              <div className="scheme-bar" style={{background: '#FFA502'}}></div>
            </div>
            <h4>СПЛИТ-КОМПЛЕМЕНТАРНАЯ</h4>
            <p className="scheme-desc">Цвет + два соседа его противоположности. Меньше напряжения, чем в чистой комплементарной.</p>
            <div className="scheme-usage">
              <span className="usage-tag">смелые образы</span>
              <span className="usage-tag">креатив</span>
            </div>
          </div>

          <div className="harmony-scheme-card tr">
            <div className="scheme-visual triad-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#2ED573'}}></div>
              <div className="scheme-bar" style={{background: '#3742FA'}}></div>
            </div>
            <h4>ТРИАДА</h4>
            <p className="scheme-desc">Три цвета на равном расстоянии в цветовом круге. Сбалансированная, яркая, жизнерадостная комбинация.</p>
            <div className="scheme-usage">
              <span className="usage-tag">праздничные образы</span>
              <span className="usage-tag">детство</span>
            </div>
          </div>
          <div className="harmony-scheme-card tetr">
            <div className="scheme-visual tetrad-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#FFA502'}}></div>
              <div className="scheme-bar" style={{background: '#2ED573'}}></div>
              <div className="scheme-bar" style={{background: '#3742FA'}}></div>
            </div>
            <h4>ТЕТРАДА</h4>
            <p className="scheme-desc">Четыре равноудаленных цвета. Самая богатая палитра, но требует баланса и опыта в сочетании.</p>
            <div className="scheme-usage">
              <span className="usage-tag">сложные образы</span>
              <span className="usage-tag">авангард</span>
            </div>
          </div>
        </div>
      </section>

      <section className="theory-final-cta">
        <div className="final-cta-container">
          <h2>Готовы применить теорию на практике?</h2>
          <p>Загрузите фото и получите точный анализ вашего цветотипа с персональной палитрой</p>
          <div className="cta-buttons">
            <Link to="/ai" className="cta-primary">
              Пройти анализ ИИ
            </Link>
            <Link to="/manual" className="cta-secondary">
              Попробовать ручной подбор
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorTheoryPage;