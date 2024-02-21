import { ReactNode } from 'react';
import s from './auth-wrapper.module.scss';
import { Card, Layout } from 'antd';

interface AuthWrapper {
    children: ReactNode;
}

const { Content } = Layout;
export const AuthWrapper = ({ children }: AuthWrapper) => (
    <>
        <div className={s.wrapper}>
            <Content>
                <Card className={s.card}>{children}</Card>
            </Content>
        </div>
    </>
);
