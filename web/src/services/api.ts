import axios from 'axios';

const api = axios.create({
    baseURL: 'http://54.144.214.136:3333'
});

export default api;