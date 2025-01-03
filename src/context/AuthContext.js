import { jsx as _jsx } from "react/jsx-runtime";
// src/context/AuthContext.tsx
import { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); // Change to number
    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        const storedUserId = localStorage.getItem('userId');
        if (storedAuthStatus === 'true' && storedUserId) {
            setIsAuthenticated(true);
            setUserId(Number(storedUserId)); // Convert to number
        }
    }, []);
    const login = (userId) => {
        setIsAuthenticated(true);
        setUserId(userId);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', userId.toString()); // Convert to string
    };
    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userId');
    };
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, userId, login, logout }, children: children }));
};
