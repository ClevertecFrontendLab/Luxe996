import { Breadcrumb, Layout } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect, useState } from 'react';
import { Path } from '../../routes/path';
import s from './main-wrapper.module.scss';
import { Logo } from '@components/logo/logo';
import { NavBar } from '@components/nav-bar';
import { Switcher } from '@components/nav-bar/switcher';
import { ButtonMenu } from '@components/nav-bar/button-menu/button-menu';
import { Loader } from '@components/loader/loader';
import { appSelector, authSelector } from '../../selectors';
import { getPathName } from '@utils/path-names';

export const MainWrapper = () => {
    const breakpoint = useBreakpoint();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isAuth } = useAppSelector(authSelector);
    const { isLoading } = useAppSelector(appSelector);

    const [collapsed, setCollapsed] = useState(true);
    const collapseHandler = () => setCollapsed((pervState) => !pervState);

    const { Sider } = Layout;
    const token = localStorage.getItem('token');

    useEffect(() => {
        !isAuth && !token && navigate(Path.AUTH);
    }, [isAuth, navigate, token]);

    const pathNames = pathname.split('/').filter((path) => path);
    const isMain = pathname.includes(Path.MAIN);

    return (
        <>
            {isLoading && <Loader />}
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
                    <Breadcrumb className={s.breadcrums}>
                        <Breadcrumb.Item>
                            <Link to={Path.MAIN}>{getPathName(Path.MAIN)}</Link>
                        </Breadcrumb.Item>
                        {!isMain &&
                            pathNames.map((name, i) => {
                                const to = `/${pathNames.slice(0, i + 1).join('/')}`;
                                const label = getPathName(`/${name}`);
                                return (
                                    <Breadcrumb.Item key={to}>
                                        <Link to={to}>{label}</Link>
                                    </Breadcrumb.Item>
                                );
                            })}
                    </Breadcrumb>
                    <Outlet />
                </Layout>
            </Layout>
        </>
    );
};
