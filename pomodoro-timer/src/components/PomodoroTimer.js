// src/PomodoroTimer.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PomodoroTimer = () => {
    const [time, setTime] = useState(1500); // 25 minutes default
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => setTime(time - 1), 1000);
        } else if (time === 0) {
            setIsBreak(!isBreak);
            saveSession();
            setTime(isBreak ? 1500 : 300); // 5 min break
        }
        return () => clearInterval(interval);
    }, [isActive, time, isBreak]); // Add isBreak as dependency

    const saveSession = async () => {
        const { data, error } = await supabase
            .from('sessions')
            .insert([{ work_duration: 25, break_duration: 5, completed_sessions: 1 }]);
        if (error) console.error('Error saving session:', error);
    };

    return (
        <div>
            <h1>{isBreak ? 'Break' : 'Work'} Timer</h1>
            <div>{Math.floor(time / 60)}:{time % 60 < 10 ? '0' : ''}{time % 60}</div>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => setTime(1500)}>Reset</button>
        </div>
    );
};

export default PomodoroTimer;
