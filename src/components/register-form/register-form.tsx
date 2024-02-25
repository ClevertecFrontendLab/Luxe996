import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { RegisterTC } from '@redux/reducers/auth-reducer';
import { useEffect } from 'react';
import { Path } from '../../routes/path';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
    email: string;
    password: string;
    confirmPass: string;
}

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { statusCode } = useAppSelector((state) => state.auth.AuthError);
    const { email, password } = useAppSelector((state) => state.auth.regInfo);
    const { isRegister } = useAppSelector((state) => state.auth);

    const onFinish = (values: RegisterForm) => {
        dispatch(RegisterTC(values.email, values.password));
    };

    useEffect(() => {
        if (statusCode && statusCode !== 409) {
            navigate(Path.RESULT.REGISTER_ERROR);
        }
        if (email && password) {
            dispatch(RegisterTC(email, password));
        }
    }, [statusCode, navigate, email, password, dispatch]);

    useEffect(() => {
        isRegister && navigate(Path.RESULT.REGISTER_SUCCESS);
    }, [isRegister, navigate]);

    return (
        <Form onFinish={onFinish}>
            <div>
                <Form.Item
                    rules={[
                        { required: true, message: '' },
                        { type: 'email', message: '' },
                    ]}
                    name={'email'}
                >
                    <Input addonBefore='e-mail:' size={'large'} />
                </Form.Item>

                <Form.Item
                    name={'password'}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
                    ]}
                    help={
                        <span style={{ fontSize: '0.75rem' }}>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </span>
                    }
                >
                    <Input.Password size={'large'} placeholder='Пароль'></Input.Password>
                </Form.Item>

                <Form.Item
                    name={'confirmPass'}
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
                    <Input.Password size={'large'} placeholder='Повторите пароль'></Input.Password>
                </Form.Item>
            </div>

            <div>
                <Form.Item>
                    <Button htmlType='submit' block type={'primary'} size={'large'}>
                        Войти
                    </Button>
                </Form.Item>
                <Button block type={'default'} size={'large'} icon={<GooglePlusOutlined />}>
                    Регистрация через Google
                </Button>
            </div>
        </Form>
    );
};