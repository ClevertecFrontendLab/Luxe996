import { AppDispatch } from '@redux/configure-store';
import { AuthApi } from '@redux/constants/api';

const RESET_STORE = 'RESET_STORE';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

type initialState = {
    isRegister: boolean;
    isAuth: boolean;
    regInfo: {
        email: string | null;
        password: string | null;
    };
    AuthError: {
        statusCode: number | null;
    };
};

const initialState: initialState = {
    isRegister: false,
    isAuth: false,
    regInfo: {
        email: null,
        password: null,
    },
    AuthError: {
        statusCode: null,
    },
};

export const AuthReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case RESET_STORE: {
            return {
                ...state,
                isRegister: false,
                isAuth: false,
                AuthError: {
                    statusCode: null,
                },
            };
        }
        case LOGIN: {
            return {
                ...state,
                isAuth: action.isAuth,
                AuthError: {
                    statusCode: action.statusCode,
                },
            };
        }
        case REGISTER: {
            return {
                ...state,
                isRegister: action.isRegister,
                regInfo: {
                    email: action.email,
                    password: action.password,
                },
                AuthError: {
                    statusCode: action.statusCode,
                },
            };
        }

        default: {
            return state;
        }
    }
};

type ActionType = LoginAT | ResetStoreAT | RegisterAT;

type LoginAT = ReturnType<typeof LoginAC>;
type ResetStoreAT = ReturnType<typeof ResetStoreAC>;
export const ResetStoreAC = () => ({ type: RESET_STORE });
export const LoginAC = (isAuth: boolean, statusCode: number) =>
    ({ type: LOGIN, isAuth, statusCode } as const);
export const LoginTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
    await AuthApi.login(email, password)
        .then((res) => {
            localStorage.setItem('token', res.data.accessToken);
            dispatch(LoginAC(true, null));
        })
        .catch((rej) => {
            if (rej.response.data) {
                dispatch(LoginAC(false, rej.response.data.statusCode));
            }
        });
};

type RegisterAT = ReturnType<typeof RegisterAC>;
const RegisterAC = (isRegister: boolean, statusCode: number, email: string, password: string) => ({
    type: REGISTER,
    isRegister,
    statusCode,
    email,
    password,
});

export const RegisterTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
    await AuthApi.register(email, password)
        .then((res) => {
            console.log(res);
            dispatch(RegisterAC(true, null, null, null));
        })
        .catch((rej) => {
            dispatch(RegisterAC(false, rej.response.data.statusCode, email, password));
        });
};
