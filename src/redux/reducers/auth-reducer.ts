import { AppDispatch } from '@redux/configure-store';
import { AuthApi } from '@redux/constants/api';

const RESET_STORE = 'RESET_STORE';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const LOADING = 'LOADING';
const CHECK_EMAIL = 'CHECK_EMAIL';
const CHECK_CODE = 'CHECK_CODE';
const CHANGE_PASS = 'CHANGE_PASS';

type initialState = {
    isLoading: boolean;
    isRegister: boolean;
    isAuth: boolean;
    recEmail: string | null;
    regInfo: {
        email: string | null;
        password: string | null;
    };
    AuthError: {
        statusCode: number | null;
        message: string | null;
    };
    isCodeValid: boolean | null;
    isChanged: boolean | null;
};

const initialState: initialState = {
    isLoading: false,
    isRegister: false,
    isAuth: false,
    regInfo: {
        email: null,
        password: null,
    },
    recEmail: null,
    AuthError: {
        statusCode: null,
        message: null,
    },
    isCodeValid: null,
    isChanged: null,
};

export const AuthReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case RESET_STORE: {
            return {
                ...state,
                isRegister: false,
                AuthError: {
                    statusCode: null,
                },
                recEmail: null,
                isChanged: null,
                isCodeValid: null,
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
        case CHECK_EMAIL: {
            return {
                ...state,
                recEmail: action.email,
                AuthError: {
                    statusCode: action.statusCode,
                    message: action.message,
                },
            };
        }
        case CHECK_CODE: {
            return {
                ...state,
                isCodeValid: action.code,
            };
        }
        case CHANGE_PASS: {
            return {
                ...state,
                isChanged: action.isChanged,
            };
        }

        default: {
            return state;
        }
    }
};

type ActionType =
    | LoginAT
    | ResetStoreAT
    | RegisterAT
    | LoadingAT
    | CheckEmailAT
    | CheckCodelAT
    | ChangePassAT;
//Loader
type LoadingAT = ReturnType<typeof LoadingAC>;
const LoadingAC = (loading: boolean) => ({ type: LOADING, loading } as const);
type LoginAT = ReturnType<typeof LoginAC>;
//Reset Store
type ResetStoreAT = ReturnType<typeof ResetStoreAC>;
export const ResetStoreAC = () => ({ type: RESET_STORE });
//Login
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
                console.log(rej.response.status);
                if (rej.response.data) {
                    dispatch(LoginAC(false, rej.response.status));
                }
                dispatch(LoadingAC(false));
            });
    };
//Registration
type RegisterAT = ReturnType<typeof RegisterAC>;
const RegisterAC = (
    isRegister: boolean,
    statusCode: number | null,
    email: string | null,
    password: string | null,
) =>
    ({
        type: REGISTER,
        isRegister,
        statusCode,
        email,
        password,
    } as const);
export const RegisterTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(LoadingAC(true));
    await AuthApi.register(email, password)
        .then((res) => {
            dispatch(RegisterAC(true, null, null, null));
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            dispatch(RegisterAC(false, rej.response.status, email, password));
            dispatch(LoadingAC(false));
        });
};

//Check Email
type CheckEmailAT = ReturnType<typeof CheckEmailAC>;
const CheckEmailAC = (email: string, statusCode: number | null, message: string | null) =>
    ({ type: CHECK_EMAIL, email, statusCode, message } as const);
export const CheckEmailTC = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(LoadingAC(true));
    await AuthApi.checkEmail(email)
        .then((res) => {
            dispatch(CheckEmailAC(res.data.email, null, null));
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            console.log(rej);
            dispatch(CheckEmailAC(null, rej.response.data.statusCode, rej.response.data.message));
            dispatch(LoadingAC(false));
        });
};

//Check Code
type CheckCodelAT = ReturnType<typeof CheckCodeAC>;
const CheckCodeAC = (code: boolean) => ({ type: CHECK_CODE, code } as const);
export const CheckCodeTC = (email: string, code: string) => async (dispatch: AppDispatch) => {
    dispatch(LoadingAC(true));
    await AuthApi.checkCode(email, code)
        .then((res) => {
            console.log(res);
            dispatch(CheckCodeAC(true));
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            console.log(rej);
            dispatch(CheckCodeAC(false));
            dispatch(LoadingAC(false));
        });
};

//Change Password
type ChangePassAT = ReturnType<typeof ChangePassAC>;
const ChangePassAC = (isChanged: boolean) => ({ type: CHANGE_PASS, isChanged } as const);
export const ChangePassTC = (pass: string, confPass: string) => async (dispatch: AppDispatch) => {
    dispatch(LoadingAC(true));
    await AuthApi.setNewPass(pass, confPass)
        .then((res) => {
            dispatch(ChangePassAC(true));
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            console.log(rej);
            dispatch(LoadingAC(false));
        });
};
