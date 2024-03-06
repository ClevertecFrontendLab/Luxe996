import { LoadingAC } from '@redux/reducers/app-reducer';
import { AppDispatch } from '@redux/configure-store';
import { FeedbacksApi } from '@redux/constants/api';
import { LoginAC } from '@redux/reducers/auth-reducer';

const GET_FEEDBACKS = 'GET_FEEDBACKS';
const POST_FEEDBACKS = 'POST_FEEDBACKS';

export type feedbackT = {
    createdAt: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string;
    rating: number;
    id?: string;
};

type initialStateT = {
    feedbacks: feedbackT[] | null;
    isError: boolean | null;
    isSuccess: boolean;
};

const initialState: initialStateT = {
    feedbacks: null,
    isError: null,
    isSuccess: null,
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
        case POST_FEEDBACKS: {
            return {
                ...state,
                isSuccess: action.isSuccess,
                isError: action.isError,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionsT = GetFeedbacksAT | PostFeedbacksAT;

// Get Feedbacks
type GetFeedbacksAT = ReturnType<typeof GetFeedbacksAC>;
export const GetFeedbacksAC = (feedbacks: feedbackT[] | null, isError: boolean | null) =>
    ({
        type: GET_FEEDBACKS,
        feedbacks,
        isError,
    } as const);
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

// Post Feedback
type PostFeedbacksAT = ReturnType<typeof PostFeedbacksAC>;
export const PostFeedbacksAC = (isSuccess: boolean | null, isError: boolean | null) =>
    ({
        type: POST_FEEDBACKS,
        isSuccess,
        isError,
    } as const);
export const PostFeedBackTC =
    (rating: number, message: string) => async (dispatch: AppDispatch) => {
        dispatch(LoadingAC(true));
        await FeedbacksApi.postFeedbacks(rating, message)
            .then((res) => {
                dispatch(PostFeedbacksAC(true, false));
                dispatch(LoadingAC(false));
            })
            .catch((rej) => {
                dispatch(PostFeedbacksAC(false, true));
                dispatch(LoadingAC(false));
            });
    };
