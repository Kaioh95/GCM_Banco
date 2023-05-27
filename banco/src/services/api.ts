import axios from "axios";
const base = import.meta.env.VITE_BACK;

const api = axios.create({
    baseURL: base? base+"/api" : 'http://localhost:3003/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;