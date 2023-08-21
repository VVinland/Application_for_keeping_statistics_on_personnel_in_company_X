import axios from 'axios';
import { API_URL } from '../utils/consts';
import { AuthResponse } from '../interfaces';


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

$api.interceptors.response.use(config => {
    return config;
}, async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true;
        const response = await axios.get<AuthResponse>(`${API_URL}/employee/refresh`, {
            withCredentials: true
        })
        localStorage.setItem('accessToken', response.data.accessToken);
        return await $api.request(originalRequest);
    }
})


export default $api;