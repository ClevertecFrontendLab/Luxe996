import {Layout} from "antd";
import s from './main-page.module.scss';
import {NavBar} from "@components/nav-bar";
import {Switcher} from "@components/nav-bar/switcher";
import AppHeader from "@components/layout/app-header/app-header";
import {useState} from "react";
import {ButtonMenu} from "@components/nav-bar/button-menu/button-menu";

const {Header, Footer, Sider, Content} = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);

    const collapseHandler = () => setCollapsed((pervState) => !pervState)

    return (
        <Layout className={s.container}>
            <Sider
                width={208}
                collapsedWidth={64}
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
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
