import './App.css';
import LZString from 'lz-string';
import React, { useState, useEffect, createContext, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import HomePage from './pages/HomePage';
import ManualSelectionPage from './pages/ManualSelectionPage';
import AIPage from './pages/AIPage';
import ColorTheoryPage from './pages/ColorTheoryPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import { AuthProvider } from './context/AuthContext';

export const compress = (data) => {
  return LZString.compress(JSON.stringify(data));
};

export const decompress = (data) => {
  if (!data) return [];
  try {
    const decompressed = LZString.decompress(data);
    if (!decompressed) return []; 
    return JSON.parse(decompressed);
  } catch {
    return []; 
  }
};

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme) {
      setThemeMode(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('themeMode', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const getMuiTheme = (mode) => createTheme({
  palette: {
    mode: mode,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
  
function AppContent() {
  const { themeMode } = useTheme();
  const muiTheme = getMuiTheme(themeMode);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
        <Router>
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manual" element={<ManualSelectionPage />} />
                <Route path="/ai" element={<AIPage />} />
                <Route path="/theory" element={<ColorTheoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
    </MuiThemeProvider>
  );
}
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;
