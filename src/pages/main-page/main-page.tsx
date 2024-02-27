import { Button, Layout } from 'antd';
import s from './main-page.module.scss';
import { NavBar } from '@components/nav-bar';
import { Switcher } from '@components/nav-bar/switcher';
import AppHeader from '@components/layout/app-header/app-header';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { ButtonMenu } from '@components/nav-bar/button-menu/button-menu';
import { AppContent } from '@components/app-content/app-content';
import { AppCard } from '@components/app-card/app-card';
import { HeartFilled } from '@ant-design/icons';
import { FooterCard } from '@components/footer-card/footer-card';
import { Logo } from '@components/logo/logo';
import CalendarCard from '@public/calendar-card.svg?react';
import ProfileCard from '@public/profile-card.svg?react';
import { Path } from '../../routes/path';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const { Header, Footer, Sider, Content } = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const breakpoint = useBreakpoint();
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        !isAuth && navigate(Path.AUTH);
    }, [isAuth, navigate]);

    const collapseHandler = () => setCollapsed((pervState) => !pervState);

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
                <Header className={s.header}>
                    <AppHeader />
                </Header>
                <Content>
                    <AppContent>
                        <AppCard
                            title={'Расписать тренировки'}
                            link={'Тренировки'}
                            icon={<HeartFilled />}
                        />
                        <AppCard
                            title={'Назначить календарь'}
                            link={'Календарь'}
                            icon={<CalendarCard />}
                        />
                        <AppCard
                            title={'Заполнить профиль'}
                            link={'Профиль'}
                            icon={<ProfileCard />}
                        />
                    </AppContent>
                </Content>
                <Footer className={s.footer}>
                    <div>
                        <Button type={'link'} size={'large'}>
                            Смотреть отзывы
                        </Button>
                    </div>
                    <div className={s['footer-card']}>
                        <FooterCard />
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
};
