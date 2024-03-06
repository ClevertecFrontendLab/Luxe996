import { ReactNode } from 'react';
import s from './auth-wrapper.module.scss';
import { Card, Layout } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/loader/loader';
import { appSelector } from '../../selectors';

interface AuthWrapper {
    children: ReactNode;
}

const { Content } = Layout;
export const AuthWrapper = ({ children }: AuthWrapper) => {
    const { isLoading } = useAppSelector(appSelector);
    return (
        <>
            {isLoading && <Loader />}
            <div className={s.wrapper}>
                <Content>
                    <Card className={s.card}>{children}</Card>
                </Content>
            </div>
        </>
    );
};
