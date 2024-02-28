import { Menu } from 'antd';
import { HeartFilled, TrophyFilled } from '@ant-design/icons';
import CalendarSider from '@public/calendar-sider.svg?react';
import ProfileSidebar from '@public/profile-sider.svg?react';
import s from './nav-bar.module.scss';

export const NavBar = () => {
    const items = [
        {
            key: '1',
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
    return <Menu items={items} className={s.menu} />;
};
