import {Button, Layout} from "antd";
import s from './main-page.module.scss';
import {NavBar} from "@components/nav-bar";
import {Switcher} from "@components/nav-bar/switcher";
import AppHeader from "@components/layout/app-header/app-header";
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import {useState} from "react";
import {ButtonMenu} from "@components/nav-bar/button-menu/button-menu";
import {AppContent} from "@components/app-content/app-content";
import {AppCard} from "@components/app-card/app-card";
import {HeartFilled} from "@ant-design/icons";
import {FooterCard} from "@components/footer-card/footer-card";
import {CalendarIconCard} from "@components/custom-icons/calendar-icon-card";
import {ProfileIconCard} from "@components/custom-icons/profile-icon-card";

const {Header, Footer, Sider, Content} = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const breakpoint = useBreakpoint();

    const collapseHandler = () => setCollapsed((pervState) => !pervState)

    return (
        <Layout className={s.container}>
            <Sider
                width={`${breakpoint.xs ? 106 : 208}`}
                collapsedWidth={`${breakpoint.xs ? 0 : 64}`}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <NavBar isCollapsed={collapsed}/>
                <Switcher isCollapsed={collapsed} onSwitch = {collapseHandler}/>
                <ButtonMenu>{collapsed ? '' : 'Выход'}</ButtonMenu>
            </Sider>
            <Layout>
                <Header>
                    <AppHeader/>
                </Header>
                <Content>
                    <AppContent>
                        <AppCard title={'Расписать тренировки'} link={'Тренировки'} icon={<HeartFilled />}/>
                        <AppCard title={'Назначить календарь'} link={'Календарь'} icon={<CalendarIconCard />}/>
                        <AppCard title={'Заполнить профиль'} link={'Профиль'} icon={<ProfileIconCard />}/>
                    </AppContent>
                </Content>
                <Footer>
                    <div className={s.footer}>
                        <div>
                            <Button type={'link'} size={'large'}>
                                Смотреть отзывы
                            </Button>
                        </div>

                        <div className={s['footer-card']}>
                            <FooterCard/>
                        </div>
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
};
