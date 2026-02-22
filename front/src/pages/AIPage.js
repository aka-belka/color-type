import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AIPage.css';

const AIPage = () => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

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

        // Создаем FormData для отправки файла
        const formData = new FormData();
        formData.append('photo', photoFile);

        try {
            // Отправляем на бэкенд (замените URL на ваш)
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
            const testData = {
                season: 'Весна',
                confidence: 87,
                colors: ['#FFDAB9', '#FFB347', '#FF8C69', '#A8E6CF', '#FFD3B6'],
                recommendations: [
                'Теплые пастельные тона',
                'Золотые аксессуары',
                'Коралловый и персиковый',
                'Cлоновая кость'
                ]
            };

            setResult(testData);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveResult = () => {
        if (!isLoggedIn || !result) return;

        // Получаем существующие результаты из localStorage
        const savedResults = JSON.parse(localStorage.getItem(`results_${user.id}`)) || [];
        
        // Добавляем новый результат
        const newResult = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            result: result
        };
        
        const updatedResults = [newResult, ...savedResults];
        localStorage.setItem(`results_${user.id}`, JSON.stringify(updatedResults));
        
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
    };

    return (
        <div className="AI-page">
            <section className="AI-hero-section">
                <h1 className="AI-hero-title">Определим ваш цветотип по фото бесплатно</h1>
                <p className="AI-hero-subtitle">Пройдите сезонный тест онлайн за секунды, бесплатно и без регистрации. Загрузите фото лица и головы и узнайте свой цветотип. Это поможет вам выбрать идеальные цветовые решения и подчеркнуть свою природную красоту.</p>
            </section>

            <section className="foto-section">
                <p className="foto-title">Загрузите фото лица и головы: </p>
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

            {result && (
                <div className="result-container">
                    <div className="result-title">
                        <h2>Результат анализа</h2>
                    </div>
                    <div className="result-info">
                        <div className="result-description">
                            <p>Ваш цветотип: {result.season}</p>
                            <p>Точность: {result.confidence}%</p>
                        </div>
                        {result.colors && (
                            <div className="result-palette">
                                <h3>Ваша цветовая палитра: </h3>
                                <div className="palette-colors">
                                {result.colors.map((color, index) => (
                                    <div 
                                        key={index}
                                        className="palette-color-block"
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