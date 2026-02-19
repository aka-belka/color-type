import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ColorTheoryPage.css';
import colorWheelImage from '../assets/circle.png';
const ColorTheoryPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSaveArticle = (articleId) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  return (
    <div className="theory-page">
      <section className="theory-hero">
        <div className="theory-hero-content">
          <h1 className="theory-title">Теория цвета</h1>
          <p className="theory-subtitle">
            Цвет — это сила, которая напрямую влияет на душу. Полное руководство по цветотипам, 
            цветовым гармониям и психологии восприятия цвета.
          </p>
          <div className="theory-tags">
            <span className="tag">#КОЛОРИСТИКА</span>
            <span className="tag">#ЦВЕТОВОЙ_КРУГ</span>
            <span className="tag">#4_СЕЗОНА</span>
            <span className="tag">#12_ПОДТОНОВ</span>
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
            Введение
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'color-wheel' ? 'active' : ''}`}
            onClick={() => scrollToSection('color-wheel')}
          >
            Цветовой круг
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'seasons' ? 'active' : ''}`}
            onClick={() => scrollToSection('seasons')}
          >
           4 сезона
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'subtones' ? 'active' : ''}`}
            onClick={() => scrollToSection('subtones')}
          >
            12 подтонов
          </button>
          <button 
            className={`nav-section-btn ${activeSection === 'harmony' ? 'active' : ''}`}
            onClick={() => scrollToSection('harmony')}
          >
            Цветовые гармонии
          </button>
        </div>
      </div>

      <section id="intro" className="theory-section intro-section">
        <div className="section-header">
          <h2>Введение в теорию цвета</h2>
        </div>
        
        <div className="intro-content">
          <div className="intro-text">
            <div className="theory-block">
              <p>Теория цвета — это система знаний о том, как цвета взаимодействуют между собой и как они влияют на наше восприятие. Еще Аристотель пытался систематизировать цвета, выделяя 7 основных: белый, желтый, красный, фиолетовый, зеленый, синий и черный. Но настоящую революцию совершил Исаак Ньютон в 1676 году, когда разложил солнечный свет через призму и получил спектр из 7 цветов.</p>
              <p>В 1810 году Иоганн Вольфганг Гёте опубликовал "Учение о цвете", где впервые описал психологическое воздействие цвета. А в 1961 году Йоханнес Иттен создал свой знаменитый цветовой круг, который до сих пор является основой колористики.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="color-wheel" className=" color-wheel-section">
        <div className="section-header">
          <h2>Цветовой круг Иттена</h2>
        </div>

        <div className="theory-block">
          <p>Цветовой круг Иттена представляет собой схему из 12 цветов (первичных, вторичных и третичных), которая помогает находить гармоничные цветовые сочетания. Иттен считал, что восприятие цвета работает через контраст. Мы не оцениваем оттенок сам по себе — только в сравнении с другими. Поэтому важной задачей является выстраивание сбалансированного взаимодействия между цветами.</p>
        </div>
        <div className="color-wheel-content">
          <div className="color-wheel-main">
            <div>
              <img src={colorWheelImage} alt="Цветовой круг Иттена" className="color-wheel-container"/>
            </div>

            <div className="color-theory-detailed">
              <div className="color-category">
                <p><h3> Первичные цвета</h3>Базовые цвета, которые нельзя получить смешиванием. Все остальные цвета создаются из них.</p>
                <div className="color-cards">
                  <div className="color-card">
                    <span className="color-circle" style={{background: '#FF4757'}}></span>
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

              <div className="color-category">
                
                <p><h3>Вторичные цвета </h3>Получаются смешиванием двух первичных цветов в равных пропорциях.</p>
                <div className="color-cards">
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
                <p><h3>Третичные цвета </h3>Получаются смешиванием первичного и вторичного цвета.</p>
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
          <h2>4 сезона: теория цветотипов</h2>
        </div>

        <p className="theory-subtitle">
          Теория цветотипов делит людей на 4 группы по аналогии с временами года. 
          Эта система была разработана в 1970-х годах и до сих пор является основой 
          для подбора персональной цветовой палитры.
        </p>

        <div className="seasons-grid-full">
          <div className="season-card-full spring-card">
            <div className="season-header" style={{background:'#77660d',color: 'white'}}>
              <h3>Весна</h3>
              <div className="season-tag">Теплый • Светлый • Чистый</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4> Характеристика цветотипа</h4>
                <ul>
                  <li><strong>Кожа:</strong> Теплого персикового или слоновой кости оттенка. Легко загорает, приобретая золотистый оттенок. Возможны веснушки золотистого цвета.</li>
                  <li><strong>Глаза:</strong> Голубые, бирюзовые, зеленые, янтарные, ореховые. Часто с золотистыми крапинками.</li>
                  <li><strong>Волосы:</strong> Золотисто-русые, медовые, пшеничные, льняные, светло-каштановые с рыжиной.</li>
                  <li><strong>Губы:</strong> Теплого розового или кораллового оттенка.</li>
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
            <div className="season-header" style={{background: '#4d770d'}}>
              <h3>Лето</h3>
              <div className="season-tag">Холодный • Мягкий • Приглушенный</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4>Характеристика цветотипа</h4>
                <ul>
                  <li><strong>Кожа:</strong> Светлая с розоватым или оливковым отливом. Плохо загорает, склонна к покраснениям.</li>
                  <li><strong>Глаза:</strong> Серые, серо-голубые, серо-зеленые, ореховые. Без яркого контраста.</li>
                  <li><strong>Волосы:</strong> Пепельно-русые, холодный блонд, пепельно-каштановые. С пепельным оттенком без рыжины.</li>
                  <li><strong>Губы:</strong> Холодного розового оттенка.</li>
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
            <div className="season-header" style={{background: '#773d0d'}}>
              <h3>Осень</h3>
              <div className="season-tag">Теплый • Насыщенный • Глубокий</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4> Характеристика цветотипа</h4>
                <ul>
                  <li><strong>Кожа:</strong> Персиковая, бронзовая, золотисто-бежевая. Много веснушек рыжевато-коричневого цвета.</li>
                  <li><strong>Глаза:</strong> Карие, зеленые, янтарные, ореховые. Часто с золотистыми лучиками.</li>
                  <li><strong>Волосы:</strong> Рыжие, медные, каштановые с золотым отливом, бронзовые.</li>
                  <li><strong>Губы:</strong> Теплого кораллового или персикового оттенка.</li>
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
            <div className="season-header" style={{background: '#0d2277'}}>
              <h3>Зима</h3>
              <div className="season-tag">Холодный • Яркий • Контрастный</div>
            </div>
            <div className="season-body">
              <div className="season-physics">
                <h4>Характеристика цветотипа</h4>
                <ul>
                  <li><strong>Кожа:</strong> Фарфорово-белая с голубоватым отливом, оливковая. Практически не загорает.</li>
                  <li><strong>Глаза:</strong> Темно-карие, синие, фиолетовые, серо-голубые. Очень яркие, контрастные.</li>
                  <li><strong>Волосы:</strong> Черные, темно-каштановые, платиновый блонд. С холодным пепельным отливом.</li>
                  <li><strong>Губы:</strong> Холодного розового или красного оттенка.</li>
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

        <div className="seasons-conclusion">
          <h4>Как определить свой цветотип?</h4>
          <div className="test-methods">
            <div className="test-method">
              <div className="method-content">
                <h5>Тест с венами</h5>
                <p>Посмотрите на вены на запястье при дневном свете. Если они зеленоватые — теплый тип (Весна/Осень). Если голубоватые — холодный (Лето/Зима).</p>
              </div>
            </div>
            <div className="test-method">
              <div className="method-content">
                <h5>Тест с белой бумагой</h5>
                <p>Поднесите к лицу чистый белый лист. Если кожа кажется желтоватой — теплый тип, если розоватой — холодный.</p>
              </div>
            </div>
            <div className="test-method">
              <div className="method-content">
                <h5>Тест с золотом и серебром</h5>
                <p>Примерьте золотое и серебряное украшение. С золотом лицо светится — теплый тип. С серебром — холодный.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subtones" className="theory-section subtones-section">
        <div className="section-header">
          <h2> 12 подтонов: детальная система цветотипов</h2>
        </div>
        <p className="theory-subtitle">
            Каждый из 4 сезонов делится на 3 подтипа. Всего существует 12 цветотипов, 
            что позволяет определить вашу палитру с максимальной точностью. 
            Система 12 подтонов учитывает три параметра: температуру (теплый/холодный), 
            яркость (чистый/мягкий) и глубину (светлый/темный).
        </p>

        <div className="subtones-matrix">
          <div className="subtype-block">
            <h3 className="subtype-block-title spring-title"> Весна</h3>
            <div className="subtype-grid">
              <div className="subtype-detailed">
                <div className="subtype-header" style={{background: '#FFE4B5'}}>
                  <h4>Яркая Весна</h4>
                </div>
                <div className="subtype-content">
                  <p><strong>Характеристика:</strong> Чистые, яркие теплые тона. Контрастная внешность. Первое, что замечаешь — яркие глаза.</p>
                  <p><strong>Цвета:</strong> Чистый красный, коралловый, бирюзовый, ярко-зеленый.</p>
                  <p><strong>Знаменитости:</strong> Николь Кидман, Кира Найтли</p>
                </div>
              </div>
              <div className="subtype-detailed">
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
            <h3 className="subtype-block-title summer-title">Лето</h3>
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
            <h3 className="subtype-block-title autumn-title">Осень </h3>
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
            <h3 className="subtype-block-title winter-title">Зима</h3>
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
          <h2>Цветовые гармонии и сочетания</h2>
        </div>
        <p className="theory-subtitle">
            Цветовая гармония — это теория сочетания цветов для создания приятного визуального восприятия. 
            Существуют математически выверенные схемы, которые гарантированно работают.
        </p>
        <p className="theory-subtitle">Универсальное правило 60-30-10 помогает распределять цвета в образе: 60% занимает доминирующий цвет (фон), 
              30% — дополнительный и 10% — яркие акценты. Это правило работает в одежде, интерьере, графическом дизайне — везде, где нужно 
              создать сбалансированную цветовую композицию.
        </p >

        <div className="harmony-schemes">
          <div className="harmony-scheme-card">
            <div className="scheme-visual monochrome-scheme">
              <div className="scheme-bar" style={{background: '#1E3A5F'}}></div>
              <div className="scheme-bar" style={{background: '#2E5090'}}></div>
              <div className="scheme-bar" style={{background: '#4A77B5'}}></div>
              <div className="scheme-bar" style={{background: '#6E9FD1'}}></div>
              <div className="scheme-bar" style={{background: '#A5C8E9'}}></div>
            </div>
            <h4>Монохромная гармония</h4>
            <p className="scheme-desc">Один цвет в разных оттенках и тонах. Всегда выглядит элегантно, создает целостный образ. Идеально для минималистов.</p>
            <div className="scheme-usage">
              <span className="usage-tag">базовый гардероб</span>
              <span className="usage-tag">деловой стиль</span>
              <span className="usage-tag">интерьер</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual analogous-scheme">
              <div className="scheme-bar" style={{background: '#FF6B6B'}}></div>
              <div className="scheme-bar" style={{background: '#FF8E53'}}></div>
              <div className="scheme-bar" style={{background: '#FFB347'}}></div>
              <div className="scheme-bar" style={{background: '#FFD93D'}}></div>
            </div>
            <h4>Аналоговая гармония</h4>
            <p className="scheme-desc">2-5 соседних цвета в цветовом круге. Создает спокойную, гармоничную композицию. Часто встречается в природе.</p>
            <div className="scheme-usage">
              <span className="usage-tag">повседневный стиль</span>
              <span className="usage-tag">природные образы</span>
              <span className="usage-tag">спокойствие</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual complementary-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#1E90FF'}}></div>
            </div>
            <h4>Комплементарная гармония</h4>
            <p className="scheme-desc">Противоположные цвета в цветовом круге. Максимальный контраст, энергия и динамика. Привлекает внимание.</p>
            <div className="scheme-usage">
              <span className="usage-tag">вечерние образы</span>
              <span className="usage-tag">акценты</span>
              <span className="usage-tag">спорт</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual split-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#2ED573'}}></div>
              <div className="scheme-bar" style={{background: '#FFA502'}}></div>
            </div>
            <h4>Сплит-комплементарная</h4>
            <p className="scheme-desc">Цвет + два соседа его противоположности. Меньше напряжения, чем в чистой комплементарной, но сохраняет контраст.</p>
            <div className="scheme-usage">
              <span className="usage-tag">смелые образы</span>
              <span className="usage-tag">креатив</span>
            </div>
          </div>

          <div className="harmony-scheme-card">
            <div className="scheme-visual triad-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#2ED573'}}></div>
              <div className="scheme-bar" style={{background: '#3742FA'}}></div>
            </div>
            <h4>Триада</h4>
            <p className="scheme-desc">Три цвета на равном расстоянии в цветовом круге. Сбалансированная, яркая, жизнерадостная комбинация.</p>
            <div className="scheme-usage">
              <span className="usage-tag">праздничные образы</span>
              <span className="usage-tag">детская одежда</span>
            </div>
          </div>

          {/* Тетрада */}
          <div className="harmony-scheme-card">
            <div className="scheme-visual tetrad-scheme">
              <div className="scheme-bar" style={{background: '#FF4757'}}></div>
              <div className="scheme-bar" style={{background: '#FFA502'}}></div>
              <div className="scheme-bar" style={{background: '#2ED573'}}></div>
              <div className="scheme-bar" style={{background: '#3742FA'}}></div>
            </div>
            <h4>Тетрада (квадрат)</h4>
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