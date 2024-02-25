import axios from 'axios';
import { Endpoints } from '@redux/constants/endpoint-names';

export const baseURL = 'https://marathon-api.clevertec.ru';

export const instance = axios.create({
    baseURL,
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
};
