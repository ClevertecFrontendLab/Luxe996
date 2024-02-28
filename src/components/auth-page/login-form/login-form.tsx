import { Button, Checkbox, Form, Input, Row } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { LoginFormProps } from '@types/auth';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CheckEmailTC, LoginTC } from '@redux/reducers/auth-reducer';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../../routes/path';
import { Rule } from 'antd/lib/form';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { statusCode, message } = useAppSelector((state) => state.auth.AuthError);
    const { isCheckSuccess, isAuth } = useAppSelector((state) => state.auth);
    const [emailForm, setEmailForm] = useState('');
    const [forgotPass, setForgotPass] = useState(false);

    const email = sessionStorage.getItem('email');

    // Повторный запрос при 404
    useEffect(() => {
        if (location.state?.from === Path.RESULT.ERROR_CHECK_EMAIL && statusCode) {
            email && dispatch(CheckEmailTC(email));
        }
    }, [dispatch, email, location.state?.from, statusCode]);

    const onFinish = ({ email, password, remember }: LoginFormProps) => {
        dispatch(LoginTC(email, password, remember));
    };
    const onForgotClick = (email: string) => {
        dispatch(CheckEmailTC(email));
        sessionStorage.setItem('email', email);
    };
    // Редирект на главную
    useEffect(() => {
        isAuth && navigate(Path.MAIN);
    }, [isAuth, navigate]);

    // Обработки ошибок (Логинизация, НЕвалидный емаил)
    useEffect(() => {
        if (statusCode) {
            if (isAuth !== false) {
                message === 'Email не найден'
                    ? navigate(Path.RESULT.ERROR_EMAIL_NO_EXIST, {
                          state: { from: location.pathname },
                      })
                    : navigate(Path.RESULT.ERROR_CHECK_EMAIL, {
                          state: { from: location.pathname },
                      });
            } else {
                navigate(Path.RESULT.LOGIN_ERROR, { state: { from: location.pathname } });
            }
        }
    }, [isAuth, location.pathname, message, navigate, statusCode]);

    useEffect(() => {
        if (email && statusCode === null && isCheckSuccess) {
            navigate(Path.CONFIRM_EMAIL, { state: { from: location.pathname } });
        }
    }, [email, location.pathname, navigate, statusCode, isCheckSuccess]);

    return (
        <Form onFinish={onFinish}>
            <div>
                <Form.Item
                    name={'email'}
                    rules={[
                        { required: true, message: '' },
                        { type: 'email', message: '' },
                        {
                            validator: (_: Rule, email: string) => {
                                const emailRegex = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
                                if (emailRegex.test(email)) {
                                    setEmailForm(email);
                                    setForgotPass(true);
                                    return Promise.resolve();
                                } else {
                                    setForgotPass(false);
                                    return Promise.reject();
                                }
                            },
                        },
                    ]}
                >
                    <Input addonBefore='e-mail:' size={'large'} data-test-id='login-email' />
                </Form.Item>

                <Form.Item
                    rules={[
                        {
                            validator(_: Rule, value: string) {
                                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(value)) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(
                                        new Error(
                                            'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                        ),
                                    );
                                }
                            },
                        },
                    ]}
                    name={'password'}
                >
                    <Input.Password
                        size={'large'}
                        placeholder='Пароль'
                        data-test-id='login-password'
                    ></Input.Password>
                </Form.Item>
            </div>

            <Row justify={'space-between'} align={'middle'} wrap={false}>
                <Form.Item name='remember' valuePropName='checked' style={{ marginBottom: 0 }}>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>

                <Button
                    size={'large'}
                    type={'link'}
                    data-test-id='login-forgot-button'
                    onClick={() => {
                        forgotPass && onForgotClick(emailForm);
                    }}
                >
                    Забыли пароль?
                </Button>
            </Row>

            <div>
                <Form.Item>
                    <Button
                        htmlType='submit'
                        block
                        type={'primary'}
                        size={'large'}
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Button block type={'default'} size={'large'} icon={<GooglePlusOutlined />}>
                    Войти через Google
                </Button>
            </div>
        </Form>
    );
};
