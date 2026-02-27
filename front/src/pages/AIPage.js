import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AIPage.css';
import { compress, decompress, useTheme  } from '../App.js';
import imageCompression from 'browser-image-compression';
import BackgroundImage2 from '../assets/background2.png';
import BackgroundImage3 from '../assets/background3.png';
import BackgroundImage4 from '../assets/background4.png';

const AIPage = () => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const { themeMode } = useTheme();

    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        if (!photoFile) return;

        setIsLoading(true);

        const formData = new FormData();
        formData.append('photo', photoFile);

        try {
            const response = await fetch('http://localhost:5000/api/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ошибка сети');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Ошибка при анализе:', error);
            const testResults = [
                {
                    season: 'Весна',
                    confidence: 87,
                    colors: ['#FFDAB9', '#FFB347', '#FF8C69', '#A8E6CF', '#FFD3B6'],
                    recommendations: [
                        'Теплые пастельные тона',
                        'Золотые аксессуары',
                        'Коралловый и персиковый',
                        'Избегайте черного и белоснежного'
                    ]
                },
                {
                    season: 'Лето',
                    confidence: 92,
                    colors: ['#E6E6FA', '#B0E0E6', '#D8BFD8', '#AFEEEE', '#C7CEEA'],
                    recommendations: [
                        'Холодные пастельные тона',
                        'Серебряные аксессуары',
                        'Лавандовый и мятный',
                        'Избегайте ярких теплых цветов'
                    ]
                },
                {
                    season: 'Осень',
                    confidence: 78,
                    colors: ['#DEB887', '#CD853F', '#8B4513', '#6B8E23', '#D2691E'],
                    recommendations: [
                        'Теплые насыщенные тона',
                        'Землистые оттенки',
                        'Оливковый и горчичный',
                        'Избегайте холодных пастелей'
                    ]
                },
                {
                    season: 'Зима',
                    confidence: 95,
                    colors: ['#FF4757', '#1E90FF', '#FFFFFF', '#2C3A47', '#AA80F9'],
                    recommendations: [
                        'Чистые холодные тона',
                        'Контрастные сочетания',
                        'Красный и синий',
                        'Избегайте теплых и приглушенных цветов'
                    ]
                }
            ];

            const randomIndex = Math.floor(Math.random() * testResults.length);
            const data = testResults[randomIndex];

            setResult(data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveResult = async () => {
        if (!isLoggedIn || !result) return;

        const compressed = localStorage.getItem(`results_${user.id}`);
        const savedResults = compressed ? decompress(compressed) : [];
        let compressedPhoto = userPhoto;
        if (photoFile) {
            const options = {
            maxSizeMB: 0.5, 
            maxWidthOrHeight: 500, 
            useWebWorker: true
            };
            
            try {
                const compressedFile = await imageCompression(photoFile, options);
                compressedPhoto = await imageCompression.getDataUrlFromFile(compressedFile);
                console.log('Фото сжато, размер:', compressedPhoto.length);
            } catch (error) {
                console.error('Ошибка сжатия фото:', error);
                compressedPhoto = userPhoto; 
            }
        }
        const newResult = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            photo:  compressedPhoto,
            result: result
        };
        
        const updatedResults = [newResult, ...savedResults];
        
        const compressedData = compress(updatedResults);
        localStorage.setItem(`results_${user.id}`, compressedData);
        
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
    };

    return (
        <div className={`AI-page ${themeMode}-theme`}>
            {themeMode === 'light' &&  <img src={BackgroundImage4} className="background-foto41"/>}
            <section className="AI-hero-section">
                <h1 className="AI-hero-title">ОПРЕДЕЛИМ ЦВЕТОТИП ПО ФОТО </h1>
                <p className="AI-hero-subtitle">Пройдите сезонный тест онлайн за секунды, бесплатно и без регистрации. Загрузите фото лица и головы и узнайте свой цветотип. Это поможет вам выбрать идеальные цветовые решения и подчеркнуть свою природную красоту.</p>
            </section>
            {themeMode === 'light' && !result  && (<img src={BackgroundImage3} style={{top : 500}} className="background-foto31"/>)}
            {themeMode === 'light' && result && isLoggedIn && (<img src={BackgroundImage3} className="background-foto31"/>)}
            <section className="foto-result-section">
                <section className="foto-section">
                    <p className="foto-title">ЗАГРУЗИТЕ ФОТО ЛИЦА И ГОЛОВЫ: </p>
                    <p className="foto-hint">Пожалуйста, убедитесь, что освещение хорошее, лицо хорошо видно, без фильтров и сильного макияжа</p>
                
                    {userPhoto ? (
                        <div className="foto-preview">
                        <img src={userPhoto} alt="User" className="preview-img" />
                        </div>
                    ) : (
                        <div className="foto" onClick={() => document.getElementById('photo-upload-ai').click()}>
                            <p>Нажмите, чтобы выбрать PNG, JPG, WEBP</p>
                        </div>
                    )}
                    
                    <input
                        id="photo-upload-ai"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                    />
                    
                    <div className="button-container">
                        <button 
                            className="change-photo-btn-ai"
                            disabled={!userPhoto || isLoading}
                            onClick={() => document.getElementById('photo-upload-ai').click()}
                        >
                            Изменить фото
                        </button>
                        
                        <button 
                            className="AI-btn" 
                            disabled={!userPhoto || isLoading}
                            onClick={handleAnalyze}
                        >
                            {isLoading ? 'Анализ...' : 'Узнайте цветотип бесплатно!'}
                        </button>
                    </div>
                
                </section>
                {result && isLoggedIn && (
                        <div className="result-container">
                            <div className="result-title">
                                <h2>РЕЗУЛЬТАТ АНАЛИЗА</h2>
                            </div>
                            <div className="result-info">
                                <div className="result-description">
                                    <p><strong>Ваш цветотип:</strong> {result.season}</p>
                                    <p><strong>Точность:</strong> {result.confidence}%</p>
                                </div>
                                {result.colors && (
                                    <div className="result-palette">
                                        <h3>Ваша цветовая палитра: </h3>
                                        <div className="palette-colors">
                                        {result.colors.map((color, index) => (
                                            <div 
                                                key={index}
                                                className="palette-color-block1"
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {result.recommendations && (
                                <div className="result-recommendations">
                                    <h3>Рекомендации:</h3>
                                    <ul>
                                    {result.recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                    </ul>
                                </div>
                            )}

                            <div className="result-buttons">
                                <button 
                                    className="save-result-btn"
                                    onClick={handleSaveResult}
                                >
                                    {saveSuccess ? '✓ Сохранено' : 'Сохранить результат'}
                                </button>
                            </div>
                            
                        </div>
                )}
            </section>
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowLoginModal(false)}>✕</button>
                            <p>Пожалуйста, войдите в систему, чтобы проанализировать фото</p>
                        <button className="modal-login-btn" onClick={() => navigate('/login')}>
                            Войти
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIPage;