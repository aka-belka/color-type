import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminPage.css';

const AdminPage = () => {
  const { users, isAdmin, deleteUser, toggleUserRole } = useAuth();
  const [bannedUsers, setBannedUsers] = useState([]);
  const [stats, setStats] = useState({
    totalAIAnalyses: 0,
    colorTypeStats: {},
    popularColorTypes: []
  });
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/profile');
      return;
    }

    // Загружаем данные
    loadBannedUsers();
    loadStatistics();
    loadArticles();
    loadLogs();
  }, [isAdmin, navigate]);

  // ===== УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ =====
  const loadBannedUsers = () => {
    const banned = JSON.parse(localStorage.getItem('bannedUsers')) || [];
    setBannedUsers(banned);
  };

  const banUser = (userId) => {
    const updatedBanned = [...bannedUsers, userId];
    setBannedUsers(updatedBanned);
    localStorage.setItem('bannedUsers', JSON.stringify(updatedBanned));
    
    // Логируем действие
    addLog('info', `Пользователь ${userId} забанен`);
  };

  const unbanUser = (userId) => {
    const updatedBanned = bannedUsers.filter(id => id !== userId);
    setBannedUsers(updatedBanned);
    localStorage.setItem('bannedUsers', JSON.stringify(updatedBanned));
    
    addLog('info', `Пользователь ${userId} разбанен`);
  };

  const isUserBanned = (userId) => bannedUsers.includes(userId);

  // ===== СТАТИСТИКА =====
  const loadStatistics = () => {
    // Собираем все результаты анализов всех пользователей
    let total = 0;
    const colorCount = {};

    users.forEach(user => {
      const results = JSON.parse(localStorage.getItem(`results_${user.id}`)) || [];
      total += results.length;
      
      results.forEach(item => {
        const season = item.result?.season;
        if (season) {
          colorCount[season] = (colorCount[season] || 0) + 1;
        }
      });
    });

    // Сортируем по популярности
    const popular = Object.entries(colorCount)
      .sort((a, b) => b[1] - a[1])
      .map(([season, count]) => ({ season, count }));

    setStats({
      totalAIAnalyses: total,
      colorTypeStats: colorCount,
      popularColorTypes: popular
    });
  };

  // ===== УПРАВЛЕНИЕ СТАТЬЯМИ =====
  const loadArticles = () => {
    const savedArticles = JSON.parse(localStorage.getItem('theoryArticles')) || [];
    setArticles(savedArticles);
  };

  const addArticle = (article) => {
    const newArticle = {
      id: Date.now(),
      ...article,
      createdAt: new Date().toISOString()
    };
    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    localStorage.setItem('theoryArticles', JSON.stringify(updatedArticles));
    addLog('info', `Добавлена статья: ${article.title}`);
  };

  const updateArticle = (id, updatedData) => {
    const updatedArticles = articles.map(a => 
      a.id === id ? { ...a, ...updatedData, updatedAt: new Date().toISOString() } : a
    );
    setArticles(updatedArticles);
    localStorage.setItem('theoryArticles', JSON.stringify(updatedArticles));
    setEditingArticle(null);
    addLog('info', `Обновлена статья ID: ${id}`);
  };

  const deleteArticle = (id) => {
    if (window.confirm('Удалить статью?')) {
      const updatedArticles = articles.filter(a => a.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem('theoryArticles', JSON.stringify(updatedArticles));
      addLog('warning', `Удалена статья ID: ${id}`);
    }
  };

  // ===== ЛОГИ И ОШИБКИ =====
  const loadLogs = () => {
    const systemLogs = JSON.parse(localStorage.getItem('systemLogs')) || [];
    setLogs(systemLogs);
  };

  const addLog = (type, message) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type,
      message
    };
    const updatedLogs = [newLog, ...logs].slice(0, 100); // Храним последние 100 записей
    setLogs(updatedLogs);
    localStorage.setItem('systemLogs', JSON.stringify(updatedLogs));
  };

  const clearLogs = () => {
    localStorage.removeItem('systemLogs');
    setLogs([]);
  };

  // Перехватываем ошибки
  useEffect(() => {
    const errorHandler = (event) => {
      addLog('error', `Ошибка: ${event.error?.message || event.message}`);
    };
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="admin-page">
      <h1>Панель администратора</h1>
      
      {/* Вкладки */}
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
        <button 
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
        >
          Контент
        </button>
        <button 
          className={activeTab === 'logs' ? 'active' : ''}
          onClick={() => setActiveTab('logs')}
        >
          Логи
        </button>
      </div>

      {/* Вкладка: Пользователи */}
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
                      className="action-btn unban"
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

      {/* Вкладка: Статистика */}
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

      {/* Вкладка: Управление контентом */}
      {activeTab === 'content' && (
        <div className="admin-section">
            <h2>Управление статьями</h2>
            <button 
                className="add-article-btn"
                onClick={() => setEditingArticle({ title: '', content: '', category: 'seasons' })}
            >
                + Добавить статью
            </button>
          {editingArticle && (
            <div className="article-modal">
              <h3>{editingArticle.id ? 'Редактировать' : 'Новая'} статью</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const article = {
                  title: formData.get('title'),
                  content: formData.get('content'),
                  category: formData.get('category')
                };
                
                if (editingArticle.id) {
                  updateArticle(editingArticle.id, article);
                } else {
                  addArticle(article);
                }
              }}>
                <div className="form-group">
                  <label>Категория</label>
                  <select name="category" defaultValue={editingArticle.category}>
                    <option value="seasons">4 сезона</option>
                    <option value="wheel">Цветовой круг</option>
                    <option value="psychology">Психология цвета</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Заголовок</label>
                  <input 
                    type="text" 
                    name="title" 
                    defaultValue={editingArticle.title}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Содержание</label>
                  <textarea 
                    name="content" 
                    rows="10"
                    defaultValue={editingArticle.content}
                    required 
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Сохранить</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditingArticle(null)}>
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="articles-list">
            {articles.map((article) => (
              <div key={article.id} className="article-item">
                <div className="article-header">
                  <div>
                    <h4>{article.title}</h4>
                    <span className="article-category">{article.category}</span>
                    <span className="article-date">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="article-actions">
                    <button onClick={() => setEditingArticle(article)} className="btn-edit">Редактировать</button>
                    <button onClick={() => deleteArticle(article.id)} className="btn-del">Удалить</button>
                  </div>
                </div>
                <div className="article-preview">
                  {article.content.substring(0, 200)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Вкладка: Логи */}
      {activeTab === 'logs' && (
        <div className="admin-section">
          <div className="logs-header">
            <h2>Системные логи</h2>
            <button onClick={clearLogs} className="clear-logs-btn">
              Очистить логи
            </button>
          </div>
          
          <div className="logs-container">
            {logs.map((log) => (
              <div key={log.id} className={`log-entry ${log.type}`}>
                <span className="log-time">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="log-type">[{log.type}]</span>
                <span className="log-message">{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="no-logs">Логов пока нет</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;