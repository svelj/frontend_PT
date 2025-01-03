import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            username,
            password
        };
        axios
            .post('http://localhost:8080/auth/login', loginData)
            .then((response) => {
            // Store the userId in localStorage
            localStorage.setItem('userId', response.data.id);
            console.log('userId', localStorage.getItem('userId')); // Make sure your backend returns the userId in the response
            navigate('/dashboard'); // Redirect to the dashboard
        })
            .catch((error) => {
            console.error('Login error:', error);
        });
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", children: "Login" })] })] }));
};
export default Login;
