import s from './app-header.module.scss'
import {Breadcrumb, Button} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export default function AppHeader() {
    const breakpoints = useBreakpoint()
    return (
        <div className={s.header}>
            <Breadcrumb>Главная</Breadcrumb>
            <h1 className={s.title}>
                <p>Приветствуем тебя в CleverFit — приложении,</p>
                <p>которое поможет тебе добиться своей мечты!</p>
            </h1>
            {
                breakpoints.xs ? (
                        <Button shape='circle' icon={<SettingOutlined/>}/>
                    )
                    : (
                        <Button
                            icon={<SettingOutlined/>}
                            type={'text'}
                            size={'small'}
                        >
                            Настройки
                        </Button>
                    )
            }

        </div>
    )
}