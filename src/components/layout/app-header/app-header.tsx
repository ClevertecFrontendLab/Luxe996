import s from './app-header.module.scss';
import { Button, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const { Header } = Layout;

export const AppHeader = () => {
    const breakpoints = useBreakpoint();
    return (
        <Header className={s.header}>
            <h1 className={s.title}>
                <p>Приветствуем тебя в CleverFit — приложении,</p>
                <p>которое поможет тебе добиться своей мечты!</p>
            </h1>
            {breakpoints.xs ? (
                <Button shape='circle' icon={<SettingOutlined />} />
            ) : (
                <Button icon={<SettingOutlined />} type={'text'} size={'small'}>
                    Настройки
                </Button>
            )}
        </Header>
    );
};
