import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Настройка axios
const API_URL = 'http://localhost:8000/api';

// Добавим перехватчик для автоматической подстановки токена
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Проверяем токен при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/me`);
          setUser(response.data);
          setIsLoggedIn(true);
          setIsAdmin(response.data.role === 'admin');
        } catch (error) {
          console.error('Токен недействителен', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Регистрация
  const register = async (email, password, firstName, lastName, phone, gender) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
        gender
      });
      
      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser(user);
      setIsLoggedIn(true);
      setIsAdmin(user.role === 'admin');
      
      return { success: true };
    } catch (error) {
      console.error('Ошибка регистрации', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка регистрации' 
      };
    }
  };

  // Вход
  const login = async (email, password) => {
    try {
      // OAuth2 форма требует username, а не email
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser(user);
      setIsLoggedIn(true);
      setIsAdmin(user.role === 'admin');
      
      return { success: true };
    } catch (error) {
      console.error('Ошибка входа', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Неверный email или пароль' 
      };
    }
  };

  // Выход
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const loadUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  // Для админки - получить всех пользователей
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения пользователей', error);
      return [];
    }
  };

  // Для админки - изменить роль
  const toggleUserRole = async (userId) => {
    try {
      await axios.put(`${API_URL}/admin/users/${userId}/role`);
      await loadUsers(); 
      // Обновим текущего пользователя, если это он
      if (user && user.id === userId) {
        setUser({ ...user, role: user.role === 'admin' ? 'user' : 'admin' });
        setIsAdmin(user.role !== 'admin');
      }
      return true;
    } catch (error) {
      console.error('Ошибка изменения роли', error);
      return false;
    }
  };

  // Для админки - удалить пользователя
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);
      await loadUsers();
      return true;
    } catch (error) {
      console.error('Ошибка удаления пользователя', error);
      return false;
    }
  };

  const value = {
    isLoggedIn,
    user,
    users,
    isAdmin,
    loading,
    register,
    login,
    logout,
    getUsers,
    toggleUserRole,
    deleteUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};