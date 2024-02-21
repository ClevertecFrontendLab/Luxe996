import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/auth-page/auth-page';
import { LoginForm } from '@components/login-form/login-form';

export const routes = (
    <Routes>
        <Route path={'/'} element={<Navigate to={'/auth'} />} />
        <Route path={'/auth'} element={<AuthPage />}>
            <Route index element={<LoginForm />} />
        </Route>
        <Route path={'/'} element={<MainPage />} />
        {/*</Route>*/}
    </Routes>
);
