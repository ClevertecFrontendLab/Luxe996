import { ResTypes } from '@components/auth-page/result/constants/res-types';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { Path } from '../../../../routes/path';

export const resData: ResTypes = {
    error_login: {
        icon: (
            <WarningFilled style={{ color: '#faad14', fontSize: '80px', marginBottom: '24px' }} />
        ),
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте еще раз',
        textBtn: 'Повторить',
        pathBtn: Path.AUTH,
        testData: 'login-retry-button',
    },
    error_register: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        textBtn: 'Повторить',
        pathBtn: Path.REGISTRATION,
        testData: 'registration-retry-button',
    },
    success_register: {
        icon: (
            <CheckCircleFilled
                style={{ color: '#52c41a', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        textBtn: 'Войти',
        pathBtn: Path.AUTH,
        testData: 'registration-enter-button',
    },
};
