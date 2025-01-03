import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage

    // If userId is not found, redirect to the login page
    if (!userId) {
        return <Navigate to="/login" />;
    }

    return element; // If user is logged in, render the element (Dashboard)
};

export default ProtectedRoute;
