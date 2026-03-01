import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';
import { compress, decompress, useTheme } from '../App.js';
import BackgroundImage43 from '../assets/background4.png';
import BackgroundImage13 from '../assets/background1.png';

const ProfilePage = () => {
    const { user, logout, isAdmin } = useAuth();
    const [savedResults, setSavedResults] = useState([]);
    const [savedPalettes, setSavedPalettes] = useState([]);
    const navigate = useNavigate();
    const [selectedResult, setSelectedResult] = useState(null);
    const { themeMode } = useTheme();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (user) {
            
            const resultsCompressed = localStorage.getItem(`results_${user.id}`);
            const results = resultsCompressed ? decompress(resultsCompressed) : [];
            console.log('Загруженные результаты:', results);
            setSavedResults(results);
            
            const palettesCompressed = localStorage.getItem(`palettes_${user.id}`);
            const palettes = palettesCompressed ? decompress(palettesCompressed) : [];
            setSavedPalettes(palettes);
    }
    }, [user]);

    const openResultModal = (result) => {
        setSelectedResult(result);
    };

    const closeModal = () => {
        setSelectedResult(null);
    };

    const handleDeleteResult = (resultId, e) => {
        e.stopPropagation();
        setItemToDelete(resultId);
        setDeleteType('result');
        setShowDeleteModal(true);
    };

    const handleDeletePalette = (paletteId, e) => {
        e.stopPropagation();
        setItemToDelete(paletteId);
        setDeleteType('palette');
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteType === 'result') {
            const updatedResults = savedResults.filter(r => r.id !== itemToDelete);
            setSavedResults(updatedResults);
            if (user) {
                const compressed = compress(updatedResults);
                localStorage.setItem(`results_${user.id}`, compressed);
            }
        } else if (deleteType === 'palette') {
            const updatedPalettes = savedPalettes.filter(p => p.id !== itemToDelete);
            setSavedPalettes(updatedPalettes);
            if (user) {
                const compressed = compress(updatedPalettes);
                localStorage.setItem(`palettes_${user.id}`, compressed);
            }
        }
        
        setShowDeleteModal(false);
        setItemToDelete(null);
        setDeleteType(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
        setDeleteType(null);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        logout();
        navigate('/');
        setShowLogoutModal(false);
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    if (!user) {
        navigate('/login');
        return null;
    }
    const handleEditPalette = (palette) => {
        localStorage.setItem('editPalette', JSON.stringify(palette));
        navigate('/manual');
    };
    return (
        <div className={`profile-page ${themeMode}-theme`}>
            <img src={BackgroundImage13} className="background-foto13"/>
            {themeMode === 'light' && <img src={BackgroundImage43} className="background-foto43" />}
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
                            <div key={item.id} className="saved-result-card">
                                <div 
                                    className="result-card-content" 
                                    onClick={() => openResultModal(item)}
                                >
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
                                <div className="delete-result-btn1-container"> 
                                    <button 
                                        className="delete-result-btn1"
                                        onClick={(e) => handleDeleteResult(item.id, e)}
                                    >
                                        Удалить
                                    </button>
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
                            <div className="palette-actions">
                                <button 
                                    className="edit-palette-btn"
                                    onClick={() => handleEditPalette(palette)}
                                    title="Редактировать"
                                    style={{ background: "none" }} 
                                >
                                    Редактировать
                                </button>
                                <button 
                                    className="delete-palette-btn"
                                    onClick={(e) => handleDeletePalette(palette.id, e)}
                                    title="Удалить"
                                    style={{ background: "none" }} 
                                >
                                    Удалить
                                </button>
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
                    <button onClick={handleLogoutClick} className="logout-btn">
                    Выйти
                    </button>
                </div>
            </div>

            {selectedResult && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content result-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>✕</button>
                        <h2>Результат анализа</h2>
                        {selectedResult.photo && (
                            <img src={selectedResult.photo} alt="Анализ" className="modal-photo" />
                        )}
                        <div className="mod-res">
                            <div>
                                <p><strong>Дата:</strong> {selectedResult.date}</p>
                                <p><strong>Цветотип:</strong> {selectedResult.result.season}</p>
                                <p><strong>Точность:</strong> {selectedResult.result.confidence}%</p>
                            </div>
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
            {showDeleteModal && (
                <div className="modal-overlay" onClick={cancelDelete}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()} style={{background: "var(--bg-color10)"}}>
                        <button className="modal-close" onClick={cancelDelete}>✕</button>
                        <h3>Подтверждение удаления</h3>
                        <p style={{color:"black"}}>
                            {deleteType === 'result' 
                                ? 'Вы уверены, что хотите удалить этот результат анализа?'
                                : 'Вы уверены, что хотите удалить эту палитру?'
                            }
                        </p>
                        <div className="delete-modal-actions">
                            <button className="delete-palette-btn" onClick={confirmDelete} style={{background: "none"}}>
                                Удалить
                            </button>
                            <button className="delete-cancel-btn" onClick={cancelDelete}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLogoutModal && (
                <div className="modal-overlay" onClick={cancelLogout}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()} style={{background: "var(--bg-color10)"}}>
                        <button className="modal-close" onClick={cancelLogout}>✕</button>
                        <h3>Подтверждение выхода</h3>
                        <p style={{color:"black"}}>Вы уверены, что хотите выйти из аккаунта?</p>
                        <div className="delete-modal-actions">
                            <button className="delete-palette-btn" onClick={confirmLogout} style={{background: "none"}}>
                                Выйти
                            </button>
                            <button className="delete-cancel-btn" onClick={cancelLogout}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;