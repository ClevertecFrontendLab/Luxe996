import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/../components/auth-page/auth-page';
import { Path } from './path';
import { AuthWrapper } from '@pages/auth-wrapper/auth-wrapper';

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
        <Route path={Path.MAIN} element={<MainPage />} />
    </Routes>
);
