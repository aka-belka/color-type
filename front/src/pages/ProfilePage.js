import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, logout, isAdmin } = useAuth();
    const [savedResults, setSavedResults] = useState([]);
    const [savedPalettes, setSavedPalettes] = useState([]);
    const navigate = useNavigate();
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        if (user) {
            const results = JSON.parse(localStorage.getItem(`results_${user.id}`)) || [];
            setSavedResults(results);
            
            const palettes = JSON.parse(localStorage.getItem(`palettes_${user.id}`)) || [];
            setSavedPalettes(palettes);
    }
    }, [user]);

    const openResultModal = (result) => {
        setSelectedResult(result);
    };

    const closeModal = () => {
        setSelectedResult(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h2>Профиль</h2>
                <div className="profile-info">
                    <p><strong>Имя:</strong> {user.firstName }</p>
                    <p><strong>Фамилия:</strong> {user.lastName }</p>
                    <p><strong>Пол:</strong> {user.gender === 'male' ? 'Мужской' : 'Женский'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                </div>

                {savedResults.length > 0 && (
                <div className="saved-results-section">
                    <h3>Мои результаты анализов</h3>
                    <div className="saved-results-grid">
                    {savedResults.map((item) => (
                        <div key={item.id} className="saved-result-card" onClick={() => openResultModal(item)}>
                        <div className="result-header">
                            <strong>{item.result.season}</strong>
                            <span className="result-date">{item.date}</span>
                        </div>
                        {item.photo && (
                            <img src={item.photo} alt="Анализ" className="result-thumbnail" />
                        )}
                        <div className="result-mini-palette">
                            {item.result.colors?.map((color, i) => (
                            <div 
                                key={i}
                                className="mini-swatch"
                                style={{ backgroundColor: color }}
                            />
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}

                {savedPalettes.length > 0 && (
                <div className="saved-palettes-section">
                    <h3>Мои цветовые палитры</h3>
                    <div className="saved-palettes-grid">
                    {savedPalettes.map((palette) => (
                        <div key={palette.id} className="saved-palette-card">
                            <div className="palette-header">
                                <strong>{palette.name}</strong>
                                <span className="palette-date">{palette.date}</span>
                            </div>
                            <div className="palette-colors-display">
                                {palette.colors.map((color, i) => (
                                <div 
                                    key={i}
                                    className="palette-color-block"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}
                
                <div className="profile-buttons">
                    {isAdmin && (
                    <button 
                        className="admin-btn"
                        onClick={() => navigate('/admin')}
                    >
                        Панель администратора
                    </button>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                    Выйти
                    </button>
                </div>
            </div>

            {selectedResult && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content result-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>✕</button>
                        <h2>Результат анализа</h2>
                        <p><strong>Дата:</strong> {selectedResult.date}</p>
                        <p><strong>Цветотип:</strong> {selectedResult.result.season}</p>
                        <p><strong>Точность:</strong> {selectedResult.result.confidence}%</p>
                        
                        {selectedResult.photo && (
                            <img src={selectedResult.photo} alt="Анализ" className="modal-photo" />
                        )}
                    
                        <div className="modal-palette">
                            <h3>Палитра:</h3>
                            <div className="modal-colors">
                                {selectedResult.result.colors?.map((color, i) => (
                                    <div 
                                    key={i}
                                    className="modal-color"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    
                        {selectedResult.result.recommendations && (
                            <div className="modal-recommendations">
                                <h3>Рекомендации:</h3>
                                <ul>
                                    {selectedResult.result.recommendations.map((rec, i) => (
                                    <li key={i}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;