import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

interface RegisterForm {
    email: string;
    password: string;
    confirmPass: string;
}

export const RegisterForm = () => {
    const onFinish = ({ email, password, confirmPass }: RegisterForm) => {
        console.log(email, password, confirmPass);
    };

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
