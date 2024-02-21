import { Tabs } from 'antd';
import s from './authPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLogo from '@public/auth-logo.svg?react';
import { LoginForm } from '@components/login-form/login-form';
import { RegisterForm } from '@components/register-form/register-form';
import { useEffect, useState } from 'react';
import { Path } from '../../routes/path';

export const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [key, setKey] = useState('1');

    const items = [
        {
            label: `Вход`,
            key: '1',
            children: <LoginForm />,
        },
        {
            label: `Регистрация`,
            key: '2',
            children: <RegisterForm />,
        },
    ];

    useEffect(() => {
        location.pathname === `${Path.REGISTRATION}` ? setKey('2') : setKey('1');
    }, [location.pathname]);

    return (
        <>
            <AuthLogo className={s.logo} />
            <Tabs
                onChange={(activePath: string) => {
                    setKey(activePath);
                    key === '2' ? navigate(`${Path.AUTH}`) : navigate(`${Path.REGISTRATION}`);
                }}
                className={s.tabs}
                activeKey={key}
                centered
                items={items}
            />
        </>
    );
};
