import axios from 'axios';
const baseURL = (import.meta.env.VITE_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
const api = axios.create({
    baseURL: `${baseURL}/`,
});
export default api;
