import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Auth/Register.tsx
import { useState } from 'react';
import authService from '../services/authService';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.register(username, password);
            setSuccess('Registration successful! Please log in.');
            setError('');
        }
        catch (err) {
            setError('Registration failed! Please try again.');
            setSuccess('');
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Register" }), _jsxs("form", { onSubmit: handleRegister, children: [_jsxs("div", { children: [_jsx("label", { children: "Username:" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { children: "Password:" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), error && _jsx("p", { style: { color: 'red' }, children: error }), success && _jsx("p", { style: { color: 'green' }, children: success }), _jsx("button", { type: "submit", children: "Register" })] })] }));
};
export default Register;
