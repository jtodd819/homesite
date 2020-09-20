import axios from 'axios';
import { SERVER_URI } from 'settings';

const apiOptions = {
    baseURL: SERVER_URI
};

const API = axios.create(apiOptions);

API.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});


export default API;