import React, { useState } from 'react';
import {Layout} from "antd";
import s from './main-page.module.scss';
import {NavBar} from "@components/nav-bar";
import {Trigger} from "@components/trigger";
import logo from "../../assets/image/Logo.svg";
import logo_mob from "../../assets/image/Logo_mob.svg";
import AppHeader from "@components/layout/app-header";

const {Footer, Sider, Content} = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout className={s.container}>
            <Sider className={s.sidebar}
                   width={208}
                   collapsedWidth={64}
                   trigger={<Trigger isCollapsed={collapsed}/>}
                   collapsible
                   collapsed={collapsed}
                   onCollapse={() => setCollapsed(!collapsed)}>
                <img src={!collapsed ? logo: logo_mob} alt={'logo'} className={s.logo} />
                <NavBar isCollapsed={collapsed}/>
            </Sider>
            <Layout>
                <AppHeader/>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
