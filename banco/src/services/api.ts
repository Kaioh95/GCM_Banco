import axios from "axios";
const base = import.meta.env.VIT_BACK;

const api = axios.create({
    baseURL: base || 'http://localhost:3003/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;