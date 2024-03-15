import axios from 'axios';
import { Endpoints } from '@constants/endpoint-names';

export const baseURL = 'https://marathon-api.clevertec.ru';

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

const urlsSkipAuth = [
    Endpoints.Auth.login,
    Endpoints.Auth.register,
    Endpoints.Auth.checkCode,
    Endpoints.Auth.checkEmail,
    Endpoints.Auth.setNewPass,
];

instance.interceptors.request.use(async (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config;
    }

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
    }
    return config;
});

export const authApi = {
    login(email: string, password: string) {
        return instance.post(Endpoints.Auth.login, {
            email,
            password,
        });
    },
    register(email: string, password: string) {
        return instance.post(Endpoints.Auth.register, {
            email,
            password,
        });
    },
    checkEmail(email: string) {
        return instance.post(Endpoints.Auth.checkEmail, {
            email,
        });
    },
    checkCode(email: string, code: string) {
        return instance.post(Endpoints.Auth.checkCode, {
            email,
            code,
        });
    },
    setNewPass(password: string, confirmPassword: string) {
        return instance.post(Endpoints.Auth.setNewPass, {
            password,
            confirmPassword,
        });
    },
};
export const feedbacksApi = {
    getFeedbacks() {
        return instance.get(Endpoints.FeedBacks);
    },
    postFeedbacks(rating: number, message: string) {
        return instance.post(Endpoints.FeedBacks, {
            message,
            rating,
        });
    },
};
export const calendarApi = {
    getTrainings() {
        return instance.get(Endpoints.Calendar.training);
    },
    getCatalog() {
        return instance.get(Endpoints.Calendar.catalog);
    },
};
