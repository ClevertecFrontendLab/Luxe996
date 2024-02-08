import s from './nav-bar.module.scss'
import {Menu} from "antd";
import {CalendarOutlined, HeartFilled, IdcardOutlined, LogoutOutlined, TrophyFilled} from "@ant-design/icons";

type NavBarProps = {
    isCollapsed: boolean
}

export const NavBar = ({isCollapsed}:NavBarProps) => {
    const items = [
        {
            key: '1',
            icon: <CalendarOutlined style={{color: "rgba(6, 17, 120, 1)"}}/>,
            label: "Календарь",
            title: ""
        },
        {
            key: '2',
            icon: <HeartFilled style={{color: "rgba(6, 17, 120, 1)"}}/>,
            label: "Тренировки",
            title: ""
        },
        {
            key: '3',
            icon: <TrophyFilled style={{color: "rgba(6, 17, 120, 1)"}}/>,
            label: "Достижения",
            title: ""

        },
        {
            key: '4',
            icon: <IdcardOutlined style={{color: "rgba(6, 17, 120, 1)"}} height={'16px'} width={'16px'}/>,

            label: "Профиль",
            title: ""
        },
        {
            key: '5',
            icon: <LogoutOutlined  style={{color: "rgba(0, 0, 0, 1)"}}/>,
            label: "Выход",
            title: ""
        }
    ]
    return (
        <>

            <Menu
                className={`${s.menu} ${isCollapsed ? s.collapsed: ''}`}
                items={items}
            >
            </Menu>
        </>
    )
}