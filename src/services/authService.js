// src/services/authService.ts
import axios from 'axios';
const API_URL = 'http://localhost:8080/auth';
const login = (username, password) => {
    return axios
        .post(`${API_URL}/login`, { username, password })
        .then((response) => response.data);
};
const register = (username, password) => {
    return axios
        .post(`${API_URL}/register`, { username, password })
        .then((response) => response.data);
};
export default {
    login,
    register,
};
