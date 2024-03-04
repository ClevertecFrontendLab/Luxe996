import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import s from './feedbacks.module.scss';
import { Button, Form, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';
// import { StarTwoTone } from '@ant-design/icons';
import Star from '@public/star.svg?react';
import TextArea from 'antd/lib/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import { EmptyFeedback } from '@components/feedbacks/empty-feedback/empty-feedback';

export const FeedbacksPage = () => {
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const { feedbacks, isError } = useAppSelector((state) => state.feedbacks);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({ rating: 0, massage: '' });
    console.log(formValues);

    const { feedbacks, isError } = useAppSelector((state) => state.feedbacks);

    const setModalHandler = () => setShowModal((pervState) => !pervState);

    useEffect(() => {
        if (!feedbacks && isError) {
            navigate(Path.MAIN);
        }
    }, [feedbacks, isError, navigate]);

    return (
        <div className={s.wrapper}>
            <EmptyFeedback setModalHandler={setModalHandler} />
            <Modal
                title='Ваш отзыв'
                open={showModal}
                onCancel={setModalHandler}
                centered
                footer={[
                    <Button key='submit' type='primary' className={s.button}>
                        Опубликовать
                    </Button>,
                ]}
            >
                <div className={s.form}>
                    <Form
                        onValuesChange={(_, values) => setFormValues(values)}
                        initialValues={formValues}
                    >
                        <Form.Item name='rating'>
                            <Rate
                                character={
                                    // <StarTwoTone color={'#FAAD14'} />
                                    <Star />
                                }
                            />
                        </Form.Item>
                        <Form.Item name='massage'>
                            <TextArea placeholder='Autosize height with minimum and maximum number of lines' />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};
