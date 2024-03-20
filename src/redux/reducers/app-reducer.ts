const LOADING = 'LOADING';

type initialStateType = {
    isLoading: boolean;
};

const initialState: initialStateType = {
    isLoading: false,
};

export const AppReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.loading,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionType = LoadingAT;
//Loader
type LoadingAT = ReturnType<typeof loadingAC>;
export const loadingAC = (loading: boolean) => ({ type: LOADING, loading } as const);
