// src/components/LogoutButton.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear auth state
        localStorage.removeItem('isAuthenticated'); // Clear localStorage to persist logout state
        navigate('/login'); // Redirect to login page
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
