import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const loginData = {
            username,
            password
        };

        axios
            .post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/login`, loginData)
            .then((response) => {
                // Store the userId in localStorage
                localStorage.setItem('userId', response.data.id);
                console.log('userId',localStorage.getItem('userId'))// Make sure your backend returns the userId in the response
                navigate('/dashboard'); // Redirect to the dashboard
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
