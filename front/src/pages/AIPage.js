import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AIPage.css';

const AIPage = () => {

    const [userPhoto, setUserPhoto] = useState(null);

    const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
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
                    <p>Перетащите фото лица и головы или нажмите, чтобы выбрать PNG, JPG, WEBP</p>
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
                {userPhoto && (
                    <button 
                        className="change-photo-btn-ai"
                        onClick={() => document.getElementById('photo-upload-ai').click()}
                    >
                        Изменить фото
                    </button>
                )}
                
                <button className="AI-btn" disabled={!userPhoto}>
                    Узнайте цветотип бесплатно!
                </button>
            </div>
        </section>
    </div>
    );
};

export default AIPage;