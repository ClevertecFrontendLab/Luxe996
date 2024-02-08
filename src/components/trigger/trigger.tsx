import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import s from './trigger.module.scss'

type Props = {
    isCollapsed: boolean
}

export const Trigger = ({isCollapsed}: Props) => {

    return (
        <div className={s.trigger}>
            {isCollapsed ?
                <MenuUnfoldOutlined /> :
                <MenuFoldOutlined />}
        </div>
    );
};