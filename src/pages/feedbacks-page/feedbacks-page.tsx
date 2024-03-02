import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import s from './feedbacks.module.scss';
import { Button, Card, Typography } from 'antd';
import { useEffect } from 'react';
import { GetFeedbacksTC } from '@redux/reducers/feedbacks-reducer';

const { Title, Text } = Typography;
export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(GetFeedbacksTC());
    }, [dispatch]);

    return (
        <div className={s.wrapper}>
            <Card className={s.card}>
                <div className={s.content}>
                    <Title className={s.title}>Оставьте свой отзыв первым</Title>
                    <Text type='secondary'>
                        Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                        Поделитесь своим мнением и опытом с другими пользователями, и помогите им
                        сделать правильный выбор.
                    </Text>
                </div>
            </Card>
            <Button
                type='primary'
                data-test-id='change-submit-button'
                htmlType='submit'
                className={s.button}
            >
                Написать отзыв
            </Button>
        </div>
    );
};
