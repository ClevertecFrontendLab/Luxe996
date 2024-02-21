import { history } from '@redux/configure-store';
import { Layout, Tabs } from 'antd';
import s from './authPage.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import AuthLogo from '@public/auth-logo.svg?react';

type AuthProps = {
    type?: string;
};

export const AuthPage = ({ type }: AuthProps) => {
    const handleTab = (activePath: string) => {
        history.push(`${activePath}`);
    };

    return (
        <Layout.Content className={s.content}>
            <div className={s.formWrapper}>
                <div className={s.form}>
                    <AuthLogo className={s.logo} />
                    <Tabs
                        onChange={handleTab}
                        className={s.tabs}
                        defaultActiveKey={type}
                        centered
                        tabBarStyle={{ maxWidth: '368px', width: '100%' }}
                        items={[
                            {
                                label: <NavLink to={'/auth'}>Вход</NavLink>,
                                key: 'auth',
                                children: <Outlet />,
                            },
                            {
                                label: <NavLink to={'registration'}>Регистрация</NavLink>,
                                key: 'registration',
                                children: <Outlet />,
                            },
                        ]}
                    />
                </div>
            </div>
        </Layout.Content>
    );
};
