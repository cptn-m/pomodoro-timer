import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Error signing in:', error);
            return { error };
        }

        setUser(data.user);
        return { user: data.user };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null); // Clear user state on sign out
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
