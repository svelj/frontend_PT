import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Clear auth state
        localStorage.removeItem('isAuthenticated'); // Clear localStorage to persist logout state
        navigate('/login'); // Redirect to login page
    };
    return _jsx("button", { onClick: handleLogout, children: "Logout" });
};
export default LogoutButton;
