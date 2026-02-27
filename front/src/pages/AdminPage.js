import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminPage.css';
import {  decompress, useTheme } from '../App.js';


const AdminPage = () => {
  const { users, isAdmin, deleteUser, toggleUserRole } = useAuth();
  const [bannedUsers, setBannedUsers] = useState([]);
  const [stats, setStats] = useState({
    totalAIAnalyses: 0,
    colorTypeStats: {},
    popularColorTypes: []
  });
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/profile');
      return;
    }

    loadBannedUsers();
    loadStatistics();
  }, [isAdmin, navigate]);

  const loadBannedUsers = () => {
    const banned = JSON.parse(localStorage.getItem('bannedUsers')) || [];
    setBannedUsers(banned);
  };

  const banUser = (userId) => {
    const updatedBanned = [...bannedUsers, userId];
    setBannedUsers(updatedBanned);
    localStorage.setItem('bannedUsers', JSON.stringify(updatedBanned));
    
  };

  const unbanUser = (userId) => {
    const updatedBanned = bannedUsers.filter(id => id !== userId);
    setBannedUsers(updatedBanned);
    localStorage.setItem('bannedUsers', JSON.stringify(updatedBanned));
  };

  const isUserBanned = (userId) => bannedUsers.includes(userId);

  const loadStatistics = () => {
    let total = 0;
    const colorCount = {};

    users.forEach(user => {
      
      const compressedResults = localStorage.getItem(`results_${user.id}`);
        if (!compressedResults) return;
      
      const results = decompress(compressedResults) || [];
      total += results.length;
      
      results.forEach(item => {
        const season = item.result?.season;
        if (season) {
          colorCount[season] = (colorCount[season] || 0) + 1;
        }
      });
    });

    const popular = Object.entries(colorCount)
      .sort((a, b) => b[1] - a[1])
      .map(([season, count]) => ({ season, count }));

    setStats({
      totalAIAnalyses: total,
      colorTypeStats: colorCount,
      popularColorTypes: popular
    });
  };


  if (!isAdmin) return null;

  return (
    <div className={`admin-page ${themeMode}-theme`}>
      <h1>Панель администратора</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          Статистика
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>Управление пользователями</h2>
          <div className="users-table">
            <div className="table-header">
              <div>ID</div>
              <div>Email</div>
              <div>Имя</div>
              <div>Роль</div>
              <div>Статус</div>
              <div>Действия</div>
            </div>
            {users.map((user) => (
              <div key={user.id} className="table-row">
                <div>{user.id}</div>
                <div>{user.email}</div>
                <div>{user.firstName || '—'}</div>
                <div>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                  </span>
                </div>
                <div>
                  <span className={`status-badge ${isUserBanned(user.id) ? 'banned' : 'active'}`}>
                    {isUserBanned(user.id) ? 'Забанен' : 'Активен'}
                  </span>
                </div>
                <div className="actions">
                  <button 
                    className="action-btn toggle-role"
                    onClick={() => toggleUserRole(user.id)}
                  >
                    Сменить роль
                  </button>
                  {isUserBanned(user.id) ? (
                    <button 
                      className="action-btn ban"
                      onClick={() => unbanUser(user.id)}
                    >
                      Разбанить
                    </button>
                  ) : (
                    <button 
                      className="action-btn ban"
                      onClick={() => banUser(user.id)}
                    >
                      Забанить
                    </button>
                  )}
                  <button 
                    className="action-btn delete"
                    onClick={() => {
                      if (window.confirm(`Удалить пользователя ${user.email}?`)) {
                        deleteUser(user.id);
                      }
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="admin-section">
          <h2>Статистика</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalAIAnalyses}</div>
              <div className="stat-label">Всего анализов ИИ</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{users.length}</div>
              <div className="stat-label">Всего пользователей</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{bannedUsers.length}</div>
              <div className="stat-label">Забанено</div>
            </div>
          </div>

          <h3 style={{ marginTop: 30, fontSize: 20}}>Популярность цветотипов</h3>
          <div className="popularity-chart">
            {stats.popularColorTypes.map((item, index) => (
              <div key={item.season} className="chart-row">
                <div className="chart-label">
                  <span className="season-color" style={{
                    backgroundColor: 
                      item.season === 'Весна' ? '#FFDAB9' :
                      item.season === 'Лето' ? '#B0E0E6' :
                      item.season === 'Осень' ? '#DEB887' : '#C7CEEA'
                  }}></span>
                  {item.season}
                </div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{
                      width: `${(item.count / stats.totalAIAnalyses * 100)}%`,
                      background: 
                        item.season === 'Весна' ? '#FFDAB9' :
                        item.season === 'Лето' ? '#B0E0E6' :
                        item.season === 'Осень' ? '#DEB887' : '#C7CEEA'
                    }}
                  >
                    {item.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;