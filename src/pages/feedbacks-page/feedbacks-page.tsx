import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import s from './feedbacks-page.module.scss';
import { Button, Form, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { StarTwoTone } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import { EmptyFeedback } from '@components/feedbacks/empty-feedback/empty-feedback';
import { GetFeedbacksTC } from '@redux/reducers/feedbacks-reducer';
import { Feedbacks } from '@components/feedbacks/feedbacks';

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const { feedbacks, isError } = useAppSelector((state) => state.feedbacks);
    const [showModal, setShowModal] = useState(false);

    const [formValues, setFormValues] = useState({ rating: 0, massage: '' });
    console.log(formValues);

    const { feedbacks, isError } = useAppSelector((state) => state.feedbacks);
    // const { isError } = useAppSelector((state) => state.feedbacks);
    // const feedbacks = [];
    const setModalHandler = () => setShowModal((pervState) => !pervState);

    useEffect(() => {
        dispatch(GetFeedbacksTC());
    }, [dispatch]);

    useEffect(() => {
        if (!feedbacks && isError) {
            navigate(Path.MAIN);
        }
    }, [feedbacks, isError, navigate]);

    return (
        <div className={s.wrapper}>
            {feedbacks &&
                (feedbacks.length === 0 ? (
                    <EmptyFeedback setModalHandler={setModalHandler} />
                ) : (
                    <Feedbacks feedbacks={feedbacks} setModalHandler={setModalHandler} />
                ))}
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
                        <Form.Item name='rating' className={s.rate}>
                            <Rate character={<StarTwoTone />} />
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
