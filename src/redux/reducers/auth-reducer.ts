import { AppDispatch } from '@redux/configure-store';
import { AuthApi } from '@redux/constants/api';

const RESET_STORE = 'RESET_STORE';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const LOADING = 'LOADING';

type initialState = {
    isLoading: boolean;
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
    isLoading: false,
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
        case LOADING: {
            return {
                ...state,
                isLoading: action.loading,
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

type ActionType = LoginAT | ResetStoreAT | RegisterAT | LoadingAT;

type ResetStoreAT = ReturnType<typeof ResetStoreAC>;
export const ResetStoreAC = () => ({ type: RESET_STORE });
type LoadingAT = ReturnType<typeof LoadingAC>;
const LoadingAC = (loading: boolean) => ({ type: LOADING, loading });
type LoginAT = ReturnType<typeof LoginAC>;
export const LoginAC = (isAuth: boolean, statusCode: number | null) =>
    ({ type: LOGIN, isAuth, statusCode } as const);
export const LoginTC =
    (email: string, password: string, remember?: boolean) => async (dispatch: AppDispatch) => {
        dispatch(LoadingAC(true));
        await AuthApi.login(email, password)
            .then((res) => {
                if (remember) {
                    localStorage.setItem('token', res.data.accessToken);
                }
                dispatch(LoginAC(true, null));
                dispatch(LoadingAC(false));
            })
            .catch((rej) => {
                if (rej.response.data) {
                    dispatch(LoginAC(false, rej.response.data.statusCode));
                }
                dispatch(LoadingAC(false));
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
    dispatch(LoadingAC(true));
    await AuthApi.register(email, password)
        .then((res) => {
            console.log(res);
            dispatch(RegisterAC(true, null, null, null));
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            dispatch(RegisterAC(false, rej.response.data.statusCode, email, password));
            dispatch(LoadingAC(false));
        });
};
