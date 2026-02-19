import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import HomePage from './pages/HomePage';
import ManualSelectionPage from './pages/ManualSelectionPage';
import AIPage from './pages/AIPage';
import ColorTheoryPage from './pages/ColorTheoryPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
