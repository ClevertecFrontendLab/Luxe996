import { Menu } from 'antd';
import { HeartFilled, TrophyFilled } from '@ant-design/icons';
import CalendarSider from '@public/calendar-sider.svg?react';
import ProfileSidebar from '@public/profile-sider.svg?react';
import s from './nav-bar.module.scss';
import { Path } from '../../routes/path';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();
    const items = [
        {
            key: `${Path.CALENDAR}`,
            icon: <CalendarSider />,
            label: 'Календарь',
            title: '',
        },
        {
            key: '2',
            icon: <HeartFilled style={{ color: 'rgba(6, 17, 120, 1)' }} />,
            label: 'Тренировки',
            title: '',
        },
        {
            key: '3',
            icon: <TrophyFilled style={{ color: 'rgba(6, 17, 120, 1)' }} />,
            label: 'Достижения',
            title: '',
        },
        {
            key: '4',
            icon: <ProfileSidebar />,
            label: 'Профиль',
            title: '',
        },
    ];
    const onMenuClick = (path: string) => {
        navigate(path);
    };
    return <Menu items={items} className={s.menu} onClick={({ key }) => onMenuClick(key)} />;
};
