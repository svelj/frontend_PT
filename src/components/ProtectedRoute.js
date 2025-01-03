import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ element }) => {
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage
    // If userId is not found, redirect to the login page
    if (!userId) {
        return _jsx(Navigate, { to: "/login" });
    }
    return element; // If user is logged in, render the element (Dashboard)
};
export default ProtectedRoute;
