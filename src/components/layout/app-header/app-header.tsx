import s from './app-header.module.scss';
import { Button, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useLocation } from 'react-router-dom';
import { Path } from '../../../routes/path';

const { Header } = Layout;

export const AppHeader = () => {
    const breakpoints = useBreakpoint();
    const location = useLocation();
    const isMain = location.pathname.includes(Path.MAIN);
    return (
        <Header className={s.header}>
            {isMain && (
                <h1 className={s.title}>
                    <p>Приветствуем тебя в CleverFit — приложении,</p>
                    <p>которое поможет тебе добиться своей мечты!</p>
                </h1>
            )}
            {breakpoints.xs ? (
                <Button className={s.settings} shape='circle' icon={<SettingOutlined />} />
            ) : (
                <Button
                    className={s.settings}
                    icon={<SettingOutlined />}
                    type={'text'}
                    size={'small'}
                >
                    Настройки
                </Button>
            )}
        </Header>
    );
};
