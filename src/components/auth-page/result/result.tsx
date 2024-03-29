import { Typography, Button } from 'antd';
import s from './result.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { resetStoreAC } from '@redux/reducers/auth-reducer';
import { ResultProps } from '@types/auth';
import { Path } from '../../../routes/path';
import { authSelector } from '../../../selectors';

const { Title, Text } = Typography;
export const Result = ({ icon, title, text, textBtn, pathBtn, testData }: ResultProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { statusCode } = useAppSelector(authSelector).authError;
    const { isRegister } = useAppSelector(authSelector);
    const onButtonClick = () => {
        if (location.pathname !== Path.RESULT.ERROR_CHECK_EMAIL) {
            dispatch(resetStoreAC());
            sessionStorage.clear();
        }

        navigate(pathBtn, { state: { from: location.pathname } });
    };

    useEffect(() => {
        !isRegister && (!statusCode || !location.state) ? navigate(location.state?.from) : '';
    }, [isRegister, location.state, navigate, statusCode]);

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
