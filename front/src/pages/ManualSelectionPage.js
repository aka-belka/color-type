import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ManualSelectionPage.css';
import FotoImage from '../assets/foto.png';
import { compress, decompress,useTheme } from '../App.js';
import BackgroundImage3 from '../assets/background3.png';
import BackgroundImage4 from '../assets/background4.png';

const ManualSelectionPage = () => {
  const { isLoggedIn, user } = useAuth(); 
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  
  const [selectedColor, setSelectedColor] = useState(() => {
    return localStorage.getItem('manual_selectedColor') || '#cfae44';
  });

  const [activeColorIndex, setActiveColorIndex] = useState(() => {
    const saved = localStorage.getItem('manual_activeIndex');
    return saved ? parseInt(saved) : 0;
  });

  const [customPalette, setCustomPalette] = useState(() => {
    const saved = localStorage.getItem('manual_customPalette');
    try {
      return saved ? JSON.parse(saved) : ['#cfae44', '#FF4757', '#2ED573', '#FFC312', '#AA80F9'];
    } catch {
      return ['#cfae44', '#FF4757', '#2ED573', '#FFC312', '#AA80F9'];
    }
  });

  const [hue, setHue] = useState(() => {
    const saved = localStorage.getItem('manual_hue');
    return saved ? parseInt(saved) : 46;
  });

  const [saturation, setSaturation] = useState(() => {
    const saved = localStorage.getItem('manual_saturation');
    return saved ? parseInt(saved) : 59;
  });

  const [lightness, setLightness] = useState(() => {
    const saved = localStorage.getItem('manual_lightness');
    return saved ? parseInt(saved) : 54;
  });

  const [userPhoto, setUserPhoto] = useState(() => {
    return localStorage.getItem('manual_currentPhoto') || null;
  });

  const [savedPalettes, setSavedPalettes] = useState([]);
  const [paletteName, setPaletteName] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paletteToDelete, setPaletteToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('manual_selectedColor', selectedColor);
    localStorage.setItem('manual_customPalette', JSON.stringify(customPalette));
    localStorage.setItem('manual_activeIndex', activeColorIndex);
    localStorage.setItem('manual_hue', hue);
    localStorage.setItem('manual_saturation', saturation);
    localStorage.setItem('manual_lightness', lightness);
  }, [selectedColor, customPalette, activeColorIndex, hue, saturation, lightness]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const compressed  = localStorage.getItem(`palettes_${user.id}`);
      if (compressed) {
        const userPalettes = decompress(compressed) || [];
        setSavedPalettes(userPalettes);
      } else {
        setSavedPalettes([]);
      }
  } else {
    setSavedPalettes([]);
  }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const editPalette = localStorage.getItem('editPalette');
    if (editPalette) {
        try {
            const palette = JSON.parse(editPalette);
            setCustomPalette(palette.colors);
            setSelectedColor(palette.colors[0]);
            setActiveColorIndex(0);
            localStorage.removeItem('editPalette'); 
        } catch (e) {
            console.error('Ошибка загрузки палитры:', e);
        }
    }
  }, []); 

  const updateColorFromHSL = () => {
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setSelectedColor(color);
    
    const newPalette = [...customPalette];
    newPalette[activeColorIndex] = color;
    setCustomPalette(newPalette);
  };

  const handleHueChange = (e) => {
    setHue(e.target.value);
    updateColorFromHSL();
  };

  const handleSaturationChange = (e) => {
    setSaturation(e.target.value);
    updateColorFromHSL();
  };

  const handleLightnessChange = (e) => {
    setLightness(e.target.value);
    updateColorFromHSL();
  };

  const colorPalettes = [
    {
      name: 'Весна',
      colors: ['#FFDAB9', '#FFB347', '#FF8C69', '#A8E6CF', '#FFD3B6']
    },
    {
      name: 'Лето',
      colors: ['#E6E6FA', '#B0E0E6', '#D8BFD8', '#AFEEEE', '#C7CEEA']
    },
    {
      name: 'Осень',
      colors: ['#DEB887', '#CD853F', '#8B4513', '#6B8E23', '#D2691E']
    },
    {
      name: 'Зима',
      colors: ['#FF4757', '#1E90FF', '#FFFFFF', '#2C3A47', '#AA80F9']
    }
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    
    const newPalette = [...customPalette];
    newPalette[activeColorIndex] = color;
    setCustomPalette(newPalette);

    const r = parseInt(color.slice(1,3), 16);
    const g = parseInt(color.slice(3,5), 16);
    const b = parseInt(color.slice(5,7), 16);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2 / 255 * 100;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = (l > 50 ? d / (510 - max - min) : d / (max + min)) * 100;
      
      if (max === r) {
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
      } else if (max === g) {
        h = ((b - r) / d + 2) * 60;
      } else {
        h = ((r - g) / d + 4) * 60;
      }
    }
    
    setHue(Math.round(h || 0));
    setSaturation(Math.round(s || 0));
    setLightness(Math.round(l || 50));
  };

  const handlePaletteColorClick = (index) => {
    setActiveColorIndex(index);
    setSelectedColor(customPalette[index]);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result;
        setUserPhoto(photoData);
        localStorage.setItem('manual_currentPhoto', photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePalette = () => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', '/manual');
      setShowLoginModal(true);
      return;
    }
    if (!paletteName) return;
    
    const newPalette = {
      id: Date.now(),
      name: paletteName,
      colors: [...customPalette],
      date: new Date().toLocaleDateString()
    };
    
    const updatedPalettes = [newPalette, ...savedPalettes];
    setSavedPalettes(updatedPalettes);
    
    if (user) {
      const compressed = compress(updatedPalettes);
      localStorage.setItem(`palettes_${user.id}`, compressed);
    }
    
    setPaletteName('');
  };

  const handleUsePalette = (palette) => {
    setCustomPalette(palette.colors);
    setSelectedColor(palette.colors[0]);
    setActiveColorIndex(0);
  };

  const handleDeletePalette = (paletteId, e) => {
    e.stopPropagation(); 
    setPaletteToDelete(paletteId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (paletteToDelete) {
      const updatedPalettes = savedPalettes.filter(p => p.id !== paletteToDelete);
      setSavedPalettes(updatedPalettes);
      
      if (user) {
        const compressed = compress(updatedPalettes);
        localStorage.setItem(`palettes_${user.id}`, compressed);
      }
      
      setShowDeleteModal(false);
      setPaletteToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPaletteToDelete(null);
  };

  return (
    <div className={`manual-page ${themeMode}-theme`}>
      {themeMode === 'light' &&  <img src={BackgroundImage4} className="background-foto4"/>}
      <div className="manual-header">
        <h1>РУЧНОЙ ПОДБОР ЦВЕТОВ</h1>
        <p>Примеряйте цвета на своё фото и настраивайте оттенки</p>
      </div>
      {themeMode === 'light' &&  <img src={BackgroundImage3} className="background-foto3"/>}

      <div className="manual-content">
        <div className="circle-column">
          <div className="circle-container">
            <div className="circle-wrapper">
              <div 
                className="color-circle1"
                style={{ 
                  backgroundColor: selectedColor
                }}
              >
                {userPhoto ? (
                  <div className="photo-frame">
                    <img 
                      src={userPhoto} 
                      alt="User" 
                      className="user-photo"
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <label htmlFor="photo-upload" className="upload-label">
                      <img src={FotoImage} alt="Фотоаппарат" className="upload-icon"/>
                      <span>Добавить фото</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            {userPhoto && (
              <button 
                className="change-photo-btn"
                onClick={() => {
                  const input = document.getElementById('photo-upload');
                  if (input) {
                    input.click();
                  }
                }}
              >
                Изменить фото
              </button>
            )}

            <div className="color-controls">
              <div className="current-color">
                <div className="color-dot" style={{ backgroundColor: selectedColor }}></div>
                <span className="color-code">
                  {selectedColor.startsWith('#') 
                  ? `hsl(${hue}, ${saturation}%, ${lightness}%)` 
                  : selectedColor}</span>
              </div>

              <div className="sliders-panel">
                <div className="slider-group">
                  <div className="slider-header">
                    <label>Оттенок</label>
                    <span className="slider-value">{hue}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={hue}
                    onChange={handleHueChange}
                    className="hue-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <label>Насыщенность</label>
                    <span className="slider-value">{saturation}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={saturation}
                    onChange={handleSaturationChange}
                    className="saturation-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <label>Яркость</label>
                    <span className="slider-value">{lightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={lightness}
                    onChange={handleLightnessChange}
                    className="lightness-slider"
                  />
                </div>
              </div>

              <div className="current-palette">
                <h3>ТЕКУЩАЯ ПАЛИТРА</h3>
                <p className="palette-hint">Нажмите на цвет, чтобы редактировать</p>
                <div className="palette-preview">
                  {customPalette.map((color, index) => (
                    <div 
                      key={index} 
                      className={`palette-color ${activeColorIndex === index ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handlePaletteColorClick(index)}
                    >
                      {activeColorIndex === index && <span className="active-indicator">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="save-palette">
                <input
                  type="text"
                  placeholder="Название палитры"
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                />
                <button onClick={handleSavePalette} disabled={!paletteName}>
                  Сохранить палитру
                </button>
              </div>
              
            </div>
          </div>
        </div>

        <div className="palettes-column">
          <div className="palettes-card">
            <h2>ГОТОВЫЕ ПАЛИТРЫ</h2>
            
            <div className="palettes-list">
              {colorPalettes.map((palette, index) => (
                <div key={index} className="palette-item">
                  <h3>{palette.name}</h3>
                  <div className="palette-colors">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className={`palette-swatch ${selectedColor === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      {isLoggedIn && savedPalettes.length > 0 && (
        <>
          <div className="my-palettes-section">
            <div className="my-palettes-card">
              <div  className="my-palettes-card-title">
                <h3 >МОИ ПАЛИТРЫ</h3>
              </div>
              <div className="saved-palettes">
                {savedPalettes.map((palette) => (
                  <div key={palette.id} className="saved-item">
                    <div className="saved-header">
                      <strong>{palette.name}</strong>
                      <span className="saved-date">{palette.date}</span>
                    </div>
                    <div className="saved-colors">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="saved-swatch"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                    <div className="palette-actions">
                      <button 
                        className="use-saved-btn"
                        onClick={() => handleUsePalette(palette)}
                        style={{ background: "none" }} 
                      >
                        Использовать
                      </button>
                      <button 
                        className="delete-palette-btn"
                        style={{ background: "none" }} 
                        onClick={(e) => handleDeletePalette(palette.id, e)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
        
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>✕</button>
            <p>Пожалуйста, войдите в систему, чтобы сохранять палитры</p>
            <button className="modal-login-btn" onClick={() => navigate('/login')}>
              Войти
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete} >
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()} style={{background: "var(--bg-color10)"}}>
            <button className="modal-close" onClick={cancelDelete}>✕</button>
            <h3>Подтверждение удаления</h3>
            <p style={{color:"black"}}>Вы уверены, что хотите удалить эту палитру?</p>
            <div className="delete-modal-actions">
              <button className="delete-palette-btn del" onClick={confirmDelete}>
                Удалить
              </button>
              <button className="delete-cancel-btn" onClick={cancelDelete}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualSelectionPage;