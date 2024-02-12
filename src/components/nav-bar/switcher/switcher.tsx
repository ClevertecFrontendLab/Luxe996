import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import s from './switcher.module.scss'

type Props = {
    isCollapsed: boolean;
    onSwitch: () => void;
}

export const Switcher = ({isCollapsed, onSwitch}: Props) => {

    return (
        <div className={s.trigger} onClick={onSwitch}>
            {isCollapsed ?
                <MenuUnfoldOutlined /> :
                <MenuFoldOutlined />}
        </div>
    );
};