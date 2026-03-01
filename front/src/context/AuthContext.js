import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUser(storedUser);
      setIsAdmin(storedIsAdmin);
    }
    
    setUsers(storedUsers);
  }, []);

  const register = (email, password, firstName, lastName, phone, gender) => {
    const newUser = { 
      id: Date.now(), 
      email, 
      password,
      firstName,
      lastName,
      phone,
      gender,
      role: users.length === 0 ? 'admin' : 'user',
      registeredAt: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setIsLoggedIn(true);
    setUser(newUser);
    setIsAdmin(newUser.role === 'admin');
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isAdmin', newUser.role === 'admin' ? 'true' : 'false');
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    const bannedUsers = JSON.parse(localStorage.getItem('bannedUsers')) || [];
    
    if (foundUser && !bannedUsers.includes(foundUser.id)) {
      setIsLoggedIn(true);
      setUser(foundUser);
      setIsAdmin(foundUser.role === 'admin');
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('isAdmin', foundUser.role === 'admin' ? 'true' : 'false');
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');

    localStorage.removeItem('ai_currentPhoto');
    localStorage.removeItem('ai_currentResult');
    localStorage.removeItem('manual_currentPhoto');

      localStorage.removeItem('manual_selectedColor');
      localStorage.removeItem('manual_customPalette');
      localStorage.removeItem('manual_activeIndex');
      localStorage.removeItem('manual_hue');
      localStorage.removeItem('manual_saturation');
      localStorage.removeItem('manual_lightness');
  };

  const deleteUser = (userId) => {
    if (!isAdmin) return;
    
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const toggleUserRole = (userId) => {
    if (!isAdmin) return;
    
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, role: u.role === 'admin' ? 'user' : 'admin' };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      users,
      isAdmin,
      register,
      login,
      logout,
      deleteUser,
      toggleUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};