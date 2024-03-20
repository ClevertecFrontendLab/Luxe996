import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/./main-page';
import { AuthPage } from '@pages/../components/auth-page/auth-page';
import { Path } from './path';
import { AuthWrapper } from '@pages/auth-wrapper/auth-wrapper';
import { Result } from '@components/auth-page/result/result';
import { resData } from '@components/auth-page/result/constants/res-data';
import { ConfirmEmail } from '@components/auth-page/confirm-email/confirm-email';
import { ChangePassword } from '@components/auth-page/change-password/change-password';
import { MainWrapper } from '@components/../pages/main-wrapper/main-wrapper';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { AppLayout } from '@components/layout/app-layout';
import { CalendarPage } from '@pages/calendar-page/calendar-page';

export const routes = (
    <Routes>
        <Route path={Path.INIT} element={<AppLayout />} />
        <Route
            path={Path.AUTH}
            element={
                <AuthWrapper>
                    <AuthPage />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.REGISTRATION}
            element={
                <AuthWrapper>
                    <AuthPage />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.LOGIN_ERROR}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.error_login.icon}
                        title={resData.error_login.title}
                        text={resData.error_login.text}
                        textBtn={resData.error_login.textBtn}
                        pathBtn={resData.error_login.pathBtn}
                        testData={resData.error_login.testData}
                    />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.REGISTER_SUCCESS}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.success_register.icon}
                        title={resData.success_register.title}
                        text={resData.success_register.text}
                        textBtn={resData.success_register.textBtn}
                        testData={resData.success_register.testData}
                        pathBtn={resData.success_register.pathBtn}
                    />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.REGISTER_ERROR}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.error_register.icon}
                        title={resData.error_register.title}
                        text={resData.error_register.text}
                        textBtn={resData.error_register.textBtn}
                        pathBtn={resData.error_register.pathBtn}
                        testData={resData.error_register.testData}
                    />
                </AuthWrapper>
            }
        />

        <Route
            path={Path.RESULT.ERROR_USER_EXIST}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.error_user_exist.icon}
                        title={resData.error_user_exist.title}
                        text={resData.error_user_exist.text}
                        textBtn={resData.error_user_exist.textBtn}
                        pathBtn={resData.error_user_exist.pathBtn}
                        testData={resData.error_user_exist.testData}
                    />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.CONFIRM_EMAIL}
            element={
                <AuthWrapper>
                    <ConfirmEmail />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.CHANGE_PASSWORD}
            element={
                <AuthWrapper>
                    <ChangePassword />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.SUCCESS_CHANGE_PASSWORD}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.success_change_password.icon}
                        title={resData.success_change_password.title}
                        text={resData.success_change_password.text}
                        textBtn={resData.success_change_password.textBtn}
                        pathBtn={resData.success_change_password.pathBtn}
                        testData={resData.success_change_password.testData}
                    />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.ERROR_EMAIL_NO_EXIST}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.error_email_no_exist.icon}
                        title={resData.error_email_no_exist.title}
                        text={resData.error_email_no_exist.text}
                        textBtn={resData.error_email_no_exist.textBtn}
                        pathBtn={resData.error_email_no_exist.pathBtn}
                        testData={resData.error_email_no_exist.testData}
                    />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.ERROR_CHECK_EMAIL}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.error_check_email.icon}
                        title={resData.error_check_email.title}
                        text={resData.error_check_email.text}
                        textBtn={resData.error_check_email.textBtn}
                        pathBtn={resData.error_check_email.pathBtn}
                        testData={resData.error_check_email.testData}
                    />
                </AuthWrapper>
            }
        />
        <Route
            path={Path.RESULT.ERROR_CHANGE_PASSWORD}
            element={
                <AuthWrapper>
                    <Result
                        icon={resData.error_change_password.icon}
                        title={resData.error_change_password.title}
                        text={resData.error_change_password.text}
                        textBtn={resData.error_change_password.textBtn}
                        pathBtn={resData.error_change_password.pathBtn}
                        testData={resData.error_change_password.testData}
                    />
                </AuthWrapper>
            }
        />
        <Route element={<MainWrapper />}>
            <Route path={Path.MAIN} element={<MainPage />} />
            <Route path={Path.FEEDBACKS} element={<FeedbacksPage />} />
            <Route path={Path.CALENDAR} element={<CalendarPage />} />
        </Route>
    </Routes>
);
