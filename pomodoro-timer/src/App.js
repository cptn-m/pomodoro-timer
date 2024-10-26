// src/App.js
import React from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthComponent from './components/AuthComponent';

const App = () => {
    const { user, signOut } = useAuth();

    return (
        <div>
            <h1>Welcome to the Pomodoro Timer App</h1>
            {user ? (
                <div>
                    <p>Hello, {user.email}</p>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            ) : (
                <AuthComponent /> // Renders login form if not signed in
            )}
        </div>
    );
};

export default App;
