import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {ReactNode} from "react";
import s from './button-menu.module.scss'

type ButtonMenuProps = {
    children : ReactNode
}

export const ButtonMenu = ({children}:ButtonMenuProps) => {
    return (
        <Button
            block
            style={{ position: 'absolute', textAlign: 'start', border: 'none',}}
            size={'large'}
            icon={<LogoutOutlined />}
            className={s['button-menu']}
        >
            {children}
        </Button>
    )
}