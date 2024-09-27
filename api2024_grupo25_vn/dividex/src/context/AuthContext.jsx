import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [usuarios, setUsuarios] = useState([]); // Nuevo estado para usuarios

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('usuario'));
        if (savedUser) {
            setUser(savedUser);
        }

        const savedUsuarios = JSON.parse(localStorage.getItem('usuarios')); // Obtener usuarios del localStorage
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
        setUser(null); // Limpiar el usuario en el estado
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, usuarios }}> {/* Añadir usuarios aquí */}
            {children}
        </AuthContext.Provider>
    );
};
