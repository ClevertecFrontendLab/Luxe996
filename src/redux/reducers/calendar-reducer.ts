import { AppDispatch } from '@redux/configure-store';
import { loadingAC } from '@redux/reducers/app-reducer';
import { calendarApi } from '@constants/api';

const GET_TRAINING = 'GET_TRAINING';
const GET_CATALOG = 'GET_CATALOG';
const RESET_STATE = 'RESET_STATE';

type Parameters = {
    repeat: boolean;
    period: number | null;
    jointTraining: boolean;
    participants: string[];
};
type Exercise = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};
export type TrainingType = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: Parameters;
    exercises: Exercise[];
};
type CatalogType = {
    name: string;
    key: string;
};
type InitialStateType = {
    trainings: TrainingType[] | null;
    catalogList: CatalogType[] | null;
    isTrainingsError: boolean | null;
    isCatalogError: boolean | null;
};

const initialState: InitialStateType = {
    trainings: null,
    isTrainingsError: null,
    catalogList: null,
    isCatalogError: null,
};
export const CalendarReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case RESET_STATE: {
            return {
                ...state,
                isTrainingsError: null,
                catalogList: null,
                isCatalogError: null,
            };
        }
        case GET_TRAINING: {
            return {
                ...state,
                trainings: action.trainings,
                isTrainingsError: action.error,
            };
        }
        case GET_CATALOG: {
            return {
                ...state,
                catalogList: action.values,
                isCatalogError: action.error,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionType = ResetStateAT | GetTrainingAT | CatalogAT;
type ResetStateAT = ReturnType<typeof ResetStateAC>;
export const ResetStateAC = () => ({ type: RESET_STATE });

type GetTrainingAT = ReturnType<typeof getTrainingAC>;
const getTrainingAC = (trainings: TrainingType[] | null, error: boolean | null) =>
    ({ type: GET_TRAINING, trainings, error } as const);
export const getTrainingTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await calendarApi
        .getTrainings()
        .then((res) => {
            dispatch(getTrainingAC(res.data, false));
            dispatch(loadingAC(false));
        })
        .catch(() => {
            dispatch(getTrainingAC(null, true));
            dispatch(loadingAC(false));
        });
};

type CatalogAT = ReturnType<typeof catalogAC>;
const catalogAC = (values: CatalogType[] | null, error: boolean | null) =>
    ({ type: GET_CATALOG, values, error } as const);
export const catalogTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await calendarApi
        .getCatalog()
        .then((res) => {
            // console.log(res.data);
            dispatch(catalogAC(res.data, false));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            dispatch(catalogAC(null, true));
            dispatch(loadingAC(false));
        });
};
