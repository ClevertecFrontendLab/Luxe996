import { Typography, Button } from 'antd';
import s from './result.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ResetStoreAC } from '@redux/reducers/auth-reducer';
import { ResultProps } from '@types/auth';

const { Title, Text } = Typography;
export const Result = ({ icon, title, text, textBtn, pathBtn, testData }: ResultProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { statusCode } = useAppSelector((state) => state.auth.AuthError);
    const { isRegister } = useAppSelector((state) => state.auth);
    const onButtonClick = () => {
        if (statusCode || isRegister) {
            dispatch(ResetStoreAC());
        }
    };

    useEffect(() => {
        if (!statusCode && !isRegister) {
            pathBtn && navigate(pathBtn);
        }
    }, [statusCode, navigate, isRegister, pathBtn]);

    return (
        <div className={s.result}>
            {icon}
            <Title className={s.title}>{title}</Title>
            <Text className={s.text}>{text}</Text>
            <Button
                className={s.button}
                type={'primary'}
                data-test-id={testData}
                onClick={onButtonClick}
            >
                {textBtn}
            </Button>
        </div>
    );
};
