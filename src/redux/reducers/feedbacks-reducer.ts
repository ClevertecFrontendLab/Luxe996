import { LoadingAC } from '@redux/reducers/app-reducer';
import { AppDispatch } from '@redux/configure-store';
import { FeedbacksApi } from '@redux/constants/api';

const GET_FEEDBACKS = 'GET_FEEDBACKS';

type initialStateT = {
    createdAt: string;
    fullName: string | null;
    id: string;
    imageSrc: string | null;
    message: string;
    rating: number;
};

const initialState: initialStateT[] = [];
export const FeedbacksReducer = (state = initialState, action: ActionsT) => {
    switch (action.type) {
        case GET_FEEDBACKS: {
            return {
                ...state,
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
export const GetFeedbacksAC = () => ({ type: GET_FEEDBACKS });
export const GetFeedbacksTC = () => async (dispatch: AppDispatch) => {
    dispatch(LoadingAC(true));
    await FeedbacksApi.getFeedbacks()
        .then((res) => {
            console.log(res.data);
            dispatch(LoadingAC(false));
        })
        .catch((rej) => {
            console.log(rej);
            dispatch(LoadingAC(false));
        });
};
