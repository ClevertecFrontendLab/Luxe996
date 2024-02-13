import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import s from './switcher.module.scss'
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type Props = {
    isCollapsed: boolean;
    onSwitch: () => void;
}

export const Switcher = ({isCollapsed, onSwitch}: Props) => {
    const breakpoints = useBreakpoint();
    return (
        <div className={s.trigger} onClick={onSwitch} data-test-id={breakpoints.md ? 'sider-switch' : 'sider-switch-mobile'}>
            {isCollapsed ?
                <MenuUnfoldOutlined /> :
                <MenuFoldOutlined />}
        </div>
    );
};