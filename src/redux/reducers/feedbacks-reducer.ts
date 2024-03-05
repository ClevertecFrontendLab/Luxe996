import { LoadingAC } from '@redux/reducers/app-reducer';
import { AppDispatch } from '@redux/configure-store';
import { FeedbacksApi } from '@redux/constants/api';
import { LoginAC } from '@redux/reducers/auth-reducer';

const GET_FEEDBACKS = 'GET_FEEDBACKS';

export type feedbackT = {
    createdAt: string;
    fullName: string | null;
    id?: string;
    imageSrc: string | null;
    message: string;
    rating: number;
};

type initialStateT = {
    feedbacks: feedbackT[] | null;
    isError: boolean | null;
};

const initialState: initialStateT = {
    feedbacks: null,
    isError: null,
};
export const FeedbacksReducer = (state = initialState, action: ActionsT) => {
    switch (action.type) {
        case GET_FEEDBACKS: {
            return {
                ...state,
                feedbacks: action.feedbacks,
                isError: action.isError,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionsT = GetFeedbacksAT;

// Get Feedbacks
type GetFeedbacksAT = ReturnType<typeof GetFeedbacksAC>;
export const GetFeedbacksAC = (feedbacks: feedbackT[] | null, isError: boolean | null) => ({
    type: GET_FEEDBACKS,
    feedbacks,
    isError,
});
export const GetFeedbacksTC = () => async (dispatch: AppDispatch) => {
    dispatch(LoadingAC(true));
    await FeedbacksApi.getFeedbacks()
        .then((res) => {
            dispatch(GetFeedbacksAC(res.data.reverse(), null));
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            if (rej.response.status === 403) {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                dispatch(LoginAC(false));
            }
            dispatch(GetFeedbacksAC(null, true));
            dispatch(LoadingAC(false));
        });
};
