import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/../components/auth-page/auth-page';
import { Path } from './path';
import { AuthWrapper } from '@pages/auth-wrapper/auth-wrapper';
import { Result } from '@components/auth-page/result/result';
import { resData } from '@components/auth-page/result/constants/res-data';

export const routes = (
    <Routes>
        <Route path={Path.INIT} element={<Navigate to={Path.AUTH} />} />
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

        <Route path={Path.MAIN} element={<MainPage />} />
    </Routes>
);
