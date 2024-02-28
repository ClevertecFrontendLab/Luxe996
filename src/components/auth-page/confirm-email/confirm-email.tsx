import { useLocation, useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import s from './confirm.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Path } from '../../../routes/path';
import { CheckCodeTC } from '@redux/reducers/auth-reducer';

const { Title, Text } = Typography;

export const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [code, setCode] = useState('');
    const { isCodeValid } = useAppSelector((state) => state.auth);

    const email = sessionStorage.getItem('email');
    const onFinish = (code: string) => {
        email && dispatch(CheckCodeTC(email, code));
    };

    useEffect(() => {
        isCodeValid === false && setCode('');
    }, [isCodeValid]);

    useEffect(() => {
        if (location.state?.from !== Path.AUTH) {
            navigate(Path.AUTH);
        }
    }, [isCodeValid, location.state?.from, navigate]);

    useEffect(() => {
        if (isCodeValid === true) {
            navigate(Path.CHANGE_PASSWORD, {
                state: { from: location.pathname },
            });
        }
    }, [isCodeValid, location.pathname, navigate]);

    return (
        <div className={s.confirm}>
            {isCodeValid === false ? (
                <CloseCircleFilled
                    style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
                />
            ) : (
                <ExclamationCircleFilled className={s.icon} />
            )}

            <Title level={3}>
                {isCodeValid === false ? 'Неверный код. ' : ''}Введите код для восстановления
                аккаунта
            </Title>
            <Text disabled>
                Мы отправили вам на e-mail {email} шестизначный код. Введите его в поле ниже.
            </Text>
            <VerificationInput
                value={code}
                placeholder=''
                inputProps={{ 'data-test-id': 'verification-input' }}
                classNames={{
                    container: `${s.container}`,
                    character: `${isCodeValid === false ? `${s.error}` : `${s.character}`}`,
                    characterInactive: `${s.inactive}`,
                    characterFilled: `${s.filled}`,
                }}
                onChange={(value) => setCode(value)}
                onComplete={onFinish}
            />
            <Text disabled>Не пришло письмо? Проверьте папку Спам.</Text>
        </div>
    );
};
