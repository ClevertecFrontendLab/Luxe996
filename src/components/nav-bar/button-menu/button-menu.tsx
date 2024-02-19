import { Button } from 'antd';
import { ReactNode } from 'react';
import s from './button-menu.module.scss';
import ExitIcon from '@public/exit-menu.svg?react';

type ButtonMenuProps = {
    children: ReactNode;
};

export const ButtonMenu = ({ children }: ButtonMenuProps) => (
    <Button
        block
        style={{ position: 'absolute', textAlign: 'start', border: 'none' }}
        size={'large'}
        type={'default'}
        icon={<ExitIcon />}
        className={s['button-menu']}
    >
        {children}
    </Button>
);
