import { RootState } from '@redux/configure-store';

export const feedbackSelector = (state: RootState) => state.feedbacks;
export const authSelector = (state: RootState) => state.auth;
export const appSelector = (state: RootState) => state.app;
export const calendarSelector = (state: RootState) => state.calendar;
