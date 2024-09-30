import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('usuario'));
        if (savedUser) {
            setUser(savedUser);
        }

        const savedUsuarios = JSON.parse(localStorage.getItem('usuarios')); 
        if (savedUsuarios) {
            setUsuarios(savedUsuarios);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem('usuario');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, usuarios }}>
            {children}
        </AuthContext.Provider>
    );
};
