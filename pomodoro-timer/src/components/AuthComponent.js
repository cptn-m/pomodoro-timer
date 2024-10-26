// src/components/AuthComponent.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State to hold error messages
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset any previous error
        const result = await signIn(email, password);

        // Check if there was an error in signIn
        if (result.error) {
            setError(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </form>
    );
};

export default AuthComponent; // Ensure you have this line
