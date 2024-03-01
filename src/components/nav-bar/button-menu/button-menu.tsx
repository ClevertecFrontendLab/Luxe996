import { Button } from 'antd';
import { ReactNode } from 'react';
import s from './button-menu.module.scss';
import ExitIcon from '@public/exit-menu.svg?react';
import { LoginAC } from '@redux/reducers/auth-reducer';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

type ButtonMenuProps = {
    children: ReactNode;
};

export const ButtonMenu = ({ children }: ButtonMenuProps) => {
    const dispatch = useAppDispatch();
    const onClick = () => {
        localStorage.removeItem('token');
        dispatch(LoginAC(null, null));
    };

    return (
        <Button
            block
            style={{ padding: '0 16px' }}
            size={'large'}
            type={'default'}
            icon={<ExitIcon />}
            className={s['button-menu']}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
