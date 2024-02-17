import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
export const routes = (
    <Routes>
        {/*<Route path={'/'} element={<Navigate to={'/main'} />}>*/}
        <Route path={'/'} element={<MainPage />} />
        {/*</Route>*/}
    </Routes>
);
