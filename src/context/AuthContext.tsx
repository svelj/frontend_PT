// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userId: number | null; // Change userId to number
    login: (userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null); // Change to number

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        const storedUserId = localStorage.getItem('userId');
        if (storedAuthStatus === 'true' && storedUserId) {
            setIsAuthenticated(true);
            setUserId(Number(storedUserId)); // Convert to number
        }
    }, []);

    const login = (userId: number) => {
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
