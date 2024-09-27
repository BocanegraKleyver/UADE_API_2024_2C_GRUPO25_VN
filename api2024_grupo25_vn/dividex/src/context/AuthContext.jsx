import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('usuario'));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
