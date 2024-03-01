import { Breadcrumb, Layout } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect, useState } from 'react';
import { Path } from '../../routes/path';
import s from './main-wrapper.module.scss';
import { Logo } from '@components/logo/logo';
import { NavBar } from '@components/nav-bar';
import { Switcher } from '@components/nav-bar/switcher';
import { ButtonMenu } from '@components/nav-bar/button-menu/button-menu';

export const MainWrapper = () => {
    const breakpoint = useBreakpoint();
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);

    const [collapsed, setCollapsed] = useState(true);
    const collapseHandler = () => setCollapsed((pervState) => !pervState);

    const { Sider } = Layout;

    useEffect(() => {
        !isAuth && navigate(Path.AUTH);
    }, [isAuth, navigate]);

    return (
        <Layout className={s.container}>
            <Sider
                className={s.sider}
                width={`${breakpoint.xs ? 106 : 208}`}
                collapsedWidth={`${breakpoint.xs ? 0 : 64}`}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Logo isCollapsed={collapsed} />
                <NavBar />
                <Switcher isCollapsed={collapsed} onSwitch={collapseHandler} />
                <ButtonMenu>{collapsed ? '' : 'Выход'}</ButtonMenu>
            </Sider>
            <Layout>
                <Breadcrumb className={s.breadcrums}>Главная</Breadcrumb>
                <Outlet />
            </Layout>
        </Layout>
    );
};
