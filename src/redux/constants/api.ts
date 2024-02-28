import axios from 'axios';
import { Endpoints } from '@redux/constants/endpoint-names';

export const baseURL = 'https://marathon-api.clevertec.ru';

export const instance = axios.create({
    baseURL,
    withCredentials: true,
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
