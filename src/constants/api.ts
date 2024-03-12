import axios from 'axios';
import { Endpoints } from '@constants/endpoint-names';

export const baseURL = 'https://marathon-api.clevertec.ru';

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

const urlsSkipAuth = [
    Endpoints.Auth.Login,
    Endpoints.Auth.Register,
    Endpoints.Auth.CheckCode,
    Endpoints.Auth.CheckEmail,
    Endpoints.Auth.SetNewPass,
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

export const AuthApi = {
    login(email: string, password: string) {
        return instance.post(Endpoints.Auth.Login, {
            email,
            password,
        });
    },
    register(email: string, password: string) {
        return instance.post(Endpoints.Auth.Register, {
            email,
            password,
        });
    },
    checkEmail(email: string) {
        return instance.post(Endpoints.Auth.CheckEmail, {
            email,
        });
    },
    checkCode(email: string, code: string) {
        return instance.post(Endpoints.Auth.CheckCode, {
            email,
            code,
        });
    },
    setNewPass(password: string, confirmPassword: string) {
        return instance.post(Endpoints.Auth.SetNewPass, {
            password,
            confirmPassword,
        });
    },
};
export const FeedbacksApi = {
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
