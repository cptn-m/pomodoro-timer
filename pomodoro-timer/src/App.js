// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import PomodoroTimer from './components/PomodoroTimer';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthComponent />} /> {/* Auth Component */}
            <Route path="/pomodoro" element={<PomodoroTimer />} /> {/* Pomodoro Timer */}
        </Routes>
    );
};

export default App;
