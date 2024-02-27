import { Button, Checkbox, Form, Input, Row } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { LoginFormProps } from '@types/auth';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { LoginTC } from '@redux/reducers/auth-reducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { statusCode } = useAppSelector((state) => state.auth.AuthError);
    const { isAuth } = useAppSelector((state) => state.auth);

    const onFinish = ({ email, password, remember }: LoginFormProps) => {
        dispatch(LoginTC(email, password));
        console.log(remember);
    };

    useEffect(() => {
        isAuth && navigate(Path.MAIN);
    }, [isAuth, navigate]);

    useEffect(() => {
        if (statusCode) {
            navigate(Path.RESULT.LOGIN_ERROR);
        }
    }, [statusCode, navigate]);

    return (
        <Form onFinish={onFinish}>
            <div>
                <Form.Item
                    name={'email'}
                    rules={[
                        { required: true, message: '' },
                        { type: 'email', message: '' },
                    ]}
                >
                    <Input addonBefore='e-mail:' size={'large'} data-test-id='login-email' />
                </Form.Item>

                {/*<Form.Item rules={[{ required: true, message: '' }]} name={'password'}>*/}
                <Form.Item
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

                <Button size={'large'} type={'link'}>
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
