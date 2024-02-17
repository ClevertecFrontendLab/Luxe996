import { Menu } from 'antd';
import { HeartFilled, TrophyFilled } from '@ant-design/icons';
import { CalendarIconSidebar } from '@components/custom-icons/calendar-icon-sidebar';
import { ProfileIconSidebar } from '@components/custom-icons/profile-icon-sidebar';

export const NavBar = () => {
    const items = [
        {
            key: '1',
            icon: <CalendarIconSidebar />,
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
            icon: <ProfileIconSidebar />,
            label: 'Профиль',
            title: '',
        },
    ];
    return <Menu items={items} />;
};
