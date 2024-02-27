// import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Button, Form, Input, Typography } from 'antd';
import s from './change.module.scss';
import { ChangePassTC } from '@redux/reducers/auth-reducer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../../routes/path';

const { Title } = Typography;

export interface ChangePasswordForm {
    password: string;
    confirmPassword: string;
}

export const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isChanged } = useAppSelector((state) => state.auth);

    const onFinish = (values: ChangePasswordForm) => {
        dispatch(ChangePassTC(values.password, values.confirmPassword));
    };

    useEffect(() => {
        if (location.state?.from !== Path.CONFIRM_EMAIL) {
            navigate(Path.AUTH);
        }
    }, [location.state?.from, navigate]);

    useEffect(() => {
        isChanged && navigate(Path.RESULT.SUCCESS_CHANGE_PASSWORD);
    }, [isChanged, navigate]);

    return (
        <Form className={s.form} initialValues={{ remember: true }} onFinish={onFinish}>
            <Title level={3} className='change-password__title'>
                Восстановление аккауанта
            </Title>
            <Form.Item
                name='password'
                help={
                    <span style={{ fontSize: '0.75rem' }}>
                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
                ]}
            >
                <Input.Password
                    type='password'
                    placeholder='Пароль'
                    data-test-id='change-password'
                />
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Пароли не совпадают',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    type='password'
                    placeholder='Повторите пароль'
                    data-test-id='change-confirm-password'
                />
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type='primary'
                        data-test-id='change-submit-button'
                        htmlType='submit'
                        className='login-form-button'
                    >
                        Сохранить
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};
