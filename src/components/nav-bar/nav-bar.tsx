import {Menu} from "antd";
import { HeartFilled, TrophyFilled} from "@ant-design/icons";
// import logo from "../../assets/image/Logo.svg";
// import logo_mob from "../../assets/image/Logo_mob.svg";
import {CalendarIconSidebar} from "@components/custom-icons/calendar-icon-sidebar";
import {ProfileIconSidebar} from "@components/custom-icons/profile-icon-sidebar";
import {Logo} from "@components/logo/logo";

type NavBarProps = {
    isCollapsed: boolean
}

export const NavBar = ({isCollapsed}:NavBarProps) => {
    const items = [
        {
            key: '1',
            icon: <CalendarIconSidebar/>,
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
            icon: <ProfileIconSidebar />,
            label: "Профиль",
            title: ""
        },
    ]
    return (
        <div>
            {/*<img src={!isCollapsed ? logo : logo_mob} alt={'logo'} />*/}
            <Logo isCollapsed={isCollapsed}/>
            <Menu items={items}/>
        </div>
    )
}