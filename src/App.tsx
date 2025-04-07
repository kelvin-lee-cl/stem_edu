import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import MicrobitPlayground from './pages/playground/MicrobitPlayground';
import ArduinoPlayground from './pages/playground/ArduinoPlayground';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/playground/microbit" element={<MicrobitPlayground />} />
            <Route path="/playground/arduino" element={<ArduinoPlayground />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
