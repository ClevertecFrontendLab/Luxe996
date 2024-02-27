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
    error_user_exist: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        textBtn: 'Назад к регистрации',
        pathBtn: Path.REGISTRATION,
        testData: 'registration-back-button',
    },
    success_change_password: {
        icon: (
            <CheckCircleFilled
                style={{ color: '#52c41a', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Пароль успешно изменен',
        text: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        textBtn: 'Вход',
        pathBtn: Path.AUTH,
        testData: 'change-entry-button',
    },
    error_email_no_exist: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Такой e-mail не зарегистрирован',
        text: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        textBtn: 'Попробовать снова',
        pathBtn: Path.AUTH,
        testData: 'check-retry-button',
    },
};
