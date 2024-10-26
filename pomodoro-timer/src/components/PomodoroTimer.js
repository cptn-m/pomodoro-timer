// src/PomodoroTimer.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import your Auth context
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const PomodoroTimer = () => {
    const [time, setTime] = useState(1500); // 25 minutes default
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const { signOut } = useAuth(); // Destructure signOut from Auth context

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

    const navigate = useNavigate(); // Add this line

    const handleSignOut = async () => {
        await signOut(); // Call the signOut function from Auth context
        navigate('/'); // Redirect to the login page after sign out
    };

    return (
        <div>
            <h1>{isBreak ? 'Break' : 'Work'} Timer</h1>
            <div>{Math.floor(time / 60)}:{time % 60 < 10 ? '0' : ''}{time % 60}</div>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => setTime(1500)}>Reset</button>
            <button onClick={handleSignOut}>Sign Out</button> {/* Add Sign Out button */}
        </div>
    );
};

export default PomodoroTimer;
