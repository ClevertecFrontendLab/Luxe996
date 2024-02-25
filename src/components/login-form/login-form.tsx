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

    const onFinish = ({ email, password }: LoginFormProps) => {
        dispatch(LoginTC(email, password));
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
                    <Input addonBefore='e-mail:' size={'large'} />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '' }]} name={'password'}>
                    <Input.Password size={'large'} placeholder='Пароль'></Input.Password>
                </Form.Item>
            </div>

            <Row justify={'space-between'} align={'middle'} wrap={false}>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Button size={'large'} type={'link'}>
                    Забыли пароль?
                </Button>
            </Row>

            <div>
                <Form.Item>
                    <Button htmlType='submit' block type={'primary'} size={'large'}>
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
